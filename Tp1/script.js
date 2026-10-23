function escapeHTML(texte) {
    return String(texte)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

const reponsesCorrectes = {
    q1: ["a", "b", "c"],
    q2: ["a", "b", "c"],
    q3: ["a", "b", "c"],
    q4: ["b"],
    q5: ["c"]
};

const questions = [
    {
        texte: "Quels sont des langages web ?",
        choix: ["HTML", "CSS", "JavaScript", "Photoshop"]
    },
    {
        texte: "Quels éléments sont des balises HTML ?",
        choix: ["<p>", "<h1>", "<body>", "print()"]
    },
    {
        texte: "Quelles affirmations sur CSS sont vraies ?",
        choix: [
            "CSS permet de changer les couleurs",
            "CSS permet de modifier les polices",
            "CSS organise l'apparence de la page",
            "CSS remplace toujours HTML"
        ]
    },
    {
        texte: "Quelle balise crée un lien ?",
        choix: ["<img>", "<a>", "<table>", "<form>"]
    },
    {
        texte: "Quelle balise insère du JavaScript dans HTML ?",
        choix: ["<style>", "<css>", "<script>", "<title>"]
    }
];

function lireReponses() {
    const reponses = {};

    for (let i = 1; i <= 5; i++) {
        const selection = document.querySelectorAll(
            'input[name="q' + i + '"]:checked'
        );

        reponses["q" + i] = Array.from(selection).map(
            element => element.value
        );
    }

    return reponses;
}

function estCorrecte(reponse, correcte) {
    return reponse.length === correcte.length &&
        correcte.every(valeur => reponse.includes(valeur));
}

function ouvrirFenetre(titre, contenu) {
    const fenetre = window.open("", "_blank", "width=750,height=650");

    if (!fenetre) {
        alert("Autorisez les fenêtres pop-up dans votre navigateur.");
        return;
    }

    fenetre.document.open();
    fenetre.document.write(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>${titre}</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                .correct { color: green; text-decoration: underline; }
                .incorrect { color: red; }
            </style>
        </head>
        <body>${contenu}</body>
        </html>
    `);
    fenetre.document.close();
}

function afficherCorrection() {
    let contenu = "<h1>Correction complète du QCM</h1>";

    for (let i = 0; i < questions.length; i++) {
        contenu += "<h3>Question " + (i + 1) + " : " +
            questions[i].texte + "</h3><ul>";

        for (let j = 0; j < questions[i].choix.length; j++) {
            const valeur = String.fromCharCode(97 + j);
            const estBonne = reponsesCorrectes["q" + (i + 1)]
                .includes(valeur);

            contenu += "<li class='" +
                (estBonne ? "correct" : "") + "'>" +
                escapeHTML(questions[i].choix[j]) + "</li>";
        }

        contenu += "</ul>";
    }

    ouvrirFenetre("Correction du QCM", contenu);
}

function afficherResultat() {
    const reponses = lireReponses();
    let score = 0;
    let contenu = "<h1>Résultat du QCM</h1>";

    for (let i = 1; i <= 5; i++) {
        const correcte = estCorrecte(
            reponses["q" + i],
            reponsesCorrectes["q" + i]
        );

        if (correcte) {
            score++;
        }

        contenu += "<p>La réponse de la question " + i + " est " +
            (correcte
                ? "<span class='correct'>correcte</span>"
                : "<span class='incorrect'>incorrecte</span>") +
            ".</p>";
    }

    contenu += "<h2>Votre score : " + score + " / 5</h2>";

    ouvrirFenetre("Résultat du test", contenu);
}