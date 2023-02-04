const calcScroll = () => {
    let div = document.createElement('div');

    div.style.width ='50px';
    div.style.height ='50px';
    // добавляем скролл в div
    div.style.overflowY ='scroll';
    div.style.visibility ='hidden';

    document.body.appendChild(div);

    // вычисляем ширину скролла
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    // const clientWidth = document.documentElement.clientWidth,
    //     innerWidth = window.innerWidth,
    //     scrollWidth = `${innerWidth - clientWidth}px`;

    return scrollWidth;
}

export function modifyBody(flow, scroll) {
    document.body.style.overflow = flow;
    document.body.style.marginRight = `${scroll}px`;
}

export default calcScroll;