const main = document.getElementById('main');
const addUserBtn = document.getElementById('add_user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show_millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate_wealth');


let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


//fetch random user and add money 
async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
} 

//add new object to data arr
const addData = (obj) => {
    data.push(obj);

    updateDom();
}

//Update Dom 
const updateDom = (providedData = data) => {
    //clear the main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
    providedData.forEach((person) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong>${formatMoney(person.money)}`;
        main.appendChild(element)
    })
}

//format number as money 
const formatMoney = (money) => {
    //(12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
    return '$' + (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const doubleMoney = () => {
    console.log('double Money')
    data = data.map((user) => {
        return {...user, money: user.money*2};
    })

    updateDom(); 
}

const sortByRichest = () => {
    console.log('sort')
    data.sort((a,b)=>{
        return(b.money - a.money)
    })

    updateDom();
}


const filterMillionaires = () => {
    console.log('filters')
    data = data.filter((person) => {
        return person.money > 1000000 
    });

    updateDom();
}

const calculateWealth = () => {
    const total = data.reduce((acc, person) => (
        acc += person.money
    ),0)

    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(wealthElement)
}

//eventlisteners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', filterMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);