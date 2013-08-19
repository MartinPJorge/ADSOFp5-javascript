/**
 * Constructor para la batalla.
 *
 * @author Jorge Martin Perez
 * @version 1.2
 */




/**
 * Constructor para la batalla
 * @version 1.2
 *
 * @return
 */
function Batalla (libreConstruye,oscuroConstruye,pImprime) {
	var ejercitoLibre = null, ejercitoOscuro = null;
	var libreConstruye = libreConstruye;
	var oscuroConstruye = oscuroConstruye;
	var pImprime = pImprime;
	var ronda = 0;

	/**
	 * Crea el ejercito especificado.
	 * @version 1.0
	 *
	 * @param tipo - 'libre'|'oscuro' 
	 * @return
	 */
	this.crearEjercito = function (tipo) {
		if(tipo == 'libre')
			ejercitoLibre = new Ejercito(libreConstruye);
		else
			ejercitoOscuro = new Ejercito(oscuroConstruye);
	}



	/**
	 * Imprime en el span del estado de la batalla el estado de
	 * las tropas de ambos ejercitos.
	 * @version 1.0
	 *
	 * @return
	 */
	this.printRonda = function () {
		var tropasLibres = ejercitoLibre.getTropas();
		var tropasOscuras = ejercitoOscuro.getTropas();
		var imprimir = 'Ronda: ' + ronda + 
		    '<br/>--- Ejercito libre ---<br/>';


		for (var i = 0; i < tropasLibres.length; i++)
			imprimir += tropasLibres[i] + '<br/>';

		imprimir += '<br/>--- Ejercito oscuro ---<br/>';

		for (var i = 0; i < tropasOscuras.length; i++)
			imprimir += tropasOscuras[i] + '<br/>';

		pImprime.innerHTML += imprimir;
	}


	/**
	 * Imprime en el span del estado de la batalla el estado de
	 * las tropas de ambos ejercitos.
	 * @version 1.1
	 *
	 * @return
	 */
	this.printVictoria = function () {
		var libreVivo = !ejercitoLibre.estaAniquilado();

		pImprime.innerHTML += '<br/><br/>El ejercito ' + 
		    ( (libreVivo) ? 'libre' : 'oscuro' ) + ' es el ' +
		    'vencedor';
	}


	/**
	 * Se encarga de realizar la simulacion de la batalla.
	 * @version 1.1
	 *
	 * @return
	 */
	this.simular = function (argument) {
		this.crearEjercito('libre');
		this.crearEjercito('oscuro');

		var finBatalla = false;
		while(!finBatalla) {
			this.printRonda();

			// Realizar asalto
			ejercitoLibre.atacar(ejercitoOscuro);
			ejercitoOscuro.atacar(ejercitoLibre);

			// Aplicar daños
			ejercitoLibre.aplicarHeridas();
			ejercitoOscuro.aplicarHeridas();

			ronda++;
			finBatalla = ejercitoLibre.estaAniquilado() ||
			             ejercitoOscuro.estaAniquilado();
		}

		this.printRonda();
		this.printVictoria();
	}
}



