const roadObj = (function() {
    const road = document.querySelector('.road');
    const roadWidth = road.clientWidth;
    const roadHeight = road.clientHeight;

    return {roadWidth, roadHeight};
})();