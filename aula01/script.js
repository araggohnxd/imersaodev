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
	document.querySelector(".wrapper").innerHTML = "<h2>Você foi " + status + "</h2>";
	document.querySelector("#submit").innerHTML = "Calcular nova média";
	document.querySelector("#submit").setAttribute("onclick", "window.location.reload()");
}
