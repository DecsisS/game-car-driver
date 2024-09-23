function elementAnimation(element, elementInfo, rarity, fullSpeed) {
    let newCoordY = elementInfo.coords.y + fullSpeed;
    let newCoordX = elementInfo.coords.x

    if (newCoordY > window.innerHeight) {
        newCoordY = -rarity;

        let random = parseInt(Math.random() * 2);
        let randomX = parseInt(
            Math.random() * (roadObj.roadWidth / 2 - elementInfo.width / 2)
        );

        element.style.display = 'initial';
        elementInfo.visible = true;

        newCoordX = random === 0
            ? -randomX
            : randomX
        elementInfo.coords.x = newCoordX;
    }

    elementInfo.coords.y = newCoordY;
    element.style.transform = `translate(${newCoordX}px, ${newCoordY}px)`
};