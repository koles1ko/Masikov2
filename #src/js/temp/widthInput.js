
// for (let i = 0; resultAction.length > i; i++) {
// 	console.log(resultAction[i].value);
// 	buffer[i] = document.createElement('div');
// 	buffer[i].className = "js-number-buffer";
// 	//вставляем скрытый div.buffer
// 	resultAction[i].parentNode.insertBefore(buffer[i], resultAction[i].nextSibling);

// 	resultAction[i].oninput = function () {
// 		this.nextElementSibling.innerHTML = this.value;
// 		this.style.width = this.nextElementSibling.clientWidth + 'px';
// 	};
// }
var input = document.querySelectorAll('.js-number-result'),
	buffer = [];
for (var i = 0; input.length > i; i++) {
	console.log(input[i].value);
	buffer[i] = document.createElement('div');
	buffer[i].className = "js-number-buffer";
	buffer[i].classList.add("content-result__numbers");
	//вставляем скрытый div.buffer
	input[i].parentNode.insertBefore(buffer[i], input[i].nextSibling);

	input[i].oninput = function () {
		resultAction.style.color = 'black';
		resultAction.style.borderColor = 'black';
		this.nextElementSibling.innerHTML = this.value;
		this.style.width = this.nextElementSibling.clientWidth + 8 + 'px';
	};
}