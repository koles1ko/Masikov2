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

changeLinkLogo(title);
var input = document.querySelectorAll('.js-number-result'),
	buffer = [];
for (var i = 0; input.length > i; i++) {
	buffer[i] = document.createElement('div');
	buffer[i].className = "js-number-buffer";
	buffer[i].classList.add("content-result__numbers");
	input[i].parentNode.insertBefore(buffer[i], input[i].nextSibling);

	input[i].oninput = function () {
		resultAction.style.color = 'black';
		resultAction.style.borderColor = 'black';
		this.nextElementSibling.innerHTML = this.value;
		this.style.width = this.nextElementSibling.clientWidth + 8 + 'px';
	};
};

const hint = document.querySelector('.js-hint');
const hintClose = document.querySelector('.js-close');
const hintPopup = document.querySelector('.popup-wrapper');
const buttonStart = document.querySelector('.js-start');
const blockStart = document.querySelector('.page-content__start');
const blockResult = document.querySelector('.page-content__result');
const blockPlay = document.querySelector('.page-content__play');
const blockText = document.querySelector('.content-result__text');

let number1 = document.querySelector('.js-number-first');
let number2 = document.querySelector('.js-number-second');
let numbers = document.querySelectorAll('.content-result__numbers');
let num1;
let num2;
let resultAction = document.querySelector('.js-number-result');
let countTrue = document.querySelector('.content-bool__true_count');
let countFalse = document.querySelector('.content-bool__false_count');
let num;
let boom;
let currentLength;
let resultMachine;
let resultUser;
let content;
let settingButton = document.querySelector('.page-header__settings');
let noChoose = document.querySelector('.page-content__choose');
let timerValue;
let resultMachineDigits;
let resultUserDigits;
countTrue.value = 0;
countFalse.value = 0;

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

function openHintBox() {
	// hintPopup.classList.add('popup-open');
	hintPopup.style.opacity = 1;
	hintPopup.style.visibility = 'visible';
	hintClose.closest('.popup-wrapper').addEventListener('click', () => {
		// hintPopup.classList.remove('popup-open');
		hintPopup.style.opacity = 0;
		hintPopup.style.visibility = 'hidden';
	})
}

function startGame() {
	blockStart.style.display = 'none';
	blockResult.style.display = 'block';
	blockResult.classList.add('active');
}
function endGame() {
	blockStart.style.display = 'block';
	blockResult.style.display = 'none';
	blockResult.classList.remove('active');
}
function countDigits(a) {
	let c = 0;
	while (a >= 1) {
		a /= 10
		c++;
	}
	return c;
};
function play() {
	boom = JSON.parse(localStorage.getItem('typeOfNumber'));

	if (blockResult.classList.contains('active')) {
		endGame()
	} else {
		if (boom != null) {

			startGame()
			function getNumbers() {
				resultAction.value = '';
				function getRandomElem(mass) {
					let randomNumber;
					do {
						randomNumber = Math.floor(Math.random() * mass.length);
					}
					while (mass[randomNumber] == 0)
					currentLength = randomNumber + 1;
					console.log(mass);
				};
				function getNumberOne() {
					getRandomNumber()
					number1.textContent = num;
					num1 = parseInt(number1.textContent, 10);
				}
				function getNumberTwo() {
					getRandomNumber()
					number2.textContent = num;
					num2 = parseInt(number2.textContent, 10);
				}
				function getRandomNumber() {
					do {
						num = Math.floor(Math.random() * Math.pow(10, currentLength));
					} while (num == 0);

				}
				getRandomElem(boom);
				getNumberOne();
				getNumberTwo();
				operationOfMath(num1, num2);
				resultMachineDigits = countDigits(resultMachine);
				resultAction.setAttribute('maxlength', resultMachineDigits);
				console.log('длина числа робота = ' + resultMachineDigits);
				console.log(resultMachine);
				resultAction.style.color = 'black';
				resultAction.focus();
				numbers.forEach(item => {
					item.style.opacity = 1;
				})
			}
			getNumbers();

			resultAction.addEventListener('input', () => {
				resultUserDigits = countDigits(resultAction.value);
				console.log('длина числа пользователя = ' + resultUserDigits);
				console.log(resultAction.value);
				resultUser = +resultAction.value;
				if (resultUserDigits == resultMachineDigits) {
					console.log('победа');
					if (resultUser == resultMachine) {
						resultAction.style.color = 'green';
						countTrue.value++;
						setTimeout(getNumbers, 1000);
						numbers.forEach(item => {
							item.style.opacity = 0;
						})
						console.log(numbers);
					} else {
						resultAction.style.color = 'red';
						resultAction.style.borderColor = 'red';
						countFalse.value++;
						setTimeout(getNumbers, 1000);
						numbers.forEach(item => {
							item.style.opacity = 0;
						})
					}
				}
			})
		} else {
			noChoose.style.visibility = 'visible';
			noChoose.style.opacity = '1';

			function destroyNoChoose() {
				noChoose.style.opacity = 0;
				noChoose.style.visibility = 'hidden';
			}
			setTimeout(destroyNoChoose, 2000);

		}
	}
	timerValue = JSON.parse(localStorage.getItem('numberOfTimerCount'));
}


function operationOfMath(fir, sec) {
	let additionalMode = JSON.parse(localStorage.getItem('modeCheck'));
	if (additionalMode) {
		resultMachine = fir + sec;
	}
}





blockStart.addEventListener('click', play);
hint.addEventListener('click', () => {
	openHintBox()
})
// settingButton.addEventListener('click', () => {
// 	console.log(1);
// })


// window,addEventListener('click', e => {
// 	console.log(e.target);
// })
