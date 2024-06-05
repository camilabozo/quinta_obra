let mouse;
let figuras = [];
let figuraDibujada = false; // Bandera para controlar la creación de figuras
const TIEMPO_INACTIVIDAD = 10000; // 10 segundos
const TIEMPO_RETARDO_ULTIMO_DIBUJO = 2000; //2 segundos
let reduciendoOpacidad = false;
let b = 0;

function setup () {
    createCanvas(innerWidth, innerHeight);
    mouse = new Mouse();
    background(208,200,209);
  }
  
function draw () {
  if(mouse.velocidad()>50){
    b++;
    if(b>255){
      b = 0;
    }
  
  }else{
    b-=0.2;
    b = max(0,b);
  
  }
  
  background(b);
  for (let i = 0; i < figuras.length; i++) {
    figuras[i].dibujar();
  }

//   if (reduciendoOpacidad) {
//     frameRate(10); // Reducir el frame rate mientras se reduce la opacidad
//     reducirOpacidadFiguras(); // Reduce la opacidad de las figuras si estamos en modo de reducción
//     frameRate(); // Restaurar el frame rate al valor predeterminado
// }

  // Verifica el tiempo de inactividad del mouse
//   if (mouse.tiempoInactivo() > TIEMPO_INACTIVIDAD) {
//     console.log("el mouse esta quieto +10seg")
//       reduciendoOpacidad = true; // Inicia la reducción de opacidad
//   }
// } 

// function reducirOpacidadFiguras() {
//   for (let i = figuras.length - 1; i >= 0; i--) {
//       figuras[i].reducirOpacidad();
//       if (figuras[i].opacidad <= 0) {
//           figuras.splice(i, 1); // Elimina la figura si su opacidad es cero
//         }
//         background(208, 200, 209); // Redibuja el fondo solo cuando se elimina una figura
//   }
// }
}

function mouseMoved(){
  mouse.registrarRecorrido();
  // reduciendoOpacidad = false; // Detiene la reducción de opacidad si el mouse se mueve
  // if(contadorParaVolveraDibujar()){
    if (!mouse.estaQuieto() && mouse.hizoMovimientoCorto() && mouse.hizoMovimientoRapido()) {
      console.log("entró a corto y rapido");
        if (!figuraDibujada) { // Solo dibuja una figura por movimiento
      console.log("se dibuja ellipse");
            figuras.push(
              new Figura(
                random(width - 50), 
                random(height - 50), 
                random(100), 
                random(100), 
                "ellipse"
              )
            );
            figuraDibujada = true; // Actualiza la bandera para indicar que ya se dibujó una figura
            console.log("Figura dibujada");
        }
    } else {
        if (figuraDibujada) {
            console.log("Movimiento no válido, restableciendo bandera");
        }
        figuraDibujada = false; // Restablece la bandera cuando el movimiento no cumple las condiciones
    }
// }

  //   if (!mouse.estaQuieto() && mouse.hizoMovimientoLargo() && mouse.hizoMovimientoLento()) {
  //     console.log("entró a largo y lento");
  //     if (!figuraDibujada) { // Solo dibuja una figura por movimiento
  //     console.log("se dibuja rectangulo");
  //         figuras.push(
  //           new Figura(
  //             random(width - 50), 
  //             random(height - 50), 
  //             random(100), 
  //             random(100), 
  //             "rectangulo"
  //           )
  //         );
  //         figuraDibujada = true; // Actualiza la bandera para indicar que ya se dibujó una figura
  //         console.log("Figura dibujada");
  //     }
  //   } else {
  //     if (figuraDibujada) {
  //         console.log("Movimiento no válido, restableciendo bandera");
  //     }
  //     figuraDibujada = false; // Restablece la bandera cuando el movimiento no cumple las condiciones
  //   }

  // }


}

function contadorParaVolveraDibujar(){
  console.log(millis() - mouse.ultimoMovimiento > TIEMPO_RETARDO_ULTIMO_DIBUJO);
  return millis() - mouse.ultimoMovimiento > TIEMPO_RETARDO_ULTIMO_DIBUJO;
}

// function eliminarFiguras() {
//   frameRate(-1);
//   console.log("Se tienen que eliminar");
//   console.log(figuras.length);

//   while (figuras.length > 0) {
//       figuras.pop();
//       background(208, 200, 209);
//   }
//   console.log(figuras.length);
// }