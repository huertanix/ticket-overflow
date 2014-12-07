var ticketOverflow = {
  so_search_url: 'https://api.stackexchange.com/2.2/search/advanced?order=asc&sort=creation&answers=0&tagged=gcloud&site=stackoverflow',

  getQuestions: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.so_search_url, true);
    req.onload = this.showQuestionList.bind(this);
    req.send(null);
  },

  clearQuestionList: function() {
    var question_list = document.getElementById('question-list');
    
    while (question_list.hasChildNodes()) {
      question_list.removeChild(question_list.lastChild);
    }
  },

  showQuestionList: function(e) {
    this.clearQuestionList();

    var questions = JSON.parse(e.target.responseText);
    var question_list = document.getElementById('question-list');

    if (Object.keys(questions.items).length > 0) {
      //for (var i = 0; i < questions.items.length; i++) {
      for(var q in questions.items) {
        var question = document.createElement('li');
        var question_link = document.createElement('a');
        var question_submit = document.createElement('button');

        question.id = 'q_' + q["question_id"];
        question_link.href = q["link"];
        question_link.innerHTML = q["title"];
        question_submit.innerHTML = 'Bump to First Class';
        ////question_submit.setAttribute('onclick', this.submitQuestion(question_id));

        question.appendChild(question_link);
        question.appendChild(question_submit);
        question_list.appendChild(question);
      }
    }
    else {
      var no_questions = document.createElement('li');

      no_questions.innerHTML = 'No unanswered questions found.';

      document.getElementById('question-list').appendChild(no_questions);
    }
  },

  submitQuestion: function(question_id) {
    // Do a post to Google Support somehow--need support form markup dump for this
    alert('Question ' + question_id + ' sent to the googles');
    //var submitted_questions[] = JSON.parse(localStorage.setItem('submitted_questions'));
    //submitted_questions.push(question_id);
    //localStorage.setItem('submitted_questions', JSON.stringify(submitted_questions));
  },
};

document.addEventListener('DOMContentLoaded', function () {
  ticketOverflow.getQuestions();
});