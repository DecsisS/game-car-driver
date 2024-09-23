(function game() {
    let isPause = true;
    let animationId = null;
    let isAcceleration = false;

    let fullSpeed = speed;

    let coinsCount = 0;
    let score = 0;
    let accelerationTimeOn = 0;

    const fullScore = document.querySelector('.full-score');
    const coinScore = document.querySelector('.coin-score');

    const playBlock = document.querySelector('.backdrop-play-block');
    const playButton = document.querySelector('.play-button');
    const gameBlock = document.querySelector('.game-block');

    const infoButton = document.querySelector('.info-button');
    const infoBlock = document.querySelector('.info-block');

    infoButton.addEventListener('click', () => {
        infoBlock.style.display = 'flex';
        infoButton.style.display = 'none';

        infoBlockLogic.eventListenerButtonWithPage('.button-how', '.page-how');
        infoBlockLogic.eventListenerButtonWithPage('.button-top', '.page-top');
    });

    const closeInfoButton = document.querySelector('.info-close-button');
    closeInfoButton.addEventListener('click', () => {
        infoBlock.style.display = 'none';
        infoButton.style.display = 'initial';
    });

    playButton.addEventListener('click', () => {
        isPause = !isPause;
        infoButton.style.display = 'none';
        playBlock.style.display = 'none';
        gameBlock.style.display = 'flex';
        gameButton.children[0].style.display = 'initial';
        gameButton.children[1].style.display = 'none';
        animationId = requestAnimationFrame(startGame);
    });

    const car = document.querySelector('.car');
    const carInfo = {
        ...createElementInfo(car),
        move: {
            top: null,
            bottom: null,
            left: null,
            right: null,
        },
    };

    const coin = document.querySelector('.coin');
    const coinInfo = createElementInfo(coin);

    const crash = document.querySelector('.crash');
    const crashInfo = createElementInfo(crash);

    const acceleration = document.querySelector('.acceleration');
    const accelerationInfo = createElementInfo(acceleration);

    document.addEventListener('keydown', (event) => {
        if (isPause) {
            return;
        }

        const code = event.code;

        if ((code === 'ArrowLeft' || code === 'KeyA')
            && carInfo.move.left === null) {
            carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo));
        } else if ((code === 'ArrowRight' || code === 'KeyD')
            && carInfo.move.right === null) {
            carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo));
        } else if ((code === 'ArrowUp' || code === 'KeyW')
            && carInfo.move.top === null) {
            carInfo.move.top = requestAnimationFrame(carMoveToUp(car, carInfo));
        } else if ((code === 'ArrowDown' || code === 'KeyS')
            && carInfo.move.bottom === null) {
            carInfo.move.bottom = requestAnimationFrame(carMoveToDown(car, carInfo));
        };
    });

    document.addEventListener('keyup', (event) => {
        const code = event.code;

        if (code === 'ArrowLeft' || code === 'KeyA') {
            cancelAnimationFrame(carInfo.move.left);
            carInfo.move.left = null;
        } else if (code === 'ArrowRight' || code === 'KeyD') {
            cancelAnimationFrame(carInfo.move.right);
            carInfo.move.right = null;
        } else if (code === 'ArrowUp' || code === 'KeyW') {
            cancelAnimationFrame(carInfo.move.top);
            carInfo.move.top = null;
        } else if (code === 'ArrowDown' || code === 'KeyS') {
            cancelAnimationFrame(carInfo.move.bottom);
            carInfo.move.bottom = null;
        };
    });

    function startGame() {
        if (hasCollision(carInfo, crashInfo)) {
            return finishGame();
        };

        animationId = requestAnimationFrame(startGame);

        score = animationId + (coinsCount * coinCost);
        fullScore.textContent = score;

        treesLogic.treesAnimation(fullSpeed);

        elementAnimation(coin, coinInfo, 400, fullSpeed);

        elementAnimation(crash, crashInfo, 600, fullSpeed);

        elementAnimation(acceleration, accelerationInfo, 6000, fullSpeed);

        if (coinInfo.visible && hasCollision(carInfo, coinInfo)) {
            coinsCount++;
            coin.style.display = 'none';
            coinScore.textContent = coinsCount;
            coinInfo.visible = false;
        };

        if (hasCollision(carInfo, accelerationInfo)) {
            accelerationTimeOn++;
            if (!isAcceleration && accelerationTimeOn > 25) {
                isAcceleration = true;
                accelerationTimeOn = 0;
                fullSpeed += accelerationSpeed;
                setTimeout(() => {
                    fullSpeed = speed;
                }, accelerationTime);
            };
        };

        if (accelerationTimeOn > 0 
            && !hasCollision(carInfo, accelerationInfo)) {
            accelerationTimeOn = 0;
            isAcceleration = false;
        };
    };

    function cancelAnimations() {
        gameButton.children[1].style.display = 'initial';
        gameButton.children[0].style.display = 'none';
        cancelAnimationFrame(animationId);
        cancelAnimationFrame(carInfo.move.left);
        cancelAnimationFrame(carInfo.move.right);
        cancelAnimationFrame(carInfo.move.top);
        cancelAnimationFrame(carInfo.move.bottom);
    };

    function finishGame() {
        isPause = !isPause;
        cancelAnimations();

        const finishBlock = document.querySelector('.backdrop-container');
        const finishInfo = document.querySelector('.finish-score > span');

        finishInfo.innerHTML = `
        <span>Your score: <b>${score}</b></span>
        <span>Collected coins: <b>${coinsCount}</b></span>
        `;
        finishBlock.style.display = 'flex';
        gameBlock.style.display = 'none';
        infoButton.style.display = 'initial';
    };

    const gameButton = document.querySelector('.game-button');
    gameButton.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            cancelAnimations();
        } else {
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';
            animationId = requestAnimationFrame(startGame);
        }
    });

    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click', () => {
        window.location.reload();
    });
})();