import { Component, Input, Output, EventEmitter, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ResultsTracking } from '../../../core/services/results-tracking';
import { ShuffleOrder } from '../../../core/services/shuffle-order';
import { isSolutionsMode } from '../../../core/services/report-mode';
import { QuestionOption } from '../question.types';
import { questionRevision } from '../question-revision';



/** One assignment as tracked: marker number and option value, e.g. "4=D". */
export function encodePair(marker: number, value: string): string {
    return `${marker}=${value}`;
}

export function decodePair(pair: string): [number, string] {
    const i = pair.indexOf('=');
    return [Number(pair.slice(0, i)), pair.slice(i + 1)];
}



// Labelling task: numbered markers in a figure, one dropdown per marker (native <select>: works with
// touch, keyboard and screen readers). Tracked as pairs "k=value", so summary and report need nothing new.
@Component({
    selector: 'app-labeling',
    standalone: true,
    templateUrl: './labeling.html',
    styleUrl: './labeling.css'
})
export class Labeling implements OnInit {
    @Input() question!: string;
    @Input() imageSrc!: string;
    @Input() imageAlt!: string;
    @Input() options!: QuestionOption[];
    @Input() correctLabels!: string[];
    @Input() markerFeedback: string[] = [];
    @Input() containerId!: string;
    @Input() questionId!: string;

    @Input() successMessage?: string;
    @Input() incompleteSelectionMessage = 'Bitte ordnen Sie jeder Markierung einen Begriff zu.';
    @Input() incorrectMessage?: string = 'Prüfen Sie Ihre Zuordnung anhand der Abbildung.';

    @Output() onCorrectAnswer = new EventEmitter<void>();
    @Output() onAnswerEvaluated = new EventEmitter<boolean>();

    shuffledOptions: QuestionOption[] = [];
    markers: number[] = [];
    /** chosen option value per marker index ('' = nothing chosen) */
    chosen: string[] = [];
    /** per marker after evaluation: true correct, false wrong, null not evaluated */
    markerState: (boolean | null)[] = [];
    showResult = false;
    isCorrect = false;
    resultMessage: SafeHtml = '';
    hasRevisedQuestion = false;

    constructor(
        private sanitizer: DomSanitizer,
        private trackingService: ResultsTracking,
        private shuffleOrder: ShuffleOrder,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {}


    ngOnInit() {
        const order = this.shuffleOrder.getOrCreate(this.questionId, this.options.length);
        this.shuffledOptions = order.map(i => this.options[i]);
        this.markers = this.correctLabels.map((_, k) => k + 1);
        this.chosen = this.markers.map(() => '');
        this.markerState = this.markers.map(() => null);
        if (isSolutionsMode()) {
            this.chosen = [...this.correctLabels];
            this.evaluate(false);
            return;
        }
        this.restorePreviousAnswer();
    }


    /** The markers count as part of the task: a figure with other markers is a different question. */
    private revision(): string {
        const markerOptions = this.markers.map(k => ({ value: `marker-${k}`, label: String(k) }));
        return questionRevision(this.question, [...this.options, ...markerOptions], this.imageSrc);
    }

    private restorePreviousAnswer() {
        const previous = this.trackingService.getQuestionResult(this.questionId);
        if (!previous) return;
        // a new type: every saved answer carries its fingerprint
        if (previous.questionRevision !== this.revision()) {
            this.hasRevisedQuestion = true;
            return;
        }
        for (const pair of previous.selectedAnswers) {
            const [marker, value] = decodePair(pair);
            if (marker >= 1 && marker <= this.markers.length && this.options.some(o => o.value === value)) {
                this.chosen[marker - 1] = value;
            }
        }
        this.evaluate(false);
    }


    select(index: number, value: string) {
        if (this.isCorrect) return;
        this.chosen[index] = value;
        this.markerState[index] = null;
        this.showResult = false;
        this.resultMessage = '';
    }


    get isComplete(): boolean {
        return this.chosen.every(v => v !== '');
    }


    evaluateAnswer() {
        if (this.isCorrect) return;
        this.hasRevisedQuestion = false;
        if (!this.isComplete) {
            this.isCorrect = false;
            this.showResult = true;
            this.resultMessage = this.incompleteSelectionMessage;
            return;
        }
        this.evaluate(true);
    }


    private evaluate(track: boolean) {
        this.markerState = this.chosen.map((v, k) => v === this.correctLabels[k]);
        this.isCorrect = this.isComplete && this.markerState.every(Boolean);
        this.showResult = true;

        if (track) {
            const text = (k: number, v: string) => `${k + 1} → ${this.options.find(o => o.value === v)?.label ?? v}`;
            this.trackingService.trackQuestionResult(
                this.questionId,
                this.isCorrect,
                this.chosen.map((v, k) => encodePair(k + 1, v)),
                this.correctLabels.map((v, k) => encodePair(k + 1, v)),
                {
                    questionText: this.question,
                    questionRevision: this.revision(),
                    selectedAnswerTexts: this.chosen.map((v, k) => text(k, v)),
                    correctAnswerTexts: this.correctLabels.map((v, k) => text(k, v)),
                }
            );
            if (this.isCorrect) this.onCorrectAnswer.emit();
        }
        this.onAnswerEvaluated.emit(this.isCorrect);
        this.resultMessage = this.sanitizer.bypassSecurityTrustHtml(this.buildMessage());
        setTimeout(() => this.renderMath(), 100);
    }


    private buildMessage(): string {
        const wrong = this.markers.filter((_, k) => this.markerState[k] === false);
        if (wrong.length === 0) return this.successMessage || '✓ Richtig!';
        const hints = wrong
            .map(k => this.markerFeedback[k - 1] ? `<strong>Markierung ${k}:</strong> ${this.markerFeedback[k - 1]}` : '')
            .filter(Boolean);
        const summary = `Anzahl der Fehler: ${wrong.length}.`;
        return [summary, hints.length ? hints.join('<br>') : this.incorrectMessage].filter(Boolean).join('<br><br>');
    }


    renderMath() {
        if (!isPlatformBrowser(this.platformId)) return;
        setTimeout(() => {
            const el = document.querySelector(`.${this.containerId} .evaluation-result`);
            if (el && window.MathJax) {
                window.MathJax.typesetPromise([el]).catch((err: any) => console.error('MathJax rendering error:', err));
            }
        }, 100);
    }
}
