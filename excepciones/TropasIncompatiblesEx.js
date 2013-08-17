/**
 * Excepcion de tropas incompatibles.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Excepcion a lanzar al crear un ejercito con tropas de
 * distintos bandos.
 * @version 1.0
 *
 * @param mensaje - mensaje de la excepcion
 * @return
 */
function TropasIncompatiblesEx (mensaje) {
	this.mensaje = mensaje;
	this.name = "Tropas incompatibles";
}




