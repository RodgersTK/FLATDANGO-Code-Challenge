//GET Request to get server running on backend
const getMyRequest = new Request('http://localhost:3000/films');
//capture all html IDs
const title = document.getElementById('title');
const runtime = document.getElementById('runtime');
const filmInfo = document.getElementById('film-info');
const showtime = document.getElementById('showtime');
const ticketNum = document.getElementById('ticket-num');
const buyTicket = document.getElementById('buy-ticket');
const poster = document.getElementById('poster');
const films = document.getElementById('films');
const subtitle = document.getElementById('subtitle');
const showing = document.getElementById('showing');
const body = document.getElementsByTagName('body')[0];

//after loading the html display the first movie
window.onload = () => {
  fetch(getMyRequest)
  .then((response) => response.json())
  .then((data) => {
    const firstMovie = data[0];
    //get the number of the remaining tickets
    let remainingTickets = firstMovie.capacity - firstMovie.tickets_sold;

    //manipulate the html with javascript by ids
      title.innerHTML = `${firstMovie.title}`;
			runtime.innerHTML = `${firstMovie.runtime}`;
			filmInfo.innerHTML = `${firstMovie.description}`;
			showtime.innerHTML = `${firstMovie.showtime}`;
			ticketNum.innerHTML = `${remainingTickets}`;
			buyTicket.innerHTML = 'Buy ticket';
			poster.src = `${firstMovie.poster}`;
    
    //the buy button event listener
      buyTicket.addEventListener('click', () => {
        if (remainingTickets > 0) {
          //deduct
          remainingTickets--;
          //dynamic display on the html
          ticketNum.innerHTML = `${remainingTickets}`;
        } else if (remainingTickets === 0) {
          //show a sold out on the button and dissable buy more tickets
          ticketNum.innerHTML = `${remainingTickets}`;
          buyTicket.innerHTML = `Sold Out!`;
        }
      });
      //remove the first movie
      films.innerHTML = '';
      //forEach to add other movies 
      data.forEach ((movie, index) => {
        //create a list to display all movies
        const li = document.createElement('li');
        //show the movie title dynamically
        li.innerHTML = `<b>${movie.title}</b>`;
        //append the new list to the films id on the html
        films.appendChild(li);
        //add a button to delete each movie
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'delete';
        //add class using javascript
        deleteButton.classList.add('ui', 'button');
        //add space style using js
        deleteButton.style.marginLeft = '5px';
        // append the new button on the HTML
				li.appendChild(deleteButton);
				// add cursor/color when one hovers over a movie, will use eventlistener for mouseover
				li.addEventListener('mouseover', () => {
					li.style.color = 'red';
					li.style.cursor = 'pointer';
      });
      // when one isn't hovering the movie name, return to default color
				li.addEventListener('mouseout', () => {
					li.style.color = 'black';
				});
				// delete button for each movie
				//only delete when user selects okay
				deleteButton.addEventListener('click', () => {
					// alert for user to confirm
					if (window.confirm('Are you sure you want to delete this movie?')) {
						// perform the deletion
						data.splice(index, 1);
						// Update the list and remove the movie
						films.removeChild(li);
					}
    });
    // when a user selects a certain movie, update the rest of the data e.g description accordingly and dynamically
    li.addEventListener('click', () => {
      remainingTickets = movie.capacity - movie.tickets_sold;
      title.innerHTML = `${movie.title}`;
      runtime.innerHTML = `${movie.runtime}`;
      filmInfo.innerHTML = `${movie.description}`;
      showtime.innerHTML = `${movie.showtime}`;
      ticketNum.innerHTML = `${remainingTickets}`;
      buyTicket.innerHTML = 'Buy ticket';
      poster.src = `${movie.poster}`;
    });
  });
  });
};