let mouse;
let temporizadorGeneral;
let temporizadorMayas;
let temporizadorOvalosDeColor;
let temporizadorFacturas;
let temporizadorSalpicaduras;
let salpicaduras = [];
let salpicaduraDibujada = false; // Bandera para controlar la creación de figuras
let mayas = [];
let imagenesMayas = [];
let ovalosDeColor = [];
let imagenesOvalosDeColor = [];
let facturas = [];
let imagenesFacturas = [];
const TIEMPO_INACTIVIDAD = 10; // 10 segundos
const TIEMPO_RETARDO_ULTIMO_DIBUJO = 2; // 2 segundos

function setup () {
  // createCanvas(innerWidth, innerHeight);
  createCanvas(350, 480);
  mouse = new Mouse(100, 300);
  temporizadorGeneral = new Temporizador(TIEMPO_INACTIVIDAD);
  temporizadorMayas = new Temporizador(TIEMPO_RETARDO_ULTIMO_DIBUJO);
  temporizadorOvalosDeColor = new Temporizador(TIEMPO_RETARDO_ULTIMO_DIBUJO);
  temporizadorFacturas = new Temporizador(TIEMPO_RETARDO_ULTIMO_DIBUJO);
  temporizadorSalpicaduras = new Temporizador(TIEMPO_RETARDO_ULTIMO_DIBUJO);
  cargarImagenesMayas();
  cargarImagenesOvalosDeColor();
  cargarImagenesFacturas();

  temporizadorGeneral.onTimeout = () => {
    salpicaduras = [];
    mayas = [];
    facturas = [];
    ovalosDeColor = [];
  };

  temporizadorGeneral.iniciar();
}
  
function draw () {
  background(208,200,209);
  // background(0);
  mouse.registrarRecorrido();
  
  for (let i = 0; i < ovalosDeColor.length; i++) {
    ovalosDeColor[i].dibujar();
  }  
  
  for (let i = 0; i < mayas.length; i++) {
    mayas[i].dibujar();
    mayas[i].actualizarRotacion();
  }

  for (let i = 0; i < facturas.length; i++) {
    facturas[i].dibujar();
  }
  
  for (let i = 0; i < salpicaduras.length; i++) {
    salpicaduras[i].dibujar();
  }  
}

function cargarImagenesMayas(){
  for (let i = 0; i < 4; i++) {
    let nombre = 'data/OvaloMaya' + nf(i, 2) + '.png';
    imagenesMayas[i] = loadImage(nombre);
  }
}

function cargarImagenesOvalosDeColor(){
  for (let i = 0; i < 1; i++) {
    let nombre = 'data/ovaloPrincipal.png';
    imagenesOvalosDeColor[i] = loadImage(nombre);
  }
}

function cargarImagenesFacturas(){
  for (let i = 0; i < 1; i++) {
    let nombre = 'data/trazoDorado.png';
    imagenesFacturas[i] = loadImage(nombre);
  }
}

function mouseMoved(){
  if (ovalosDeColor.length < 3) {
    if (!mouse.isMoving && mouse.hizoMovimientoLargo() && mouse.hizoMovimientoLento() && !temporizadorOvalosDeColor.isCounting) {
      console.log("Se agrega un Ovalo de color al array");
      ovalosDeColor.push(new Ovalo(random(imagenesOvalosDeColor)));
      temporizadorOvalosDeColor.iniciar();
    } 
  }

  if (mayas.length < 4) {
    if (!mouse.isMoving && !temporizadorMayas.isCounting) {
      mayas.push(new Maya(random(imagenesMayas)));
      temporizadorMayas.iniciar();
    } 
  }

  if (facturas.length < 3) {
    if (!mouse.isMoving && mouse.hizoMovimientoLargo() && mouse.hizoMovimientoRapido() && !temporizadorFacturas.isCounting) {
      console.log("Se agrega una factura al array");
      facturas.push(new Factura(random(imagenesFacturas)));
      temporizadorFacturas.iniciar();
    } 
  }
  
  if(salpicaduras.length < 2){
    if (!mouse.isMoving && mouse.hizoMovimientoCorto() && mouse.hizoMovimientoRapido() && !temporizadorSalpicaduras.isCounting) {
      salpicaduras.push(new Salpicadura());
      temporizadorSalpicaduras.iniciar();
    }
  }

  temporizadorGeneral.reiniciar();
}


function mousePressed() {
  for (let i = 0; i < mayas.length; i++) {
    mayas[i].cambiarDireccion();  // Cambia la dirección de rotación de cada rectángulo
  }
}
