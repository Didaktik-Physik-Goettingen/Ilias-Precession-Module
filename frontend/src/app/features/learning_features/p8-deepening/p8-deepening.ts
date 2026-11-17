import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ResultsTracking } from '../../../core/services/results-tracking';
import { GlossaryOverlay } from '../../../shared/glossary-overlay/glossary-overlay.service';
import { DevModeService } from '../../../core/services/dev-mode';
import { SingleChoice } from '../../../shared/evaluation/single-choice/single-choice';
import { MultipleChoice } from '../../../shared/evaluation/multiple-choice/multiple-choice';
import { ImageChoice } from '../../../shared/evaluation/image-choice/image-choice';
import { Labeling } from '../../../shared/evaluation/labeling/labeling';
import { PoleSky } from './pole-sky/pole-sky';
import * as p8Questions from './p8-deepening-questions';
import * as p8Content from './p8-deepening-content';



@Component({
	selector: 'app-p8-deepening',
	imports: [CommonModule, SingleChoice, MultipleChoice, ImageChoice, Labeling, PoleSky],
	templateUrl: './p8-deepening.html',
	styleUrl: './p8-deepening.css',
})
export class P8Deepening implements OnInit, AfterViewInit, OnDestroy {
    constructor(
		private sanitizer: DomSanitizer,
        @Inject(PLATFORM_ID) private platformId: Object,
        private route: ActivatedRoute,
        private router: Router,
		private trackingService: ResultsTracking,
        public glossaryOverlay: GlossaryOverlay,
        public devMode: DevModeService,
    ) {}

    private mathJaxTimeout: ReturnType<typeof setTimeout> | null = null;
    private pageSub: Subscription | null = null;

    @HostListener('click', ['$event'])
    onGlossaryLink(event: MouseEvent) {
        const routeLink = (event.target as HTMLElement)
            ?.closest('a[data-route]') as HTMLAnchorElement | null;
        if (routeLink) {
            event.preventDefault();
            const rawQuery = routeLink.getAttribute('data-query');
            const queryParams = rawQuery
                ? Object.fromEntries(new URLSearchParams(rawQuery))
                : undefined;
            this.router.navigate([routeLink.getAttribute('data-route')!], { queryParams });
            return;
        }

        const link = (event.target as HTMLElement)
            ?.closest('a[data-glossary]') as HTMLAnchorElement | null;
        if (!link) return;

        const term = link.getAttribute('data-glossary')!;
        this.glossaryOverlay.open(term);
    }


	// +++ QA data +++
    question1 = p8Questions.question1;
    question2 = p8Questions.question2;
    question3 = p8Questions.question3;
    question4 = p8Questions.question4;
    question5 = p8Questions.question5;
    question6 = p8Questions.question6;
    question7 = p8Questions.question7;


	// track completion (question 2 also shows the labelled figure once solved)
	isCorrect1 = false;
	isCorrect2 = false;
	isCorrect3 = false;
	isCorrect4 = false;
	isCorrect5 = false;
	isCorrect6 = false;
	isCorrect7 = false;

    onQuestion1Answered(isCorrect: boolean) { this.isCorrect1 = isCorrect; }
    onQuestion2Answered(isCorrect: boolean) { this.isCorrect2 = isCorrect; if (isCorrect) this.renderMath(); }
    onQuestion3Answered(isCorrect: boolean) { this.isCorrect3 = isCorrect; }
    onQuestion4Answered(isCorrect: boolean) { this.isCorrect4 = isCorrect; }
    onQuestion5Answered(isCorrect: boolean) { this.isCorrect5 = isCorrect; }
    onQuestion6Answered(isCorrect: boolean) { this.isCorrect6 = isCorrect; }
    onQuestion7Answered(isCorrect: boolean) { this.isCorrect7 = isCorrect; }


	// +++ TeX rendering +++
	deepeningText1a!: SafeHtml;
	deepeningText1b!: SafeHtml;
	deepeningText1c!: SafeHtml;
	deepeningText1d!: SafeHtml;
	deepeningText1e!: SafeHtml;
	deepeningText1f!: SafeHtml;
	deepeningText1g!: SafeHtml;

	deepeningText2a!: SafeHtml;
	deepeningText2b!: SafeHtml;
	deepeningText2c!: SafeHtml;

	deepeningText3a!: SafeHtml;
	deepeningText3b!: SafeHtml;
	deepeningText3c!: SafeHtml;
	deepeningText3d!: SafeHtml;


    ngOnInit() {
        // subscribe to page param so nav-bar jumps update the view reactively
        this.pageSub = this.route.queryParams.subscribe(params => {
            const page = params['page'];
            if (page && ['1','2','3'].includes(page)) {
                this.currentView = `deepening${page}`;
                this.renderMath();
            }
        });

        // start tracking this module
        this.trackingService.startModule('p8-deepening-module');

        // restore completion states from previous session
        this.isCorrect1 = this.trackingService.isQuestionCompleted(this.question1.questionId);
        this.isCorrect2 = this.trackingService.isQuestionCompleted(this.question2.questionId);
        this.isCorrect3 = this.trackingService.isQuestionCompleted(this.question3.questionId);
        this.isCorrect4 = this.trackingService.isQuestionCompleted(this.question4.questionId);
        this.isCorrect5 = this.trackingService.isQuestionCompleted(this.question5.questionId);
        this.isCorrect6 = this.trackingService.isQuestionCompleted(this.question6.questionId);
        this.isCorrect7 = this.trackingService.isQuestionCompleted(this.question7.questionId);

		// sanitized strings to enable LaTeX rendering
        const safe = (html: string) => this.sanitizer.bypassSecurityTrustHtml(html);
        this.deepeningText1a = safe(p8Content.deepeningText1a);
        this.deepeningText1b = safe(p8Content.deepeningText1b);
        this.deepeningText1c = safe(p8Content.deepeningText1c);
        this.deepeningText1d = safe(p8Content.deepeningText1d);
        this.deepeningText1e = safe(p8Content.deepeningText1e);
        this.deepeningText1f = safe(p8Content.deepeningText1f);
        this.deepeningText1g = safe(p8Content.deepeningText1g);

        this.deepeningText2a = safe(p8Content.deepeningText2a);
        this.deepeningText2b = safe(p8Content.deepeningText2b);
        this.deepeningText2c = safe(p8Content.deepeningText2c);

        this.deepeningText3a = safe(p8Content.deepeningText3a);
        this.deepeningText3b = safe(p8Content.deepeningText3b);
        this.deepeningText3c = safe(p8Content.deepeningText3c);
        this.deepeningText3d = safe(p8Content.deepeningText3d);
    }


    ngAfterViewInit() {
        this.renderMath();
    }


    ngOnDestroy() {
        this.pageSub?.unsubscribe();
        if (this.mathJaxTimeout !== null) clearTimeout(this.mathJaxTimeout);
        this.trackingService.endModule();
    }


    // trigger MathJax rendering
	renderMath() {
		if (isPlatformBrowser(this.platformId)) {
			if (this.mathJaxTimeout !== null) clearTimeout(this.mathJaxTimeout);
			this.mathJaxTimeout = setTimeout(() => {
				this.mathJaxTimeout = null;
				if (window.MathJax) {
					window.MathJax.typesetPromise();
				}
			}, 100);
		}
	}


// +++ in-page navigation +++

    private updateUrl() {
        const page = this.currentView.replace('deepening', '');
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page },
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    }

    // navigation helpers
	currentView: string = 'deepening1';

    get isFirstPage(): boolean {
        return this.currentView === 'deepening1';
    }
    get isLastPage(): boolean {
        return this.currentView === 'deepening3';
    }



    // going back shows the previous subpage / the previous segment (dev mode only)
    goBack() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('deepening', ''));
        if (page === 1) {
            this.router.navigate(['/learning/p7-measurement'], { queryParams: { page: '4' } });
            return;
        }
        this.currentView = `deepening${page - 1}`;
        this.updateUrl();
        this.renderMath();
    }


    // go forward shows next subpage / page
    goForward() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const page = Number(this.currentView.replace('deepening', ''));
        if (page === 3) {
            this.router.navigate(['/target/tar-precession']);
            return;
        }
        this.currentView = `deepening${page + 1}`;
        this.updateUrl();
        this.renderMath();
    }
}
