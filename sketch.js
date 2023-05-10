let cantidadDeFormas = 0;
let limiteDeFormas = 1;
let cuadrados = []; // Array para guardar los cuadrados
let circulos = []; // Array para guardar ellipses
let seDibujo = false;
let direccionUltimoMovimiento;
let historialMovimientos = [null, null];
const IZQUIERDA = "IZQUIERDA";
const DERECHA = "DERECHA";


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
}

function draw() {
  background(187, 188, 181);

  // Dibujar los cuadrados guardados
  for (let i = 0; i < cuadrados.length; i++) {
    cuadrados[i].dibujar();
  }

  // Dibujar los ellipses guardados
  for (let i = 0; i < circulos.length; i++) {
    circulos[i].dibujar();
  }
}

function mouseMoved() {
  if (movioDerecha() && !seDibujo){
    // Guardar un nuevo circulo en el array
    circulos.push(new Circulo());
    seDibujo = true;
  }

  if (movioIzquierda() && !seDibujo) {
    // Guardar un nuevo cuadrado en el array
    cuadrados.push(new Cuadrado());
    seDibujo = true;
  }

  if(historialMovimientos[1] != historialMovimientos[0]){
    seDibujo = false;
  }
}

function movioDerecha() {
  if (mouseX > pmouseX) { 
    actualizarHistorialMovimientos(DERECHA);
    return true;
  }
  return false;
}

function movioIzquierda() {
  if (mouseX < pmouseX) {
    actualizarHistorialMovimientos(IZQUIERDA);
    return true;
  }
  return false;
}

function actualizarHistorialMovimientos(ultimoMovimiento){
  historialMovimientos[0] = historialMovimientos[1];
  historialMovimientos[1] = ultimoMovimiento;
}