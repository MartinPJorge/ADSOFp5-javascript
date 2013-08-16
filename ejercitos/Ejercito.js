/**
 * Constructor para los ejercitos.
 *
 * @author Jorge Martin Perez
 * @version 1.5
 */



/**
 * Constructor de ejercitos.
 * @version 1.5
 *
 * @param objs - objetos con claves 'factoria' y 'tropas', donde
 *               'tropas' es un Array con las cantidades de
 *               criaturas de cada tropa.
 * @return
 */
function Ejercito (objs) {
	/**
	 * Determina si todas las tropas son del mismo bando.
	 * [obj1, obj2, obj3, ...]
	 * @version 1.0
	 *
	 * @param objN - objetos con claves 'factoria' y 'tropas', donde
	 *               'tropas' es un Array con las cantidades de
	 *               criaturas de cada tropa.
	 * @return true|false
	 */
	var checkEjercito = function () {
		var criaturas = Array(arguments.length);
		var todasIguales = true, i = 1;
		for (var j = 0; j < criaturas.length; j++)
			criaturas[j] = arguments[j].factoria.crearCriatura();

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
	if(!checkEjercito.apply(this,objs))
		throw new TropasIncompatiblesEx('Tropas de distinto bando.');

	// Creamos las tropas
	var tropas = [];
	for(var i = 0; i < objs.length; i++)
		for (var j = 0; j < objs[i].tropas.length; j++)
			tropas.push( new Tropa(objs[i].factoria,objs[i].tropas[j]) );



	/**
	 * Devuelve las tropas del ejercito.
	 * @version 1.0
	 *
	 * @return tropas
	 */
	this.getTropas = function () { return tropas; }


	/**
	 * Devuelve las tropas vivas.
	 * @version 1.0
	 *
	 * @return tropas vivas
	 */
	this.getTropasVivas = function () {
		var tropasVivas = [];
		for (var i = 0; i < tropas.length; i++)
			if(!tropas[i].estaAniquilada())
				tropasVivas.push(tropas[i]);

		return tropasVivas;
	}


	/**
	 * Realiza un ataque al ejercito enemigo.
	 * @version 1.2
	 *
	 * @param ejercitoEnemigo
	 * @return
	 */
	this.atacar = function (ejercitoEnemigo) {
		var tropasEnemigas = ejercitoEnemigo.getTropasVivas();

		for (var i = 0; i < tropas.length; i++) {
			tropas[i].atacar(
				tropasEnemigas[Math.floor(Math.random()*tropasEnemigas.length)]
				);
		}
	}


	/**
	 * Determina si el ejercito esta aniquilado.
	 * @version 1.0
	 *
	 * @return true|false
	 */
	this.estaAniquilado = function () {
		var aniquilado = true, i = 0;
		while((aniquilado) && (i < tropas.length)) {
			aniquilado = tropas[i].estaAniquilada();
			i++;
		}

		return aniquilado;
	}


	/**
	 * Aplica las heridas a las tropas.
	 * @version 1.0
	 *
	 * @return
	 */
	this.aplicarHeridas = function () {
		for (var i = 0; i < tropas.length; i++)
			tropas[i].aplicarHeridas();
	}


	/**
	 * Devuelve la representacion en forma de String del
	 * ejercito.
	 * @version 1.0
	 *
	 * @return
	 */
	this.toString = function () {
		var cadena = '';
		for (var i = 0; i < tropas.length; i++)
			cadena += tropas[i] + '<br/>';

		return cadena;
	}
}



