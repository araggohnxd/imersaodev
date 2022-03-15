let form = document.querySelector(".fieldset");
let inputTop = document.querySelector(".coin-input.top");
let inputBot = document.querySelector(".coin-input.bot");
let labelTop = document.querySelector(".coin-label.top");
let labelBot = document.querySelector(".coin-label.bot");

function swapCoins(swapButton) {
	let wrapperTop = document.querySelector(".coin-wrapper.top");
	let wrapperBot = document.querySelector(".coin-wrapper.bot");

	form.insertBefore(wrapperTop, wrapperBot);
	form.insertBefore(wrapperBot, swapButton);
	setAttributes();
}

function setAttributes() {
	let topItems = document.querySelectorAll(".top");
	let botItems = document.querySelectorAll(".bot");
	let items = topItems.length;

	for (let i = 0; i < items; i++) {
		topItems[i].classList.replace("top", "bot");
		botItems[i].classList.replace("bot", "top");
	}
	document.querySelector(".coin-input.top").removeAttribute("readonly");
	document.querySelector(".coin-input.bot").setAttribute("readonly", true);
	inputTop.value = "";
	inputBot.value = "";
}

function convert() {
	inputTop = document.querySelector(".coin-input.top");
	inputBot = document.querySelector(".coin-input.bot");
	labelTop = document.querySelector(".coin-label.top");
	labelBot = document.querySelector(".coin-label.bot");
	let topType = labelTop.selectedIndex;
	let botType = labelBot.selectedIndex;
	let toBeConverted = inputTop.value;
	let convertedValue;

	if (botType == topType) {
		inputBot.value = toBeConverted;
		return (0);
	}
	convertedValue = backToType(typeToBRL(inputTop.value, topType), botType);
	inputBot.value = convertedValue.toFixed(2);
}

function typeToBRL(value, type) {
	switch (type) {
		case 0: //dollar
			value *= 5.1642;
			break;
		case 2: //euro
			value *= 5.6542;
			break;
		case 3: //pound
			value *= 6.7330;
			break;
		case 4: //yen
			value *= 0.04364;
	}
	return (value);
}

function backToType(value, type) {
	switch (type) {
		case 0: //dollar
			value *= 0.1936;
			break;
		case 2: //euro
			value *= 0.1768;
			break;
		case 3: //pound
			value *= 0.1484;
			break;
		case 4: //yen
			value *= 22.9145;
	}
	return (value);
}

function setCurrency(droplabel) {
	inputTop.value = "";
	inputBot.value = "";
	let currency = droplabel.selectedIndex;
	let currencySymbol = droplabel.nextElementSibling.childNodes[1];
	let currencyInput = currencySymbol.nextElementSibling;

	switch (currency) {
		case 0: //dollar
			currencySymbol.textContent = "$";
			currencyInput.setAttribute("placeholder", "Cotação: 5,16");
			break;
		case 1: //real
			currencySymbol.textContent = "R$";
			currencyInput.setAttribute("placeholder", "Cotação: 1,00");
			break;
		case 2: //euro
			currencySymbol.textContent = "€";
			currencyInput.setAttribute("placeholder", "Cotação: 5,65");
			break;
		case 3: //pound
			currencySymbol.textContent = "£";
			currencyInput.setAttribute("placeholder", "Cotação: 6,73");
			break;
		case 4: //yen
			currencySymbol.textContent = "¥";
			currencyInput.setAttribute("placeholder", "Cotação: 0,044");
	}
}

form.addEventListener("submit", function(event) {
	event.preventDefault();
});

window.onload = () => {
	labelTop.selectedIndex = 0;
	labelBot.selectedIndex = 1;
	inputTop.value = "";
	inputBot.value = "";
}
