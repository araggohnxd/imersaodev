let form = document.querySelector(".fieldset");
let inputTop = document.querySelector(".coin-input.top");
let inputBot = document.querySelector(".coin-input.bot");
let labelTop = document.querySelector(".coin-label.top");
let labelBot = document.querySelector(".coin-label.bot");
const symbolMap = {
	eur: '€',
	usd: '$',
	brl: 'R$',
	jpy: '¥',
	gbp: '£'
};

function swapCoins(swapButton) {
	let wrapperTop = document.querySelector(".coin-wrapper.top");
	let wrapperBot = document.querySelector(".coin-wrapper.bot");

	form.insertBefore(wrapperTop, wrapperBot);
	form.insertBefore(wrapperBot, swapButton);
	setAttributes();
	document.querySelector(".coin-input.top").setAttribute("placeholder", "1.00");
	setCurrency(document.querySelector(".coin-label.top"));
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
	let topCurrencyType = labelTop.value;
	let botCurrencyType = labelBot.value;
	let toBeConverted = inputTop.value;

	fetch(`https://v6.exchangerate-api.com/v6/bb700732299855ed1af4dc16/pair/${topCurrencyType}/${botCurrencyType}`)
		.then((response) => response.json())
		.then((data) => {
			const exchangeRate = data.conversion_rate;
			let convertedValue = (parseFloat(toBeConverted) * exchangeRate).toFixed(2);
			inputBot.value = convertedValue;
		});
}

function setCurrency(droplabel) {
	let currencySymbol = droplabel.nextElementSibling.childNodes[1];
	let currencyType = droplabel.value;
	let currencyOutput = document.querySelector(".coin-input.bot");
	let oppositeCurrency = document.querySelector(".coin-label.bot").value;

	inputTop.value = "";
	inputBot.value = "";
	if (droplabel.classList[1] === "bot") {
		currencyType = document.querySelector(".coin-label.top").value;
	}
	currencySymbol.textContent = symbolMap[currencyType];
	fetch(`https://v6.exchangerate-api.com/v6/7e9f327d54b961cdcdefbb39/pair/${currencyType}/${oppositeCurrency}`)
	.then((response) => response.json())
	.then((data) => {
		const exchangeRate = data.conversion_rate;
		currencyOutput.setAttribute("placeholder", exchangeRate.toFixed(2));
	});
}

form.addEventListener("submit", function(event) {
	event.preventDefault();
});

window.onload = () => {
	labelTop.selectedIndex = 0;
	labelBot.selectedIndex = 1;
	setCurrency(labelTop);
}
