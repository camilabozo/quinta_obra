// lo relacionado al objeto en si mismo
class Mouse {
    constructor() {
        this.posX = 0;
        this.posY = 0;
        this.prevPosX;
        this.prevPosY;
        this.distancia;
        this.ultimoMovimiento = millis();
        // this.puntoInicialX = mouseX;
        // this.puntoInicialY = mouseY;
        // this.puntoFinalX = null;
        // this.puntoFinalY = null;

        // this.miDireccionX;
        // this.miDireccionY;
        // this.sensibilidad = 35;
        // this.seMoviaEnElFrameAnterior = false;
        // this.seMueveArriba;
        // this.seMueveAbajo;
        // this.seMueveDerecha;
        // this.seMueveIzquierda;
    }

    velocidad(){
        return dist(this.posX, this.posY, this.prevPosX, this.prevPosY);
        // console.log("velocidad" + this.velocidad);
    }

    actualizarPosiciones(){
        this.prevPosX = this.posX;
        this.prevPosY = this.posY;
        this.posX = mouseX;
        this.posY = mouseY;
    }

    registrarRecorrido() {
        this.actualizarPosiciones();
        this.velocidad(); 
        this.ultimoMovimiento = millis();
        
        // //----- que pasa con el mouse en este frame
        // let seMueveElmouseEnEsteFrame = false;
        // if (this.velocidad > this.sensibilidad && this.velocidad < 150) {
        //     seMueveElmouseEnEsteFrame = true;
        // }

        // this.seMueveArriba = false;
        // this.seMueveAbajo = false;
        // this.seMueveDerecha = false;
        // this.seMueveIzquierda = false;

        // if (seMueveElmouseEnEsteFrame && !this.seMoviaEnElFrameAnterior) {
        //     this.seMueveArriba = (this.posY - this.prevPosY) < -this.sensibilidad;
        //     this.seMueveAbajo = (this.posY - this.prevPosY) > this.sensibilidad;
        //     this.seMueveDerecha = (this.posX - this.prevPosX) > this.sensibilidad;
        //     this.seMueveIzquierda = (this.posX - this.prevPosX) < -this.sensibilidad;
        // }
        // //---- dejo listo todo para el siguiente frame
        // this.seMoviaEnElFrameAnterior = seMueveElmouseEnEsteFrame;
    }

    estaQuieto(){
        this.registrarMovimiento();
        return this.distancia <= 0;
    } 

    // estaEnMovimiento(){
    //     this.registrarMovimiento();
    //     return this.distancia > 0;
    // }

    registrarMovimiento() {
        this.puntoFinalX = mouseX;
        this.puntoFinalY = mouseY;
        
        this.distancia = dist(this.puntoInicialX, this.puntoInicialY, this.puntoFinalX, this.puntoFinalY);

        this.puntoInicialX = this.puntoFinalX;
        this.puntoInicialY = this.puntoFinalY;
    }

    hizoMovimientoCorto(){
        return this.distancia < width/2;
    }
    
    hizoMovimientoRapido(){
        // console.log(this.velocidad);
        return this.velocidad() > 100;
    }

    tiempoInactivo() {
        return millis() - this.ultimoMovimiento;
    }

    hizoMovimientoLargo(){
        return this.distancia > width/2;
    }

    hizoMovimientoLento(){
        return this.velocidad() < 50;
    }

}
