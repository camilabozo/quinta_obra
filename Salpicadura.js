let dibujarEnMitadSuperior = true; // Variable global para controlar la mitad
class Salpicadura {

    constructor(imagenes) {
        // Calcular la posición aleatoria una vez
        this.tamanio = 300;
        this.x = random(0, width - this.tamanio);
        this.y = this.determinarMitad();
        this.opacidad = 255; // Inicializa la opacidad al máximo
        this.color = random(255);
        this.imagenes = imagenes;
    }
    
    dibujar() {
        for (let i = 0; i < this.imagenes.length; i++) {
            image(this.imagenes[i], this.x, this.y, this.tamanio, this.tamanio);
        }
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