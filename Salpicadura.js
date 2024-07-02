let dibujarEnMitadSuperior = true; // Variable global para controlar la mitad

class Salpicadura {

    constructor() {
        // Calcular la posición aleatoria una vez
        this.tamanio = 300;
        this.x = random(0, width - this.tamanio);
        this.y = this.determinarMitad();
        this.opacidad = 255; // Inicializa la opacidad al máximo
        this.color = random(255);
        this.imagenes = [];
        this.cantidadImagenesCamino1 = 32;
        this.imagenesCargadas = false; // Bandera para saber si las imágenes han sido cargadas
        // this.dibujarEnMitadSuperior = true; // Variable para controlar la mitad
    }

    cargarImagenes(){
        for (let i = 0; i < this.cantidadImagenesCamino1; i++) {
            let nombre = 'data/Puntitos1' + nf(i, 2) + '.png';
            this.imagenes[i] = loadImage(nombre);
        }
        this.imagenesCargadas = true; // Marca las imágenes como cargadas
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


    dibujar() {
        if (!this.imagenesCargadas) {
            this.cargarImagenes(); // Carga las imágenes solo una vez
        }

        for (let i = 0; i < this.cantidadImagenesCamino1; i++) {
            image(this.imagenes[i], this.x, this.y, this.tamanio, this.tamanio);
        }
    }
}