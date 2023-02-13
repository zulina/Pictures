const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
        //   btnAll = menu.querySelector('.all'),
        //   btnLovers = menu.querySelector('.lovers'),
        //   btnChef = menu.querySelector('.chef'),
        //   btnGirl = menu.querySelector('.girl'),
        //   btnGuy = menu.querySelector('.guy'),
        //   btnGrandmother = menu.querySelector('.grandmother'),
        //   btnGranddad = menu.querySelector('.granddad'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
        //   markGirl = wrapper.querySelectorAll('.girl'),
        //   markLovers = wrapper.querySelectorAll('.lovers'),
        //   markChef = wrapper.querySelectorAll('.chef'),
        //   markGuy = wrapper.querySelectorAll('.guy'),
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if (markType.length > 0) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    };

    // делегирование
    menu.addEventListener('click', (e) => {
        // элемент, на который кликнули
        let target = e.target;
        // установка класса активности
        if (target && target.tagName == "LI") {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
            typeFilter(wrapper.querySelectorAll(`.${target.classList[0]}`));
        }
    });

    // ------------------------ вариант 2 ------------------------
    // items.forEach(btn => {
    //     btn.addEventListener('click', () => {
    //         typeFilter(wrapper.querySelectorAll(`.${btn.classList[0]}`));
    //     });
    // });

    // ------------------------ вариант 1 ------------------------
    // btnAll.addEventListener('click', () => {
    //     typeFilter(markAll);
    // });

    // btnLovers.addEventListener('click', () => {
    //     typeFilter(markLovers);
    // });

    // btnChef.addEventListener('click', () => {
    //     typeFilter(markChef);
    // });

    // btnGirl.addEventListener('click', () => {
    //     typeFilter(markGirl);
    // });

    // btnGuy.addEventListener('click', () => {
    //     typeFilter(markGuy);
    // });

    // btnGrandmother.addEventListener('click', () => {
    //     typeFilter();
    // });

    // btnGranddad.addEventListener('click', () => {
    //     typeFilter();
    // });

}

export default filter;