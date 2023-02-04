import checkNumInputs from './checkNumInputs';

// модуль для работы со всеми формами
const forms = () => {
    const form = document.querySelectorAll('form');

    // при вводе номера убираем всё что не цифры
    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // при отправке данных
    const postData = async (url, data) => {
        // устанавливаем значение загрузки для элемента вывода статуса
        document.querySelector('.status').textContent = message.loading;
        // для постинга всегда указываем объект с параметрами
        let res = await fetch(url, {
            method: "POST",
            body: data
        });
        // ?
        return await res.text();
    };

    // при нажатии отправки
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            // добавляем элемент для вывода статуса
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            
            // отправляем данные на сервер
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

// очистка введенных данных
export const clearInputs = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(item => {
        // у элемента с тегом input есть свойство value
        item.value = '';
    });
};

export default forms;