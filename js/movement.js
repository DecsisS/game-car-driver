function carMoveToUp(car, carInfo) {
    return () => {
        const newY = carInfo.coords.y - move;

        if (newY < 0) {
            return;
        }
        carInfo.coords.y = newY;
        carMove(car, carInfo.coords.x, newY);
        carInfo.move.top = requestAnimationFrame(carMoveToUp(car, carInfo));
    };
};

function carMoveToDown(car, carInfo) {
    return () => {
        const newY = carInfo.coords.y + move;

        if (newY > roadObj.roadHeight - carInfo.height) {
            return;
        }
        carInfo.coords.y = newY;
        carMove(car, carInfo.coords.x, newY);
        carInfo.move.bottom = requestAnimationFrame(carMoveToDown(car, carInfo));
    };
};

function carMoveToLeft(car, carInfo) {
    return () => {
        const newX = carInfo.coords.x - move;

        if (newX < -(roadObj.roadWidth / 2 - carInfo.width / 2 + 5)) {
            return;
        }
        carInfo.coords.x = newX;
        carMove(car, newX, carInfo.coords.y);
        carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo));
    };
};

function carMoveToRight(car, carInfo) {
    return () => {
        const newX = carInfo.coords.x + move;

        if (newX > (roadObj.roadWidth / 2 - carInfo.width / 2 + 5)) {
            return;
        }
        carInfo.coords.x = newX;
        carMove(car, newX, carInfo.coords.y);
        carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo));
    };
};

function carMove(car, x, y) {
    car.style.transform =
            `translate(${x}px, ${y}px)`;
};