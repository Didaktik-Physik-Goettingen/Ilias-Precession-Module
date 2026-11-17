import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PoleSky } from './pole-sky';

describe('PoleSky', () => {
    let fixture: ComponentFixture<PoleSky>;
    let component: PoleSky;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [PoleSky] });
        fixture = TestBed.createComponent(PoleSky);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    afterEach(() => fixture.destroy());

    const slider = () => fixture.nativeElement.querySelector('input[type="range"]') as HTMLInputElement;
    const text = () => fixture.nativeElement.textContent as string;

    function setYear(y: number) {
        slider().value = String(y);
        slider().dispatchEvent(new Event('input'));
        fixture.detectChanges();
    }

    it('starts today at the Polarstern', () => {
        expect(text()).toContain('2026 n. Chr.');
        expect(component.nearest().name).toBe('Polarstern');
    });

    it('follows the slider to Thuban and Wega', () => {
        setYear(-2800);
        expect(text()).toContain('2801 v. Chr.');
        expect(component.nearest().name).toBe('Thuban');
        setYear(14000);
        expect(component.nearest().name).toBe('Wega');
    });

    it('offers the nutation switch only when asked', () => {
        expect(fixture.nativeElement.querySelector('input[type="checkbox"]')).toBeNull();
        fixture.componentRef.setInput('nutation', true);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('input[type="checkbox"]')).not.toBeNull();
    });

    it('goes back to today without nutation on Zurücksetzen', () => {
        setYear(9000);
        component.nutationOn.set(true);
        component.reset();
        fixture.detectChanges();
        expect(component.year()).toBe(2026);
        expect(component.nutationOn()).toBe(false);
    });
});
