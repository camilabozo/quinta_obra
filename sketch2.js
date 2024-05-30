//Para usarlo primero debemos declarar un objeto Dir_y_Vel. Será uno por cada puntero que querramos seguir
let miVelocidadYDireccion;

function setup() {
  createCanvas(innerWidth, innerHeight);
  // Inicializo el objeto, no necesito pasarle parametros.
  miVelocidadYDireccion = new Movimiento();
}

function draw() {
  background(196,197,203);

  //Lo priemero que deberia hacer es pasarle los parametros x e y que quiero calcular, en este caso el mouse
  miVelocidadYDireccion.calcularMovimiento(mouseX, mouseY);

  //Para usarlo, simplemente se le pregunta al objet por alguno de los valores. En la medida que los necesitemos

  //miVelocidadYDireccion.velocidad();
  //miVelocidadYDireccion.direccionX();
  //miVelocidadYDireccion.direccionY();
  //miVelocidadYDireccion.direccionPolar();

  //Esta es una funcion solo para ver en pantalla si esta funcionando todo ok
  // miVelocidadYDireccion.mostrarData();
}
// fin del draw

