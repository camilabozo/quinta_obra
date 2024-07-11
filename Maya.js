class Maya {
    constructor(imagen) {
        this.tamanio = random(290, 310);
        this.opacidad = 255;
        this.angulo = 0;
        this.rotacion = random(0.001, 0.01) * (random() > 0.5 ? 1 : -1);
        this.imagen = imagen;
        let intentos = 0;
        do {
            this.centroX = random(random(-20, width / 2 - 100), random(width / 2 + 200, width + 20));
            this.centroY = random(random(-20, height / 2 - 150), random(height / 2 + 150, height + 20));
            this.radio = random(10, 30);
            this.anguloOrbital = random(TWO_PI);
            this.velocidadOrbital = random(0.005, 0.02) * (random() > 0.5 ? 1 : -1);
            this.x = this.centroX + cos(this.anguloOrbital) * this.radio;
            this.y = this.centroY + sin(this.anguloOrbital) * this.radio;
            intentos++;
        } while (this.haySuperposicion() && intentos < 100); // Evitar bucles infinitos
    }

    haySuperposicion() {
        for (let i = 0; i < mayas.length; i++) {
            if (seSuperponen(this, mayas[i])) {
                return true;
            }
        }
        return false;
    }

    dibujar() {
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        rotate(this.angulo);
        image(this.imagen, 0, 0, this.tamanio, this.tamanio);
        pop();
    }

    actualizarRotacion() {
        this.angulo += this.rotacion;
        this.anguloOrbital += this.velocidadOrbital;

        // Actualiza la posición x, y según la órbita
        this.x = this.centroX + cos(this.anguloOrbital) * this.radio;
        this.y = this.centroY + sin(this.anguloOrbital) * this.radio;
    }

    cambiarDireccion() {
        this.rotacion *= -1; // Cambia el signo de la velocidad de rotación
        this.velocidadOrbital *= -1; // Cambia el signo de la velocidad orbital
    }
}