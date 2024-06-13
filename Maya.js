class Maya {

    constructor(imagen) {
        this.tamanio = random(200, 300);
        this.opacidad = 255; // Inicializa la opacidad al máximo
        this.angulo = 0;
        this.rotacion = 0.01;
        this.imagen = imagen;
        this.randomPosX1 = random(0, width/2-100);
        this.randomPosX2 = random (width/2 + 100, width);
        this.x = random(this.randomPosX1, this.randomPosX2);
        this.y = random(0, height - 200);
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


    reducirOpacidad() {
        if(this.opacidad > 0){
            this.opacidad--;
        }
        this.opacidad = min(this.opacidad, 0); // Asegura que la opacidad no sea negativa
    }
}