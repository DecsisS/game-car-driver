const infoBlockLogic = (function() {
    const pageDefault = document.querySelector('.page-default');
    const topListContainer = document.querySelector('.info-top-list');
    pageDefault.style.display = 'flex';

    const infoPages = [pageDefault];

    const infoButtons = [];

    function eventListenerButtonWithPage(buttonClass, pageClass) {
        const button = document.querySelector(buttonClass);
        infoButtons.push(button);
        const renderPage = document.querySelector(pageClass);
        infoPages.push(renderPage);

        button.addEventListener('click', () => {
            infoPages.forEach((page) => {
                if (page.style.display === 'flex') {
                    page.style.display = 'none';
                }
            });
            if (button.classList.contains('button-top')) {
                topListContainer.innerHTML = `
                    <tr><th>№</th><th>Player</th><th>Score</th></tr>
                `;
                renderTopList();
            };
            infoButtons.forEach((button) => {
                if (button.classList.contains('active-button')) {
                    button.classList.remove('active-button');
                }
            });
            button.classList.add('active-button');
            renderPage.style.display = 'flex';
        });
    };

    function renderTopList() {
        const array = getTopList();
        const messageInPageTop = document.querySelector('.page-top > h5');
        if (array.length === 0) {
            if (messageInPageTop) {
                return;
            }
            const message = document.createElement('h5');
            message.innerHTML = 'The list is empty';
            topListContainer.after(message);
            return;
        }
        if (messageInPageTop) {
            messageInPageTop.remove();
        }
        for (let i = 0; i < array.length; i++) {
            const listItem = array[i];
            const name = Object.keys(listItem)[0];
            const score = Object.values(listItem)[0];
            topListContainer.innerHTML += `
                <tr id="li-${i + 1}">
                    <td>${i + 1}</td>
                    <td>${name}</td>
                    <td>${score}</td>
                </tr>
            `;
        }
    };

    function getTopList() {
        const storageArray = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            const item = {
                [key]: value,
            };
            storageArray.push(item);
        }
        const sortedArray = storageArray.sort((a, b) => {
            const valueA = Object.values(a);
            const valueB = Object.values(b);
            return valueB[0] - valueA[0];
        });

        return sortedArray.slice(0, 10);
    };

    return {eventListenerButtonWithPage};
})();