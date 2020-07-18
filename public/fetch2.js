
var i ;
var mode = "random";
questionCounter = 1;

const scoreBtn = document.getElementsByClassName("select_score");

const len = scoreBtn.length;

var firstClickStart = true;

var answer;
var question;

var totalQuestions  = [];

// var clicked = [];
// for (i = 0; i < len; i++) {
//   clicked.push(false);
// }


function Btn (button, didClick) {
  this.button = button;
  this.didClick = didClick;
}

btnArr = [];
for (i = 0; i < len; i++) {
  var newBtn = new Btn(scoreBtn[i], false);
  btnArr.push(newBtn);
}



for (i = 0; i < len; i++) {
  (function (i) {

    scoreBtn[i].addEventListener('click', function() {

      var parsed = (Number(this.innerHTML) - 100) / 100;

      btnArr[parsed].didClick = ! btnArr[parsed].didClick; //make this an object
      //alert(btnArr[parsed].didClick);
      // alert(totalQuestions.length);
      //scoreBtn[i].innerHTML = clicked[i];
      if (btnArr[parsed].didClick) {
        this.classList.add("clicked_select");
        this.classList.remove("default");
      } else {
        this.classList.remove("clicked_select");
        this.classList.add("default");
      }

    })
   })(i);

  // scoreBtn[i].addEventListener('click', function() {
  //
  //   var parsed = (Number(this.innerHTML) - 100) / 100;
  //
  //   btnArr[parsed].didClick = ! btnArr[parsed].didClick; //make this an object
  //   //alert(btnArr[parsed].didClick);
  //   // alert(totalQuestions.length);
  //   //scoreBtn[i].innerHTML = clicked[i];
  // })
}


const selfChosen = document.getElementById("selfChose");


function toggleDisplay() {
  document.getElementById("content").classList.toggle("popup");
  document.querySelector(".menu").classList.toggle("hide");
  document.getElementById("start").classList.add("hid");
}

function myFunction() {

  mode = "mark";

  baseURL = "https://jservice.io/api/clues";

  for (i = 0; i < len; i++) {
   if (i == 6 || i == 8) {
     continue;
   }


    if (btnArr[i].didClick === true) { //auto-refreshes javascript

      newURL = baseURL + "?value=" + (100 * (i + 1)).toString();


      fetch(newURL).then(function(response) {
        response.json().then(function(data) {
          //alert(data.length);
          totalQuestions = totalQuestions.concat(data);
          // alert(data[0].question);
          // alert(totalQuestions.length);
        })
      })
    }
  }
  //document.getElementById("form1").submit();

}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function loadChosenQuestion(questionBank) {
  var len = questionBank.length;
  var number = Math.floor(Math.random() * len);

  answer = questionBank[number].answer;
  question = questionBank[number].question;
  document.getElementById("question").innerHTML = question;
  document.getElementById("answer").innerHTML = answer;

}

// function loadChosenQuestion(questionBank) {
//   answer = totalQuestions[questionCounter].answer;
//   question = totalQuestions[questionCounter].question;
//   document.getElementById("question").innerHTML = question;
//   document.getElementById("answer").innerHTML = answer;
//   questionCounter += 1;
//   // alert(questionCounter);
//   if (questionCounter === totalQuestions.length - 1) {
//     alert("all questions answered");
//   }
// }


function getRandomQuestion() {
  questionURL = "https://jservice.io/api/random";
  fetch(questionURL).then(function(response) {
    response.json().then(function(data) {
      answer = data[0].answer;
      question = data[0].question;
      document.getElementById("question").innerHTML = question;
      temp_answer = document.getElementById("answer");
      temp_answer.innerHTML =  answer;
    })
  })

}



selfChosen.addEventListener('click', function() {
  myFunction();




  document.getElementById("start").classList.remove("hid");




})

const startBtn = document.getElementById("start");

startBtn.addEventListener('click', function() {
  if (mode === "random") {
    getRandomQuestion();
    while (question === "") {
      getRandomQuestion();
    }
    toggleDisplay();
    document.getElementById("select_type").classList.remove("invisible");
    document.getElementById("trivia_title").classList.remove("middle_title");
    document.getElementById("answer").classList.add("answer_class");
    document.getElementById("surround").classList.add("answer_class");
  } else {
    loadChosenQuestion(totalQuestions);
    toggleDisplay();
    document.getElementById("select_type").classList.remove("invisible");
    document.getElementById("trivia_title").classList.remove("middle_title");
    document.getElementById("answer").classList.add("answer_class");
    document.getElementById("surround").classList.add("answer_class");
  }

})



randomStart = document.getElementById("start_random");
randomStart.addEventListener('click', function() {
  mode = "random";
  document.getElementById("start").classList.remove("hid");
})




// on the game.html page



const btnNext = document.getElementById("btnNext");


btnNext.addEventListener('click', function() {

  if (mode === "random") {
    getRandomQuestion();



  } else if (mode === "mark") {
    loadChosenQuestion(totalQuestions);

  }

  document.getElementById("correctness").innerHTML = "";
  document.getElementById("user_input").value= "";
  document.getElementById("answer").classList.add("answer_class");
  document.getElementById("surround").classList.add("answer_class");

})

selectBtn = document.getElementById("select_type");
selectBtn.addEventListener('click', toggleDisplay);

input = document.getElementById("submit");
input.addEventListener('click', function() {
  value = document.getElementById("user_input").value;
  if (value.toLowerCase() === answer.toLowerCase()) {
    document.getElementById("correctness").innerHTML = "Your Answer is Correct!"
  } else if (answer.toLowerCase().includes(value.toLowerCase()) && value.length != 0) {
    document.getElementById("correctness").innerHTML = "Your Answer might be in a different format than the correct answer. Click " + '"Check Answer" to manually check for correctness';
  } else {
    document.getElementById("correctness").innerHTML = "Your answer is incorrect";
  }
})

show = document.getElementById("show");
show.addEventListener('click', function() {
  document.getElementById("answer").classList.remove("answer_class");
  document.getElementById("surround").classList.remove("answer_class");
})

inputField = document.getElementById("user_input");

inputField.addEventListener("keydown", function(event) {
  if (event.key === "Backspace") {
    document.getElementById("correctness").innerHTML = "";
  }
})

// difficulty buttons
