// dir - вертикально или горизонтально
// prev и next - кнопки
const sliders = (slides, dir, prev, next) => {
    let slideIndex = 0,
        paused = false;
    const items = document.querySelectorAll(slides);
    
    items.forEach(item => {
        item.classList.add('animated');
    });

    // function showSlides(n) {
    //     if (n > items.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = items.length;
    //     }

    //     items.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     items[slideIndex-1].style.display = 'block';
    // }

    // showSlides(slideIndex);

    function plusSlides(n) {
        // showSlides(slideIndex += n);
        slideIndex += n;

        if (slideIndex > (items.length - 1)) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = items.length - 1;
        }

        items.forEach(item => {
            item.style.display = 'none';
        });
        items[slideIndex].style.display = 'block';
    }
    plusSlides(0);

    try {
        const prevBtn = document.querySelector(prev),
            nextBtn = document.querySelector(next);
        
        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex].classList.remove('slideInLeft');
            items[slideIndex].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex].classList.remove('slideInRight');
            items[slideIndex].classList.add('slideInLeft');
        });
    } catch(e) {}

    // автоматическая анимация
    function activateAnimation() {
        if (dir === 'vertical') {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex].classList.add('slideInDown');
            }, 3000);
        } else {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex].classList.remove('slideInRight');
                items[slideIndex].classList.add('slideInLeft');
            }, 3000);
        }
    }
    activateAnimation();

    // при наведении - останавливаем анимацию
    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
    });
    // при отводе мышки - возобновляем анимацию
    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
    });

};

export default sliders;