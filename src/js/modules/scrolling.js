const scrolling = (upSelector) => {
    // стрелочка наверх
    const upElem = document.querySelector(upSelector);

    window.addEventListener('scroll', () => {
        // scrollTop - расстояние которое мы уже пролистали и не видим
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.remove('fadeOut');
            upElem.classList.add('animated', 'fadeIn');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('animated', 'fadeIn');
        }
    });

    // --------------- вариант 1 ---------------
    // ^="#" - значит что с начала строки должно быть #
    let links = document.querySelectorAll('[href^="#"]'),
        speed = 0.3;

    // для всех локальных ссылок
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            // scrollTop - расстояние которое мы уже пролистали и не видим
            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                // getBoundingClientRect - получить границы/координаты элемента
                // toBlock - верхняя граница блока, к которому идёт переход 
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            // console.log(`${widthTop} ${toBlock}`);
            requestAnimationFrame(step);

            // time - время с момента открытия окна сайта
            function step(time) {
                // console.log(`${start} ${time}`);
                if (start === null) {
                    start = time;
                }
                // отнимаем от текущего времени стартовое
                // progress используем в рассчете расстояния
                // но не понимаю зачем к расстоянию прибавлять время ?
                let progress = time - start,
                    // toBlock < 0 если идём снизу вверх
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) :
                        Math.min(widthTop + progress/speed, widthTop + toBlock));
                
                document.documentElement.scrollTo(0, r); // (x=0, y=r)

                if (r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        });
    });

    // // --------------- вариант 2 ---------------
    // const element = document.documentElement,
    //     body = document.body;

    // const calcScroll = () => {
    //     upElem.addEventListener('click', function(event) {
    //         // scrollTop - расстояние которое мы уже пролистали и не видим
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);
    //         // в нашем случае это #up
    //         if (this.hash !== '') {
    //             event.preventDefault();
    //             let hashElement = document.querySelector(this.hash),
    //                 hashElementTop = 0; // сколько осталось до родительского элемента
    //             // offsetParent - элемент, относительно которого позиционаруется hashElement
    //             while (hashElement.offsetParent) {
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //                 }
    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // };

    // // smoothScroll - имитация скролла
    // // from - расстояние которое мы уже пролистали и не видим
    // // to - сколько осталось до родительского элемента
    // const smoothScroll = (from, to, hash) => {
    //     let timeInterval = 1,
    //         prevScrollTop,
    //         speed;

    //     if (to > from) {
    //         speed = 30;
    //     } else {
    //         speed = -30;
    //     }

    //     let move = setInterval(function() {
    //     // scrollTop - расстояние которое мы уже пролистали и не видим
    //     let scrollTop = Math.round(body.scrollTop || element.scrollTop);
    //         // console.log(`${prevScrollTop} ${scrollTop} ${to} ${from}`);
    //         if ( prevScrollTop === scrollTop || (to > from && scrollTop >= to) || (to < from && scrollTop <= to) ) {
    //             clearInterval(move);
    //             // адресная строка
    //             history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
    //         } else {
    //             body.scrollTop += speed;
    //             element.scrollTop += speed;
    //             prevScrollTop = scrollTop;
    //         }
    //     }, timeInterval);
    // };

    // calcScroll();
};

export default scrolling;