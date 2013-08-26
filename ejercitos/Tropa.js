/**
 * Constructor para las tropas.
 *
 * @author Jorge Martin Perez
 * @version 1.6
 */




/**
 * Constructor de tropas.
 * @version 1.6
 *
 * @param factoria
 * @param numGuerreros
 * @return
 */
function Tropa (factoria,numGuerreros) {
	var guerreros = [];
	for(var i = 0; i < numGuerreros; i++)
		guerreros.push( factoria.crearCriatura() );
	

	// Tamano de la bola que representa la tropa
	var ballSize = numGuerreros * 5;
	if(ballSize < 10) ballSize = 10;
	else if(ballSize > 70) ballSize = 70; 

	var bola = undefined;
	if(factoria instanceof ElfoFactoria) { 
		bola = new Bola(0,0,ballSize,'#8aa42f','#4c5e0d','red',
			'white',guerreros.length);
	}
	else if(factoria instanceof EnanoFactoria) {
		bola = new Bola(0,0,ballSize,'#425cc9','#132470','red',
			'white',guerreros.length);
	}
	else if(factoria instanceof HombreFactoria) {
		bola = new Bola(0,0,ballSize,'#d0a338','#705003','red',
			'white',guerreros.length);
	}
	else if(factoria instanceof OrcoFactoria) {
		bola = new Bola(0,0,ballSize,'#5c7211','#2c3801','red',
			'white',guerreros.length);
	}
	else if(factoria instanceof HuargoFactoria) {
		bola = new Bola(0,0,ballSize,'#703908','#3b1e04','red',
			'white',guerreros.length);
	}



	/**
	 * Getter de la bola de la tropa.
	 * @version 1.0
	 *
	 * @return la bola que representa la tropa
	 */
	this.getBola = function () { return bola; }


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
	 * @version 1.2
	 *
	 * @param tropaOponente
	 * @return
	 */
	this.atacar = function (tropaOponente) {
		var oponentesVivos = tropaOponente.guerrerosVivos();
		var atacantesVivos = this.guerrerosVivos();

		var j = 0;
		for (var i = 0; i < atacantesVivos.length; i++) {
			atacantesVivos[i].atacar(oponentesVivos[j]);
			j = (j+1) % oponentesVivos.length;
		}
	}


	/**
	 * Aplica las heridas a toda la tropa.
	 * @version 1.0
	 *
	 * @return
	 */
	this.aplicarHeridas = function () {
		for (var i = 0; i < guerreros.length; i++)
			guerreros[i].aplicarHeridas();
		bola.parpadear(ctx,bola.getRadio()-3,this.contarVivos());
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
	 * Devuelve la representacion en forma de String de la tropa.
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



