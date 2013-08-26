/**
 * Constructor del distribuidor de bolas.
 *
 * @author Jorge Martin Perez
 * @version 1.4
 */




/**
 * Constructor del distribuidor de bolas.
 * @version 1.4
 *
 * @param canvas
 *
 * @return
 */
function Distribuidor(canvas) {
	var bolas = [];
	var limites = {        
		'izquierda' : undefined,
		'derecha' : undefined
	}
	var canvas = canvas;
	var ctx = canvas.getContext('2d');


	/**
	 * Proporciona las bolas sobre las que el distribuidor
	 * va a trabajar
	 * @version 1.0
	 *
	 * @param newBolas
	 *
	 * @return
	 */
	this.setBolas = function(newBolas) {
		bolas = newBolas;
		bolas.sort();
	}


	/**
	 * Proporciona los limites laterales entre los que el
	 * distribuidor puede situar las bolas.
	 * @version 1.0
	 *
	 * @param izquierda - limite izquierdo
	 * @param derecha - limite derecho
	 *
	 * @return
	 */
	this.setLimites = function (izquierda,derecha) {
		limites.izquierda = izquierda;
		limites.derecha = derecha;
	}


	/**
	 * Determina si la bola pasada por argumento entra dentro
	 * de los limites establecidos.
	 * @version 1.0
	 *
	 * @param bola
	 *
	 * @return true|false
	 */
	this.bolaDentro = function(bola) {
		var estaDentro = false;
		
		if((bola.getLimite('arriba') >= 0) &&
			(bola.getLimite('derecha') <= limites.derecha) && 
			(bola.getLimite('abajo') <= canvas.height) &&
			(bola.getLimite('izquierda') >= limites.izquierda))
			estaDentro = true;

		return estaDentro;
	}


	/**
	 * Determina si la bola pasada por argumento se solapa con
	 * las bolas anteriores a ellas.
	 * @version 1.0
	 *
	 * @param bola
	 *
	 * @return true|false
	 */
	this.seSolapaBolaConAnteriores = function(bola) {
		var i = 0, paro = false;
		var seSolapa = false;

		while (!paro) {
			if(bola == bolas[i])
				paro = true;
			else {
				if(bolas[i].seSolapaCon(bola)) {
					seSolapa = true;
					paro = true;
				}

				i++;
			}
		}

		return seSolapa;
	}


	/**
	 * Determina si la bola pasada por argumento se puede pegar
	 * a alguna de las anteriores bolas del array.
	 * @version 1.1
	 *
	 * @param bola
	 *
	 * @return true|false
	 */
	this.sePuedePegarBola = function(bola) {
		var sePuedePegar = false, paro = false;
		var i = 0, esto = this;

		while (!paro) {
			if(bolas[i] == bola)
				paro = true;
			else {
				var bordesAPegar = bolas[i].sePuedePegar(bola);
				for (var j = 0; j < bordesAPegar.length; j++) {
					bolas[i].pegarVirtualEnBorde(
						bola,bordesAPegar[j]);
					if(esto.bolaDentro(bola)) {
						sePuedePegar = true;
						paro = true;
						break;
					}
				}

				i++;
			}
		}

		return sePuedePegar;
	}


	/**
	 * Coloca la bola pasada por argumento, y en caso de que no
	 * entre alarga el canvas.
	 * @version 1.1
	 *
	 * @param bola
	 * @param indiceBola - indice de la bola en el array de
	 *                     bolas del distribuidor
	 *
	 * @return
	 */
	this.colocarBola = function (bola,indiceBola) {
		var pegada = false, i = 0;
		var esto = this;

		// Si la bola no se puede meter, alargamos el canvas.
		if(!this.sePuedePegarBola(bola))
			canvas.height = canvas.height + (4 * (bola.getRadio()+3))

		while(!pegada && (i < indiceBola)) {
			var posiblesBordes = bolas[i].sePuedePegar(bola);

			// Buscamos entre los bordes donde se puede pegar.
			for(var j = 0; j < posiblesBordes.length; j++) {
				bolas[i].pegarVirtualEnBorde(bola,posiblesBordes[j]);

				if(!esto.seSolapaBolaConAnteriores(bola) &&
					esto.bolaDentro(bola)) {
					bolas[i].pegarEnBorde(bola,posiblesBordes[j]);
					pegada = true;
					break;
				}
			}

			i++;
		}
	}


	/**
	 * Se encarga de situar las bolas entre los limites,
	 * y de dibujar las bolas.
	 * @version 1.1
	 *
	 * @return
	 */
	this.distribuirBolas = function() {
		var esto = this;
		for (var i = 0; i < bolas.length; i++) {
			if(i == 0) {
				bolas[0].setCX(
					(limites.izquierda + limites.derecha) / 2);
				bolas[0].setCY(canvas.height / 2);
			}

			else {
				esto.colocarBola(bolas[i],i);
			}
		}

		for (var i = 0; i < bolas.length; i++)
			bolas[i].dibujar(ctx);
	}
}