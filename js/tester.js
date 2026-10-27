const panel = document.querySelector(".panel");
const tamano = document.getElementById("tamano");
const valorTamano = document.getElementById("valor-tamano");

tamano.addEventListener("input", function () {
  panel.style.setProperty("--muestra-tamano", tamano.value + "px");
  valorTamano.textContent = tamano.value;
});

const grosor = document.getElementById("grosor");
const valorGrosor = document.getElementById("valor-grosor");

grosor.addEventListener("input", function () {
  panel.style.setProperty("--muestra-peso", grosor.value);
  valorGrosor.textContent = grosor.value;
});

const fuente = document.getElementById("fuente");

fuente.addEventListener("input", function () {
  panel.style.setProperty("--muestra-fuente", fuente.value);
});

const lineaIzquierda = document.getElementById("linea-izquierda");
const lineaDerecha = document.getElementById("linea-derecha");
const linea = document.getElementById("linea");

const mensajeIzquierdo = document.getElementById("mensaje-izquierdo");
const mensajeDerecho = document.getElementById("mensaje-derecho");
const mensaje = document.getElementById("mensaje");

function textoSegun(agudeza) {
  if (agudeza >= 1) {
    return "Vista de lince. Aun así, una revisión al año no hace daño.";
  } else if (agudeza >= 0.5) {
    return "No está mal, pero merece la pena que te lo mire un profesional.";
  } else {
    return "Pide cita en una óptica. ¡Sin dramas, esto es un juego!";
  }
}
function nivelSegun(agudeza) {
  if (agudeza >= 1) {
    return "bien";
  } else if (agudeza >= 0.5) {
    return "regular";
  } else {
    return "revision";
  }
}

function evaluar(select, parrrafo) {
  if (select.value === "") {
    parrrafo.textContent = "";
    delete parrrafo.dataset.nivel;
    return;
  }

  parrrafo.textContent = textoSegun(Number(select.value));
  parrrafo.dataset.nivel = nivelSegun(Number(select.value));
  return;
}

lineaDerecha.addEventListener("input", function () {
  evaluar(lineaDerecha, mensajeDerecho);
});

lineaIzquierda.addEventListener("input", function () {
  evaluar(lineaIzquierda, mensajeIzquierdo);
});

linea.addEventListener("input", function () {
  evaluar(linea, mensaje);
  if (linea.value != "" && Number(linea.value) < 0.5) {
    mensaje.textContent +=
      " Ten en cuenta que para renovar el permiso de conducir es necesario una agudeza visual superior a 0,5 con ambos ojos abiertos.";
  }
});

const reiniciar = document.getElementById("reiniciar");
const filaTexto = document.querySelector(".fila-texto[contenteditable]");
const texto = "E F P T O";

reiniciar.addEventListener("click", function () {
  tamano.value = 96;
  panel.style.removeProperty("--muestra-tamano");
  valorTamano.textContent = tamano.value;
  mensajeIzquierdo.textContent = "";
  mensajeDerecho.textContent = "";
  mensaje.textContent = "";
  lineaDerecha.value = "";
  lineaIzquierda.value = "";
  linea.value = "";
  

  grosor.value = 400;
  panel.style.removeProperty("--muestra-peso");
  valorGrosor.textContent = grosor.value;

  fuente.value = "Space Grotesk";
  panel.style.removeProperty("--muestra-fuente");

  filaTexto.textContent = texto;
});
