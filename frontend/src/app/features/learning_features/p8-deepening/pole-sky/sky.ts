// Astronomy for the year slider. Same data and formulas as the static sky map (tools/make_figures.py):
// keep both in step.
//
// Ecliptic frame: z = north ecliptic pole. The celestial pole sits at ecliptic latitude 90° − ε and
// longitude λ = 90° − p·(year − 2000) (J2000 frame, the slow motion of the ecliptic itself ignored).

export const EPS_DEG = 23.44;                 // obliquity
export const PREC_DEG_PER_YEAR = 50.29 / 3600;
export const PREC_PERIOD_YEARS = 360 / PREC_DEG_PER_YEAR;    // ≈ 25 770 years

// Shown nutation: strongly exaggerated (real: 9.2″ and 6.8″, 18.6 years, ~1 400 waves per turn).
// The tangential amplitude stays small enough that the drawn path keeps waves without loops,
// as the real one does: A_t · 2π / T < radius · 2π / T_prec.
export const NUT_SHOWN = { periodYears: 700, radialDeg: 1.2, tangentialDeg: 0.2 };

export interface Star { name: string; ra: number; dec: number; dx: number; dy: number; anchor: 'start' | 'end' }

// J2000 positions (RA in hours, Dec in degrees); label offsets for the map
export const STARS: Star[] = [
    { name: 'Polarstern', ra: 2.5303,  dec: 89.2642, dx: 12,  dy: 18, anchor: 'start' },
    { name: 'Thuban',     ra: 14.0731, dec: 64.3758, dx: 10,  dy: -8, anchor: 'start' },
    { name: 'Wega',       ra: 18.6156, dec: 38.7836, dx: 9,   dy: -7, anchor: 'start' },
    { name: 'Deneb',      ra: 20.6906, dec: 45.2803, dx: -10, dy: -8, anchor: 'end' },
    { name: 'Alderamin',  ra: 21.3097, dec: 62.5856, dx: -10, dy: 5,  anchor: 'end' },
    { name: 'Errai',      ra: 23.6558, dec: 77.6325, dx: 9,   dy: -7, anchor: 'start' },
    { name: 'Kochab',     ra: 14.8450, dec: 74.1556, dx: 9,   dy: -7, anchor: 'start' },
];

const RAD = Math.PI / 180;

/** ecliptic longitude and latitude in degrees */
export function toEcliptic(raHours: number, decDeg: number): [number, number] {
    const a = raHours * 15 * RAD, d = decDeg * RAD, e = EPS_DEG * RAD;
    const beta = Math.asin(Math.sin(d) * Math.cos(e) - Math.cos(d) * Math.sin(e) * Math.sin(a));
    const lam = Math.atan2(Math.sin(a) * Math.cos(e) + Math.tan(d) * Math.sin(e), Math.cos(a));
    return [((lam / RAD) % 360 + 360) % 360, beta / RAD];
}

/** precession angle since 2000 in degrees (positive for later years) */
export function precessionDeg(year: number): number {
    return PREC_DEG_PER_YEAR * (year - 2000);
}

/** the celestial pole in ecliptic coordinates; with nutation: the exaggerated wobble */
export function poleAt(year: number, nutation = false): [number, number] {
    let lam = 90 - precessionDeg(year);
    let colat = EPS_DEG;
    if (nutation) {
        const ph = 2 * Math.PI * (year - 2000) / NUT_SHOWN.periodYears;
        colat += NUT_SHOWN.radialDeg * Math.sin(ph);
        lam += NUT_SHOWN.tangentialDeg * Math.cos(ph) / Math.sin(EPS_DEG * RAD);
    }
    return [lam, 90 - colat];
}

/** angle between two directions given in ecliptic coordinates, degrees */
export function separationDeg([l1, b1]: [number, number], [l2, b2]: [number, number]): number {
    const c = Math.sin(b1 * RAD) * Math.sin(b2 * RAD) + Math.cos(b1 * RAD) * Math.cos(b2 * RAD) * Math.cos((l1 - l2) * RAD);
    return Math.acos(Math.min(1, Math.max(-1, c))) / RAD;
}

/** year as a reader expects it: astronomical year 0 is 1 v. Chr. */
export function yearLabel(year: number): string {
    const n = (y: number) => y >= 10000 ? y.toLocaleString('de-DE') : String(y);
    return year > 0 ? `${n(year)} n. Chr.` : `${n(1 - year)} v. Chr.`;
}
