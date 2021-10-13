function move(flyerClone, coords, flyerMain, flyingToVar, time) {
    const moveY = flyingToVar.top - coords.top;
    const moveX = flyingToVar.left - coords.left;
    const changeWidth = (flyerMain.width / 3) - flyerMain.width;
    const changeHeight = (flyerMain.height / 3) - flyerMain.height;

    let top = coords.top;
    let left = coords.left;
    let width = flyerMain.width;
    let height = flyerMain.height;

    function frame() {
        left = left + ((moveX * 10) / time)
        top = top + ((moveY * 10) / time)
        width = width + ((changeWidth * 10) / time)
        height = height + ((changeHeight * 10) / time)

        flyerClone.style.width = width + 'px';
        flyerClone.style.height = height + 'px';
        flyerClone.style.top = Math.round(top) + 'px';
        flyerClone.style.left = Math.round(left - 50) + 'px';

        if (Math.round(top) == Math.round(flyingToVar.top) && Math.round(left) == Math.round(flyingToVar.left)) {
            setTimeout(() => {
                flyerClone.remove();
            }, 300);

            return clearInterval(id);
        }
    }

    let id = setInterval(frame, 10) // draw every 10ms
}

// get coords function
function getCoords(elem) {
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + window.pageYOffset,
        left: box.left + window.pageXOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
    };
}

// main hook
const useProductImgFly = (flyer, flyingTo) => {
    var flyerClone = flyer.cloneNode();
    var flyingToVar = getCoords(flyingTo);
    var flyerMain = flyer.getBoundingClientRect();
    var body = typeof window !== undefined && document.getElementsByTagName('body')[0];

    // get coords
    let coords = getCoords(flyer);

    flyerClone.style.cssText = `
        opacity: 0.8;
        z-index: 1200;
        position: absolute;
        top: ${coords.top}px;
        left: ${coords.left}px;
    `;

    body.appendChild(flyerClone);

    // call move function
    move(flyerClone, coords, flyerMain, flyingToVar, 750);
};

// implementation code
const stickyCart = document.querySelector('.sticky__cart');
function handleAddToCart(e) {
    const parent = e.parentNode;
    const img = parent.querySelector('.product__img')
    useProductImgFly(img, stickyCart)
}