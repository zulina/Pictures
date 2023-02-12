const mask = (selector) => {

    let setCursorPosition = (startPos, endPos, elem) => {
        elem.focus();

        if (elem.setSelectionRange) {
            // устанавливаем выделение
            elem.setSelectionRange(startPos, endPos);
        } else if (elem.createTextRange) {
            let range = elem.createTextRange();
            // устанавливаем выделение
            range.collapse(true);
            range.moveStart('character', startPos);
            range.moveEnd('character', endPos);
            range.select();
        }
    };

    function getPos(startValue, startPos, endValue) {
        let pos = 0;
        // считаем количество цифр перед курсором после изменений =
        // количество цифр перед курсором до изменений +
        // (количество цифр всего до изменений - количество цифр всего после изменений)
        let nums = startValue.substring(0, startPos).replace(/\D/g, '').length +
            (endValue.replace(/\D/g, '').length - startValue.replace(/\D/g, '').length);
        // для каждого символа в номере телефона
        for (let letter of endValue) {
            // накапливаем индекс позиции
            pos++;
            // если это цифра, то отнимаем от нужного количества цифр
            if (/[\d]/.test(letter)) nums--;
            // если нужное количество цифр закончилось, то возвращаем позицию
            if (nums == 0) return pos;
        }
        // на всякий случай
        return endStr.length;
    }

    function createMask(event) {
        const startPos = this.selectionStart;
        const startValue = this.value;
        // шаблон
        let matrix = '+8 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            // value получаем из input
            // получаем только цифры
            val = this.value.replace(/\D/g, '');

        // ?
        if (def.length >= val.length) {
            val = def;
        }

        // заменяем все символы
        this.value = matrix.replace(/./g, function(a) {
            // а - текущий символ в строке
            // если (это _ или число) и (i меньше длины val)
            // то подставляем в шаблон их место введённые цифры
            // иначе если (i больше длины val) - закончились введённые цифры
            // то заменяем всё оставшееся на пустой символ
            // иначе - оставляем все другие символы (плюс, скобки, пробелы)
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
        });

        // если устанавливаем курсор вне ввода
        if (event.type === 'blur') {
            // если ещё ничего не ввели, то очищаем
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            // получаем новую позицию курсора с учетом изменений в номере
            const pos = getPos(startValue, startPos, this.value);
            // const pos = this.value.length;
            setCursorPosition(pos, pos, this);
        }
    }

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(input => {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
        // input.addEventListener('keypress', createMask);
        input.addEventListener('mousedown', (event) => {
            // чтобы в изменении номера не учитывать '+8' - устанавливаем позицию курсора после '+8'
            if (event.target.selectionStart < 2) {
                setCursorPosition(2, (event.target.selectionEnd < 2 ? 2 : event.target.selectionEnd), event.target);
            }
        });
        input.addEventListener('keydown', (event) => {
            // чтобы в изменении номера не учитывать '+8' - устанавливаем позицию курсора после '+8'
            if (event.target.selectionStart < 2) {
                setCursorPosition(2, (event.target.selectionEnd < 2 ? 2 : event.target.selectionEnd), event.target);
            }
        });
    });
};

export default mask;