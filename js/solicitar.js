const formSolicitarViaje = document.querySelector(".form-solicitarViaje");
const nombre = document.getElementById("nombre");
const celular = document.getElementById("celular");
const pasajeros = document.getElementById("pasajeros");
const alertaError = document.querySelector(".alerta-error");
const alertaExito = document.querySelector(".alerta-exito");
const contenedorBienvenido = document.getElementById("container");

const nombreL = /^[a-zA-Z0-9\ \-]{2,40}$/;
const celularL = /^[0-9]{8,10}$/;
const pasajerosL = /^[1-9]{1}$/;

const estadoValidacionCampo = {
  nombre: false,
  celular: false,
  pasajeros: false,
};

document.addEventListener("DOMContentLoaded", () => {
  formSolicitarViaje.addEventListener("submit", (e) => {
    e.preventDefault();
    enviarSolicitud();
  });
  nombre.addEventListener("input", () => {
    validarCampo(nombreL, nombre, "El nombre debe tener mas de 2 a 20 digitos");
  });
  celular.addEventListener("input", () => {
    validarCampo(
      celularL,
      celular,
      "El numero de celular debe contener de 8 a 10 numeros : 1122222332 O 44445555"
    );
  });
  pasajeros.addEventListener("input", () => {
    validarCampo(
      pasajerosL,
      pasajeros,
      "La cantidad de pasajero debe ser mayor a 0 "
    );
  });
});

function validarCampo(regularExpresion, campo, mensaje) {
  const validarCampo = regularExpresion.test(campo.value);
  if (validarCampo) {
    eliminarAlerta(campo.parentElement.parentElement);
    estadoValidacionCampo[campo.id] = true;
    campo.parentElement.classList.remove("error");
    return;
  }
  estadoValidacionCampo[campo.id] = false;
  mostrarAlerta(campo.parentElement.parentElement, mensaje);
  campo.parentElement.classList.add("error");
}

function mostrarAlerta(referencia, mensaje) {
  eliminarAlerta(referencia);
  const alertaDiv = document.createElement("div");
  alertaDiv.classList.add("alerta");
  alertaDiv.textContent = mensaje;
  referencia.appendChild(alertaDiv);
}

function eliminarAlerta(referencia) {
  const alerta = referencia.querySelector(".alerta");
  if (alerta) {
    alerta.remove();
  }
}

function enviarSolicitud() {
  if (
    estadoValidacionCampo.nombre &&
    estadoValidacionCampo.celular &&
    estadoValidacionCampo.pasajeros
  ) {
    formSolicitarViaje.reset();
    alertaExito.classList.add("alertaExito");
    alertaError.classList.remove("alertaError");
    estadoValidacionCampo.nombre = false;
    estadoValidacionCampo.celular = false;
    estadoValidacionCampo.pasajeros = false;

    // primero esperar 2 seg
    // segundo borrar el formulario
    contenedorBienvenido.remove();

    // tercero hacer el fecth
    getViajes();
    return;
  }

  alertaExito.classList.remove("alertaExito");
  alertaError.classList.add("alertaError");
}
