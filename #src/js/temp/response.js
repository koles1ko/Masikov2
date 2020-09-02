window.addEventListener('resize', e => {
    adaptiveFunction();
});
function adaptiveHeader(width, height) {
    let headerMenu = document.querySelector('.header-menu');
    let headerSomeOne = document.querySelector('.header-some-one');
    if (width < 767) {
        if(!headerSomeOne.classList.contains('active')) {
            headerSomeOne.classList.add('active').appendTo(headerMenu);
        }
    } else {
        if(headerSomeOne.classList.contains('active')){
            headerSomeOne.classList.add('active').appendTo(headerMenu);
        }
    }
};
function adaptiveFunction() {
    let width = window.outerWidth();
    let height = window.outerHeight();
    addaptiveHeader(width, height);
};
adaptiveFunction();