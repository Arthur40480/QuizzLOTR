// Importation des question du quizz
import question from "./question.js";

// Element du DOM
const quizzFormElt = document.querySelector("form");
const quizzButtonElt = document.querySelector("button");

//Tableau des résultats
const goodResults = [];
const playerResults = [];

//On viens récupérer les bonnes réponse via "question" à l'aide de la méthode forEach
question.forEach(function(element) {
    goodResults.push(element.answer)
})

console.log(goodResults);

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
        questionInputElt.id = `reponse${i + 1}`;
        questionInputElt.name = `questions${index + 1}`;
        questionInputElt.value = i + 1;

        const questionLabelElt = document.createElement("label");
        questionLabelElt.htmlFor = `reponse${i + 1}`;
        questionLabelElt.innerText = element.option[i];

        divInputElt.append(questionInputElt, questionLabelElt);
        questionContainerElt.append(divInputElt);
        quizzFormElt.append(questionContainerElt);
    }
    
})

//Ajout d'évènement, au click on viens récupérer les données du formulaire.
quizzButtonElt.addEventListener('click', function(event) {
    const formData = new FormData(quizzFormElt);
    for(let pair of formData.entries()) {
        playerResults.push(parseInt(pair[1]));
    }
    console.log(playerResults);
    compareResults(playerResults);
});

//Fonction qui compare les résultats du joueur avec notre tableau de résultat.
function compareResults(results) {
    for(let i = 0; i < goodResults.length; i++) {
        if((results[i]) === goodResults[i]) {
            console.log("Bonne réponse !")
        }
        else {
            console.log("mauvaise réponse !")
        }
    }
}