let dibujarEnMitadSuperior = true; // Variable global para controlar la mitad

class Salpicadura {

    constructor() {
        // Calcular la posición aleatoria una vez
        this.x = 0;
        this.y = this.determinarMitad();
        this.width = 300;
        this.height = 300;
        this.opacidad = 255; // Inicializa la opacidad al máximo
        this.color = random(255);
        this.imagenes = [];
        this.cantidadImagenesCamino1 = 32;
        this.imagenesCargadas = false; // Bandera para saber si las imágenes han sido cargadas
        this.dibujarEnMitadSuperior = true; // Variable para controlar la mitad
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
            yPos = random(0, height / 2); // Mitad superior, asegurando visibilidad
        } else {
            yPos = random(height / 2, height); // Mitad inferior, asegurando visibilidad
        }
        dibujarEnMitadSuperior = !dibujarEnMitadSuperior; // Alternar mitad
        return yPos;
    }


    dibujar() {
        if (!this.imagenesCargadas) {
            this.cargarImagenes(); // Carga las imágenes solo una vez
        }

        // let x = 200; // Calcular la posición x aleatoria
        // let y = this.determinarMitad(); // Calcular la posición y según la mitad
        
        for (let i = 0; i < this.cantidadImagenesCamino1; i++) {
            image(this.imagenes[i], this.x, this.y, this.width, this.height);
        }
    }

    reducirOpacidad() {
        if(this.opacidad > 0){
            this.opacidad--;
        }
        this.opacidad = min(this.opacidad, 0); // Asegura que la opacidad no sea negativa
    }
}