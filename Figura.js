class Figura {

    constructor(x, y, w, h, tipo) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.opacidad = 255; // Inicializa la opacidad al máximo
        this.color = random(255);
        this.tipo = tipo;
    }


    dibujar() {
        noStroke();
        fill(this.color, this.color, this.color, this.opacidad);
        if(this.tipo = "ellipse"){
            ellipse(this.x, this.y, this.width, this.height);
        }else if(this.tipo = "rectangulo"){
            rect(this.x, this.y, this.w, this.h);
        }
    }

    reducirOpacidad() {
        if(this.opacidad > 0){
            this.opacidad--;
        }
        this.opacidad = min(this.opacidad, 0); // Asegura que la opacidad no sea negativa
    }
}