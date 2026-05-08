const output = document.getElementById('password-output');
const lengthRange = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const lowercaseCheckbox = document.getElementById('lowercase');
const uppercaseCheckbox = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');

const characterSets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?'
};

function getSelectedCharacters() {
    let chars = '';
    if (lowercaseCheckbox.checked) chars += characterSets.lowercase;
    if (uppercaseCheckbox.checked) chars += characterSets.uppercase;
    if (numbersCheckbox.checked) chars += characterSets.numbers;
    if (symbolsCheckbox.checked) chars += characterSets.symbols;
    return chars;
}

function generatePassword(length) {
    const characters = getSelectedCharacters();
    if (!characters) return '';

    let password = '';
    const cryptoObj = window.crypto || window.msCrypto;
    const randomValues = new Uint32Array(length);
    cryptoObj.getRandomValues(randomValues);

    for (let i = 0; i < length; i += 1) {
        const index = randomValues[i] % characters.length;
        password += characters.charAt(index);
    }

    return password;
}

function updateLengthLabel() {
    lengthValue.textContent = lengthRange.value;
}

function refreshPassword() {
    const length = Number(lengthRange.value);
    const password = generatePassword(length);
    output.value = password;
}

lengthRange.addEventListener('input', updateLengthLabel);
generateBtn.addEventListener('click', refreshPassword);
copyBtn.addEventListener('click', async () => {
    if (!output.value) {
        return;
    }

    try {
        await navigator.clipboard.writeText(output.value);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 1500);
    } catch (error) {
        console.error('Copy failed', error);
        output.select();
        document.execCommand('copy');
    }
});

updateLengthLabel();
refreshPassword();
