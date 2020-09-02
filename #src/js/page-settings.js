const burger = document.querySelector('.menu__burger');
const menu = document.querySelector('.menu__navigation');

burger.addEventListener('click', () => {
	menu.classList.toggle('menu-open')
	burger.classList.toggle('menu-open')
});
let title = document.title;
let settingsLink = document.querySelector('.page-header__settings');


function changeLinkLogo(pageTitle) {
	if (pageTitle == 'Home') {
		settingsLink.setAttribute('href', 'settings.html')
	} if (pageTitle == 'Settings') {
		settingsLink.setAttribute('href', 'index.html')
	}
};

changeLinkLogo(title);;

let tabNav = document.querySelector('.tabs-nav');
let tabsWrapper = document.querySelector('.settings-tabs');
let tabContent = document.querySelectorAll('.tabs-content__item');
let timerCount = document.querySelectorAll('.js-count');
let numberOfCount;
let numbersArray = [];

function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
})
function changeTabs(e) {

	let navData = e.target.getAttribute('data-tab')

	if (!e.target.classList.contains('tabs-nav__item_deactive')) {
		tabsWrapper.querySelector('.tabs-nav__item_active').classList.remove('tabs-nav__item_active')
		tabsWrapper.querySelector('.tabs-content__item_active').classList.remove('tabs-content__item_active')
		e.target.classList.add('tabs-nav__item_active')
		tabContent.forEach(item => {
			let contentId = item.getAttribute('id');
			if (contentId == navData) {
				item.classList.add('tabs-content__item_active')
			}
		})
	}
	findActive(tabContent)
}

function findActive(arr) {
	arr.forEach(item => {
		item.querySelector('.js-count').value = item.querySelector('.js-range').value;
		if (item.classList.contains('tabs-content__item_active')) {
			let modeCheck = item.querySelector('.content-item__checkbox_input');
			let saveButton = item.querySelector('.js-save');
			let savedText = item.querySelector('.js-saved');
			let noCheck = item.querySelector('.content-item__nocheck');
			let numberLengths = item.querySelectorAll('.js-numbers')
			let jsCount = item.querySelector('.js-count');
			let jsCountBox = item.querySelector('.js-count-box');
			let jsRange = item.querySelector('.js-range');
			let checkLeft = JSON.parse(localStorage.getItem('numberOfTimerLeft'));
			let checkTimer = JSON.parse(localStorage.getItem('numberOfTimerCount'));
			let verify = JSON.parse(localStorage.getItem('modeCheck'));
			console.log('checkTimer ' + checkTimer);
			if (checkTimer == 0) {
				jsCount.value = 'Выкл';
				jsCountBox.style.left = 0;
				localStorage.setItem('numberOfTimerCount', 0);
				localStorage.setItem('numberOfTimerLeft', JSON.stringify('-17'));
			} else {
				jsCount.value = +checkTimer;
				jsCountBox.style.left = checkLeft;
			}
			if (verify) {
				modeCheck.checked = true;
			} else {
				modeCheck.checked = false;
			}
			item.querySelector('.js-range').value = JSON.parse(localStorage.getItem('numberOfTimerCount'));
			jsCountBox.style.left = numberOfCount;
			let test = JSON.parse(localStorage.getItem('typeOfNumber'));
			console.log(test);
			item.querySelector('.js-range').addEventListener('mousemove', () => {
				let rangeWidth = item.querySelector('.js-range').scrollWidth;
				let jsCountValue = jsCount.value;
				if (jsRange.value == 10) {
					jsCount.value = 'Выкл';
					jsCountBox.style.left = 0;
					localStorage.setItem('numberOfTimerCount', 0);
				} else {
					jsCount.value = jsRange.value;
					numberOfCount = ((jsCountValue - 10) * rangeWidth / 110) - 24 + 'px';

					jsCountBox.style.left = numberOfCount;
					window.addEventListener('resize', (jsCountValue, rangeWidth) => {
						jsCountBox.style.left = numberOfCount;
					})
					localStorage.setItem('numberOfTimerLeft', JSON.stringify(numberOfCount));
					localStorage.setItem('numberOfTimerCount', JSON.stringify(jsCount.value));
				}
			})
			item.querySelector('.js-range').addEventListener('touchmove', () => {
				let jsCount = item.querySelector('.js-count');
				let jsCountBox = item.querySelector('.js-count-box');
				let jsRange = item.querySelector('.js-range');
				let rangeWidth = item.querySelector('.js-range').scrollWidth;
				let jsCountValue = jsCount.value;
				if (jsRange.value == 10) {
					jsCount.value = 'Выкл';
					jsCountBox.style.left = 0;
				} else {
					jsCount.value = jsRange.value;
					jsCountBox.style.left = ((jsCountValue - 10) * rangeWidth / 110) - 24 + 'px';
					window.addEventListener('resize', (jsCountValue, rangeWidth) => {
						jsCountBox.style.left = ((jsCountValue - 10) * rangeWidth / 110) - 24 + 'px';
					})
				}
			})
			saveButton.addEventListener('click', () => {
				let idValue = [];
				for (let i = 0; i < numberLengths.length; i++) {
					if (numberLengths[i].checked) {
						idValue.push(numberLengths[i].getAttribute('id'));
					}
				}
				if ((idValue.length != 0) && modeCheck.checked) {
					localStorage.setItem('numberOfValue', JSON.stringify(idValue));
					savedText.style.opacity = 1;
					function destroySaved() {
						savedText.style.opacity = 0;
					}
					setTimeout(destroySaved, 2000);
				} else {
					noCheck.style.opacity = 1;
					function destroyNoCheck() {
						noCheck.style.opacity = 0;
					}
					setTimeout(destroyNoCheck, 2000);
				}
				localStorage.setItem('typeOfNumber', JSON.stringify(idValue));
				localStorage.setItem('modeCheck', JSON.stringify(modeCheck.checked));
			})
		}
	})
}







































findActive(tabContent)
tabNav.addEventListener('click', changeTabs)




