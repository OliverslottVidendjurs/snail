"use strict";
class Snegl {
    constructor(id, navn, foto) {
        this.minSpring = 3;
        this.maxSpring = 15;
        this.id = id;
        this.navn = navn;
        this.foto = foto;
        this.startX = -160;
        this.x = this.startX;
        this.y = 0;
        this.element = null;
    }
    init(startY) {
        this.y = startY;
        this.createAndAppendElement();
    }
    move() {
        this.x += this.spring();
        this.render();
        return this;
    }
    reset() {
        this.x = this.startX;
        this.render();
        return this;
    }
    createAndAppendElement() {
        let s = document.createElement("div");
        s.id = this.id;
        s.className = "snegle-container";
        s.style.backgroundImage = `url("${this.foto}")`;
        s.style.top = this.y + "px";
        s.style.left = this.x + "px";
        this.element = s;
        let nameContainer = document.createElement("div");
        nameContainer.innerHTML = `<p>${this.navn}</p>`;
        nameContainer.className = "name-container";
        s.appendChild(nameContainer);
        game.racetrack.appendChild(s);
    }
    render() {
        if (this.element !== null) {
            this.element.style.left = this.x + "px";
        }
        else {
            console.error("Call init before calling render!");
        }
    }
    spring() {
        let randomStep = Math.round(Math.random() * this.maxSpring) + this.minSpring;
        return randomStep;
    }
}
class Game {
    constructor() {
        this.winners = [];
        this.sek = 0;
        this.score = new Score();
        this.racetrack = document.querySelector("#raceway");
        this.tidsinterval = 100;
        this.finishLine = 730;
        this.yDifference = 100;
        this.snegle = [
            new Snegl("a", "Dennis", "img/snegl1.png"),
            new Snegl("b", "George", "img/snegl2.png"),
            new Snegl("c", "Bob", "img/snegl3.png"),
            new Snegl("d", "Harold", "img/snegl4.png"),
        ];
    }
    init() {
        this.snegle.forEach((snegl, index) => {
            snegl.init(-40 + this.yDifference * index);
        });
        this.bindEvents();
    }
    start() {
        document.querySelector("#startknap").style.display = "none";
        this.afsted();
    }
    reset() {
        for (let snegl of this.snegle) {
            snegl.reset();
        }
        this.winners = [];
        this.sek = 0;
        document.querySelector("#resetknap").style.display = "none";
        document.querySelector(".resultat p").innerText = "";
        game.start();
    }
    bindEvents() {
        document.querySelector("#startknap").addEventListener("click", function () {
            game.start();
        });
        document.querySelector("#resetknap").addEventListener("click", function () {
            game.reset();
        });
    }
    afsted() {
        for (let snegl of this.snegle) {
            snegl.move();
            if (snegl.x >= this.finishLine) {
                this.winners.push(snegl.navn);
            }
        }
        if (this.winners.length) {
            this.winner(this.winners);
        }
        else {
            setTimeout(() => this.afsted(), this.tidsinterval);
            this.sek += 1;
        }
    }
    winner(vinderen) {
        let text = document.querySelector(".resultat p");
        let tid = (this.sek * this.tidsinterval) / 1000;
        if (vinderen.length) {
            if (vinderen.length === 1) {
                text.innerText = `Ræset blev vundet af ${vinderen}! Det tog ${tid} sekunder`;
            }
            else {
                text.innerText = `Ræset er slut - det blev udafgjort mellem: ${vinderen}! Det tog ${tid} sekunder`;
            }
        }
        this.score.addWinnersToScoreboard(vinderen, tid);
    }
}
class Score {
    constructor() {
        this.renderTop10();
    }
    addWinnersToScoreboard(winners, tid) {
        document.querySelector("#resetknap").style.display = "block";
        let parsed = JSON.parse(localStorage.getItem("winner"));
        if (parsed === null) {
            parsed = [];
        }
        for (let vinder of winners) {
            parsed.push({ name: vinder, time: tid });
        }
        localStorage.setItem("winner", JSON.stringify(parsed));
        this.renderTop10();
    }
    renderTop10() {
        const top10elm = document.querySelector(".top10");
        top10elm.innerHTML = "";
        for (let snegl of this.getTop10()) {
            top10elm.innerHTML += `<li>${snegl.name}: ${snegl.time}</li>`;
        }
    }
    getTop10() {
        let parsed = JSON.parse(localStorage.getItem("winner"));
        if (parsed) {
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            let top10 = parsed.sort(function (a, b) {
                return a.time - b.time;
            }).slice(0, 10);
            return top10;
        }
        else {
            return [];
        }
    }
}
let game = new Game();
game.init();
