class Ovalo {

    constructor(imagen) {
        this.tamanio = random(100, 400);
        this.imagen = imagen;
        this.x = random([random(0, width / 2 - 100), random(width / 2 + 100, width)]);
        this.y = random(0, height - 200);
    }

    dibujar() {
        image(this.imagen, 0, 0, this.tamanio, this.tamanio);
    }
}