let backgroundImage;
let mouse;
let sonido;
let temporizadorInactividad;
let temporizadorMayas;
let temporizadorOvalosDeColor;
let temporizadorFacturas;
let temporizadorSalpicaduras;
let salpicaduras = [];
let imagenesSalpicadura1 = [];
let imagenesSalpicadura2 = [];
let mayas = [];
let imagenesMayas = [];
let ovalosDeColor = [];
let imagenesOvalosDeColoresFrios = [];
let imagenesOvalosDeColoresCalidos = [];
let facturas = [];
let imagenesFacturas = [];
const TIEMPO_INACTIVIDAD = 10; // 10 segundos
const TIEMPO_RETARDO_ULTIMO_DIBUJO = 2; // 2 segundos

function setup () {
  // createCanvas(innerWidth, innerHeight);
  createCanvas(350, 480);
  // mouse = new Mouse(100, 300);

  sonido = new Sonido();
  sonido.mic.start(sonido.startPitch.bind(sonido)); // Iniciar el micrófono y la detección de pitch

  temporizadorInactividad = new Temporizador(TIEMPO_INACTIVIDAD);
  temporizadorMayas = new Temporizador(TIEMPO_RETARDO_ULTIMO_DIBUJO);
  temporizadorOvalosDeColor = new Temporizador(TIEMPO_RETARDO_ULTIMO_DIBUJO);
  temporizadorFacturas = new Temporizador(TIEMPO_RETARDO_ULTIMO_DIBUJO);
  temporizadorSalpicaduras = new Temporizador(TIEMPO_RETARDO_ULTIMO_DIBUJO);
  cargarImagenesMayas();
  cargarImagenesOvalosDeColor();
  cargarImagenesFacturas();
  cargarImagenesSalpicaduras();
  backgroundImage = loadImage('data/background.png');

  temporizadorInactividad.onTimeout = () => {
    console.log("entró a ontimeout");
    salpicaduras = [];
    mayas = [];
    facturas = [];
    ovalosDeColor = [];
  };

  temporizadorInactividad.iniciar();
}
  
function draw () {
  background(backgroundImage, 255);
  // background(0);
  // mouse.registrarRecorrido();

  if (sonido.haySonido) {
    temporizadorInactividad.reiniciar();
  }

  sonido.evaluarSonido();

  crearObra();

  sonido.resetValuesForNextSound();
  
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
    let nombre = 'data/mayas' + nf(i, 2) + '.png';
    imagenesMayas[i] = loadImage(nombre);
  }
}

function cargarImagenesSalpicaduras(){
  for (let i = 0; i < 32; i++) {
    let nombre = 'data/salpicadura1' + nf(i, 2) + '.png';
    imagenesSalpicadura1[i] = loadImage(nombre);
  }
  imagenesSalpicadura2[0] = loadImage('data/salpicadura200.png');
}


function cargarImagenesOvalosDeColor(){
  for (let i = 0; i < 3; i++) {
    let ovaloFrio = 'data/ovaloDeColorFrio' + nf(i, 2) + '.png';
    let ovaloCalido = 'data/ovaloDeColorCalido' + nf(i, 2) + '.png';
    imagenesOvalosDeColoresFrios[i] = loadImage(ovaloFrio);
    imagenesOvalosDeColoresCalidos[i] = loadImage(ovaloCalido);
  }
}

function cargarImagenesFacturas(){
  for (let i = 0; i < 5; i++) {
    let nombre = 'data/facturas' + nf(i, 2) + '.png';
    imagenesFacturas[i] = loadImage(nombre);
  }
}

function crearObra() {

  if (mayas.length < 4) {
    if (sonido.haySonido && !temporizadorMayas.isCounting) {
      // console.log("Finalizo un sonido");
      mayas.push(new Maya(random(imagenesMayas)));
      temporizadorMayas.iniciar();
    }
  }

  if (ovalosDeColor.length < 3) {
    if (sonido.duration == 'LARGO' && sonido.tone == 'GRAVE' && !temporizadorOvalosDeColor.isCounting) {
      if(sonido.volume == 'ALTO'){
          ovalosDeColor.push(new Ovalo(random(imagenesOvalosDeColoresCalidos)));
          console.log("dibujo uno calido");
      }else if (sonido.volume == 'BAJO'){
          ovalosDeColor.push(new Ovalo(random(imagenesOvalosDeColoresFrios)));
          console.log("dibujo uno frio");
      }
      temporizadorOvalosDeColor.iniciar();
    }
  }

  if (facturas.length < 3) {
    if (sonido.duration == 'LARGO' && sonido.tone == 'AGUDO' && !temporizadorFacturas.isCounting) {
      // console.log("Finalizo, es largo y agudo");
      facturas.push(new Factura(random(imagenesFacturas)));
      temporizadorFacturas.iniciar();
    }
  }

  if (salpicaduras.length < 5) {
    if (sonido.duration == 'CORTO' && sonido.tone == 'AGUDO' && !temporizadorSalpicaduras.isCounting) {
      let imagenesParaSalpicadura = random() > 0.5 ? imagenesSalpicadura1 : imagenesSalpicadura2;
      salpicaduras.push(new Salpicadura(imagenesParaSalpicadura));
      temporizadorSalpicaduras.iniciar();
    }
  }

  if (sonido.clap) {
    console.log("APLAUDIO");
    for (let i = 0; i < mayas.length; i++) {
      mayas[i].cambiarDireccion();
    }
  }

}

