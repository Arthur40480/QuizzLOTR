// Importation des question du quizz
import question from "./question.js";

// Element du DOM
const quizzFormElt = document.querySelector("form");
const quizzButtonElt = document.querySelector("button");
const quizzMessageElt = document.querySelector("p");

//Tableau des résultats
const goodResults = [];
const playerResults = [];

//Score
let score = 0;

//On viens récupérer les bonnes réponse via "question" à l'aide de la méthode forEach
question.forEach(function(element) {
    goodResults.push(element.answer)
});

//Création des questions/réponses du quizz de manière dynamique
//On utilise la méthode forEach pour parcourir notre tableau "question" importer depuis question.js
question.forEach(function(element, index) {
    const questionContainerElt = document.createElement("div");
    questionContainerElt.className = "question";

    const questionTitleElt = document.createElement("h2");
    questionTitleElt.innerText = element.question;

    questionContainerElt.append(questionTitleElt);

    for(let i = 0; i < element.option.length; i++) {
        const divInputElt = document.createElement("div");

        const questionInputElt = document.createElement("input");
        questionInputElt.type = "radio";
        questionInputElt.name = `questions${index + 1}`;
        questionInputElt.value = i + 1;

        const questionLabelElt = document.createElement("label");
        questionLabelElt.htmlFor = `reponse${i + 1}`;
        questionLabelElt.innerText = element.option[i];

        divInputElt.append(questionInputElt, questionLabelElt);
        questionContainerElt.append(divInputElt);
        quizzFormElt.append(questionContainerElt);
    }
    
    const explanationQuestionElt = document.createElement("p");
    explanationQuestionElt.className = "explanation";
    explanationQuestionElt.innerHTML = element.explanation;
    explanationQuestionElt.style.display = "none";

    questionContainerElt.append(explanationQuestionElt);
});

//Ajout d'évènement, au click on viens récupérer les données du formulaire.
quizzButtonElt.addEventListener('click', function(event) {
    const formData = new FormData(quizzFormElt);

    for(let pair of formData.entries()) {
        playerResults.push(parseInt(pair[1]));
    }

    if(playerResults.length < 9) {
        quizzMessageElt.innerHTML = 'Veuillez répondre à <span>TOUTES</span> les questions ! 😱';
        return;
    }
    else {
        compareResults(playerResults);
    }
    
});

//On récupère les éléments du DOM précèdement créer
const allQuestionContainerElt = document.querySelectorAll(".question");
const allInputQuizzElt = document.querySelectorAll('input[type="radio"]');
const allExplanationQuestionElt = document.querySelectorAll(".explanation");

//Fonction qui compare les résultats du joueur avec notre tableau de résultat.
//Change la couleur en fonction du résultat.    
function compareResults(results) {
    for(let i = 0; i < goodResults.length; i++) {
        if((results[i]) === goodResults[i]) {
            console.log("Bonne réponse !");
            allQuestionContainerElt[i].style.backgroundImage = "linear-gradient(to right, #a8ff78, #78ffd6)";
            score++;
        }
        else {
            console.log("mauvaise réponse !");
            allQuestionContainerElt[i].style.backgroundImage = "linear-gradient(to right, #f5567b, #fd674c)";
            allExplanationQuestionElt[i].style.display = "block";   
        }
    }
};

//Fonction permettant de remettre à jour les couleurs.
function resetColor(e) {
    const index = e.target.getAttribute("name").slice(9);
    const targetedQuestionContainerElt = allQuestionContainerElt[index - 1];

    targetedQuestionContainerElt.style.backgroundColor = "#F1F1F1";
    targetedQuestionContainerElt.style.backgroundImage = "none";
}

//On ajoute un evenement sur chacun des inputs.
allInputQuizzElt.forEach(input => input.addEventListener("input", resetColor));

