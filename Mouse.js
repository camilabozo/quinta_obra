class Mouse {
    constructor(speedThreshold, distanceThreshold) {
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.distance;
        this.speed;
        this.speedThreshold = speedThreshold;
        this.distanceThreshold = distanceThreshold;
        this.isMoving = false;
    }

    registrarRecorrido() {
        if (mouseX !== pmouseX || mouseY !== pmouseY) {
            if (!this.isMoving) {
                this.startMovement(mouseX, mouseY, millis());
            }
            this.updateMovement(mouseX, mouseY, millis());
        } else if (this.isMoving) {
            this.stopMovement();
        }
    }

    startMovement(x, y, time) {
        this.startX = x;
        this.startY = y;
        this.startTime = time;
        this.isMoving = true;
    }
    
    updateMovement(x, y, time) {
        this.endX = x;
        this.endY = y;
        this.endTime = time;
    }
    
    stopMovement() {
        this.isMoving = false;
        this.distance = dist(this.startX, this.startY, this.endX, this.endY);
        let elapsedTime = (this.endTime - this.startTime) / 1000;
        this.speed = this.distance / elapsedTime;
    }

    hizoMovimientoCorto(){
        if(this.distance < this.distanceThreshold) console.log("MOVIMIENTO CORTO");
        return this.distance < this.distanceThreshold;
    }
    
    hizoMovimientoLargo(){
        if(this.distance > this.distanceThreshold) console.log("MOVIMIENTO LARGO");
        return this.distance > this.distanceThreshold;
    }

    hizoMovimientoRapido(){
        if(this.speed > this.speedThreshold) console.log("MOVIMIENTO RAPIDO ");
        return this.speed > this.speedThreshold;
    }

    hizoMovimientoLento(){
        if(this.speed < this.speedThreshold) console.log("MOVIMIENTO LENTO");
        return this.speed < this.speedThreshold;
    }

}
