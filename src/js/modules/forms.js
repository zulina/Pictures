import { postData } from "../services/requests";

// модуль для работы со всеми формами
const forms = () => {
    const form = document.querySelectorAll('form'),
        upload = document.querySelectorAll('[name="upload"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    // для всех блоков загрузки файла
    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let name = item.files[0].name.split('.')[0];
            name.length < 6 ? name = item.files[0].name
                : name = name.substring(0,5) + "..." + item.files[0].name.split('.')[1];
            // выбираем предыдущий соседний элемент
            item.previousElementSibling.textContent = name;
        });
    });

    // при нажатии отправки
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            // устанавливаем высоту блока чтобы он был фиксированым
            item.parentNode.style.height = getComputedStyle(item.parentNode).height;

            // добавляем элемент для вывода статуса
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.parentNode.appendChild(statusMessage);

            // скрываем форму
            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 400);

            // добавляем картинку статуса
            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp')
            statusMessage.appendChild(statusImg);

            // добавляем текст статуса
            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);

            // если это форма калькулятора
            if (item.classList.contains('calc_form')) {
                // добавляем все выбранные данные в калькуляторе к данным формы
                const size = document.querySelector("#size");
                if (size.value == '') {
                    formData.append("size", "");
                } else {
                    formData.append("size", size.options[size.selectedIndex].text);
                }
                const material = document.querySelector('#material');
                if (material.value == '') {
                    formData.append("material", "");
                } else {
                    formData.append("material", material.options[material.selectedIndex].text);
                }
                const options = document.querySelector('#options');
                if (options.value == '') {
                    formData.append("options", "");
                } else {
                    formData.append("options", options.options[options.selectedIndex].text);
                }
                formData.append("promocode", document.querySelector('.promocode').value);
                if (size.value == '' || material.value == '') {
                    formData.append("total_price", "");
                } else {
                    formData.append("total_price", document.querySelector('.calc-price').textContent);
                }
            }

            let api;
            // определяем на какой адрес будем оправлять
            item.closest('.popup-design') || item.classList.contains('calc_form')
                ? api = path.designer : api = path.question;
            
            // отправляем данные на сервер
            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        // убираем установленную высоту 
                        item.parentNode.style.removeProperty('height');

                        statusMessage.remove();
                        // возвращаем видимость формы
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

// очистка введенных данных
export const clearInputs = () => {
    const inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');
    inputs.forEach(item => {
        // у элемента с тегом input есть свойство value
        item.value = '';
    });
    upload.forEach(item => {
        item.previousElementSibling.textContent = "Файл не выбран";
    });
};

export default forms;