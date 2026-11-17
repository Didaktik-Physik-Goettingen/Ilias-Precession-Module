// Vertiefung: the Earth as a gyroscope. Figures from tools/make_figures.py (p8 section),
// the year slider is pole-sky/ (same star data as the sky map).

// ── Page 1: Die Erde als Kreisel ───────────────────────────────────────────

export const deepeningText1a = `
    Die Erde ist selbst ein Kreisel: Sie dreht sich einmal am Tag um ihre Achse und hat deshalb einen großen
    <a data-glossary="angular-momentum" class="glossary-link">Drehimpuls</a> $\\vec L$.
    Ihre Achse ist um etwa 23,4° gegen die Senkrechte zur Bahnebene geneigt. Außerdem ist die Erde nicht ganz rund:
    Ihre Drehung hat sie an den Polen abgeplattet, und am Äquator trägt sie einen Wulst. Ihr Durchmesser ist dort
    rund 43&nbsp;km größer als von Pol zu Pol.
`;

export const deepeningText1b = `
    Die Erde mit stark überhöhtem Äquatorwulst (in Wirklichkeit ist sie nur um etwa 1/300 abgeplattet),
    zur Wintersonnenwende der Nordhalbkugel: Das Nordende der Achse ist von der Sonne weggeneigt.
`;

export const deepeningText1c = `
    Sonne und Mond ziehen an der Erde. Ob dabei ein
    <a data-glossary="torque" class="glossary-link">Drehmoment</a> auf die Erde entsteht, hängt von ihrer Form ab.
`;

export const deepeningText1d = `
    Am Wulst greift die Anziehung der Sonne an zwei Stellen neben dem Erdmittelpunkt an: am näheren und am ferneren Teil des Wulstes.
    Weil die Anziehung mit dem Abstand abnimmt, zieht die Sonne am näheren Teil stärker. Die Hebelarme der beiden Kräfte
    zeigen vom Erdmittelpunkt aus in entgegengesetzte Richtungen.
`;

export const deepeningText1e = `
    Die Kräfte der Sonne am Äquatorwulst und das Drehmoment $\\vec D$, das sie zusammen ausüben.
    $\\vec D$ liegt in der Bahnebene und zeigt aus der Bildebene heraus.
`;

export const deepeningText1f = `
    Im Lauf eines Jahres schwankt das Drehmoment der Sonne; zu Frühlings- und Herbstanfang, wenn die Sonne über dem Äquator steht,
    verschwindet es sogar. Im Mittel bleibt ein Drehmoment $\\vec D$, das in der Bahnebene liegt und senkrecht auf $\\vec L$ steht.
    Der Mond trägt auf dieselbe Weise bei, sogar etwa doppelt so stark wie die Sonne: Er ist zwar viel leichter, aber viel näher.
`;

export const deepeningText1g = `
    Wie der Kreisel im Versuch kippt die Erdachse also nicht, sondern weicht seitlich aus: Sie
    <a data-glossary="precession" class="glossary-link">präzediert</a> auf einem Kegel um die Senkrechte zur Bahnebene.
    Würde ein Gewicht die Erdachse umkippen wollen, wie beim Kreisel auf seiner Spitze, liefe sie mit der Drehrichtung der Erde um.
    Weil das Drehmoment die Achse aufrichten will, ist es umgekehrt: Von Norden gesehen läuft die Erdachse im Uhrzeigersinn um,
    entgegen der Drehrichtung der Erde.
`;


// ── Page 2: Der wandernde Himmelspol ───────────────────────────────────────

export const deepeningText2a = `
    Die Erdachse zeigt auf einen Punkt am Himmel, den <strong>Himmelspol</strong>; um ihn scheinen sich die Sterne nachts zu drehen.
    Heute liegt er nahe am Polarstern. Der Punkt am Himmel senkrecht über der Bahnebene der Erde heißt <strong>Ekliptikpol</strong>.
    Weil die Erdachse auf ihrem Präzessionskegel wandert, beschreibt der Himmelspol einen Kreis um den Ekliptikpol.
    Sein Radius ist der Öffnungswinkel des Kegels, 23,4°.
`;

export const deepeningText2b = `
    <strong>Aufgabe:</strong> Prüfen Sie Ihre Zuordnung mit dem Regler „Jahr“: Links sehen Sie die Erdachse auf ihrem Präzessionskegel,
    rechts den Himmelspol auf der Himmelskarte. Die rote Spur zeigt den Weg seit heute. „Abspielen“ lässt die Jahre ablaufen.
`;

export const deepeningText2c = `
    <strong>Warum so langsam?</strong> Die Präzession der Erde folgt derselben Gleichung wie die des Kreisels im Versuch,
    $\\omega_P = D/(L\\sin\\theta)$, hier mit dem Winkel $\\theta = 23{,}4^\\circ$ zwischen $\\vec L$ und der Senkrechten zur Bahnebene.
`;


// ── Page 3: Nutation der Erdachse ──────────────────────────────────────────

export const deepeningText3a = `
    Die Bahn des Mondes ist um etwa 5° gegen die Bahnebene der Erde geneigt, und ihre Lage dreht sich in 18,6 Jahren einmal herum.
    Dadurch ändert sich der Winkel zwischen Mondbahn und Äquator: Er schwankt zwischen 18,3° und 28,6°.
    Je nach Lage der Mondbahn zieht der Mond deshalb verschieden stark am Äquatorwulst.
`;

export const deepeningText3b = `
    Mondbahn und Äquator, von der Seite gesehen: (a) Die Mondbahn ist zum Äquator hin geneigt,
    (b) 9,3 Jahre später von ihm weg. Die Winkel sind maßstäblich, die Größen von Erde und Mond nicht.
`;

export const deepeningText3c = `
    Das Drehmoment auf die Erde schwankt deshalb mit einer Periode von 18,6 Jahren. Der Präzession ist eine kleine periodische
    Bewegung überlagert, die <a data-glossary="nutation" class="glossary-link">Nutation</a> der Erdachse.
`;

export const deepeningText3d = `
    <strong>Aufgabe:</strong> Schalten Sie „Nutation (stark überhöht)“ ein und verfolgen Sie mit dem Regler „Jahr“ oder mit „Abspielen“
    die Bahn des Himmelspols. Vergleichen Sie sie mit Ihrer Wahl oben.
`;
