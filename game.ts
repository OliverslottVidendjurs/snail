import {Snegl} from "./snegl.js";
import {Score} from "./score.js";

export class Game {
    private readonly racetrack = document.querySelector<HTMLDivElement>("#raceway");
    private readonly tidsinterval = 100;
    private readonly finishLine = 730;
    private readonly yDifference = 100;
    private winners: string[] = [];
    private sek = 0;
    private snegle: Snegl[];
    private score = new Score();

    constructor() {
        this.snegle = [
            new Snegl("a", "Dennis", "img/snegl1.png"),
            new Snegl("b", "George", "img/snegl2.png"),
            new Snegl("c", "Bob", "img/snegl3.png"),
            new Snegl("d", "Harold", "img/snegl4.png"),
        ];
    }

    init() {
        //Should this be in the constructor?
        this.snegle.forEach((snegl, index) => {
            snegl.init(-40 + this.yDifference * index);
        });
        this.addSnailsToBoard();
        this.bindEvents();
    }

    start() {
        document.querySelector<HTMLDivElement>("#startknap")!.style.display = "none";
        this.afsted();
        console.log("test");
    }

    reset() {
        for (let snegl of this.snegle) {
            snegl.reset();
        }
        this.winners = [];
        this.sek = 0;
        document.querySelector<HTMLDivElement>("#resetknap")!.style.display = "none";
        document.querySelector<HTMLParagraphElement>(".resultat p")!.innerText = "";
        this.start();
    }    

    private addSnailsToBoard() {
        for(let snegl of this.snegle){
            let sneglElm = snegl.createElement();
            let nameContainer = document.createElement("div");
            nameContainer.innerHTML = `<p>${snegl.navn}</p>`;
            nameContainer.className = "name-container"
            sneglElm.appendChild(nameContainer);
            this.racetrack!.appendChild(sneglElm);
        }
    }

    private bindEvents() {
        document.querySelector<HTMLDivElement>("#startknap")!.addEventListener("click", () => {
            this.start();
        });

        document.querySelector<HTMLDivElement>("#resetknap")!.addEventListener("click", () => {
            this.reset();
        });
    }

    private afsted() {
        for (let snegl of this.snegle) {
            snegl.move();
            if (snegl.x >= this.finishLine) {
                this.winners.push(snegl.navn);
            }
        }
        if (this.winners.length) {
            this.winner(this.winners);
        } else {
            setTimeout(() => this.afsted(), this.tidsinterval);
            this.sek += 1;
        }
    }

    private winner(vinderen: string[]) {
        let text = document.querySelector<HTMLParagraphElement>(".resultat p");
        let tid = (this.sek * this.tidsinterval) / 1000;
        if (vinderen.length) {
            if (vinderen.length === 1) {
                text!.innerText = `Ræset blev vundet af ${vinderen}! Det tog ${tid} sekunder`
            } else {
                text!.innerText = `Ræset er slut - det blev udafgjort mellem: ${vinderen}! Det tog ${tid} sekunder`;
            }
        }
        this.score.addWinnersToScoreboard(vinderen, tid);
    }
}