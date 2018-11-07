
document.addEventListener('DOMContentLoaded', ()=>{
//global variables
let url = 'http://localhost:3000/quotes'
let quoteContainer = document.getElementById('quote-list')

//inital get request
fetch(url)
  .then(response => {
    return response.json()
  })
  .then((json) => renderQuotes(json))




  //function that shows each quote onto our page
  function renderQuotes(list){
    list.forEach((quote) => {
      quoteContainer.innerHTML += `<li class='quote-card' id='${quote.id}'>
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success' id='${quote.id}'>Likes: <span>${quote.likes}</span></button>
        <button class='btn-danger' id='${quote.id}'>Delete</button>
      </blockquote>
      </li>`
    })
  }


  //function to create new quote
  function postQuote(url){
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
      'Accepts': 'application/json'},
      body: JSON.stringify({
        quote: event.target[0].value,
        author: event.target[1].value,
        likes: 0
      })
    }).then((response) => {
      return response.json()
    }).then((json) => {
      quoteContainer.innerHTML += `<li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">${json.quote}</p>
        <footer class="blockquote-footer">${json.author}</footer>
        <br>
        <button class='btn-success' id='${json.id}'>Likes: <span>${json.likes}</span></button>
        <button class='btn-danger' id='${json.id}'>Delete</button>
      </blockquote>
      </li>`
    })
  }

  let form = document.getElementById('new-quote-form')
  form.addEventListener('submit', (event) =>{
    event.preventDefault()
    postQuote(url)
    event.target.reset()
  })


  quoteContainer.addEventListener('click', (event)=>{

  //delete a quote
  if(event.target.className === 'btn-danger'){
    deleteQuote(url, parseInt(event.target.id))

    event.target.parentElement.parentElement.remove()
  }


  function deleteQuote(url, eventId){
    fetch(url + '/' + eventId, {
      method: 'DELETE'
    })
  }





  //like a quote
  if(event.target.className === 'btn-success'){
    let likeCount = event.target.firstElementChild
    likeCount.innerHTML = parseInt(likeCount.innerHTML)+1
    // quoteId = parseInt(event.target.id)
    // console.log(quoteId)
    likeNum = parseInt(likeCount.innerHTML)
    likeQuote(url, parseInt(event.target.id))
  }
  })


  function likeQuote(url, eventId){
    fetch(url + '/' + eventId, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ likes: likeNum })
    })
  }







})//loader
