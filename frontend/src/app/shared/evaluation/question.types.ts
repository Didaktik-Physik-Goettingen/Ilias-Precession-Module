export interface QuestionOption {
    value: string;
    label: string;
}

export interface ImageOption {
    value: string;
    imageSrc: string;
    label?: string;
    /** Describes the depicted geometry without judging whether it is the solution. */
    alt?: string;
}

export interface AdaptiveAnswerHint {
    message: string;
    conceptId?: string;
    order?: number;
    independent?: boolean;
    /** Connected concepts sharing one paragraph, in explicit reasoning order. */
    paragraphId?: string;
    combinedFeedback?: Record<string, string>;
}

export type AnswerFeedback = Record<string, string | AdaptiveAnswerHint | AdaptiveAnswerHint[]>;

export interface SingleChoiceQuestion {
    questionId: string;
    question: string;
    options: QuestionOption[];
    correctAnswer: string;
    containerId: string;
    successMessage?: string;
    emptySelectionMessage?: string;
    incorrectMessage?: string;
    answerFeedback?: Record<string, string>;
}

export interface MultipleChoiceQuestion {
    questionId: string;
    question: string;
    options: QuestionOption[];
    correctAnswers: string[];
    containerId: string;
    successMessage?: string;
    emptySelectionMessage?: string;
    incompleteMessage?: string;
    incorrectMessage?: string;
    answerFeedback?: AnswerFeedback;
}

export interface ImageChoiceQuestion {
    questionId: string;
    question: string;
    options: ImageOption[];
    correctAnswers: string[];
    containerId: string;
    successMessage?: string;
    emptySelectionMessage?: string;
    incompleteMessage?: string;
    incorrectMessage?: string;
    answerFeedback?: AnswerFeedback;
}

export interface MultipleChoiceImageQuestion {
    questionId: string;
    imageSrc: string;
    imageAlt: string;
    question: string;
    options: QuestionOption[];
    correctAnswers: string[];
    containerId: string;
    successMessage?: string;
    emptySelectionMessage?: string;
    incompleteMessage?: string;
    incorrectMessage?: string;
    answerFeedback?: AnswerFeedback;
}

/**
 * Labelling task ("Beschriften"): a figure with numbered markers 1…n baked into the image;
 * each marker gets one option from a dropdown. Options are plain text (no MathJax inside <option>):
 * symbols as plain letters without arrows or subscripts (e.g. 'Drehimpuls L der Erde'), or no symbol.
 * There may be more options than markers.
 */
export interface LabelingQuestion {
    questionId: string;
    question: string;
    imageSrc: string;
    imageAlt: string;
    options: QuestionOption[];
    /** correctLabels[k] is the option value for marker k + 1 */
    correctLabels: string[];
    /** markerFeedback[k] is shown when marker k + 1 is labelled wrongly: a hint, not the answer */
    markerFeedback: string[];
    containerId: string;
    successMessage?: string;
    incorrectMessage?: string;
}

export type AnyQuestion =
    | SingleChoiceQuestion
    | MultipleChoiceQuestion
    | ImageChoiceQuestion
    | MultipleChoiceImageQuestion
    | LabelingQuestion;
