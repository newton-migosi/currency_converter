const NAMES  = {
    'USD': "United State Dollars",
    'KES': "Kenyan Shillings",
    'USH': "Ugandan Shillings",
    'RSA': "South African Rand",
    'TSH': "Tanzanian Shillings"
}

const RATES = {
    'USD': 1,
    'KES': 100,
    'USH': 3000,
    'TSH': 2000,
    'RSA': 5
}

function convert(rates = RATES){
    const money = {
        currency: document.getElementById('currency').value,
        amount: parseFloat(document.getElementById('amount').value)
    }

    const factor = money.amount / rates[money.currency];

    return Object.entries(rates).map(
        ([currency,amount]) => [currency, amount*factor]
    );

}

function createRow(currency, amount) {
    let row = document.createElement('tr');
    row.className = "curr";

    let curr = document.createElement('th');
    curr.scope = "row";
    curr.innerHTML = currency;

    let amount_elem = document.createElement('td');
    amount_elem.innerHTML = amount;

    let name = document.createElement('td');
    name.innerHTML = NAMES[currency];

    row.innerHTML = curr.outerHTML + amount_elem.outerHTML + name.outerHTML;

    return row;
}

function clearTable(table) {
    const rows = table.getElementsByClassName('curr');
    Object.entries(rows).forEach(
        ([_, row]) => row.parentNode.removeChild(row)
    );
}

function render(currencies) {
    const table = document.getElementById('converted');
    
    clearTable(table);
    
    currencies.forEach(
        ([currency, amount]) => {
            const row = createRow(currency, amount);
            table.appendChild(row);
        }
    );
}

document.getElementById('convert_from')
        .addEventListener('submit', 
            (e) => {
                const converted = convert();
                render(converted); 
                e.preventDefault();
            }
        );