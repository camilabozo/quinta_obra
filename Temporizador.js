class Temporizador {
    constructor(duration) {
        this.duration = duration;
        this.timeRemaining = duration;
        this.isCounting = false;
        this.lastCondition = false;
        this.interval = null;
    }

    iniciar() {
        if (!this.isCounting) {
            this.timeRemaining = this.duration;
            this.isCounting = true;
            this.interval = setInterval(() => {
                this.timeRemaining--;
                // console.log(`Tiempo restante: ${this.timeRemaining}`);
                if (this.timeRemaining <= 0) {
                clearInterval(this.interval);
                this.isCounting = false;
                // console.log("Tiempo agotado. Eliminando figuras.");
                this.onTimeout(); // Llamar a la función cuando el temporizador llegue a cero
                }
            }, 1000);
        }
    }

    reiniciar() {
        clearInterval(this.interval);
        this.timeRemaining = this.duration;
        this.isCounting = false;
        this.iniciar();
    }

    onTimeout() {
        
    }

}
