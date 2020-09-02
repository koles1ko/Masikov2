let title = document.title;
let settingsLink = document.querySelector('.page-header__settings');


function changeLinkLogo(pageTitle) {
	if (pageTitle == 'главная') {
		settingsLink.setAttribute('href', 'settings.html')
	} if (pageTitle == 'настройки') {
		settingsLink.setAttribute('href', 'index.html')
	}
};

changeLinkLogo(title);