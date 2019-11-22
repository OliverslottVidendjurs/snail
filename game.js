import { Snegl } from "./snegl.js";
import { Score } from "./score.js";
var Game = /** @class */ (function () {
    function Game() {
        this.racetrack = document.querySelector("#raceway");
        this.tidsinterval = 100;
        this.finishLine = 730;
        this.yDifference = 100;
        this.winners = [];
        this.sek = 0;
        this.score = new Score();
        this.snegle = [
            new Snegl("a", "Dennis", "img/snegl1.png"),
            new Snegl("b", "George", "img/snegl2.png"),
            new Snegl("c", "Bob", "img/snegl3.png"),
            new Snegl("d", "Harold", "img/snegl4.png"),
        ];
    }
    Game.prototype.init = function () {
        var _this = this;
        //Should this be in the constructor?
        this.snegle.forEach(function (snegl, index) {
            snegl.init(-40 + _this.yDifference * index);
        });
        this.addSnailsToBoard();
        this.bindEvents();
    };
    Game.prototype.start = function () {
        document.querySelector("#startknap").style.display = "none";
        this.afsted();
        console.log("test");
    };
    Game.prototype.reset = function () {
        for (var _i = 0, _a = this.snegle; _i < _a.length; _i++) {
            var snegl = _a[_i];
            snegl.reset();
        }
        this.winners = [];
        this.sek = 0;
        document.querySelector("#resetknap").style.display = "none";
        document.querySelector(".resultat p").innerText = "";
        this.start();
    };
    Game.prototype.addSnailsToBoard = function () {
        for (var _i = 0, _a = this.snegle; _i < _a.length; _i++) {
            var snegl = _a[_i];
            var sneglElm = snegl.createElement();
            var nameContainer = document.createElement("div");
            nameContainer.innerHTML = "<p>" + snegl.navn + "</p>";
            nameContainer.className = "name-container";
            sneglElm.appendChild(nameContainer);
            this.racetrack.appendChild(sneglElm);
        }
    };
    Game.prototype.bindEvents = function () {
        var _this = this;
        document.querySelector("#startknap").addEventListener("click", function () {
            _this.start();
        });
        document.querySelector("#resetknap").addEventListener("click", function () {
            _this.reset();
        });
    };
    Game.prototype.afsted = function () {
        var _this = this;
        for (var _i = 0, _a = this.snegle; _i < _a.length; _i++) {
            var snegl = _a[_i];
            snegl.move();
            if (snegl.x >= this.finishLine) {
                this.winners.push(snegl.navn);
            }
        }
        if (this.winners.length) {
            this.winner(this.winners);
        }
        else {
            setTimeout(function () { return _this.afsted(); }, this.tidsinterval);
            this.sek += 1;
        }
    };
    Game.prototype.winner = function (vinderen) {
        var text = document.querySelector(".resultat p");
        var tid = (this.sek * this.tidsinterval) / 1000;
        if (vinderen.length) {
            if (vinderen.length === 1) {
                text.innerText = "R\u00E6set blev vundet af " + vinderen + "! Det tog " + tid + " sekunder";
            }
            else {
                text.innerText = "R\u00E6set er slut - det blev udafgjort mellem: " + vinderen + "! Det tog " + tid + " sekunder";
            }
        }
        this.score.addWinnersToScoreboard(vinderen, tid);
    };
    return Game;
}());
export { Game };
