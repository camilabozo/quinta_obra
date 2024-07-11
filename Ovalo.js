class Ovalo {
    constructor(imagen) {
        this.tamanio = this.calcularTamanio();
        console.log(this.tamanio);
        this.imagen = imagen;
        // this.dibujarEnMitadSuperior = random() > 0.5; // Decisión aleatoria de dibujar en mitad superior o inferior
        let intentos = 0;
        do {
            this.x = random(random(-20, width / 2 - 100), random(width / 2 + 200, width + 20)); // Posición aleatoria en X
            this.y = random(random(-20, height / 2 - 150), random(height / 2 + 150, height + 20)); // Posición en Y basada en la mitad superior o inferior
            intentos++;
        } while (this.haySuperposicion() && intentos < 10000); // Evitar bucles infinitos
        if (intentos >= 10000) {
            console.log('No se encontró una posición adecuada para el óvalo después de 1000 intentos.');
        }
    }

    calcularTamanio(){
        let tamanio;
        if(ovalosDeColor.length > 0){
            tamanio = random(100, 300);
        }else{
            tamanio = random(400, 450);
        }
        return tamanio;
    }

    haySuperposicion() {
        let haySuperposicion = false;
        for (let i = 0; i < ovalosDeColor.length; i++) {
            if (seSuperponen(this, ovalosDeColor[i]) && !haySuperposicion) {
                haySuperposicion = true;
            }
        }
        return haySuperposicion;
    }

    // determinarY() {
    //     if (this.dibujarEnMitadSuperior) {
    //         return random(-5, height / 2); // Mitad superior
    //     } else {
    //         return random(height / 2 + 20, height - this.tamanio); // Mitad inferior
    //     }
    // }
    
    dibujar() {
        push()
        imageMode(CENTER);
        image(this.imagen, this.x, this.y, this.tamanio, this.tamanio);
        pop()
    }
    
}