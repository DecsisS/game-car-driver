function getCoords(element) {
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(',');
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const numericY = parseFloat(y);
    const numericX = parseFloat(x);

    return {
        x: numericX, 
        y: numericY,
    };
};

function createElementInfo(element) {
    return {
        width: element.clientWidth,
        height: element.clientHeight,
        coords: getCoords(element),
        visible: true,
    };
};

function getCoordsForCollision (info) {
    return {
        yTop: info.coords.y,
        yBottom: info.coords.y + info.height,
        xLeft: info.coords.x - (info.width / 2),
        xRight: info.coords.x + (info.width / 2),
    };
};

function hasCollision (elem1Info, elem2Info) {
    const carCollision = getCoordsForCollision(elem1Info);

    const objCollision = getCoordsForCollision(elem2Info);

    if (carCollision.yTop > objCollision.yBottom 
        || carCollision.yBottom < objCollision.yTop
        || carCollision.xLeft > objCollision.xRight
        || carCollision.xRight < objCollision.xLeft) {
        return false;
    }
    return true;
};

