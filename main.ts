type snegl = {
    id: string,
    navn: string,
    foto: string,
    startY: number,
    x: number,
    y: number
}

let snegle: snegl[] = [{
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
let winners: string[] = [];

let racetrack = document.querySelector<HTMLDivElement>("#raceway");

for(let i = 0; i < snegle.length; i++){
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
    nameContainer.className = "name-container"
    s.appendChild(nameContainer);
    racetrack!.appendChild(s);
}

function start(){
    document.querySelector<HTMLDivElement>("#startknap")!.style.display = "none";
    afsted();
}

function reset(){
    for(let i = 0; i < snegle.length; i++){
        snegle[i].x = startX;
        snegle[i].y = snegle[i].startY;
    }
    winners = [];
    sek = 0;
    document.querySelector<HTMLDivElement>("#resetknap")!.style.display = "none";
    document.querySelector<HTMLParagraphElement>(".resultat p")!.innerText = "";
    start();
}

document.querySelector("#resetknap")!.addEventListener("click", function(){
    reset();
});

function afsted(){
    for(let i = 0; i < snegle.length; i++){
        snegle[i].x += spring();
        document.querySelector<HTMLDivElement>(`#${snegle[i].id}`)!.style.left = snegle[i].x + "px";
        if(snegle[i].x >= finishLine){
            winners.push(snegle[i].navn);
        }
    }
    if(winners.length) {        
        winner(winners);
    } else {
        setTimeout("afsted();", tidsinterval);
        sek += 1;
    }

}

function winner(vinderen: string[]) {
    let text = document.querySelector<HTMLParagraphElement>(".resultat p");
    let tid = (sek * tidsinterval) / 1000;
    if(vinderen.length){
        if(vinderen.length === 1){
            text!.innerText = `Ræset blev vundet af ${vinderen}! Det tog ${tid} sekunder`
        } else {
            text!.innerText = `Ræset er slut - det blev udafgjort mellem: ${vinderen}! Det tog ${tid} sekunder`;
        }
    }
    document.querySelector<HTMLDivElement>("#resetknap")!.style.display = "block";
}

function spring(): number{
    let randomStep = Math.round(Math.random() * maxSpring) + minSpring;
    return randomStep;
}