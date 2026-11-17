import { Component, Input, OnDestroy, computed, signal } from '@angular/core';
import { EPS_DEG, NUT_SHOWN, STARS, poleAt, precessionDeg, separationDeg, toEcliptic, yearLabel } from './sky';

type Vec = [number, number, number];
type Pt = [number, number];

const TODAY = 2026;
const RAD = Math.PI / 180;

// colours of the module's figures (tools/make_figures.py): the figures keep their white plate in both themes
const C = { navy: 'rgb(21,50,104)', L: 'rgb(0,145,200)', P: 'rgb(199,13,45)', graph: 'rgb(59,59,58)', grey: 'rgb(135,135,134)',
            light: 'rgb(200,205,212)', sky: 'rgb(236,240,246)', plane: 'rgb(240,242,245)', earth: 'rgb(223,231,240)' };

let nextId = 0;

const pts = (p: Pt[]) => p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');



/** Year slider: the Earth's axis on its precession cone (oblique view, as in the figures on page 1)
 *  and the celestial pole on the sky (view from the Earth, as in the sky map). With `nutation`,
 *  a switch adds the exaggerated nutation to both. */
@Component({
    selector: 'app-pole-sky',
    standalone: true,
    templateUrl: './pole-sky.html',
    styleUrl: './pole-sky.css',
})
export class PoleSky implements OnDestroy {
    /** show the switch "Nutation (überhöht)" */
    @Input() nutation = false;

    readonly C = C;
    readonly uid = `pole-sky-${nextId++}`;
    readonly minYear = -3000;
    readonly maxYear = 16000;

    readonly year = signal(TODAY);
    readonly nutationOn = signal(false);
    readonly playing = signal(false);
    private timer: ReturnType<typeof setInterval> | null = null;

    readonly yearText = computed(() => yearLabel(this.year()));


    // ── sky map: azimuthal equidistant around the ecliptic pole, seen from the Earth ──
    readonly skyCx = 300;
    readonly skyCy = 300;
    readonly k = 8;                              // px per degree
    readonly rings = [10, 20, 30];

    private map([lam, beta]: [number, number]): Pt {
        const rho = 90 - beta;
        const phi = (-90 - (lam - 90)) * RAD;    // longitude grows clockwise seen from inside; λ = 90° at the bottom
        return [this.skyCx + this.k * rho * Math.cos(phi), this.skyCy - this.k * rho * Math.sin(phi)];
    }

    readonly stars = STARS.map(s => {
        const [x, y] = this.map(toEcliptic(s.ra, s.dec));
        return { ...s, x, y, ecl: toEcliptic(s.ra, s.dec) };
    });

    readonly skyCircle = pts(Array.from({ length: 289 }, (_, j) => this.map(poleAt(2000 + 25800 * j / 288))));

    /** pole path from today to the chosen year */
    readonly skyTrail = computed(() => pts(this.sample(y => this.map(poleAt(y, this.nutationOn())))));
    readonly skyPole = computed(() => this.map(poleAt(this.year(), this.nutationOn())));

    readonly nearest = computed(() => {
        const pole = poleAt(this.year(), this.nutationOn());
        const [best] = this.stars.map(s => ({ name: s.name, d: separationDeg(pole, s.ecl as [number, number]) }))
            .sort((a, b) => a.d - b.d);
        return best;
    });

    readonly nearestText = computed(() => {
        const n = this.nearest();
        return n.d < 8 ? `${n.name}, ${n.d.toFixed(1).replace('.', ',')}° vom Himmelspol entfernt` : 'keiner näher als 8°';
    });


    // ── the Earth's axis: orthographic view from the front, slightly above ──
    private readonly az = 12 * RAD;
    private readonly el = 24 * RAD;
    private readonly ex = { cx: 215, cy: 285, s: 92 };
    private readonly toViewer: Vec = [-Math.sin(this.az) * Math.cos(this.el), -Math.cos(this.az) * Math.cos(this.el), Math.sin(this.el)];

    private P([x, y, z]: Vec): Pt {
        const xr = x * Math.cos(this.az) - y * Math.sin(this.az);
        const depth = x * Math.sin(this.az) + y * Math.cos(this.az);
        return [this.ex.cx + this.ex.s * xr, this.ex.cy - this.ex.s * (z * Math.cos(this.el) + depth * Math.sin(this.el))];
    }

    /** axis direction: azimuth −precession angle (clockwise seen from ecliptic north), tilt with nutation */
    private axisAt(year: number, nutation: boolean): Vec {
        let tilt = EPS_DEG, azim = -precessionDeg(year);
        if (nutation) {
            const ph = 2 * Math.PI * (year - 2000) / NUT_SHOWN.periodYears;
            tilt += NUT_SHOWN.radialDeg * Math.sin(ph);
            azim -= NUT_SHOWN.tangentialDeg * Math.cos(ph) / Math.sin(EPS_DEG * RAD);
        }
        const t = tilt * RAD, a = azim * RAD;
        return [Math.sin(t) * Math.cos(a), Math.sin(t) * Math.sin(a), Math.cos(t)];
    }

    readonly LEN = 1.9;
    readonly plane = pts(Array.from({ length: 97 }, (_, j) => {
        const a = 2 * Math.PI * j / 96;
        return this.P([2.0 * Math.cos(a), 2.0 * Math.sin(a), 0]);
    }));
    readonly coneRim = pts(Array.from({ length: 145 }, (_, j) => {
        const a = 2 * Math.PI * j / 144, r = this.LEN * Math.sin(EPS_DEG * RAD);
        return this.P([r * Math.cos(a), r * Math.sin(a), this.LEN * Math.cos(EPS_DEG * RAD)]);
    }));
    readonly vertical: [Pt, Pt] = [this.P([0, 0, -1.3]), this.P([0, 0, 2.25])];
    readonly centre = this.P([0, 0, 0]);
    readonly earthR = this.ex.s;

    readonly axisTrail = computed(() => pts(this.sample(y => this.P(this.scale(this.axisAt(y, this.nutationOn()), this.LEN)))));

    readonly axis = computed(() => {
        const a = this.axisAt(this.year(), this.nutationOn());
        return {
            inner: [this.centre, this.P(a)] as [Pt, Pt],                         // inside the Earth, dashed
            outer: [this.P(a), this.P(this.scale(a, this.LEN))] as [Pt, Pt],     // L from the north pole on
            south: [this.P(this.scale(a, -1)), this.P(this.scale(a, -1.3))] as [Pt, Pt],
            label: this.P(this.scale(a, this.LEN + 0.18)),
            equatorFront: this.equator(a, true),
            equatorBack: this.equator(a, false),
        };
    });

    private equator(a: Vec, front: boolean): string[] {
        const helper: Vec = Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
        const u = this.norm(this.cross(a, helper)), v = this.cross(a, u);
        const segs: Pt[][] = [];
        let cur: Pt[] = [];
        for (let j = 0; j <= 144; j++) {
            const t = 2 * Math.PI * j / 144;
            const p: Vec = [u[0] * Math.cos(t) + v[0] * Math.sin(t), u[1] * Math.cos(t) + v[1] * Math.sin(t), u[2] * Math.cos(t) + v[2] * Math.sin(t)];
            const visible = p[0] * this.toViewer[0] + p[1] * this.toViewer[1] + p[2] * this.toViewer[2] >= 0;
            if (visible === front) cur.push(this.P(p));
            else if (cur.length) { segs.push(cur); cur = []; }
        }
        if (cur.length) segs.push(cur);
        return segs.filter(s => s.length > 1).map(pts);
    }


    // ── helpers ──
    /** points from today to the chosen year, fine enough for the drawn nutation */
    private sample(f: (year: number) => Pt): Pt[] {
        const y1 = this.year(), n = Math.max(2, Math.ceil(Math.abs(y1 - TODAY) / 20));
        return Array.from({ length: n + 1 }, (_, j) => f(TODAY + (y1 - TODAY) * j / n));
    }
    private scale(a: Vec, s: number): Vec { return [a[0] * s, a[1] * s, a[2] * s]; }
    private cross(a: Vec, b: Vec): Vec { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    private norm(a: Vec): Vec { const n = Math.hypot(...a); return [a[0] / n, a[1] / n, a[2] / n]; }


    // ── controls ──
    onYear(event: Event) {
        this.stop();
        this.year.set(Number((event.target as HTMLInputElement).value));
    }

    onNutation(event: Event) {
        this.nutationOn.set((event.target as HTMLInputElement).checked);
    }

    togglePlay() {
        if (this.playing()) { this.stop(); return; }
        if (this.year() >= this.maxYear) this.year.set(this.minYear);
        this.playing.set(true);
        this.timer = setInterval(() => {
            const next = Math.min(this.maxYear, this.year() + 40);
            this.year.set(next);
            if (next >= this.maxYear) this.stop();
        }, 30);
    }

    reset() {
        this.stop();
        this.year.set(TODAY);
        this.nutationOn.set(false);
    }

    private stop() {
        if (this.timer !== null) clearInterval(this.timer);
        this.timer = null;
        this.playing.set(false);
    }

    ngOnDestroy() {
        this.stop();
    }

}
