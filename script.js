const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertButton = document.getElementById("convertButton");
const resultDisplay = document.getElementById("result");
const swapButton = document.getElementById("swap");
const apiKey = "YOUR_API_KEY"

async function convertCurrency() {
    const amount = parseFloat(amountInput.value)

    if(isNaN(amount) || amount <= 0 ){
        resultDisplay.innerText = "Please Enter A Valid Amount"
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`

    try{
        const response = await fetch(url)
        const data = await response.json()

        if (data.conversion_rates[to]) {
            const rate = data.conversion_rates[to];
            const convertedAmount = (amount * rate).toFixed(2);
            resultDisplay.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
        } else {
            resultDisplay.innerText = "Conversion rate not available.";
        }

    } catch(error){
        resultDisplay.innerText = 'Error fetching exhange rates!'
        console.log(error)
    }
}

swapButton.addEventListener("click", () => {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
});

convertButton.addEventListener("click", convertCurrency);