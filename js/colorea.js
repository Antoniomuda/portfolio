var colorActivo = "";
var sePuedePintar = false;
window.addEventListener("load", iniciar);

function crearTablaDibujo() {
  var tablaDibujo;
  var titulo;
  var fila;

  tablaDibujo = document.createElement("table");

  tablaDibujo.setAttribute("border", 1);
  tablaDibujo.classList.add("tablerodibujo");
  tablaDibujo.id = "tablero";

  titulo = document.createElement("caption");
  textoTitulo = document.createTextNode(
    "Haga click en cualquier tecla para activar/desactivar el Pincel.",
  );
  titulo.appendChild(textoTitulo);

  tablaDibujo.appendChild(titulo);

  for (var i = 0; i < 30; i++) {
    fila = document.createElement("tr");
    for (var j = 0; j < 30; j++) {
      celda = document.createElement("td");
      fila.appendChild(celda);
    }
    tablaDibujo.appendChild(fila);
  }

  zonadibujo.appendChild(tablaDibujo);
}

function activarColor() {
  let tdsColores = this.parentNode.getElementsByTagName("td");
  Array.from(tdsColores).forEach((tdColor) => {
    tdColor.classList.remove("seleccionado");
  });

  this.classList.add("seleccionado");

  this.classList.forEach((clase) => {
    if (clase.indexOf("color") != -1) {
      colorActivo = clase;
    }
  });
}

function activarPintar() {
  if (sePuedePintar) {
    sePuedePintar = false;
    pincel.innerHTML = "PINCEL DESACTIVADO";
  } else {
    sePuedePintar = true;
    pincel.innerHTML = "PINCEL ACTIVADO";
    this.classList.forEach((clase) => {
      this.classList.remove(clase);
    });
    this.classList.add(colorActivo);
  }
}

function pintar() {
  if (sePuedePintar) {
    this.classList.forEach((clase) => {
      this.classList.remove(clase);
    });
    this.classList.add(colorActivo);
  }
}

function iniciar() {
  crearTablaDibujo();
  tdsColores = paleta.getElementsByTagName("tr")[0].getElementsByTagName("td");
  Array.from(tdsColores).forEach((tdColor) => {
    tdColor.addEventListener("click", activarColor);
  });

  tdsTablero = tablero.getElementsByTagName("td");
  Array.from(tdsTablero).forEach((tdTablero) => {
    tdTablero.addEventListener("mouseover", pintar);
    tdTablero.addEventListener("click", activarPintar);
  });
}
