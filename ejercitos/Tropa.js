/**
 * Constructor para las tropas.
 *
 * @author Jorge Martin Perez
 * @version 1.3
 */




/**
 * Constructor de tropas.
 * @version 1.3
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
	 * @version 1.1
	 *
	 * @param tropaOponente
	 * @return
	 */
	this.atacar = function (tropaOponente) {
		var oponentesVivos = tropaOponente.guerrerosVivos();
		var atacantesVivos = this.guerrerosVivos();

		var j = 0;
		for (var i = 0; i < this.guerreros.length; i++) {
			atacantesVivos[i].atacar(oponentesVivos[j]);
			(j+1) % oponentesVivos.length;
		}
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


	/**
	 * Devuelve los guerreros vivos.
	 * @version 1.0
	 *
	 * @return guerreros vivos.
	 */
	this.guerrerosVivos = function () {
		var vivos = [];
		for (var i = 0; i < guerreros.length; i++) {
			if(!guerreros[i].estaMuerto())
				vivos.push(guerreros[i]);
		}

		return vivos;
	}


	/**
	 * Cuenta los guerreros vivos.
	 * @version 1.0
	 *
	 * @return numero de guerreros vivos.
	 */
	this.contarVivos = function () {
		var vivos = 0;
		for (var i = 0; i < guerreros.length; i++)
			if(!guerreros[i].estaMuerto()) vivos++;

		return vivos;
	}


	/**
	 * Cuenta los guerreros muertos.
	 * @version 1.0
	 *
	 * @return numero de guerreros muertos.
	 */
	this.contarMuertos = function () {
		var muertos = 0;
		for (var i = 0; i < guerreros.length; i++)
			if(guerreros[i].estaMuerto()) muertos++;

		return muertos;
	}


	/**
	 * Aplica las heridas a toda la tropa.
	 * @version 1.0
	 *
	 * @return
	 */
	this.toString = function () {
		var tipoCriaturas = '';
		if(guerreros[0] instanceof Elfo)
			tipoCriaturas = 'Elfos';
		else if(guerreros[0] instanceof Enano)
			tipoCriaturas = 'Enano';
		else if(guerreros[0] instanceof Hombre)
			tipoCriaturas = 'Hombre';
		else if(guerreros[0] instanceof Huargo)
			tipoCriaturas = 'Huargo';
		else if(guerreros[0] instanceof Orco)
			tipoCriaturas = 'Orco';

		return tipoCriaturas + ' | Vivos: ' + this.contarVivos() + 
		       ' Muertos: ' + this.contarMuertos();
	}
}



