class Maya {

    constructor(imagen) {
        this.tamanio = random(100, 250);
        this.opacidad = 255; // Inicializa la opacidad al máximo
        this.angulo = 0;
        this.rotacion = 0.01;
        this.imagen = imagen;
        this.x = random(0, width);
        this.y = random(0, height);
    }

    dibujar() {
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        rotate(this.angulo);
        image(
            this.imagen, 
            0,
            0,
            this.tamanio, 
            this.tamanio
        );
        pop();
    }

    actualizarRotacion(){
        this.angulo+= this.rotacion;
    }

    cambiarDireccion() {
        this.rotacion *= -1;  // Cambia el signo de la velocidad de rotación
    }
}