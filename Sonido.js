class Sonido {
    constructor() {
        this.modelo = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';
        this.frecuencia;
        this.pitch;
        this.minFreq = 20;                      // frecuencia mínima esperada
        this.maxFreq = 2000;                    // frecuencia máxima esperada
        this.micThreshold = 0.08;               // umbral de volumen para detectar pitch
        this.normalizedPitch = 0;               // valor normalizado del pitch
        this.normalizedMicLevel = 0;            // valor normalizado del volumen
        this.maxAmplitude = -1;
        this.haySonido = false;                 // variable para indicar si hay sonido detectado
        this.inicioSonidoMillis = 0;            // variable para almacenar el tiempo de inicio del sonido en millis
        this.audioContext = getAudioContext();
        this.mic = new p5.AudioIn();            // objeto del micrófono
        userStartAudio();
        this.duracionSonidoSegundos = 0;        // variable para almacenar la duración del sonido en segundos
        this.durationThreshold1 = 0.5;
        this.durationThreshold2 = 1;
        this.pitchThreshold = 0.10;
        this.duration = '';
        this.tone = '';
        this.clap = false;
        this.volume = '';
    }

    startPitch() {
        this.pitch = ml5.pitchDetection(
            this.modelo, 
            this.audioContext, 
            this.mic.stream,
            this.modelLoaded.bind(this)
        );
    }

    modelLoaded() {
        this.getPitch();
    }

    getPitch() {
        this.pitch.getPitch((err, frequency) => {
            if (frequency) {
                this.frecuencia = frequency;
                this.normalizedPitch = map(this.frecuencia, this.minFreq, this.maxFreq, 0, 1);
            } else {
                this.normalizedPitch = 0; // Reiniciar el pitch normalizado a 0 si no hay frecuencia
            }
            this.getPitch(); // Llamar de nuevo a getPitch para seguir detectando el pitch
        }, this);
    }

    evaluarSonido() {
        // Actualizar el nivel de volumen del micrófono
        let micLevel = this.mic.getLevel(); // Obtener el nivel de volumen del micrófono (va del 0 al 1.0)
        this.normalizedMicLevel = map(micLevel, 0, 1, 0, 1);
        
        // Actualizar haySonido basado en micThreshold y micLevel
        this.haySonido = micLevel > this.micThreshold;

        // Actualizar la mayor amplitud detectada
        if (micLevel > this.maxAmplitude) {
            this.maxAmplitude = micLevel;
        }

        // Calcular la duración del sonido si se ha detectado el inicio y el fin
        if (this.haySonido && !this.inicioSonidoMillis) {
            this.inicioSonidoMillis = millis(); // Capturar el momento de inicio del sonido
        } else if (!this.haySonido && this.inicioSonidoMillis) {
            // Calcular la duración del sonido en segundos
            this.duracionSonidoSegundos = (millis() - this.inicioSonidoMillis) / 1000;
            this.inicioSonidoMillis = 0; // Reiniciar el tiempo de inicio del sonido
            this.calculateTone();
            this.calculateDuration();
            this.calculateVolumeLevel();
            this.clap = this.duration == 'APLAUSO' && this.maxAmplitude >= 0.22
            console.log('------------------------------------------------------');
            console.log("Duracion: " + this.duration);
            console.log("Tono: " + this.tone);
            console.log("Amplitud: " + this.volume);
            console.log('------------------------------------------------------');
            this.maxAmplitude = -1;
        }

        // this.mostrarParametrosEnPantalla()
    }

    calculateTone(){
        this.tone = this.normalizedPitch < this.pitchThreshold ? 'GRAVE' : 'AGUDO';
    }

    calculateVolumeLevel(){
        this.volume = this.maxAmplitude > 0.20 ? 'ALTO' : 'BAJO';
    }

    calculateDuration(){
        if(this.duracionSonidoSegundos < this.durationThreshold1){
            this.duration = 'APLAUSO';
        }else if(this.duracionSonidoSegundos > this.durationThreshold1 && this.duracionSonidoSegundos < this.durationThreshold2){
            this.duration = 'CORTO';
        }else if(this.duracionSonidoSegundos > this.durationThreshold2){
            this.duration = 'LARGO';
        }
    }

    resetValuesForNextSound() {
        this.duration = ''
        this.tone = ''
        this.clap = false;
    }


    mostrarParametrosEnPantalla(){
        // Mapear normalizedMicLevel al rango de altura de salto
        let alturaSalto = map(this.normalizedMicLevel, 0, 1, 0, height);
        // Mapear normalizedPitch al color
        let colorPitch = map(this.normalizedPitch, 0, 1, 0, 255);
        let fillColor = color(colorPitch, 100, 100);
        fill(fillColor);
    
        // Hacer que la elipse pequeña salte solo cuando hay sonido
        let y = height / 2;
        if (this.haySonido) {
          y = height - alturaSalto; // Usar alturaSalto para el salto
        }
    
        ellipse(width / 2, y, 10, 10); // Elipse que salta con el sonido
        ellipse(width / 2, height / 2, 50, 50); // Elipse fija en el centro del lienzo
    
        // Mostrar los valores normalizados en la pantalla
        fill(0);
        textSize(20);
        text('Pitch normalizado: ' + this.normalizedPitch.toFixed(2), 10, height - 60);
        text('Volumen normalizado: ' + this.normalizedMicLevel.toFixed(2), 10, height - 30);
        text('haySonido: ' + this.haySonido, 10, height - 10);
        text('Duración del sonido: ' + this.duracionSonidoSegundos.toFixed(2) + ' segundos', 10, height - 90);
    }
}