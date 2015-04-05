var ticketOverflow = {
  //so_tag: document.getElementById('tag-search').value, //'gcloud',
  //so_search_url: 'https://api.stackexchange.com/2.2/search/advanced?order=asc&sort=creation&answers=0&tagged=' + this.so_tag + '&site=stackoverflow',

  getQuestions: function() {
    var req = new XMLHttpRequest();
    var so_tag = document.getElementById('tag-search').value;
    var so_search_url = 'https://api.stackexchange.com/2.2/search/advanced?order=asc&sort=creation&answers=0&tagged=' + so_tag + '&site=stackoverflow'
    
    req.open("GET", so_search_url, true);
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
        var question_date = document.createElement('span');
        var question_link = document.createElement('a');
        var question_submit = document.createElement('button');

        question.id = 'q_' + questions.items[q].question_id;
        question_date.className = 'created-date';
        // SO API delivers epoch time in seconds, JS wants epoch time in milliseconds
        var created = new Date(questions.items[q].creation_date * 1000);
        question_date.innerHTML = (created.getMonth() + 1) + "/" + created.getDate() + "/" + created.getFullYear();
        question_link.href = questions.items[q].link;
        question_link.target = '_blank';
        question_link.innerHTML = questions.items[q].title;
        question_submit.innerHTML = 'Bump to First Class';
        //question_submit.setAttribute('onclick', 'ticketOverflow.submitQuestion(' + question_id + ')');

        question.appendChild(question_date);
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

//document.getElementById('tag-search-go').addEventListener('click', ticketOverflow.getQuestions(), false);

//document.getElementById('tag-search').addEventListener('keydown', function (ev) {
  //if (ev.keyCode === 13) {
    //alert('sup');
    //ticketOverflow.getQuestions();
  //}
//});

document.addEventListener('DOMContentLoaded', function () {
  ticketOverflow.getQuestions();

  document.getElementById('tag-search-go').addEventListener('click', function() { 
    //console.log('clicked');
    ticketOverflow.getQuestions();
  }, false);

  document.getElementById('tag-search').addEventListener('keydown', function (ev) {
    if (ev.keyCode === 13) {
      //alert('sup');
      ticketOverflow.getQuestions();
    }
  }, false);
});