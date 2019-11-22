interface winnerStorageType {
    name: string,
    time: number
}

export class Score {
    constructor() {
        this.renderTop10();
    }

    addWinnersToScoreboard(winners: string[], tid: number) {
        document.querySelector<HTMLDivElement>("#resetknap")!.style.display = "block";
        let parsed: winnerStorageType[] = JSON.parse(localStorage.getItem("winner") as string);
        if (parsed === null) {
            parsed = [];
        }
        for (let vinder of winners) {
            parsed.push({ name: vinder, time: tid });
        }
        localStorage.setItem("winner", JSON.stringify(parsed));
        this.renderTop10();
    }

    private renderTop10() {
        const top10elm = document.querySelector<HTMLUListElement>(".top10");
        top10elm!.innerHTML = "";

        for (let snegl of this.getTop10()) {
            top10elm!.innerHTML += `<li>${snegl.name}: ${snegl.time}</li>`
        }
    }

    private getTop10(): winnerStorageType[] {
        let parsed: winnerStorageType[] = JSON.parse(localStorage.getItem("winner") as string);
        if (parsed) {
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            let top10 = parsed.sort(function (a, b) {
                return a.time - b.time;
            }).slice(0, 10);
            return top10;
        } else {
            return [];
        }
    }
}