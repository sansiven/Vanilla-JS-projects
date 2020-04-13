const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap');

const API_key = 'e056be653efa983932897cb3'

const url = "https://prime.exchangerate-api.com/v5/e056be653efa983932897cb3/latest/USD"

const calculate = () => {
    let currency_one = currencyEl_one.value;
    let currency_two = currencyEl_two.value;
    console.log(currency_one, currency_two);

    fetch(`https://prime.exchangerate-api.com/v5/e056be653efa983932897cb3/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        //console.log(data.conversion_rates)
        const rate = data.conversion_rates[currency_two]
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`

        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
}

//event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate)

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})


calculate();