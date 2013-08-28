/**
 * Constructor para los ejercitos.
 *
 * @author Jorge Martin Perez
 * @version 2.3
 */



/**
 * Constructor de ejercitos.
 * @version 2.3
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
	 * Obtiene las bolas que representan a las tropas del
	 * ejercito.
	 * @version 1.0
	 *
	 * @return bolas de las tropas
	 */
	this.getBolas = function () {
		var bolas = [];
		for (var i = 0; i < tropas.length; i++)
			bolas.push(tropas[i].getBola());

		return bolas;
	}


	/**
	 * Obtiene las bolas que representan a las tropas del
	 * ejercito, y ademas devuelve la cantidad de guerreros
	 * de la tropa que representa cada bola.
	 * @version 1.1
	 *
	 * @return [{'bola' : a,'cantidad' : 2}, {},{},...]
	 */
	this.getBolasYcantidad = function () {
		var tropas = this.getTropas();
		var paresBolaCantidad = new Array(tropas.length);

		for (var i = 0; i < tropas.length; i++) {
			paresBolaCantidad[i] = {
				'bola' : tropas[i].getBola(),
				'cantidad' : tropas[i].contarVivos()
			};
		}

		return paresBolaCantidad;
	}


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
	 * @version 1.4
	 *
	 * @param ejercitoEnemigo
	 * @return
	 */
	this.atacar = function (ejercitoEnemigo) {
		var tropasEnemigas = ejercitoEnemigo.getTropasVivas();
		var misTropas = this.getTropasVivas();

		if(ejercitoEnemigo.estaAniquilado() ||
			this.estaAniquilado())
			return;

		for (var i = 0; i < misTropas.length; i++) {
			misTropas[i].atacar(
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
	 * @version 1.1
	 *
	 * @return
	 */
	this.aplicarHeridas = function () {
		var tropasVivas = this.getTropasVivas();
		for (var i = 0; i < tropasVivas.length; i++)
			tropasVivas[i].aplicarHeridas();
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



