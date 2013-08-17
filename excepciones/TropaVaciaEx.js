/**
 * Excepcion de tropa vacia.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Excepcion a lanzar al detectar que no hay unidades en
 * la tropa a añadir.
 * @version 1.0
 *
 * @param mensaje - mensaje de la excepcion
 * @return
 */
function TropaVaciaEx (mensaje) {
	this.mensaje = mensaje;
	this.name = "Tropas sin unidades";
}




