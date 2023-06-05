// Importation des question du quizz
import question from "./question.js";

// Element du DOM
const quizzContainerElt = document.getElementsByClassName("question_container")[0];

//Création des questions/réponses du quizz de manière dynamique.
//On utilise la méthode forEach pour parcourir notre tableau "question".
question.forEach(function(element) {
    const questionContainerElt = document.createElement("div");
    questionContainerElt.className = "question";
    const questionTitleElt = document.createElement("h2");
    questionTitleElt.innerText = element.question;
    const questionFormElt = document.createElement("form");
    questionFormElt.className = "form_quizz";

    questionContainerElt.append(questionTitleElt, questionFormElt);

    for(let i = 0; i < element.option.length; i++) {
        const divInputElt = document.createElement("div");

        const questionInputElt = document.createElement("input");
        questionInputElt.type = "radio";
        questionInputElt.id = `reponse${i + 1}`;
        questionInputElt.value = element.option[i];

        const questionLabelElt = document.createElement("label");
        questionLabelElt.htmlFor = `reponse${i + 1}`;
        questionLabelElt.innerText = element.option[i]

        divInputElt.append(questionInputElt, questionLabelElt);
        questionFormElt.append(divInputElt);
    }
    quizzContainerElt.append(questionContainerElt);
})

