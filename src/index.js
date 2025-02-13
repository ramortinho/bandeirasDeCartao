function luhnCheck(cardNumber) {
    const digits = cardNumber.split('').map(Number);
    const sum = digits.reduce((acc, digit, index) => {
        let value = digit;
        if ((digits.length - index) % 2 === 0) {
            value *= 2;
            if (value > 9) {
                value -= 9;
            }
        }
        return acc + value;
    }, 0);
    return sum % 10 === 0;
}

function getCardIssuer(cardNumber) {
    const cardPatterns = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,        
        MasterCard: /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{2}|[3-6][0-9]{3}|7[01][0-9]{2}|720[0-9])[0-9]{12})$/,
        AmericanExpress: /^3[47][0-9]{13}$/,
        Discover: /^(6011|65|64[4-9])[0-9]{12,15}$/,
        Hipercard: /^6062[0-9]{12}$/,
        JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
        Diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        EnRoute: /^(2014|2149)[0-9]{11}$/,
        Voyager: /^8699[0-9]{11}$/,
        Aura: /^50[0-9]{14,17}$/
    };

    for (const brand in cardPatterns) {
        if (cardPatterns[brand].test(cardNumber)) {
            return brand;
        }
    }
    return 'Unknown';
}

function validateCard(inputId) {
    const cardNumber = document.getElementById(inputId).value.replace(/\s+/g, '');
    const cardIssuer = getCardIssuer(cardNumber);
    const isValidIssuer = cardIssuer !== 'Unknown';
    const isValidLuhn = luhnCheck(cardNumber);
    const isValid = isValidIssuer && isValidLuhn;
    document.getElementById('result').innerText = `Card Issuer: ${cardIssuer}, Valid: ${isValid}`;
}

function clearResult() {
    document.getElementById('result').innerText = '';
}

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', clearResult);
});

