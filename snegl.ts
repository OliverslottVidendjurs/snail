export class Snegl {
    private readonly minSpring = 3;
    private readonly maxSpring = 15;
    private readonly startX: number = -160;
    private _x: number = this.startX;
    private y: number = 0;
    private element: HTMLDivElement | null = null;

    constructor(
        readonly id: string,
        readonly navn: string,
        readonly foto: string) { }

    init(startY: number) {
        this.y = startY;  
    }

    move() {
        this._x += this.spring();
        this.render();
        return this;
    }

    reset() {
        this._x = this.startX;
        this.render();
        return this;
    }

    createElement() {
        let s = document.createElement("div");
        s.id = this.id;
        s.className = "snegle-container";
        s.style.backgroundImage = `url("${this.foto}")`;
        s.style.top = this.y + "px";
        s.style.left = this.x + "px";
        this.element = s;
        return this.element;
    }

    private render(): void {
        if (this.element !== null) {
            this.element.style.left = this._x + "px";
        } else {
            console.error("Call init before calling render!");
        }
    }

    private spring(): number {
        let randomStep = Math.round(Math.random() * this.maxSpring) + this.minSpring;
        return randomStep;
    }


    get x() {
        return this._x;
    }
}