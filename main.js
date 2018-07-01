const CURRENCIES_URL = "https://free.currencyconverterapi.com/api/v5/currencies";
const RATES_URL = "https://free.currencyconverterapi.com/api/v3/convert?compact=ultra";

function getRates(rates_url, currency_from, currency_to) {
    const convert_url = `${rates_url}&q=${currency_from}_${currency_to}`;
    return fetch(convert_url)
        .then(response => response.json());
}

function getCurrencies(currencies_url) {
    return fetch(currencies_url)
        .then(response => response.json());
}

function convert(money, target_currency, rates) {
    const index = `${money.currency}_${target_currency}`;
    return { amount: money.amount * rates[index], currency: target_currency };
}

function createOption(value, text) {
    const option = document.createElement('option');

    option.className = "dynamic";
    option.value = value;
    option.innerHTML = text;

    return option;
}

function deleteChildrenByClass(elem, className) {
    const children = elem.getElementsByClassName(className);
    Object.entries(children).forEach(
        ([_, child]) => child.parentNode.removeChild(child)
    );
}

function renderSelect(select_element, value_dict) {
    deleteChildrenByClass(select_element, 'dynamic');

    Object.entries(value_dict).forEach(
        ([_, details]) => {
            const option = createOption(details.id, details.currencyName);
            select_element.appendChild(option);
        }
    );
}

function renderResult(display_element, value_dict) {
    display_element.value = value_dict.amount;
}

function registerServiceWorker(){
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}

document.body.onload = function() {
    const conversion_form = document.getElementById('conversion_form');

    const currency_from = document.getElementById('currency_from');
    const amount_from = document.getElementById('amount_from');

    const currency_to = document.getElementById('currency_to');
    const amount_to = document.getElementById('amount_to');

    registerServiceWorker();

    getCurrencies(CURRENCIES_URL).then(currencies => {
        renderSelect(currency_from, currencies.results);
        renderSelect(currency_to, currencies.results);
    });

    conversion_form.addEventListener('submit', e => {
            let money_from = {
                currency: currency_from.value,
                amount: amount_from.value
            };
            
            let money_to = {
                currency: currency_to.value,
                amount: amount_to.value
            };

            getRates(RATES_URL, money_from.currency, money_to.currency).then(conversion_rate => {
                money_to = convert(money_from, money_to.currency, conversion_rate);
                renderResult(amount_to, money_to);
            });

            e.preventDefault();
        }
    );
};