const NAMES = {
    'USD': "United State Dollars",
    'KES': "Kenyan Shillings",
    'USH': "Ugandan Shillings",
    'RSA': "South African Rand",
    'TSH': "Tanzanian Shillings",
    'EUR': "Euro"
};

const RATES = {
    'USD': 1,
    'KES': 100,
    'USH': 3000,
    'TSH': 2000,
    'RSA': 5,
    'EUR': 0.86
};

function convert(money, rates) {
    const factor = money.amount / rates[money.currency];

    return Object.entries(rates).map(
        ([currency, amount]) => [currency, amount * factor]
    );
}

function createRow(currency, amount, currency_names = NAMES) {
    let row = document.createElement('tr');
    row.className = "dynamic";

    let curr = document.createElement('th');
    curr.scope = "row";
    curr.innerHTML = currency;

    let amount_elem = document.createElement('td');
    amount_elem.innerHTML = amount;

    let name = document.createElement('td');
    name.innerHTML = currency_names[currency];

    row.innerHTML = curr.outerHTML + amount_elem.outerHTML + name.outerHTML;

    return row;
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
        ([value, content]) => {
            const option = createOption(value, content);
            select_element.appendChild(option);
        }
    );
}

function renderTable(table_element, rows_content) {
    deleteChildren(table_element);

    rows_content.forEach(
        ([currency, amount]) => {
            const row = createRow(currency, amount);
            table_element.appendChild(row);
        }
    );
}

function renderTableCaption(table_element, label, value) {
    table_element.getElementsByTagName("caption")[0].innerHTML = `${value} ${label} is equivalent to...`;

}

document.body.onload = function() {
    const currency_form = document.getElementById('convert_from');
    const amount_input = document.getElementById('amount');
    const currency_selector = document.getElementById('currency');
    const results_table = document.getElementById('converted');

    renderSelect(currency_selector, NAMES);

    amount_input.value = 100;
    currency_selector.value = "KES";

    let money = {
        amount: parseFloat(amount_input.value),
        currency: currency_selector.value
    };

    let converted = convert(money, RATES);

    renderTable(results_table, converted);
    renderTableCaption(results_table, money.currency, money.amount);

    currency_form.addEventListener('submit',
        (e) => {
            let money = {
                amount: parseFloat(amount_input.value),
                currency: currency_selector.value
            };

            let converted = convert(money, RATES);

            renderTable(results_table, converted);
            renderTableCaption(results_table, money.currency, money.amount);

            e.preventDefault();
        }
    );
}