/**
 * Constructor para las tropas.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de tropas.
 * @version 1.0
 *
 * @param factoria
 * @param numGuerreros
 * @return
 */
function Tropa (factoria,numGuerreros) {
	var guerreros = [];
	for(var i = 0; i < numGuerreros; i++)
		guerreros.push( factoria.crearCriatura() );


	/**
	 * Determina si la tropa esta aniquilada.
	 * @version 1.0
	 *
	 * @return true|false
	 */
	this.estaAniquilada = function () {
		var aniquilada = true, i = 0;
		while((aniquilada == true) && (i < guerreros.length)) {
			aniquilada = guerreros[i].estaMuerto();
			i++;
		}

		return aniquilada;
	}


	/**
	 * Realiza un ataque a la tropa oponente.
	 * @version 1.0
	 *
	 * @param tropaOponente
	 * @return
	 */
	this.atacar = function (tropaOponente) {
		/* --- COMPLETAR ---
		for (var i = 0; i < guerreros.length; i++) {
			var haAtacado = false, j = 0;

			while( (!haAtacado) && (j < tropaOponente.length) ) {
				if(!tropaOponente[j].estaMuerto()) {
					guerreros[i].atacar(tropaOponente[j]);
					haAtacado = true;
				}
				j++;
			}
		}*/
	}


	/**
	 * Aplica las heridas a toda la tropa.
	 * @version 1.0
	 *
	 * @return
	 */
	this.aplicarHeridas = function () {
		for(var guerrero in guerreros)
			guerreros[guerrero].aplicarHeridas();
	}
}



