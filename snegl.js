var Snegl = /** @class */ (function () {
    function Snegl(id, navn, foto) {
        this.id = id;
        this.navn = navn;
        this.foto = foto;
        this.minSpring = 3;
        this.maxSpring = 15;
        this.startX = -160;
        this._x = this.startX;
        this.y = 0;
        this.element = null;
    }
    Snegl.prototype.init = function (startY) {
        this.y = startY;
    };
    Snegl.prototype.move = function () {
        this._x += this.spring();
        this.render();
        return this;
    };
    Snegl.prototype.reset = function () {
        this._x = this.startX;
        this.render();
        return this;
    };
    Snegl.prototype.createElement = function () {
        var s = document.createElement("div");
        s.id = this.id;
        s.className = "snegle-container";
        s.style.backgroundImage = "url(\"" + this.foto + "\")";
        s.style.top = this.y + "px";
        s.style.left = this.x + "px";
        this.element = s;
        return this.element;
    };
    Snegl.prototype.render = function () {
        if (this.element !== null) {
            this.element.style.left = this._x + "px";
        }
        else {
            console.error("Call init before calling render!");
        }
    };
    Snegl.prototype.spring = function () {
        var randomStep = Math.round(Math.random() * this.maxSpring) + this.minSpring;
        return randomStep;
    };
    Object.defineProperty(Snegl.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    return Snegl;
}());
export { Snegl };
