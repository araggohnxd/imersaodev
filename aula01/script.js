function stepper(btn, num) {
	let grade = document.querySelector("#number" + num);
	let id = btn.getAttribute("id");
	let min = grade.getAttribute("min");
	let max = grade.getAttribute("max");
	let step = grade.getAttribute("step");
	let val = grade.getAttribute("value");
	let calcStep = (id == "increment") ? (step * 1) : (step * -1);
	let newValue = parseInt(val) + calcStep;
	if (newValue >= min && newValue <= max)
		grade.setAttribute("value", newValue);
}

function calcMean() {
	let total = 0;
	let status;
	for (let i = 1; i <= 4; i++) {
		let grade = document.querySelector("#number" + i);
		total += parseInt(grade.getAttribute("value"));
	}
	if ((total / 4) >= 6)
		status = "aprovado!";
	else
		status = "reprovado.";
	document.querySelector("h2").innerHTML = "Sua média: " + (total / 4);
	document.querySelector(".wrapper").innerHTML = "<h2 id='status'>Você foi " + status + "</h2>";
	document.querySelector("#submit").innerHTML = "Calcular nova média";
	document.querySelector("#submit").setAttribute("onclick", "refresh()");
}

function refresh() {
	stepperContent();
	document.querySelector("h2").innerHTML = "Insira suas notas";
	document.querySelector("#status").style.display = "none";
	document.querySelector("#submit").innerHTML = "Calcular média";
	document.querySelector("#submit").setAttribute("onclick", "calcMean()");
}

function stepperContent() {
	for (let i = 1; i <= 4; i++) {
			document.querySelector(".wrapper").innerHTML += `
			<div class="stepper">
				<button class="button" id="increment" onclick="stepper(this, '${i}')">⮝</button>
				<input class="grade" id="number${i}" type="number" min="0" max="10" value="0" step="1" readonly>
				<button class="button" id="decrement" onclick="stepper(this, '${i}')">⮟</button>
			</div>`;
	}
}

window.onload = stepperContent();
