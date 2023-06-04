// Importation des question du quizz
import question from "./question.js";

// Element du DOM
const quizzContainerElt = document.getElementsByClassName("question_container")[0];

//Création des questions/réponses du quizz de manière dynamique.
//On utilise la méthode forEach pour parcourir notre tableau "question".
question.forEach(function(element) {
    const questionContainerElt = document.createElement("div");
    const questionTitleElt = document.createElement("h2");
    questionTitleElt.innerText = element.question;
    const questionFormElt = document.createElement("form");

    questionContainerElt.append(questionTitleElt, questionFormElt);

    for(let i = 0; i < element.option.length; i++) {
        const questionInputElt = document.createElement("input");
        questionInputElt.type = "radio";
        questionInputElt.id = `reponse${i + 1}`;
        questionInputElt.value = element.option[i];
        console.log()

        const questionLabelElt = document.createElement("label");
        questionLabelElt.htmlFor = `reponse${i + 1}`;
        questionLabelElt.innerText = element.option[i]

        questionFormElt.append(questionInputElt, questionLabelElt);
    }
    quizzContainerElt.append(questionContainerElt);
})

