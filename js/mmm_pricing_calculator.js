const pricingData = {
    "Data Formatting": { price: 5000, type: 'boolean' },
    "Main KPI Model": { price: 12000, type: 'count' },
    "Additional KPI Model": { price: 5000, type: 'count' },
    "Supporting Model": { price: 3000, type: 'count' },
    "Campaign Level Reporting": { price: 1500, type: 'count' },
    "Creative Level Reporting": { price: 500, type: 'count' },
    "Channel Level Optimisation": { price: 4000, type: 'count' },
    "Campaign Level Optimisation": { price: 1500, type: 'count' },
    "Creative Level Optimisation": { price: 500, type: 'boolean' }
};

const formContainer = document.getElementById('pricingForm');

Object.keys(pricingData).forEach(item => {


    // Create label
    const inputContainer = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = item;
    inputContainer.appendChild(label);
    
    const price = document.createElement('span');
    price.textContent = '£' + pricingData[item].price.toLocaleString();
    inputContainer.appendChild(price);

    // Create input field based on type
    const input = document.createElement('input');
    input.id = item;

    if (pricingData[item].type === 'boolean') {
        input.type = 'checkbox';
    } else {
        input.type = 'number';
        input.min = '0';
        input.value = '0';
    }

    input.addEventListener('change', updateTotalPrice);
    inputContainer.appendChild(input);
    formContainer.appendChild(inputContainer);

});

function updateTotalPrice() {
    let total = 0;
    Object.keys(pricingData).forEach(item => {
        const inputElement = document.getElementById(item);
        let quantity;

        if (pricingData[item].type === 'boolean') {
            quantity = inputElement.checked ? 1 : 0;
        } else {
            quantity = parseInt(inputElement.value, 10) || 0;
        }

        total += quantity * pricingData[item].price;
    });
    document.getElementById('totalPrice').textContent = '£' + total.toLocaleString();
}
