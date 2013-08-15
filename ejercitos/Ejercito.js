/**
 * Constructor para los ejercitos.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de ejercitos.
 * [obj1, obj2, obj3, ...]
 * @version 1.0
 *
 * @param objN - objeto con claves 'factoria' y 'tropas', donde
 *               'tropas' es un Array con las cantidades de
 *               criaturas de cada tropa.
 * @return
 */
function Ejercito () {
	if(!checkEjercito())
		throw new TropasIncompatiblesEx('Tropas de distinto bando.');


	// Creamos las tropas
	var tropas = [];
	for(var i = 0; i < arguments.length; i++)
		for (var j = 0; j < arguments[i].tropas.length; j++)
			tropas.push( new Tropa(arguments[i].factoria,arguments[i].tropas[j]) );



	/**
	 * Determina si todas las tropas son del mismo bando.
	 * [factoria1, factoria2, factoria3, ...]
	 * @version 1.0
	 *
	 * @param factoriaN - factoria de criatura
	 * @return true|false
	 */
	var checkEjercito = function () {
		var criaturas = Array(arguments.length);
		var todasIguales = true, i = 1;
		for (var i = 0; i < criaturas.length; i++)
			criaturas[i] = arguments[i].crearCriatura();

		while((todasIguales) && (i < criaturas.length)) {
			if( A_implementa_B(criaturas[i-1],CriaturaLibre) != 
				A_implementa_B(criaturas[i],CriaturaLibre) ) {
				todasIguales = false;
			}
			i++;
		}

		return todasIguales;
	}
}




