let questions = [];

function showPage(id) {
  document.querySelectorAll(".page").forEach(page => page.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function showAskForm() {
  showPage("ask-form");
}

function submitQuestion() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const tags = document.getElementById("tags").value.split(',').map(t => t.trim());

  const question = {
    id: questions.length + 1,
    title,
    description,
    tags,
    answers: []
  };

  questions.push(question);
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("tags").value = "";

  renderQuestions();
}

function renderQuestions() {
  const container = document.getElementById("question-list");
  container.innerHTML = "<h2>All Questions</h2>";

  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3 onclick="viewQuestion(${q.id})" style="cursor:pointer">${q.title}</h3>
                     <p>Tags: ${q.tags.join(', ')}</p>`;
    container.appendChild(div);
  });

  showPage("question-list");
}

function viewQuestion(id) {
  const question = questions.find(q => q.id === id);
  const container = document.getElementById("question-detail");

  let answerHtml = "";
  question.answers.forEach((a, i) => {
    answerHtml += `<div class="card">
      <p>${a.text}</p>
      <div class="vote-buttons">
        <button onclick="vote(${id}, ${i}, 1)">Upvote</button>
        <span>${a.votes} votes</span>
        <button onclick="vote(${id}, ${i}, -1)">Downvote</button>
      </div>
    </div>`;
  });

  container.innerHTML = `
    <div class="card">
      <h2>${question.title}</h2>
      <p>${question.description}</p>
      <p><small>Tags: ${question.tags.join(', ')}</small></p>
    </div>
    <h3>Answers</h3>
    ${answerHtml}
    <h3>Your Answer</h3>
    <textarea id="answerText" placeholder="Type your answer here..."></textarea>
    <button onclick="submitAnswer(${id})">Submit Answer</button>
  `;

  showPage("question-detail");
}

function submitAnswer(questionId) {
  const text = document.getElementById("answerText").value;
  if (!text.trim()) return;

  const question = questions.find(q => q.id === questionId);
  question.answers.push({ text, votes: 0 });
  viewQuestion(questionId);
}

function vote(questionId, answerIndex, delta) {
  const question = questions.find(q => q.id === questionId);
  question.answers[answerIndex].votes += delta;
  viewQuestion(questionId);
}

renderQuestions();
