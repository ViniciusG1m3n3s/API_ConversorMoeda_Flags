const form = document.getElementById('converterForm')
const amount = document.getElementById('amount')
const fromCurrency = document.getElementById('fromCurrency')
const convertedAmount = document.getElementById('convertedAmount')
const toCurrency = document.getElementById('toCurrency')
const loading = document.querySelector('.loading') // No Query Selector, precisamos colocar um "." para sinalizar caso seja uma class ou "#" caso seja um id.
const result = document.querySelector('.result')
const error = document.querySelector('.error')
const API_URL = "https://v6.exchangerate-api.com/v6/76c4f463b44f3cf1186f3b3e/latest/"
const FLAG_API_URL = "https://api.api-ninjas.com/v1/countryflag?country="
const FLAG_API_KEY = "EI8A16rG6SW0lKYsCfCI1w==v1li7b5lisN3V4ro"
async function convertCurrency() {
    loading.style.display = "block"

    try {
        const response = await fetch(API_URL + fromCurrency.value)
        const data = await response.json()

        const rate = data.conversion_rates[toCurrency.value]
        const convertedValue = (amount.value * rate).toFixed(2)

        convertedAmount.value = convertedValue 

        const FLAGS_MAP = {
            USD: "US",
            EUR: "EU",
            BRL: "BR",
            GBP: "GB",
            JPY: "JP",
            CAD: "CA",
            AUD: "AU",
            CHF: "CH",
            CNY: "CN",
            ARS: "AR"
        }

        const fromFlag = FLAGS_MAP[fromCurrency.value]
        const toFlag = FLAGS_MAP[toCurrency.value]

        const response_flag = await fetch(FLAG_API_URL + fromFlag, {
            headers: {
                'X-Api-Key': FLAG_API_KEY
            }
        })

        const data_flag = await response_flag.json()

        const response_flag_to = await fetch(FLAG_API_URL + toFlag, {
            headers: {
                'X-Api-Key': FLAG_API_KEY
            }
        })
        const data_flag_to = await response_flag_to.json()

        console.log(data_flag)

        document.querySelector('.converter-btn').classList.add('hidden')
        document.querySelector('.reset-btn').classList.remove('hidden')
        document.querySelector('.result').classList.remove('hidden')
        document.querySelector('.amount-value').textContent = amount.value
        document.querySelector('.from-currency').textContent = fromCurrency.value
        document.querySelector('.flagFrom').style.background = `url(${data_flag.square_image_url})`;
        document.querySelector('.flagTo').style.background = `url(${data_flag_to.square_image_url})`;
        document.querySelector('.amount-converted').textContent = convertedValue
        document.querySelector('.to-currency').textContent = toCurrency.value
        document.querySelector('.convertion-rate p').textContent = 
            `Taxa: 1 ${fromCurrency.value} = ${rate.toFixed(2)} ${toCurrency.value}`

        loading.style.display = "none"
    }
    //Catch -> Se der algum erro, ele pula para o catch
    catch (error){
        console.log(error)
        document.querySelector('.error').classList.remove('hidden')
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault()
    convertCurrency()
})

document.querySelector('.reset-btn').addEventListener('click', function() {
    window.location.reload()
})
