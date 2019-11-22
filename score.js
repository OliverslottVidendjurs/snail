var Score = /** @class */ (function () {
    function Score() {
        this.renderTop10();
    }
    Score.prototype.addWinnersToScoreboard = function (winners, tid) {
        document.querySelector("#resetknap").style.display = "block";
        var parsed = JSON.parse(localStorage.getItem("winner"));
        if (parsed === null) {
            parsed = [];
        }
        for (var _i = 0, winners_1 = winners; _i < winners_1.length; _i++) {
            var vinder = winners_1[_i];
            parsed.push({ name: vinder, time: tid });
        }
        localStorage.setItem("winner", JSON.stringify(parsed));
        this.renderTop10();
    };
    Score.prototype.renderTop10 = function () {
        var top10elm = document.querySelector(".top10");
        top10elm.innerHTML = "";
        for (var _i = 0, _a = this.getTop10(); _i < _a.length; _i++) {
            var snegl = _a[_i];
            top10elm.innerHTML += "<li>" + snegl.name + ": " + snegl.time + "</li>";
        }
    };
    Score.prototype.getTop10 = function () {
        var parsed = JSON.parse(localStorage.getItem("winner"));
        if (parsed) {
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            var top10 = parsed.sort(function (a, b) {
                return a.time - b.time;
            }).slice(0, 10);
            return top10;
        }
        else {
            return [];
        }
    };
    return Score;
}());
export { Score };
