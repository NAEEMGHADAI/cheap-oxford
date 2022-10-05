document.querySelector("button").addEventListener("click", getFetch);

const mainSec = document.querySelector(".mainSec");
const header = document.querySelector(".header");
const phonetics = document.querySelector(".phonetics");
const Definitions = document.querySelector(".Definitions");
const notfound = document.querySelector(".notfound");

function getFetch() {
	const input = document.querySelector("input");
	const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;

	fetch(url)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			clear();
			// console.log(data[0]);
			mainSec.removeAttribute("hidden");
			createHeader(data[0], header);
			createPhonetics(data[0], phonetics);
			createDef(data[0].meanings, Definitions);
		})
		.catch((err) => {
			notfound.innerText = "Cannot find this word please try something else";
			console.log(`error ${err}`);
		});
}

function clear() {
	header.innerHTML = "";
	Definitions.innerHTML = "";
	phonetics.innerHTML = "";
	notfound.innerHTML = "";
}

function playAudio(url) {
	var music = new Audio();
	function playMusic(file) {
		music.pause();
		music = new Audio(file);
		music.play();
	}
	playMusic(url);
}
function createHeader(val) {
	let heading = document.createElement("h2");
	heading.innerText = val.word;
	header.appendChild(heading);
}

function createPhonetics(val) {
	let ulP = document.createElement("ul");
	phonetics.appendChild(ulP);
	val.phonetics.forEach((element) => {
		if (element.text && element.audio) {
			let liP = document.createElement("li");
			let img = document.createElement("img");
			img.src = "https://img.icons8.com/windows/22/ffffff/speaker.png";
			img.className = "speaker";
			img.addEventListener("click", (e) => {
				playAudio(element.audio);
			});
			liP.innerHTML = element.text;
			liP.className = "liP";
			liP.appendChild(img);
			ulP.appendChild(liP);
		}
	});
}

function createDef(val) {
	let def = document.createElement("h3");
	def.innerText = "Definitions";
	Definitions.appendChild(def);
	let olDef = document.createElement("ol");
	Definitions.appendChild(olDef);
	for (let index = 0; index < val.length; index++) {
		// console.log(data[0].meanings[index].definitions);
		for (let j = 0; j < val[index].definitions.length; j++) {
			let liDef = document.createElement("li");
			// console.log(data[0].meanings[index].definitions[j].definition);
			liDef.innerText =
				val[index].definitions[j].definition +
				" " +
				"(" +
				val[index].partOfSpeech +
				")";
			olDef.appendChild(liDef);
		}
	}
}
