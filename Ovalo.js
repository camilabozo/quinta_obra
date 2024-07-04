class Ovalo {

    constructor(imagen) {
        this.tamanio = random(100, 500);
        this.imagen = imagen;
        this.x = random(0, width);
        this.y = this.determinarMitad();
    }

    dibujar() {
        image(this.imagen, 0, 0, this.tamanio, this.tamanio);
    }

    determinarMitad() {
        let yPos;
        if (dibujarEnMitadSuperior) {
            yPos = floor(random(0, height / 2 - this.tamanio)); // Mitad superior, asegurando visibilidad
        } else {
            yPos = floor(random(height / 2, height - this.tamanio)); // Mitad inferior, asegurando visibilidad
        }
        dibujarEnMitadSuperior = !dibujarEnMitadSuperior; // Alternar mitad
        return yPos;
    }
}