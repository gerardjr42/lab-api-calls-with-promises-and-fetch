const BASE_URL = "https://opentdb.com/api.php?amount=10";
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getTriviaData();
});

function getTriviaData() {
  fetch(BASE_URL)
    .then((response) => response.json())
    //destructure the array from our JSON object
    .then(({ results }) => displayTrivia(results))
    .catch(() => console.error("There was an issue loading data"));
};

//HTML entities function to convert symbols to it's char equivalent
function HtmlEncode(s) {
  var txt = document.createElement("textarea");
    txt.innerHTML = s;
    return txt.value;
}

function displayTrivia(response) {
  const trivia = response;
  //In here we need to loop through every object
  for (let i=0; i < trivia.length; i++) {       
    const article = document.createElement("article");
    article.classList.add("card")
    
    const h2 = document.createElement("h2");
    h2.innerText = `${HtmlEncode(trivia[i].category)}`
    
    const p = document.createElement("p");
    p.innerText = `${HtmlEncode(trivia[i].question)}`
    
    const button = document.createElement("button");
    button.innerText = "Show Answer"
    
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const answer = document.createElement("p");
      // answer.classList.add("hidden")
      answer.innerText = `${trivia[i].correct_answer}`
      
      article.append(answer);
    })
    
    article.append(h2, p, button);
    document.querySelector("main").append(article);
  }
};


