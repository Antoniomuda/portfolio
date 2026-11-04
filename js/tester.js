const respuestas = {
  agudeza: { od: "", oi: "", ao: "" },
  duocromo: { od: "", oi: "" },
  amsler: { od: "", oi: "" },
};

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
  respuestas.agudeza.od = lineaDerecha.value;
});

lineaIzquierda.addEventListener("input", function () {
  evaluar(lineaIzquierda, mensajeIzquierdo);
  respuestas.agudeza.oi = lineaIzquierda.value;
});

linea.addEventListener("input", function () {
  evaluar(linea, mensaje);
  respuestas.agudeza.ao = linea.value;

  if (linea.value !== "" && Number(linea.value) < 0.5) {
    mensaje.textContent +=
      " Ten en cuenta que para renovar el permiso de conducir es necesario una agudeza visual igual o superior a 0,5 con ambos ojos abiertos.";
  }
});

// Botón Reiniciar: devuelve el mando a sus valores iniciales y borra todas las respuestas
const reiniciar = document.getElementById("reiniciar");
const filaTexto = document.querySelector(".fila-texto[contenteditable]");
const textoInicial = filaTexto.textContent;

reiniciar.addEventListener("click", function () {
  // El mando
  tamano.value = tamano.defaultValue;
  valorTamano.textContent = tamano.value;
  grosor.value = grosor.defaultValue;
  valorGrosor.textContent = grosor.value;
  fuente.value = "Space Grotesk";
  panel.style.removeProperty("--muestra-tamano");
  panel.style.removeProperty("--muestra-peso");
  panel.style.removeProperty("--muestra-fuente");
  filaTexto.textContent = textoInicial;

  // Todas las respuestas
  document.querySelectorAll(".paso select").forEach(function (select) {
    select.value = "";
  });
  document.querySelectorAll(".paso .mensaje").forEach(function (parrafo) {
    parrafo.textContent = "";
    delete parrafo.dataset.nivel;
  });
  respuestas.agudeza = { od: "", oi: "", ao: "" };
  respuestas.duocromo = { od: "", oi: "" };
  respuestas.amsler = { od: "", oi: "" };
});
// funcion duocromo

function textoDuocromo(color) {
  if (color === "rojo") {
    return "Ves mejor sobre el rojo. Puede indicar algo de miopía sin corregir, o que tus gafas se quedan cortas si ya eres miope.";
  } else if (color === "verde") {
    return "Ves mejor sobre el verde. Puede indicar algo de hipermetropía sin corregir, o que tus gafas se pasan de graduación si eres miope.";
  } else if (color === "igual") {
    return "Lo ves igual en los dos fondos: buena señal, el enfoque parece equilibrado.";
  }
  return "";
}

function nivelDuocromo(color) {
  if (color === "igual") {
    return "bien";
  }
  return "regular";
}

const duocromoDerecho = document.getElementById("duocromo-derecho");
const mensajeDuocromoDerecho = document.getElementById(
  "mensaje-duocromo-derecho",
);

duocromoDerecho.addEventListener("input", function () {
  respuestas.duocromo.od = duocromoDerecho.value;
  mensajeDuocromoDerecho.textContent = textoDuocromo(duocromoDerecho.value);
  mensajeDuocromoDerecho.dataset.nivel = nivelDuocromo(duocromoDerecho.value);
});

const duocromoIzquierdo = document.getElementById("duocromo-izquierdo");
const mensajeDuocromoIzquierdo = document.getElementById(
  "mensaje-duocromo-izquierdo",
);

duocromoIzquierdo.addEventListener("input", function () {
  respuestas.duocromo.oi = duocromoIzquierdo.value;
  mensajeDuocromoIzquierdo.textContent = textoDuocromo(duocromoIzquierdo.value);
  mensajeDuocromoIzquierdo.dataset.nivel = nivelDuocromo(
    duocromoIzquierdo.value,
  );
});

// Rejilla de Amsler
function textoAmsler(respuesta) {
  if (respuesta === "si") {
    return "No te alarmes, pero actúa rápido: que la rejilla se vea mal no significa que te vayas a quedar ciego, pero sí que necesitas que un especialista te revise lo antes posible.";
  } else if (respuesta === "no") {
    return "Todo recto: buena señal. Repite la prueba de vez en cuando, sobre todo a partir de los 50.";
  }
  return "";
}

function nivelAmsler(respuesta) {
  if (respuesta === "si") {
    return "revision";
  }
  return "bien";
}

const amslerDerecho = document.getElementById("amsler-derecho");
const mensajeAmslerDerecho = document.getElementById("mensaje-amsler-derecho");

amslerDerecho.addEventListener("input", function () {
  respuestas.amsler.od = amslerDerecho.value;
  mensajeAmslerDerecho.textContent = textoAmsler(amslerDerecho.value);
  mensajeAmslerDerecho.dataset.nivel = nivelAmsler(amslerDerecho.value);
});

const amslerIzquierdo = document.getElementById("amsler-izquierdo");
const mensajeAmslerIzquierdo = document.getElementById(
  "mensaje-amsler-izquierdo",
);

amslerIzquierdo.addEventListener("input", function () {
  respuestas.amsler.oi = amslerIzquierdo.value;
  mensajeAmslerIzquierdo.textContent = textoAmsler(amslerIzquierdo.value);
  mensajeAmslerIzquierdo.dataset.nivel = nivelAmsler(amslerIzquierdo.value);
});

// resumen

const resumen = document.getElementById("resumen");
const nombresOjos = {
  od: "Ojo derecho",
  oi: "Ojo izquierdo",
  ao: "Los dos ojos",
};

function crearBloque(titulo) {
  const bloque = document.createElement("div");
  bloque.className = "bloque-resumen";
  const encabezado = document.createElement("h3");
  encabezado.textContent = titulo;
  bloque.append(encabezado);
  resumen.append(bloque);
  return bloque;
}

function anadirLinea(bloque, ojo, texto, nivel) {
  const parrafo = document.createElement("p");
  parrafo.className = "mensaje";
  if (nivel) {
    parrafo.dataset.nivel = nivel;
  }
  parrafo.textContent = nombresOjos[ojo] + ": " + texto;
  bloque.append(parrafo);
}

function mostrarResumen() {
  resumen.textContent = "";

  // Agudeza visual
  const bloqueAgudeza = crearBloque("Agudeza visual");
  ["od", "oi", "ao"].forEach(function (ojo) {
    const valor = respuestas.agudeza[ojo];
    if (valor === "") {
      anadirLinea(bloqueAgudeza, ojo, "sin responder", "");
      return;
    }
    const agudeza = Number(valor);
    anadirLinea(
      bloqueAgudeza,
      ojo,
      valor.replace(".", ",") + ". " + textoSegun(agudeza),
      nivelSegun(agudeza),
    );
  });

  // Duocromo
  const bloqueDuocromo = crearBloque("Duocromo");
  ["od", "oi"].forEach(function (ojo) {
    const valor = respuestas.duocromo[ojo];
    if (valor === "") {
      anadirLinea(bloqueDuocromo, ojo, "sin responder", "");
      return;
    }
    anadirLinea(
      bloqueDuocromo,
      ojo,
      textoDuocromo(valor),
      nivelDuocromo(valor),
    );
  });

  // Rejilla de Amsler
  const bloqueAmsler = crearBloque("Rejilla de Amsler");
  ["od", "oi"].forEach(function (ojo) {
    const valor = respuestas.amsler[ojo];
    if (valor === "") {
      anadirLinea(bloqueAmsler, ojo, "sin responder", "");
      return;
    }
    anadirLinea(bloqueAmsler, ojo, textoAmsler(valor), nivelAmsler(valor));
  });

  // Consejos, solo si algún ojo ve deformaciones
  if (respuestas.amsler.od === "si" || respuestas.amsler.oi === "si") {
    const bloqueConsejos = crearBloque("📝 Consejos mientras esperas la cita");
    const lista = document.createElement("ul");
    [
      "Haz la prueba todos los días, para ver si el problema cambia, empeora o se mantiene igual.",
      "Si usas gafas para leer, póntelas siempre para hacer la prueba.",
      "Hazla a unos 30–40 centímetros de distancia y con buena luz.",
      "No mires a los lados: clava la mirada en el punto central y nota las distorsiones «de reojo».",
    ].forEach(function (consejo) {
      const item = document.createElement("li");
      item.textContent = consejo;
      lista.append(item);
    });
    bloqueConsejos.append(lista);
  }
}

/* para la parte de geolocalización y preguntar donde esté el usuario */

const estadoOpticas = document.getElementById("estado-opticas");
const botonUbicacion = document.getElementById("ubicacion");

function buscarOpticas(lat, lon) {
  estadoOpticas.textContent =
    "Buscando ópticas cerca (esta operación puede tardar unos segudos, ten paciencia)…";

  const consulta = `[out:json][timeout:25];
    nwr["shop"="optician"](around:3000,${lat},${lon});
    out center;`;

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
      if (opticas.length > 0) {
        pintarMapa(opticas, lat, lon);
      } else {
        contenedorMapa.hidden = true;
      }
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
      console.log(error.code, error.message);
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

  return opticas.slice(0, 10);
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
    estadoOpticas.textContent = "No hemos encontrado ópticas a menos de 3 km.";
    return;
  }

  estadoOpticas.textContent =
    "Hemos encontrado " + opticas.length + " ópticas a menos de 3 km.";
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
      direccion.className = "optica-direccion";
      direccion.textContent = textoDireccion;
      li.append(direccion);
    }

    const distancia = document.createElement("span");
    distancia.className = "optica-distancia";
    distancia.textContent = formatoDistancia(optica.distancia);
    li.append(distancia);

    const enlace = document.createElement("a");
    enlace.href =
      "https://www.openstreetmap.org/?mlat=" +
      optica.lat +
      "&mlon=" +
      optica.lon +
      "#map=19/" +
      optica.lat +
      "/" +
      optica.lon;
    enlace.textContent = "Ver en el mapa";
    enlace.className = "optica-mapa";
    enlace.target = "_blank";
    enlace.setAttribute("aria-label", "Ver " + optica.nombre + " en el mapa");
    li.append(enlace);

    listaOpticas.append(li);
  });
}

// Mapa de ópticas con Leaflet
const contenedorMapa = document.getElementById("mapa");
let mapa = null;
let capaMarcadores = null;

function pintarMapa(opticas, lat, lon) {
  contenedorMapa.hidden = false;

  // El mapa se crea solo la primera vez
  if (mapa === null) {
    mapa = L.map("mapa");
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapa);
    capaMarcadores = L.layerGroup().addTo(mapa);
  }

  // Borra los marcadores de la búsqueda anterior
  capaMarcadores.clearLayers();

  // Tú: un punto rojo
  L.circleMarker([lat, lon], {
    radius: 9,
    color: "#fff",
    weight: 3,
    fillColor: "#d9262b",
    fillOpacity: 1,
  })
    .bindPopup("Estás aquí")
    .addTo(capaMarcadores);

  const puntos = [[lat, lon]];

  // Cada óptica: un círculo con su número
  opticas.forEach(function (optica, indice) {
    const icono = L.divIcon({
      className: "marcador-optica",
      html: String(indice + 1),
      iconSize: [32, 32],
    });

    const popup = document.createElement("strong");
    popup.textContent = optica.nombre;

    L.marker([optica.lat, optica.lon], { icon: icono, title: optica.nombre })
      .bindPopup(popup)
      .addTo(capaMarcadores);

    puntos.push([optica.lat, optica.lon]);
  });

  // Encuadra el mapa para que se vea todo
  mapa.fitBounds(puntos, { padding: [32, 32] });
  mapa.invalidateSize();
}
// a partir de aqui uso Nominatim para convertir el texto de la dirección introducida por
// el usuario en coordenadas.

function buscarDireccion(texto) {
  estadoOpticas.textContent = "Buscando la dirección…";

  const parametros = new URLSearchParams({
    q: texto,
    format: "json",
    limit: 1,
    countrycodes: "es",
  });

  fetch("https://nominatim.openstreetmap.org/search?" + parametros)
    .then(function (respuesta) {
      if (!respuesta.ok) {
        throw new Error("Nominatim ha respondido " + respuesta.status);
      }
      return respuesta.json();
    })
    .then(function (resultados) {
      if (resultados.length === 0) {
        estadoOpticas.textContent =
          "No encontramos esa dirección. Prueba con otro código postal.";
        return;
      }
      const lat = Number(resultados[0].lat);
      const lon = Number(resultados[0].lon);
      buscarOpticas(lat, lon);
    })
    .catch(function (error) {
      console.log(error);
      estadoOpticas.textContent =
        "Ahora mismo no podemos buscar direcciones. Prueba en un rato.";
    });
}

const formularioDireccion = document.getElementById("buscar-direccion");
const direccion = document.getElementById("direccion");
formularioDireccion.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const texto = direccion.value.trim();
  if (texto === "") {
    estadoOpticas.textContent = "Escribe un código postal o una dirección.";
    return;
  }
  buscarDireccion(texto);
});
//funcion para ocultar y mostrar pruebas, pestañas

// Pestañas de pruebas
const recorrido = document.querySelector(".recorrido");
const botonesPrueba = document.querySelectorAll(".recorrido button");
const secciones = document.querySelectorAll(".prueba");

function mostrarPrueba(nombre) {
  secciones.forEach(function (seccion) {
    if (seccion.id === nombre) {
      seccion.hidden = false;
    } else {
      seccion.hidden = true;
    }
  });

  botonesPrueba.forEach(function (boton) {
    if (boton.dataset.prueba === nombre) {
      boton.setAttribute("aria-expanded", "true");
    } else {
      boton.setAttribute("aria-expanded", "false");
    }
  });

  recorrido.hidden = nombre === "inicio";

  if (nombre === "resultado") {
    mostrarResumen();
  }
}

botonesPrueba.forEach(function (boton) {
  boton.addEventListener("click", function () {
    mostrarPrueba(boton.dataset.prueba);
  });
});

mostrarPrueba("inicio");

// Gestión del boton siguiente para navegar entre test
const botonesSiguiente = document.querySelectorAll(".siguiente");

botonesSiguiente.forEach(function (boton) {
  boton.addEventListener("click", function () {
    mostrarPrueba(boton.dataset.ir);
    window.scrollTo(0, 0);
  });
});
