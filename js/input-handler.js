(function() {
    const maxText = document.querySelector('.max');
    const unknownText = document.querySelector('.unknown');
    const doneText = document.querySelector('.done');
    let save = false;

    const input = document.querySelector('.input-name');
    let value = '';

    input.addEventListener('input', (event) => {
        if (!save) {
            if (event.data) {
                if (input.value.length > 10) {
                    maxText.style.display = 'initial';
                    return input.value = value;
                }
                unknownText.style.display = 'none';
                value += event.data;
                return;
            }
            maxText.style.display = 'none';
            value = value.slice(0, -1);
            input.value = value;
        }
        input.value = value;
    });

    const saveNameButton = document.querySelector('.save-button');

    saveNameButton.addEventListener('click', () => {
        const score = document.querySelector('.full-score').innerHTML;
        const name = input.value;
        if (!name) {
            unknownText.style.display = 'initial';
            return;
        }
        if (save) {
            return;
        }
        unknownText.style.display = 'none';
        maxText.style.display = 'none';
        doneText.style.display = 'initial';
        save = true;
        localStorage.setItem(name, score);
    });
})();