"use strict";
let snegle = [{
        id: "a",
        navn: "Dennis",
        foto: "img/snegl1.png",
        startY: -40,
        x: 0,
        y: 0
    },
    {
        id: "b",
        navn: "George",
        foto: "img/snegl2.png",
        startY: 40,
        x: 0,
        y: 0
    },
    {
        id: "c",
        navn: "Bob",
        foto: "img/snegl3.png",
        startY: 120,
        x: 0,
        y: 0
    },
    {
        id: "d",
        navn: "Harold",
        foto: "img/snegl4.png",
        startY: 200,
        x: 0,
        y: 0
    }];
let sek = 0;
const minSpring = 3;
const maxSpring = 15;
const tidsinterval = 100;
const finishLine = 730;
const startX = -160;
let winners = [];
let racetrack = document.querySelector("#raceway");
for (let i = 0; i < snegle.length; i++) {
    snegle[i].x = startX;
    snegle[i].y = snegle[i].startY;
    let s = document.createElement("div");
    s.id = snegle[i].id;
    s.className = "snegle-container";
    s.style.backgroundImage = `url("${snegle[i].foto}")`;
    s.style.top = snegle[i].y + "px";
    s.style.left = snegle[i].x + "px";
    let nameContainer = document.createElement("div");
    nameContainer.innerHTML = `<p>${snegle[i].navn}</p>`;
    nameContainer.className = "name-container";
    s.appendChild(nameContainer);
    racetrack.appendChild(s);
}
function start() {
    document.querySelector("#startknap").style.display = "none";
    afsted();
}
function reset() {
    for (let i = 0; i < snegle.length; i++) {
        snegle[i].x = startX;
        snegle[i].y = snegle[i].startY;
    }
    winners = [];
    sek = 0;
    document.querySelector("#resetknap").style.display = "none";
    document.querySelector(".resultat p").innerText = "";
    start();
}
document.querySelector("#resetknap").addEventListener("click", function () {
    reset();
});
function afsted() {
    for (let i = 0; i < snegle.length; i++) {
        snegle[i].x += spring();
        document.querySelector(`#${snegle[i].id}`).style.left = snegle[i].x + "px";
        if (snegle[i].x >= finishLine) {
            winners.push(snegle[i].navn);
        }
    }
    if (winners.length) {
        winner(winners);
    }
    else {
        setTimeout("afsted();", tidsinterval);
        sek += 1;
    }
}
function winner(vinderen) {
    let text = document.querySelector(".resultat p");
    let tid = (sek * tidsinterval) / 1000;
    if (vinderen.length) {
        if (vinderen.length === 1) {
            text.innerText = `Ræset blev vundet af ${vinderen}! Det tog ${tid} sekunder`;
        }
        else {
            text.innerText = `Ræset er slut - det blev udafgjort mellem: ${vinderen}! Det tog ${tid} sekunder`;
        }
    }
    document.querySelector("#resetknap").style.display = "block";
    let parsed = JSON.parse(localStorage.getItem("winner"));
    if (parsed === null) {
        parsed = [];
    }
    for (let vinder of vinderen) {
        parsed.push({ name: vinder, time: tid });
    }
    localStorage.setItem("winner", JSON.stringify(parsed));
    renderTop10();
}
function getTop10() {
    let parsed = JSON.parse(localStorage.getItem("winner"));
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    let top10 = parsed.sort(function (a, b) {
        return a.time - b.time;
    }).slice(0, 10);
    return top10;
}
renderTop10();
function renderTop10() {
    const top10elm = document.querySelector(".top10");
    top10elm.innerHTML = "";
    for (let snegl of getTop10()) {
        top10elm.innerHTML += `<li>${snegl.name}: ${snegl.time}</li>`;
    }
}
function spring() {
    let randomStep = Math.round(Math.random() * maxSpring) + minSpring;
    return randomStep;
}
