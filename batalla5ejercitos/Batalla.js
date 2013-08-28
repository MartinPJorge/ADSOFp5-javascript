/**
 * Constructor para la batalla.
 *
 * @author Jorge Martin Perez
 * @version 2.3
 */




/**
 * Constructor para la batalla
 * @version 2.3
 *
 * @return
 */
function Batalla (libreConstruye,oscuroConstruye,pImprime,canvas) {


	/**
	 * Obtiene la cantidad mas pequeña de guerreros por tropa, y
	 * la mayor cantidad de guerreros por tropa. 
	 * @version 1.0
	 *
	 * @return {'max': M, 'min': m}
	 */
	this.maxMinTropas = function () {
		var minOscuro = Number.POSITIVE_INFINITY, minLibre = Number.POSITIVE_INFINITY;
		var maxOscuro = Number.NEGATIVE_INFINITY, maxLibre = Number.NEGATIVE_INFINITY;

		for (var i = 0; i < libreConstruye.length; i++) {
			var minTropaLibre = 
				Math.min.apply(null,libreConstruye[i].tropas);
			var maxTropaLibre = 
				Math.max.apply(null,libreConstruye[i].tropas);
			

			minLibre = (minTropaLibre < minLibre) ? minTropaLibre : minLibre;
			maxLibre = (maxTropaLibre > maxLibre) ? maxTropaLibre : maxLibre;
			
		}

		for (var i = 0; i < oscuroConstruye.length; i++) {
			var minTropaOscura = 
				Math.min.apply(null,oscuroConstruye[i].tropas);
			var maxTropaOscura = 
				Math.max.apply(null,oscuroConstruye[i].tropas);

			minOscuro = (minTropaOscura < minOscuro) ? minTropaOscura : minOscuro;
			maxOscuro = (maxTropaOscura > maxOscuro) ? maxTropaOscura : maxOscuro;
		}

		return {
			'max' : (maxLibre > maxOscuro) ? maxLibre : maxOscuro,
			'min' : (minLibre < minOscuro) ? minLibre : minOscuro,
		}
	}


	var ejercitoLibre = null, ejercitoOscuro = null;
	var libreConstruye = libreConstruye;
	var oscuroConstruye = oscuroConstruye;
	var pImprime = pImprime;
	var ronda = 0;
	var maxMin = this.maxMinTropas();
	var distribuidor = new Distribuidor(
		canvas, maxMin.min, maxMin.max);

	var intervalo = null;


	/**
	 * Crea el ejercito especificado.
	 * @version 1.3
	 *
	 * @param tipo - 'libre'|'oscuro' 
	 * @return
	 */
	this.crearEjercito = function (tipo) {
		if(tipo == 'libre') {
			ejercitoLibre = new Ejercito(libreConstruye);

			distribuidor.setDimensiones(
				ejercitoLibre.getBolasYcantidad());
			distribuidor.setBolas(ejercitoLibre.getBolas());
			distribuidor.setLimites(0, canvas.width / 2);
			distribuidor.distribuirBolas();
		}
		else {
			ejercitoOscuro = new Ejercito(oscuroConstruye);

			distribuidor.setDimensiones(
				ejercitoOscuro.getBolasYcantidad());
			distribuidor.setBolas(ejercitoOscuro.getBolas());
			distribuidor.setLimites(
				canvas.width / 2, canvas.width);
			distribuidor.distribuirBolas();
		}
	}


	/**
	 * Getter de la ronda.
	 * @version 1.0
	 *
	 * @return ronda
	 */
	this.getRonda = function () { return ronda; }


	/**
	 * Setter de la ronda.
	 * @version 1.0
	 *
	 * @param newRonda - nueva ronda
	 * @return
	 */
	this.setRonda = function (newRonda) {
		ronda = newRonda;
	}


	/**
	 * Getter del ejercito libre.
	 * @version 1.0
	 *
	 * @return ejercito libre
	 */
	this.getEjercitoLibre = function () { return ejercitoLibre; }


	/**
	 * Getter del ejercito oscuro.
	 * @version 1.0
	 *
	 * @return ejercito oscuro
	 */
	this.getEjercitoOscuro = function () { return ejercitoOscuro; }


	/**
	 * Imprime en el span del estado de la batalla el estado de
	 * las tropas de ambos ejercitos.
	 * @version 1.1
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

		imprimir += '--- Ejercito oscuro ---<br/>';

		for (var i = 0; i < tropasOscuras.length; i++)
			imprimir += tropasOscuras[i] + '<br/>';

		imprimir += '<br/><br/>';
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
	 * Se encarga de lanzar una ronda de ataques.
	 * @version 1.0
	 *
	 * @return
	 */
	this.lanzarRonda = function () {
		this.printRonda();

		// Realizar asalto
		ejercitoLibre.atacar(ejercitoOscuro);
		ejercitoOscuro.atacar(ejercitoLibre);

		// Aplicar daños
		ejercitoLibre.aplicarHeridas();
		ejercitoOscuro.aplicarHeridas();

		ronda++;
		var libreAniquilado = ejercitoLibre.estaAniquilado();
		var oscuroAniquilado = ejercitoOscuro.estaAniquilado();
		var finBatalla =  libreAniquilado || oscuroAniquilado;

		if(finBatalla) {
			clearInterval(intervalo);
			this.printRonda();
			this.printVictoria();
		}
	}


	/**
	 * Se encarga de realizar la simulacion de la batalla.
	 * @version 1.3
	 *
	 * @return
	 */
	this.simular = function () {
		this.crearEjercito('libre');
		this.crearEjercito('oscuro');
		var batalla = this;


		this.lanzarRonda();


		if(intervalo == null) {
			intervalo = setInterval(function () {
				batalla.lanzarRonda();
			}, 1000);
		}
	}
}



