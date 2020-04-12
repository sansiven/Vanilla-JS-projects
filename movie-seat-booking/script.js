const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
//changing to integer either using parse int or + sign at fromt
//const ticketPrice = parseInt(movieSelect.value);
let ticketPrice = +movieSelect.value;

//console.log( ticketPrice)
//console.log(typeof ticketPrice)

populateUI();

setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //Copy selected seats into arr
    //Map through array
    //return a new array index
    
    const seatsIndex = [...selectedSeats].map((seat)=>[...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount*ticketPrice
    console.log(selectedSeatsCount)
}

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
    }

    
}

//movie select event
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

//seat click event
container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
    
        updateSelectedCount();
    }
})

updateSelectedCount()