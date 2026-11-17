import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ResultsTracking } from '../../../core/services/results-tracking';
import { ShuffleOrder } from '../../../core/services/shuffle-order';
import { Labeling, decodePair, encodePair } from './labeling';

const INPUTS = {
    questionId: 'label-test', containerId: 'label-test', question: 'Beschriften Sie.',
    imageSrc: 'figure.svg', imageAlt: 'Abbildung',
    options: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }, { value: 'c', label: 'C' }],
    correctLabels: ['a', 'b'],
    markerFeedback: ['Hinweis 1.', 'Hinweis 2.'],
    successMessage: 'Erklärung.',
};

describe('Labeling', () => {
    let fixture: ComponentFixture<Labeling>;
    let component: Labeling;
    let tracking: { getQuestionResult: ReturnType<typeof vi.fn>; trackQuestionResult: ReturnType<typeof vi.fn> };

    function create(previous?: object) {
        tracking = { getQuestionResult: vi.fn(() => previous), trackQuestionResult: vi.fn() };
        TestBed.configureTestingModule({
            imports: [Labeling],
            providers: [
                { provide: ResultsTracking, useValue: tracking },
                { provide: ShuffleOrder, useValue: { getOrCreate: () => [0, 1, 2] } },
            ]
        });
        fixture = TestBed.createComponent(Labeling);
        for (const [name, value] of Object.entries(INPUTS)) fixture.componentRef.setInput(name, value);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }

    beforeEach(() => vi.useFakeTimers());
    afterEach(() => { fixture?.destroy(); vi.clearAllTimers(); vi.useRealTimers(); });

    const selects = () => [...fixture.nativeElement.querySelectorAll('select')] as HTMLSelectElement[];
    const result = () => (fixture.nativeElement.querySelector('.evaluation-result') as HTMLElement).textContent!;

    function refresh() { fixture.changeDetectorRef.markForCheck(); fixture.detectChanges(); }

    function choose(index: number, value: string) {
        selects()[index].value = value;
        selects()[index].dispatchEvent(new Event('change'));
        refresh();
    }

    it('encodes and decodes an assignment', () => {
        expect(decodePair(encodePair(4, 'D'))).toEqual([4, 'D']);
    });

    it('shows one dropdown per marker with every option', () => {
        create();
        expect(selects().length).toBe(2);
        expect([...selects()[0].options].map(o => o.value)).toEqual(['', 'a', 'b', 'c']);
    });

    it('asks for a complete assignment and does not track an incomplete one', () => {
        create();
        choose(0, 'a');
        component.evaluateAnswer(); refresh();
        expect(result()).toContain('jeder Markierung');
        expect(tracking.trackQuestionResult).not.toHaveBeenCalled();
    });

    it('counts wrong markers, gives their hints and tracks the pairs', () => {
        create();
        choose(0, 'c'); choose(1, 'b');
        component.evaluateAnswer(); refresh();
        expect(component.isCorrect).toBe(false);
        expect(component.markerState).toEqual([false, true]);
        expect(result()).toContain('Anzahl der Fehler: 1.');
        expect(result()).toContain('Hinweis 1.');
        expect(result()).not.toContain('Hinweis 2.');
        const [id, ok, selected, correct, meta] = tracking.trackQuestionResult.mock.calls[0];
        expect([id, ok, selected, correct]).toEqual(['label-test', false, ['1=c', '2=b'], ['1=a', '2=b']]);
        expect(meta.selectedAnswerTexts).toEqual(['1 → C', '2 → B']);
        expect(meta.questionRevision).toMatch(/^q1-/);
    });

    it('locks the dropdowns once correct', () => {
        create();
        choose(0, 'a'); choose(1, 'b');
        component.evaluateAnswer(); refresh();
        expect(component.isCorrect).toBe(true);
        expect(result()).toContain('Erklärung.');
        expect(selects().every(s => s.disabled)).toBe(true);
    });

    it('clears the evaluation of a marker when it is changed', () => {
        create();
        choose(0, 'c'); choose(1, 'b');
        component.evaluateAnswer(); refresh();
        choose(0, 'a');
        expect(component.markerState[0]).toBeNull();
        expect(component.showResult).toBe(false);
    });

    it('restores a saved answer of the same revision', () => {
        create();
        choose(0, 'a'); choose(1, 'c');
        component.evaluateAnswer();
        const saved = tracking.trackQuestionResult.mock.calls[0];
        fixture.destroy(); TestBed.resetTestingModule();
        create({ selectedAnswers: saved[2], questionRevision: saved[4].questionRevision });
        expect(component.chosen).toEqual(['a', 'c']);
        expect(component.markerState).toEqual([true, false]);
    });

    it('does not restore an answer to a revised task', () => {
        create({ selectedAnswers: ['1=a', '2=b'], questionRevision: 'q1-old' });
        expect(component.chosen).toEqual(['', '']);
        expect(component.hasRevisedQuestion).toBe(true);
    });
});
