const btnNext = document.getElementById("btnNext");


btnNext.addEventListener('click', function() {
  questionURL = "https://jservice.io/api/random";
  fetch(questionURL).then(function(response) {
    response.json().then(function(data) {
      const answer = data[0].answer;
      const question = data[0].question;
      document.getElementById("question").innerHTML = question;
      document.getElementById("answer").innerHTML = answer;
    })
  })
})
