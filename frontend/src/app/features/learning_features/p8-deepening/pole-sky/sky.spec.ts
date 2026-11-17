import { describe, expect, it } from 'vitest';
import { EPS_DEG, NUT_SHOWN, PREC_DEG_PER_YEAR, PREC_PERIOD_YEARS, STARS, poleAt, separationDeg, toEcliptic, yearLabel } from './sky';

const star = (name: string) => {
    const s = STARS.find(x => x.name === name)!;
    return toEcliptic(s.ra, s.dec);
};

describe('sky', () => {
    it('takes about 25 800 years for one turn', () => {
        expect(PREC_PERIOD_YEARS).toBeGreaterThan(25600);
        expect(PREC_PERIOD_YEARS).toBeLessThan(26000);
    });

    it('puts the pole where history has it', () => {
        expect(separationDeg(poleAt(2000), star('Polarstern'))).toBeLessThan(1);
        expect(separationDeg(poleAt(-2800), star('Thuban'))).toBeLessThan(0.5);
        expect(separationDeg(poleAt(7500), star('Alderamin'))).toBeLessThan(3);
        expect(separationDeg(poleAt(14000), star('Wega'))).toBeLessThan(6);
    });

    it('keeps the pole 23.4° from the ecliptic pole, half a turn later on the opposite side', () => {
        for (const y of [-3000, 2000, 9000, 16000]) expect(90 - poleAt(y)[1]).toBeCloseTo(EPS_DEG, 6);
        expect(separationDeg(poleAt(2000), poleAt(2000 + PREC_PERIOD_YEARS / 2))).toBeCloseTo(2 * EPS_DEG, 3);
    });

    it('draws the nutation as waves without loops', () => {
        const precessionSpeed = EPS_DEG * PREC_DEG_PER_YEAR * Math.PI / 180;           // arc on the sky, °/year
        const nutationSpeed = NUT_SHOWN.tangentialDeg * 2 * Math.PI / NUT_SHOWN.periodYears;
        expect(nutationSpeed).toBeLessThan(precessionSpeed);
        for (const y of [2000, 2100, 2350]) {
            expect(Math.abs(separationDeg(poleAt(y, true), poleAt(y)))).toBeLessThanOrEqual(NUT_SHOWN.radialDeg + NUT_SHOWN.tangentialDeg);
        }
    });

    it('writes years as readers expect them', () => {
        expect(yearLabel(2026)).toBe('2026 n. Chr.');
        expect(yearLabel(0)).toBe('1 v. Chr.');
        expect(yearLabel(-2700)).toBe('2701 v. Chr.');
        expect(yearLabel(14000)).toBe('14.000 n. Chr.');
    });
});
