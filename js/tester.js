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

/* para la parte de geolocalización y preguntar donde esté el usuario */

const estadoOpticas = document.getElementById("estado-opticas");
const botonUbicacion = document.getElementById("ubicacion");

function buscarOpticas(lat, lon) {
  estadoOpticas.textContent = "Buscando ópticas cerca…";

  const consulta = `[out:json][timeout:25];
    nwr["shop"="optician"](around:33000,${lat},${lon});
    out center 20;`;

  fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: new URLSearchParams({ data: consulta }),
  })
    .then(function (respuesta) {
      if (!respuesta.ok) {
        throw new Error("Overpass ha respondido " + respuesta.status);
      }
      return respuesta.json();
    })
    .then(function (datos) {
      const opticas = prepararOpticas(datos.elements, lat, lon);
      mostrarOpticas(opticas);
      estadoOpticas.textContent =
        "Hemos encontrado " + datos.elements.length + " ópticas.";
    })
    .catch(function (error) {
      console.log(error);
      estadoOpticas.textContent =
        "Ahora mismo no podemos buscar ópticas. Prueba en un rato.";
    });
}

botonUbicacion.addEventListener("click", function () {
  estadoOpticas.textContent = "Buscando tu ubicación...";

  navigator.geolocation.getCurrentPosition(
    function (posicion) {
      const lat = posicion.coords.latitude;
      const lon = posicion.coords.longitude;
      buscarOpticas(lat, lon);
    },
    function (error) {
      console.lot(error.code, error.message);
      estadoOpticas.textContent =
        "No hemos podido saber dónde estás. Prueba con tu código postal.";
    },
  );
});

// Para mostrar las ópticas según la distancia al usuario. de menos a más
function distanciaEnMetros(lat1, lon1, lat2, lon2) {
  const radioTierra = 6371000;
  const rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad;
  const dLon = (lon2 - lon1) * rad;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * radioTierra * Math.asin(Math.sqrt(a));
}

function prepararOpticas(elementos, lat, lon) {
  const opticas = [];

  elementos.forEach(function (el) {
    const etiquetas = el.tags || {};
    if (!etiquetas.name) {
      return;
    }

    let latOptica = el.lat;
    let lonOptica = el.lon;
    if (el.center) {
      latOptica = el.center.lat;
      lonOptica = el.center.lon;
    }

    opticas.push({
      nombre: etiquetas.name,
      calle: etiquetas["addr:street"],
      numero: etiquetas["addr:housenumber"],
      lat: latOptica,
      lon: lonOptica,
      distancia: distanciaEnMetros(lat, lon, latOptica, lonOptica),
    });
  });

  opticas.sort(function (a, b) {
    return a.distancia - b.distancia;
  });

  return opticas;
}

function formatoDistancia(metros) {
  if (metros < 1000) {
    return Math.round(metros) + " m";
  } else {
    return (metros / 1000).toFixed(1).replace(".", ",") + " km";
  }
}

const listaOpticas = document.getElementById("lista-opticas");

function mostrarOpticas(opticas) {
  listaOpticas.textContent = "";
  if (opticas.length === 0) {
    estadoOpticas.textContent = "No hemos encontrado ópticas a menos de 3 km";
    return;
  }

  estadoOpticas.textContent =
    "Hemos encontrado " + opticas.length + " ópticas.";
  opticas.forEach(function (optica) {
    const li = document.createElement("li");

    const nombre = document.createElement("strong");
    nombre.textContent = optica.nombre;
    li.append(nombre);
    if (optica.calle) {
      let textoDireccion = optica.calle;
      if (optica.numero) {
        textoDireccion = textoDireccion + " " + optica.numero;
      }
      const direccion = document.createElement("span");
      direccion.textContent = textoDireccion;
      li.append(direccion);
    }

    const distancia = document.createElement("span");
    distancia.textContent = formatoDistancia(optica.distancia);
    li.append(distancia);

    listaOpticas.append(li);
  });
}
