class Factura {

    constructor(imagen) {
        this.tamanio = random(300, 800);
        this.imagen = imagen;
        this.x = random([random(-50, width / 2 - 100), random(width / 2, width-100)]);
        this.y = random(-20, height - 200);
    }

    dibujar() {
        image(this.imagen, 0, 0, this.tamanio, this.tamanio);
    }
}