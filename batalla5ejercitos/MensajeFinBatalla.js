/**
 * Constructor para mensaje de fin de batalla.
 *
 * @author Jorge Martin Perez
 * @version 1.2
 */



/**
 * Constructor para mensaje de fin de batalla.
 * @version 1.2
 *
 * @param container - <div> que contiene el mensaje
 * @param greatContainerH - altura del contenedor del contenedor
 *                          del mensaje.
 * @return
 */
function MensajeFinBatalla (container,greatContainerH) {
	this.container = container;
	this.altura = this.container.style.height;
	this.greatContainerH = greatContainerH;
}


/**
 * Setter del ganador de la batalla dentro del mensaje.
 * @version 1.0
 *
 * @param ganador - String con el ganador
 * @return
 */
MensajeFinBatalla.prototype.setGanador = function(ganador) {
	this.container.children[1].children[0].innerHTML = ganador;
}


/**
 * Setter del perdedor de la batalla dentro del mensaje.
 * @version 1.0
 *
 * @param perdedor - String con el perdedor
 * @return
 */
MensajeFinBatalla.prototype.setPerdedor = function(perdedor) {
	this.container.children[2].children[0].innerHTML = perdedor;
}


/**
 * Oculta el mensaje de fin de batalla.
 * @version 1.0
 *
 * @return
 */
MensajeFinBatalla.prototype.ocultar = function() {
	this.container.classList.add('oculto');
}


/**
 * Hace visible el mensaje de fin de batalla.
 * @version 1.0
 *
 * @return
 */
MensajeFinBatalla.prototype.mostrar = function() {
	this.container.classList.remove('oculto');
}

