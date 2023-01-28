/* All answer options   */
const option1 = document.querySelector('.option1'),
   option2 = document.querySelector('.option2'),
   option3 = document.querySelector('.option3'),
   option4 = document.querySelector('.option4');

/* All our options */


const optionElemets = document.querySelectorAll('.option');

const question = document.getElementById('question'); // question


const numberOfquestion = document.getElementById('number-of-question'), // number question
   numberOfAllQuestions = document.getElementById('number-of-all-questions') // number of all question

let indexOf, // index question
   indexOfPage = 0; // index page


const answersTracker = document.getElementById('answers-tracker'); // wrap for tracker 

const btnNext = document.getElementById('btn-next'); // Next button

let score = 0; // the final results of the quiz

const correctAnswer = document.getElementById('correct-answer'),
   numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
   btnTryAgain = document.getElementById('btn-try-again');

const questions = [
   {
      question: 'Как в javascript вывести процент от числа ?',
      options: [
         'Нельзя делать ',
         'Оператор : %',
         'Умножить на количество %',
         'Вызвать метод findPrecent()',
      ],
      rightAnswer: 2
   },
   {
      question: 'Сколько будет: 13 + "7"',
      options: [
         '20',
         '137',
         'undefined',
         'error',
      ],
      rightAnswer: 2
   },
   {
      question: 'На javascript нельзя писать ',
      options: [
         'Игры',
         'Скрипты для сайтов ',
         'Десктопные приложения ',
         'Ничего',
      ],
      rightAnswer: 3
   }
];

numberOfAllQuestions.innerHTML = questions.length; //Выводим количество вопросов 

const load = () => {
   question.innerHTML = questions[indexOfQuestion].question; //главный вопрос 

   //ищем ответы 
   option1.innerHTML = questions[indexOfQuestion].options[0];
   option2.innerHTML = questions[indexOfQuestion].options[1];
   option3.innerHTML = questions[indexOfQuestion].options[2];
   option4.innerHTML = questions[indexOfQuestion].options[3];

   numberOfquestion.innerHTML = indexOfPage + 1;
   indexOfPage++; //увеличиваем индекс старницы 

}

const completeAnswers = [];// Массив  для заданых вопросов 

const randomQuestion = () => {
   let randomNumber = Math.floor(Math.random() * questions.length);
   let hitDuplicate = false;  //  для проверки одинаковых вопросов 
   if (indexOfPage == questions.length) {
      quizOver()
   } else {
      if (completeAnswers.length > 0) {
         completeAnswers.forEach(item => {
            if (item == randomNumber) {
               hitDuplicate = true;
            }
         });
         if (hitDuplicate) {
            randomQuestion();
         } else {
            indexOfQuestion = randomNumber;
            load();
         }
      }
      if (completeAnswers.length == 0) {
         indexOfQuestion = randomNumber;
         load()
      }
   }

   completeAnswers.push(indexOfQuestion);
}

const checkAnswer = el => {
   if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
      el.target.classList.add('correct');
      updateAnswerTracker('correct');
      score++
   } else {
      el.target.classList.add('wrong');
      updateAnswerTracker('wrong');
   }
   disabledOptions();

}


for (option of optionElemets) {
   option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
   optionElemets.forEach(item => {
      item.classList.add('disabled')
      if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
         item.classList.add('correct')
      }
   })
}


// Удаления всех классов со всех ответов

const enableOptions = () => {
   optionElemets.forEach(item => {
      item.classList.remove('disabled', 'correct', 'wrong');
   })
}

const updateAnswerTracker = status => {
   answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}


const validate = () => {
   if (!optionElemets[0].classList.contains('disabled')) {
      alert('Вам нужно выбрать один из вариантов ответа');
   } else {
      randomQuestion();
      enableOptions();
   }

}

const answerTracker = () => {
   questions.forEach(() => {
      const div = document.createElement('div');
      answersTracker.appendChild(div);

   })
}

const quizOver = () => {
   document.querySelector('.quiz-over-modal').classList.add('active');
   correctAnswer.innerHTML = score;
   numberOfAllQuestions2.innerHTML = questions.length;

};



const tryAgain = () => {
   window.location.reload();

};

btnTryAgain.addEventListener('click', tryAgain)

btnNext.addEventListener('click', () => {
   validate();
})

window.addEventListener('load', () => {
   randomQuestion();
   answerTracker();
})





