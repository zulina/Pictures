const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        // ?
        e.stopPropagation();
    }

    function isImage(image) {
        return image.type.search(/image/) >= 0 ? true : false;
    }

    function highlight(item) {
        // if (isImage(e.dataTransfer.files[0])) {
            // ближайший элемент с классом file_upload
            item.closest('.file_upload').style.border = "5px solid yellow";
            item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
        // }
    }

    function unhighlight(item) {
        // ближайший элемент с классом file_upload
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            if (isImage(e.dataTransfer.files[0])) {
                input.files = e.dataTransfer.files;
                // обрезаем имя файла
                let name = input.files[0].name.split('.')[0];
                name.length < 6 ? name = input.files[0].name
                    : name = name.substring(0,5) + "..." + input.files[0].name.split('.')[1];
                // выбираем предыдущий соседний элемент
                input.previousElementSibling.textContent = name;
                }
            else {
                e.preventDefault();
            }
        });
    });
};

export default drop;