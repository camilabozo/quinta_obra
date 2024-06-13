let mouse;
let salpicaduras = [];
let mayas = [];
let salpicaduraDibujada = false; // Bandera para controlar la creación de figuras
// let dibujarEnMitadSuperior = true; // Nueva variable para controlar la mitad
let mayaDibujada = false;
let imagenesMayas = [];
const TIEMPO_INACTIVIDAD = 10000; // 10 segundos
const TIEMPO_RETARDO_ULTIMO_DIBUJO = 2000; //2 segundos
let reduciendoOpacidad = false;

function setup () {
  // createCanvas(innerWidth, innerHeight);
  createCanvas(350, 480);
  mouse = new Mouse();
  cargarImagenesMayas();
}
  
function draw () {
  background(208,200,209);
  // background(0);
  //se dibujan los circulos que seran salpicaduras
  for (let i = 0; i < salpicaduras.length; i++) {
    salpicaduras[i].dibujar();
    console.log(salpicaduras.length);
  }  

  //se dibujan los rectangulos que seran los ovalos maya de puntos blancos
  for (let i = 0; i < mayas.length; i++) {
    mayas[i].dibujar();
    mayas[i].actualizarRotacion();
  }
}

function cargarImagenesMayas(){
  for (let i = 0; i < 4; i++) {
    let nombre = 'data/OvaloMaya' + nf(i, 2) + '.png';
    imagenesMayas[i] = loadImage(nombre);
  }
}

function mouseMoved(){
  mouse.registrarRecorrido();
  if(salpicaduras.length < 2){
    if (!mouse.estaQuieto() && mouse.hizoMovimientoCorto() && mouse.hizoMovimientoRapido()) {
      if (!salpicaduraDibujada) { // Solo dibuja una figura por movimiento
        salpicaduras.push(new Salpicadura());
        salpicaduraDibujada = true; // Actualiza la bandera para indicar que ya se dibujó una figura
      }
    } else {
      if (salpicaduraDibujada) {
          console.log("Movimiento no válido, restableciendo bandera");
      }
      salpicaduraDibujada = false; // Restablece la bandera cuando el movimiento no cumple las condiciones
    }
  }

  if (mayas.length < 3) {
    if (!mouse.estaQuieto() && !mayaDibujada) {
      console.log("Se dibuja la maya");
      mayas.push(new Maya(random(imagenesMayas)));
      mayaDibujada = true; // Actualiza la bandera para indicar que ya se dibujó una maya
    } else if (mouse.estaQuieto()) {
      console.log("No se dibuja la maya.");
      mayaDibujada = false; // Permitir agregar una nueva maya cuando el mouse se mueva nuevamente
    }
  }
}

function mousePressed() {
  for (let i = 0; i < mayas.length; i++) {
    mayas[i].cambiarDireccion();  // Cambia la dirección de rotación de cada rectángulo
    console.log("Se cambia la dirección de rotación.");
  } // Cambia la dirección de rotación del rectángulo
}
