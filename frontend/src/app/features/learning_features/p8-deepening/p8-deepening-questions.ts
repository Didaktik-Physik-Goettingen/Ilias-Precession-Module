import { ImageChoiceQuestion, LabelingQuestion, MultipleChoiceQuestion, SingleChoiceQuestion } from '../../../shared/evaluation/question.types';

// Vertiefung: the Earth as a gyroscope. Figures: tools/make_figures.py (p8 section).
// Numbers used: I_Erde ≈ 8·10³⁷ kg m², ω = 7,3·10⁻⁵ s⁻¹ → L ≈ 6·10³³ kg m²/s; the lunisolar torque that gives
// 25 800 years is ≈ 2·10²² N m. Pole speed on the sky: 50,3″/a · sin 23,4° ≈ 20″/a, i.e. ≈ 6′ in 18,6 years.


// ── Page 1: Die Erde als Kreisel ───────────────────────────────────────────

export const question1: SingleChoiceQuestion = {
    "questionId": "p8-deepening-1-kugel",
    "question": "Stellen Sie sich vor, die Erde wäre eine exakte Kugel, deren Masse kugelsymmetrisch verteilt ist, bei gleicher Masse, gleicher Drehung und gleicher Neigung der Achse. Was würde aus der Präzession der Erdachse?",
    "options": [
        {
            "value": "answer1",
            "label": "Es gäbe keine Präzession: Die Anziehung der Sonne auf eine kugelsymmetrische Erde wirkt wie eine Kraft im Erdmittelpunkt und übt kein Drehmoment aus."
        },
        {
            "value": "answer2",
            "label": "Die Präzession wäre schneller, weil die Kugel kein Material im Wulst hat und ihr Drehimpuls deshalb kleiner ist."
        },
        {
            "value": "answer3",
            "label": "Die Präzession bliebe unverändert, weil sie nur von der Neigung der Achse abhängt."
        },
        {
            "value": "answer4",
            "label": "Die Achse würde sich langsam aufrichten, bis sie senkrecht auf der Bahnebene steht."
        }
    ],
    "correctAnswer": "answer1",
    "containerId": "question1-container",
    "successMessage": "Auf eine kugelsymmetrische Masse wirkt die Gravitation von außen so, als griffe sie im Mittelpunkt an. Eine Kraft durch den Bezugspunkt hat keinen Hebelarm, also gibt es kein Drehmoment $\\vec D$ und keine Präzession. Erst der Äquatorwulst bietet der Sonne einen Angriffspunkt neben dem Mittelpunkt.",
    "incorrectMessage": "Fragen Sie zuerst, ob auf die Kugel überhaupt ein Drehmoment wirkt.",
    "answerFeedback": {
        "answer2": "Die Änderung der Masseverteilung wirkt auf zwei Größen: auf $L$ und auf $D$. Prüfen Sie, welche davon bei einer Kugel ganz verschwindet.",
        "answer3": "Nach $\\omega_P = D/(L\\sin\\theta)$ hängt die Präzession vom Drehmoment ab. Prüfen Sie, ob die Sonne auf eine Kugel ein Drehmoment ausübt.",
        "answer4": "Eine Änderung von $\\vec L$ erfordert ein Drehmoment. Prüfen Sie, ob die Sonne auf eine Kugel ein Drehmoment ausübt."
    }
};

export const question2: LabelingQuestion = {
    "questionId": "p8-deepening-2-wulst-beschriften",
    "question": "Die Abbildung zeigt die Erde mit stark überhöhtem Äquatorwulst zur Wintersonnenwende der Nordhalbkugel. Die Hebelarme $\\vec r_1$ und $\\vec r_2$ reichen vom Erdmittelpunkt zum näheren und zum ferneren Teil des Wulstes. Ordnen Sie den nummerierten Pfeilen die passenden Größen zu. Alle gesuchten Pfeile sind grau gezeichnet; ein Begriff bleibt übrig.",
    "imageSrc": "assets/images/p8_deepening/erde_beschriften.svg",
    "imageAlt": "Erde mit überhöhtem Äquatorwulst über der Bahnebene, Achse um 23,4° gegen die Senkrechte geneigt, Sonne links. Pfeil 1 am linken Wulst nach links, lang; Pfeil 2 vom Mittelpunkt entlang der Erdachse nach oben; Pfeil 3 am rechten Wulst nach links, kurz; Pfeil 4 vom Mittelpunkt in der Bahnebene zum Betrachter hin.",
    "options": [
        { "value": "pull-near", "label": "Anziehung der Sonne auf den näheren Teil des Wulstes" },
        { "value": "pull-far", "label": "Anziehung der Sonne auf den ferneren Teil des Wulstes" },
        { "value": "L", "label": "Drehimpuls L der Erde" },
        { "value": "D", "label": "Drehmoment D auf die Erde" },
        { "value": "omegaP", "label": "Winkelgeschwindigkeit der Präzession" }
    ],
    "correctLabels": ["pull-near", "L", "pull-far", "D"],
    "markerFeedback": [
        "Beide Kräfte zeigen zur Sonne. Welcher Teil des Wulstes liegt näher an der Sonne, und wie hängt die Anziehung vom Abstand ab?",
        "Die Erde dreht sich um ihre Achse. Wo liegt der Drehimpuls eines Körpers, der sich um eine Symmetrieachse dreht?",
        "Beide Kräfte zeigen zur Sonne. Welcher Teil des Wulstes liegt näher an der Sonne, und wie hängt die Anziehung vom Abstand ab?",
        "Bilden Sie $\\vec r_1\\times\\vec F_1$ und $\\vec r_2\\times\\vec F_2$ mit der Rechte-Hand-Regel. Das Ergebnis steht senkrecht auf Hebelarm und Kraft; eine Präzession dreht dagegen um die Senkrechte zur Bahnebene."
    ],
    "containerId": "question2-container",
    "successMessage": "Die Sonne zieht am näheren Teil des Wulstes stärker als am ferneren. Beide Beiträge $\\vec r_1\\times\\vec F_1$ und $\\vec r_2\\times\\vec F_2$ zeigen aus der Bildebene heraus: Das Drehmoment $\\vec D$ liegt in der Bahnebene und steht senkrecht auf $\\vec L$, wie beim Kreisel im Versuch. Ein Pfeil für $\\vec\\omega_P$ ist nicht eingezeichnet."
};

export const question3: ImageChoiceQuestion = {
    "questionId": "p8-deepening-3-achsenbewegung",
    "question": "Die Abbildungen zeigen die Erde von oben, mit Blick vom Norden auf die Bahnebene. Eingezeichnet sind $\\vec L$ und $\\vec D$; der graue Pfeil am Nordpol zeigt die Drehrichtung der Erde. Welche Abbildung zeigt, wohin sich die Spitze von $\\vec L$ bewegt (roter Pfeil)? Wählen Sie genau eine Abbildung.",
    "options": [
        {
            "value": "answer1",
            "imageSrc": "assets/images/p8_deepening/praezession_frage_1.svg",
            "alt": "Erde von oben, L nach rechts, D nach unten. Roter Pfeil: Die Spitze von L wandert gegen den Uhrzeigersinn nach oben, von D weg."
        },
        {
            "value": "answer2",
            "imageSrc": "assets/images/p8_deepening/praezession_frage_2.svg",
            "alt": "Erde von oben, L nach rechts, D nach unten. Roter Pfeil: Die Spitze von L wandert im Uhrzeigersinn nach unten, zu D hin."
        },
        {
            "value": "answer3",
            "imageSrc": "assets/images/p8_deepening/praezession_frage_3.svg",
            "alt": "Erde von oben, L nach rechts, D nach unten. Roter Pfeil: Die Spitze von L wandert zur Mitte, die Achse richtet sich auf."
        }
    ],
    "correctAnswers": ["answer2"],
    "containerId": "question3-container",
    "successMessage": "Nach $d\\vec L=\\vec D\\,dt$ ändert sich $\\vec L$ in Richtung des Drehmoments, also seitwärts. Die Erdachse richtet sich nicht auf, so wie der Kreisel im Versuch nicht umkippt: Sie wandert auf einem Kegel um die Senkrechte zur Bahnebene, von Norden gesehen im Uhrzeigersinn und damit entgegen der Drehrichtung der Erde.",
    "incompleteMessage": "Vergleichen Sie die Änderung von $\\vec L$ mit der Richtung von $\\vec D$.",
    "incorrectMessage": "Vergleichen Sie die Änderung von $\\vec L$ mit der Richtung von $\\vec D$.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "dl-dt",
            "order": 1,
            "message": "Nach $d\\vec L=\\vec D\\,dt$ zeigt die Änderung von $\\vec L$ in Richtung des Drehmoments. Vergleichen Sie die roten Pfeile mit $\\vec D$.",
            "paragraphId": "reasoning"
        },
        "answer2": {
            "conceptId": "dl-dt",
            "order": 1,
            "message": "Nach $d\\vec L=\\vec D\\,dt$ zeigt die Änderung von $\\vec L$ in Richtung des Drehmoments. Vergleichen Sie die roten Pfeile mit $\\vec D$.",
            "paragraphId": "reasoning"
        },
        "answer3": {
            "conceptId": "upright",
            "order": 2,
            "message": "Würde sich die Achse aufrichten, läge die Änderung von $\\vec L$ in der Ebene aus $\\vec L$ und der Senkrechten zur Bahnebene. Prüfen Sie, ob $\\vec D$ in dieser Ebene liegt.",
            "paragraphId": "reasoning"
        }
    }
};


// ── Page 2: Der wandernde Himmelspol ───────────────────────────────────────

export const question4: LabelingQuestion = {
    "questionId": "p8-deepening-4-himmelspol",
    "question": "Die Karte zeigt den Himmel um den Ekliptikpol, so wie Sie ihn von der Erde aus sehen. Der rote Pfeil zeigt, in welche Richtung der Himmelspol wandert; ein Umlauf dauert etwa 25&nbsp;800 Jahre. Wann steht der Himmelspol an den markierten Stellen? Ein Begriff bleibt übrig.",
    "imageSrc": "assets/images/p8_deepening/himmelspol_beschriften.svg",
    "imageAlt": "Himmelskarte um den Ekliptikpol mit den Sternen Polarstern, Thuban, Kochab, Errai, Alderamin, Deneb und Wega. Ein gestrichelter roter Kreis um den Ekliptikpol, Wanderrichtung gegen den Uhrzeigersinn. Markierung 2 unten am Polarstern, Markierung 1 eine Vierteldrehung weiter rechts, Markierung 4 gegenüber oben nahe der Wega, Markierung 3 links unten bei Thuban.",
    "options": [
        { "value": "now", "label": "heute" },
        { "value": "past-4700", "label": "vor etwa 4 700 Jahren" },
        { "value": "future-2000", "label": "in etwa 2 000 Jahren" },
        { "value": "future-6500", "label": "in etwa 6 500 Jahren" },
        { "value": "future-13000", "label": "in etwa 13 000 Jahren" }
    ],
    "correctLabels": ["future-6500", "now", "past-4700", "future-13000"],
    "markerFeedback": [
        "Schätzen Sie den Winkel vom heutigen Himmelspol bis zu dieser Markierung in Wanderrichtung und rechnen Sie ihn in einen Bruchteil von 25 800 Jahren um.",
        "Auf welchen hellen Stern zeigt die Erdachse heute?",
        "Liegt diese Markierung in Wanderrichtung vor dem heutigen Himmelspol oder dahinter? Schätzen Sie dann den Winkel bis zum heutigen Pol.",
        "Schätzen Sie den Winkel vom heutigen Himmelspol bis zu dieser Markierung in Wanderrichtung und rechnen Sie ihn in einen Bruchteil von 25 800 Jahren um."
    ],
    "containerId": "question4-container",
    "successMessage": "Der Himmelspol wandert auf einem Kreis mit dem Radius 23,4° um den Ekliptikpol: Das ist der Präzessionskegel der Erdachse, an den Himmel projiziert. Vor etwa 4 700 Jahren, zur Zeit des Pyramidenbaus, stand er nahe Thuban. Nach einem halben Umlauf steht er gegenüber, 47° vom heutigen Pol entfernt, in der Nähe der Wega."
};

export const question5: SingleChoiceQuestion = {
    "questionId": "p8-deepening-5-langsam",
    "question": "Auf die Erde wirkt im Mittel ein Drehmoment von etwa $D = 2\\cdot10^{22}\\,\\mathrm{N\\,m}$, ihr Drehimpuls beträgt etwa $L = 6\\cdot10^{33}\\,\\mathrm{kg\\,m^2/s}$, und es ist $\\theta = 23{,}4^\\circ$ ($\\sin\\theta\\approx0{,}4$). Schätzen Sie mit $\\omega_P = D/(L\\sin\\theta)$ und $T_P = 2\\pi/\\omega_P$ ab, wie lange ein Umlauf der Erdachse dauert. Ein Jahr hat etwa $3{,}2\\cdot10^{7}\\,\\mathrm{s}$.",
    "options": [
        { "value": "answer1", "label": "einige Tage" },
        { "value": "answer2", "label": "einige hundert Jahre" },
        { "value": "answer3", "label": "einige zehntausend Jahre" },
        { "value": "answer4", "label": "einige Millionen Jahre" }
    ],
    "correctAnswer": "answer3",
    "containerId": "question5-container",
    "successMessage": "$\\omega_P = 2\\cdot10^{22}/(6\\cdot10^{33}\\cdot0{,}4)\\,\\mathrm{s^{-1}} \\approx 8\\cdot10^{-12}\\,\\mathrm{s^{-1}}$, also $T_P \\approx 8\\cdot10^{11}\\,\\mathrm{s} \\approx 2{,}5\\cdot10^{4}$ Jahre. Das Drehmoment ist riesig, der Drehimpuls aber noch viel größer: Deshalb dreht sich die Erdachse auf ihrem Kegel nur um etwa 50″ pro Jahr weiter.",
    "incorrectMessage": "Rechnen Sie zuerst $\\omega_P$ in $\\mathrm{s^{-1}}$ aus und dann $T_P$ in Jahren.",
    "answerFeedback": {
        "answer1": "Prüfen Sie den Exponenten: Teilen Sie $10^{22}$ durch $10^{33}$, bevor Sie $T_P = 2\\pi/\\omega_P$ bilden.",
        "answer2": "Prüfen Sie die Umrechnung von Sekunden in Jahre: $T_P$ in Sekunden geteilt durch $3{,}2\\cdot10^{7}\\,\\mathrm{s}$.",
        "answer4": "Prüfen Sie die Umrechnung von Sekunden in Jahre und den Faktor $2\\pi$ in $T_P = 2\\pi/\\omega_P$."
    }
};


// ── Page 3: Nutation der Erdachse ──────────────────────────────────────────

export const question6: ImageChoiceQuestion = {
    "questionId": "p8-deepening-6-polbahn",
    "question": "Der Präzession ist die Nutation überlagert: ein Nicken der Erdachse mit einer Periode von 18,6 Jahren und einem Ausschlag von etwa 9″. Durch die Präzession allein wandert der Himmelspol in 18,6 Jahren um etwa 6′ auf seinem Kreis weiter. Welche Abbildung zeigt die Bahn des Himmelspols am Himmel? In den Abbildungen sind der Ausschlag stark vergrößert und die Zahl der Wellen verringert. Wählen Sie genau eine Abbildung.",
    "options": [
        {
            "value": "answer1",
            "imageSrc": "assets/images/p8_deepening/polbahn_1.svg",
            "alt": "Bahn aus Bögen nach außen, die am Kreis in Spitzen zusammenlaufen."
        },
        {
            "value": "answer2",
            "imageSrc": "assets/images/p8_deepening/polbahn_2.svg",
            "alt": "Kreisbogen mit kleinen, gleichmäßigen Wellen nach innen und außen."
        },
        {
            "value": "answer3",
            "imageSrc": "assets/images/p8_deepening/polbahn_3.svg",
            "alt": "Kreisbogen mit kleinen Schleifen."
        }
    ],
    "correctAnswers": ["answer2"],
    "containerId": "question6-container",
    "successMessage": "Die Nutation lässt den Pol periodisch nach innen und außen pendeln, während ihn die Präzession stetig weiterführt. Weil der Pol in einer Nutationsperiode viel weiter wandert (etwa 6′), als er nickt (etwa 9″), kommt er nie zum Stillstand: Es entstehen Wellen, keine Spitzen wie beim losgelassenen Kreisel und keine Schleifen. Auf einem Umlauf sind es rund 1&nbsp;400 Wellen.",
    "incompleteMessage": "Vergleichen Sie, wie weit der Pol in 18,6 Jahren wandert, mit dem Ausschlag der Nutation.",
    "incorrectMessage": "Vergleichen Sie, wie weit der Pol in 18,6 Jahren wandert, mit dem Ausschlag der Nutation.",
    "answerFeedback": {
        "answer2": {
            "conceptId": "superposed",
            "order": 1,
            "message": "Die Nutation ist der Präzession überlagert: Der Pol pendelt periodisch um seinen mittleren Kreis.",
            "paragraphId": "reasoning"
        },
        "answer1": {
            "conceptId": "speed",
            "order": 2,
            "message": "Spitzen entstehen, wenn der Pol kurz zum Stillstand kommt, Schleifen, wenn er zeitweise zurückläuft. Vergleichen Sie die 6′, die der Pol in 18,6 Jahren wandert, mit dem Ausschlag von 9″.",
            "paragraphId": "reasoning"
        },
        "answer3": {
            "conceptId": "speed",
            "order": 2,
            "message": "Spitzen entstehen, wenn der Pol kurz zum Stillstand kommt, Schleifen, wenn er zeitweise zurückläuft. Vergleichen Sie die 6′, die der Pol in 18,6 Jahren wandert, mit dem Ausschlag von 9″.",
            "paragraphId": "reasoning"
        }
    }
};

export const question7: MultipleChoiceQuestion = {
    "questionId": "p8-deepening-7-erzwungen",
    "question": "Vergleichen Sie die Nutation der Erdachse mit der Nutation des Versuchskreisels aus dem Abschnitt „Nutation“. Welche Aussagen treffen zu?",
    "options": [
        {
            "value": "answer1",
            "label": "Im Versuch tritt die Nutation am ausbalancierten Kreisel nach einem Stoß auf, ohne dass danach ein äußeres Drehmoment wirkt."
        },
        {
            "value": "answer2",
            "label": "Die Periode der Nutation der Erdachse wird von der Bahn des Mondes vorgegeben."
        },
        {
            "value": "answer3",
            "label": "Ohne den Mond gäbe es die Nutation der Erdachse mit der Periode von 18,6 Jahren nicht."
        },
        {
            "value": "answer4",
            "label": "Die Nutation der Erdachse würde schneller, wenn sich die Erde schneller drehte, wie die Nutation im Versuch bei größerer Winkelgeschwindigkeit $\\omega_R$."
        },
        {
            "value": "answer5",
            "label": "Die Erdachse wurde einmal angestoßen; seitdem nickt sie von selbst weiter, wie der Kreisel nach dem Stoß."
        }
    ],
    "correctAnswers": ["answer1", "answer2", "answer3"],
    "containerId": "question7-container",
    "successMessage": "Im Versuch ist die Nutation frei: Ein Stoß setzt sie in Gang, danach wirkt am ausbalancierten Kreisel kein Drehmoment, und ihr Takt hängt vom Kreisel selbst ab. Die Nutation der Erdachse ist erzwungen: Ihr Takt kommt vom Mond, dessen Bahn sich in 18,6 Jahren einmal herumdreht. Ohne dieses veränderliche Drehmoment gäbe es sie nicht.",
    "incompleteMessage": "Unterscheiden Sie eine freie Nutation, die nach einem Stoß von selbst abläuft, von einer erzwungenen, deren Takt von außen vorgegeben wird.",
    "incorrectMessage": "Unterscheiden Sie eine freie Nutation, die nach einem Stoß von selbst abläuft, von einer erzwungenen, deren Takt von außen vorgegeben wird.",
    "answerFeedback": {
        "answer1": {
            "conceptId": "lab-free",
            "order": 1,
            "message": "Erinnern Sie sich an den Versuch im Abschnitt „Nutation“: Hing ein Zusatzgewicht am Kreisel, und was löste die Nutation aus?",
            "paragraphId": "lab"
        },
        "answer2": {
            "conceptId": "forced",
            "order": 2,
            "message": "Woher kommt das Nicken der Erdachse? Überlegen Sie, was sich in 18,6 Jahren periodisch ändert.",
            "paragraphId": "earth"
        },
        "answer3": {
            "conceptId": "forced",
            "order": 2,
            "message": "Woher kommt das Nicken der Erdachse? Überlegen Sie, was sich in 18,6 Jahren periodisch ändert.",
            "paragraphId": "earth"
        },
        "answer4": {
            "conceptId": "period",
            "order": 3,
            "message": "Wovon hängt der Takt einer erzwungenen Bewegung ab: vom bewegten Körper oder von der Ursache, die ihn antreibt?",
            "paragraphId": "earth"
        },
        "answer5": {
            "conceptId": "free-vs-forced",
            "order": 4,
            "message": "Eine freie Nutation braucht nach dem Anstoß keinen Antrieb. Prüfen Sie, ob das 18,6-jährige Nicken ohne das veränderliche Drehmoment des Mondes bestehen bliebe.",
            "paragraphId": "earth"
        }
    }
};
