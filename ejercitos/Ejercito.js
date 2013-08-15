/**
 * Constructor para los ejercitos.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */




/**
 * Constructor de ejercitos.
 * [obj1, obj2, obj3, ...]
 * @version 1.1
 *
 * @param objN - objeto con claves 'factoria' y 'tropas', donde
 *               'tropas' es un Array con las cantidades de
 *               criaturas de cada tropa.
 * @return
 */
function Ejercito () {
	/**
	 * Determina si todas las tropas son del mismo bando.
	 * [factoria1, factoria2, factoria3, ...]
	 * @version 1.0
	 *
	 * @param factoriaN - factoria de criatura
	 * @return true|false
	 */
	var checkEjercito = function (argumentos) {
		var criaturas = Array(argumentos.length);
		var todasIguales = true, i = 1;
		for (var j = 0; j < criaturas.length; j++)
			criaturas[j] = argumentos[j].factoria.crearCriatura();

		while((todasIguales) && (i < criaturas.length)) {
			if( A_implementa_B(criaturas[i-1],CriaturaLibre) != 
				A_implementa_B(criaturas[i],CriaturaLibre) ) {
				todasIguales = false;
			}
			i++;
		}

		return todasIguales;
	}



	// Comprobamos que todas las criaturas sean del mismo bando
	if(!checkEjercito(arguments))
		throw new TropasIncompatiblesEx('Tropas de distinto bando.');

	// Creamos las tropas
	var tropas = [];
	for(var i = 0; i < arguments.length; i++)
		for (var j = 0; j < arguments[i].tropas.length; j++)
			tropas.push( new Tropa(arguments[i].factoria,arguments[i].tropas[j]) );



	/**
	 * Devuelve las tropas del ejercito.
	 * @version 1.0
	 *
	 * @return tropas
	 */
	this.getTropas = function () { return tropas; }


	/**
	 * Realiza un ataque al ejercito enemigo.
	 * @version 1.0
	 *
	 * @param ejercitoEnemigo
	 * @return
	 */
	this.atacar = function (ejercitoEnemigo) {
		var tropasEnemigas = ejercitoEnemigo.getTropas();

		for (var i = 0; i < tropasEnemigas.length; i++)
			tropas[i].atacar(tropasEnemigas[i]);

		// ---------------------
		// ----- COMPLETAR -----
		// ---------------------
	}	
}




