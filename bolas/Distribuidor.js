/**
 * Constructor del distribuidor de bolas.
 *
 * @author Jorge Martin Perez
 * @version 2.2
 */



/**
 * Parametriza una recta que incluye los puntos proporcionados
 * @version 1.0
 *
 * @param x1 - coordenada x del 1 punto
 * @param y1 - coordenada y del 1 punto
 * @param x2 - coordenada x del 2 punto
 * @param y2 - coordenada y del 2 punto
 *
 * @return {'a':a,'b':b} - correspondientes a la ecuacion
 *                         (y = ax+b).
 */
function paramRecta (x1,y1, x2,y2) {
	var _b = (x1*y2 - x2*y1) / (x1 - x2);
	var _a = (y1 - _b) / x1;

	return {a: _a, b:_b};
}



/**
 * Constructor del distribuidor de bolas.
 * @version 2.1
 *
 * @param canvas
 * @param minGuerreros - el minimo numero de guerreros (sirve
 *                       para calcular el radio de la bola).
 * @param maxGuerreros - el maximo numero de guerreros (sirve
 *                       para calcular el radio de la bola).
 * @return
 */
function Distribuidor(canvas,minGuerreros,maxGuerreros) {
	var bolas = [];
	var minGuerreros = minGuerreros;
	var maxGuerreros = maxGuerreros;
	var limites = {        
		'izquierda' : undefined,
		'derecha' : undefined
	}
	var canvas = canvas;
	var ctx = canvas.getContext('2d');


	/**
	 * Proporciona las bolas sobre las que el distribuidor
	 * va a trabajar
	 * @version 1.1
	 *
	 * @param newBolas
	 *
	 * @return
	 */
	this.setBolas = function(newBolas) {
		bolas = newBolas;
		bolas.sort(function (x,y) {
			var xRadio = x.getRadio(), yRadio = y.getRadio();
			return yRadio - xRadio;
		});
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
	 * Establece los radios de las bolas de cada tropa 
	 * atendiendo al numero maximo y minimo de guerreros sobre
	 * los que trabajara el distribuidor. Ademas establece el 
	 * parametro que indica cuanto disminuye el radio de la bola
	 * cuando la tropa recibe una baja.
	 * @version 1.4
	 *
	 * @param paresBolaCantidad - [{'bola' : a,'cantidad' : 2},
	 *                             {},{},...]
	 *
	 * @return
	 */
	this.setDimensiones = function (paresBolaCantidad) {
		// El radio maximo lo ponemos en 30.
		var radioMax = 40;
		var radioMin = (minGuerreros * radioMax) / maxGuerreros;
		var recta = undefined;
		if(minGuerreros != maxGuerreros)
			recta = paramRecta(minGuerreros,radioMin, maxGuerreros,40);
		else
			recta = {'a' : 0, 'b' : radioMax};


		for (var i = 0; i < paresBolaCantidad.length; i++) {
			var cantidad = paresBolaCantidad[i].cantidad;
			var bola = paresBolaCantidad[i].bola;

			var radio = Math.floor(
				(cantidad * recta.a) + recta.b
				);
			if(radio < 8) radio = 8;
			
			bola.setRadio(radio);
			bola.setRadioIni(radio);
			bola.setDisminuye(bola.getRadio() / cantidad);
		}
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
		if(!this.sePuedePegarBola(bola)) {
			canvas.height = canvas.height + (4 * (bola.getRadio()+3))
			canvas.style.backgroundSize = canvas.width + 'px ' +
				canvas.height + 'px';
		}

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