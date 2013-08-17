/**
 * Interfaz de la factoria de criaturas.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */




/**
 * Interfaz de la factoria de criaturas.
 * @version 1.1
 */
var CriaturaFactoria = {
	'crearCriatura' : function () {},

	/**
	 * Devuelve un entero entre min y max (ambos incluidos).
	 * @version 1.0
	 *
	 * @param min
	 * @param max
	 *
	 * @return numero entre los valores dados
	 */
	'dadoEntre' : function (min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
}