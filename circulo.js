class Circulo{

    constructor (){
        this.color = color(80, 54, 105);
        this.posX = random(windowWidth);
        this.posY = random(windowHeight);
        this.tam = 50;
    }

    dibujar(){
        fill(this.color);
        noStroke();
        ellipse(this.posX, this.posY, this.tam, this.tam);
    }
}