// lo relacionado al objeto en si mismo
class Mouse {
    constructor() {
        this.posX = 0;
        this.posY = 0;
        this.prevPosX;
        this.prevPosY;
        this.distancia;
        this.ultimoMovimiento = millis();
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
        let velocidadActual = this.velocidad();
        this.distancia = dist(this.prevPosX, this.prevPosY, this.posX, this.posY);
        this.ultimoMovimiento = millis();
        
        // Determinar si el mouse se está moviendo en este frame
        let seMueveElMouseEnEsteFrame = velocidadActual > this.sensibilidad;

        // Comprobar si el estado ha cambiado de quieto a movimiento
        if (seMueveElMouseEnEsteFrame && !this.seMoviaEnElFrameAnterior) {
            console.log("El mouse comenzó a moverse.");
        }

        // Actualizar el estado del frame anterior
        this.seMoviaEnElFrameAnterior = seMueveElMouseEnEsteFrame;

        // Actualizar punto inicial y final para el movimiento
        this.puntoFinalX = mouseX;
        this.puntoFinalY = mouseY;
        this.distancia = dist(this.puntoInicialX, this.puntoInicialY, this.puntoFinalX, this.puntoFinalY);
        this.puntoInicialX = this.puntoFinalX;
        this.puntoInicialY = this.puntoFinalY;
    }

    estaQuieto(){
        // this.registrarRecorrido();
        return this.distancia <= 0;
    } 

    // estaEnMovimiento(){
    //     this.registrarMovimiento();
    //     return this.distancia > 0;
    // }

    // registrarMovimiento() {
    //     this.puntoFinalX = mouseX;
    //     this.puntoFinalY = mouseY;
        
    //     this.distancia = dist(this.puntoInicialX, this.puntoInicialY, this.puntoFinalX, this.puntoFinalY);

    //     this.puntoInicialX = this.puntoFinalX;
    //     this.puntoInicialY = this.puntoFinalY;
    // }

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
