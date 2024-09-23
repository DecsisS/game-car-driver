const treesLogic = (function () {
    const trees = document.querySelectorAll('.trees');
    const treesCoords = [];

    for (let i = 0; i < trees.length; i++) {
        const element = trees[i];
        const treeCords = getCoords(element);
        treesCoords.push(treeCords);
    };

    function treesAnimation(fullSpeed) {
        for (let i = 0; i < trees.length; i++) {
            const element = trees[i];

            let newCoordY = treesCoords[i].y + fullSpeed;

            if (newCoordY > window.innerHeight) {
                newCoordY = -300;
            }

            treesCoords[i].y = newCoordY;
            element.style.transform =
                `translate(${treesCoords[i].x}px, ${newCoordY}px)`;
        };
    };

    return { treesAnimation };
})();