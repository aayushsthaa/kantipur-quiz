fetch('../data/data.json')
    .then(response => response.json())
    .then(data => {
        const questions = data.questions;
        const questionElement = document.getElementById('question');
        const FirstChoice = document.getElementById('label-choice-1');
        const SecondChoice = document.getElementById('label-choice-2');
        const ThirdChoice = document.getElementById('label-choice-3');
        const FourthChoice = document.getElementById('label-choice-4');
        const choicesElement = [FirstChoice, SecondChoice, ThirdChoice, FourthChoice];
        const radioElements = [document.getElementById('choice-1'), document.getElementById('choice-2'), document.getElementById('choice-3'), document.getElementById('choice-4')]

        let currentQuestionIndex = 0;
        const answers = [];
        function displayQuestion() {
            if (currentQuestionIndex < questions.length) {
                const question = questions[currentQuestionIndex];
                setTimeout(() => {
                    questionElement.textContent = 'Q.' + (currentQuestionIndex + 1) + ' ' + question.question;
                    const choices = question.choices;
                    for (let i = 0; i < choices.length; i++) {
                        choicesElement[i].textContent = choices[i].label;
                    }
                }, 1000);  // 1 second delay
            } else {
                let total = 0;
                for (let i = 0; i < answers.length; i++) {
                    const answer = answers[i];
                    const question = questions[i];
                    for (const choice of question.choices) {
                        if (choice.label === answer) {
                            total += choice.value;
                            break;
                        }
                    }
                }
                gpa=total/questions.length;
                localStorage.setItem('gpa', parseFloat(gpa).toFixed(2));
                window.location.href = './congratulations.html';

            }
        }

        for (const choice of choicesElement) {
            choice.addEventListener('click', e => {
                answers.push(choice.textContent);
                console.log(answers);
                currentQuestionIndex++;
                clearRadioButtons()
                displayQuestion();
            });
        }
        function clearRadioButtons() {
            for (let i = 0; i < radioElements.length; i++) {
                radioElements[i].addEventListener('change', () => {
                    setTimeout(() => {
                        if (radioElements[i].checked) {
                            radioElements.forEach(a => a.checked = false);
                        }
                    }, 1000);
                });
            }
        }
        displayQuestion();
    })



