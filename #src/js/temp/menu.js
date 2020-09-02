const burger = document.querySelector('.menu__burger');
const menu = document.querySelector('.menu__navigation');

burger.addEventListener('click', () => {
	menu.classList.toggle('menu-open')
	burger.classList.toggle('menu-open')
})