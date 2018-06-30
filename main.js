const currecies_url = "https://free.currencyconverterapi.com/api/v5/currencies";
const rates_url = "https://free.currencyconverterapi.com/api/v3/convert?q=IRR_JMD&compact=ultra";

function getRates(currency_from, currency_to) {
    return {
        "EUR_BBD": 2.338076,
        "BTN_BND": 0.019614,
        "BTN_BND": 0.019614,
        "XAF_CUP": 0.047248,
        "USD_FKP": 0.757204,
        "GIP_HUF": 371.707575,
        "IRR_JMD": 0.003013,
    };
}

function getCurrencies() {
    return {
        "ALL": { "currencyName": "Albanian Lek", "currencySymbol": "Lek", "id": "ALL" }, 
        "XCD": { "currencyName": "East Caribbean Dollar", "currencySymbol": "$", "id": "XCD" }, 
        "EUR": { "currencyName": "Euro", "currencySymbol": "€", "id": "EUR" }, 
        "BBD": { "currencyName": "Barbadian Dollar", "currencySymbol": "$", "id": "BBD" }, 
        "BTN": { "currencyName": "Bhutanese Ngultrum", "id": "BTN" }, 
        "BND": { "currencyName": "Brunei Dollar", "currencySymbol": "$", "id": "BND" }, 
        "XAF": { "currencyName": "Central African CFA Franc", "id": "XAF" }, 
        "CUP": { "currencyName": "Cuban Peso", "currencySymbol": "$", "id": "CUP" }, 
        "USD": { "currencyName": "United States Dollar", "currencySymbol": "$", "id": "USD" }, 
        "FKP": { "currencyName": "Falkland Islands Pound", "currencySymbol": "£", "id": "FKP" }, 
        "GIP": { "currencyName": "Gibraltar Pound", "currencySymbol": "£", "id": "GIP" }, 
        "HUF": { "currencyName": "Hungarian Forint", "currencySymbol": "Ft", "id": "HUF" }, 
        "IRR": { "currencyName": "Iranian Rial", "currencySymbol": "﷼", "id": "IRR" }, 
        "JMD": { "currencyName": "Jamaican Dollar", "currencySymbol": "J$", "id": "JMD" },
        "AUD": { "currencyName": "Australian Dollar", "currencySymbol": "$", "id": "AUD" },
    };
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

function deleteChildren(elem) {
    const children = elem.getElementsByClassName('dynamic');
    Object.entries(children).forEach(
        ([_, child]) => child.parentNode.removeChild(child)
    );
}

function renderSelect(select_element, value_dict) {
    deleteChildren(select_element);

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

document.body.onload = function() {
    const conversion_form = document.getElementById('conversion_form');

    const amount_from = document.getElementById('amount_from');
    const currency_from = document.getElementById('currency_from');

    const amount_to = document.getElementById('amount_to');
    const currency_to = document.getElementById('currency_to');

    const currencies = getCurrencies();

    renderSelect(currency_from, currencies);
    renderSelect(currency_to, currencies);

    amount_from.value = 100;
    currency_from.value = "EUR";
    
    conversion_form.addEventListener('submit',
    (e) => {
            let money_from = {
                currency: currency_from.value,
                amount: amount_from.value
            };
            
            let money_to = {
                currency: currency_to.value,
                amount: amount_to.value
            };

            const conversion_rate = getRates(money_from.currency, money_to.currency);

            money_to = convert(money_from, money_to.currency, conversion_rate);

            renderResult(amount_to, money_to);

            e.preventDefault();
        }
    );
};