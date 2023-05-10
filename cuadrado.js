class Cuadrado{

    constructor (){
        this.color = color(255, 24, 5);
        this.posX = random(windowWidth);
        this.posY = random(windowHeight);
        this.tam = 50;
    }

    dibujar(){
        fill(this.color);
        noStroke();
        rect(this.posX, this.posY, this.tam, this.tam);
    }
}