// для всех полей, отобраных по селектору 
// при вводе значения - убираем всё что не цифры
const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);
    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};

export default checkNumInputs;