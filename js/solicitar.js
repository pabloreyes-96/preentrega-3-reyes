const formSolicitarViaje = document.querySelector(".form-solicitarViaje");
const nombre = document.getElementById('nombre');
const ubicacion = document.getElementById('ubicacion');
const destino = document.getElementById('destino');
const hora = document.getElementById('horario');


const nombreL = /^[a-zA-Z0-9\_\-]{2,20}$/;
const ubicacionL = /^[a-zA-Z0-9-]{2,20}$/;
const destinoL = /^[a-zA-Z0-9-]{2,20}$/;
const horaL = /^[0-9]+[:]+[0-9]+[0-9]$/;

document.addEventListener("DOMContentLoaded",() => {
    formSolicitarViaje.addEventListener('submit', e => {
        e.preventDefault();
        enviarSolicitud();
    });
    nombre.addEventListener('input', () => {
        validarCampo(nombreL, nombre, 'el nombre debe tener mas de 2 a 20 digitos');
    })
    ubicacion.addEventListener('input', () => {
        validarCampo(ubicacionL, ubicacion, 'la ubicacion debe contener la altura exacta');
    })
    destino.addEventListener('input', () => {
        validarCampo(destinoL, destino, 'el destino debe contener la altura exacta ');
    })
    hora.addEventListener('input', () => {
        validarCampo(horaL, hora, 'ingrese el horario como corresponde');
    })
});
function enviarSolicitud() {

}

function validarCampo(regularExpresion, campo, mensaje) {
    const validarCampo = regularExpresion.test(campo.value);
    if(validarCampo){
        console.log('campo correcto')
    }else {
        mostrarAlerta(campo.parentElement,mensaje);
    }
}

function mostrarAlerta(referencia, mensaje) {
    const alertaDiv = document.createElement('div')
    alertaDiv.textContent = mensaje;
    formSolicitarViaje.appendChild(alertaDiv);
}