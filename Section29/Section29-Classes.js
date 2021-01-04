class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
    }

    innerRGB() {
        const {r, g, b} = this;
        return `${r}, ${g}, ${b}`;
    }

    rgb() {
        return `rgb(${this.innerRGB()})`;
    }

    hex() {
        const {r, g, b} = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    rgba(a = 1.0) {
        return `rgb(${this.innerRGB()}, ${a})`;
    }
}

const c1 = new Color(12, 32, 200, "c1");

class Pet {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    eat() {
        return `${this.name} is eating`;
    }
}

class Cat extends Pet {
    constructor(name, age, livesLeft=9) {
        super(name, age);
        this.livesLeft = livesLeft;
    }
    meow() {
        return "Meow";
    }
}

class Dog extends Pet {
    bark() {
        return "Woof";
    }
    eat() {
        return `${this.name} scarfs its food`;
    }
}