const checkTextInputs = (selector, param) => {
    const txtInputs = document.querySelectorAll(selector);
    if (param == "name") {
        txtInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^а-яё]/ig)) {
                    e.preventDefault();
                }
            });
            // input.addEventListener('input', function(e) {
            //     if (input.value.match(/[^а-яё]/ig)) {
            //         input.value = '';
            //     }
            // });
            input.addEventListener('change', () => {
                input.value = input.value.replace(/[^а-яё]/ig, '');
            });
        });
    } else if (param == "message") {
        txtInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key.match(/[^а-яё 0-9]/ig)) {
                    e.preventDefault();
                }
            });
        });
    } 
};

export default checkTextInputs;