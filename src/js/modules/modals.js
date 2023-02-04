import { clearInputs } from "./forms";
import calcScroll from "./calcScroll";
import { modifyBody } from "./calcScroll";

const modals = () => {
    let timeout;
    let btnPressed = false;

    // привязка окна к определенному тригеру
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        // при нажатии на триггер - открываем модальное окно
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                if (timeout) {
                    clearInterval(timeout);
                }

                // закрываем все открытые окна
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                // для отображения модального окна
                modal.style.display = "block";
                // убираем прокрутку страницы
                modifyBody("hidden", scroll);

            });
        });

        // при закрытии модального окна крестиком
        close.addEventListener('click', () => {
            // закрываем все открытые окна
            windows.forEach(item => {
                item.style.display = 'none';
            });

            clearInputs();

            // modal.style.display = "none";
            modifyBody("", "0px");
        });

        // при нажатии на подложку
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                // закрываем все открытые окна
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                clearInputs();

                // modal.style.display = "none";
                modifyBody("", "0px");
            }
        });
    }

    // открытие формы через время
    function showModalByTime(selector, time) {
        timeout = setTimeout(function() {
            let display = true;
            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = false;
                }
            });
            if (display) {
                document.querySelector(selector).style.display = 'block';
                modifyBody("hidden", calcScroll());
            }
        }, time);
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight - 1)) {
                document.querySelector(selector).click();
            }
        });
    }

    // при нажатии на Заказать
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    // при нажатии на Подробнее об услуге
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    // при нажатии на Подарок
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    // автоматическое открытие окна через время
    // showModalByTime('.popup-consultation', 10000);
    // автоматическое открытие окна с подарком если дошли до конца страницы 
    openByScroll('.fixed-gift');
};

export default modals;