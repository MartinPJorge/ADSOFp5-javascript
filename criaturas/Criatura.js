/**
 * Este objeto sirve de base para el resto de criaturas.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Literal del objeto criatura que simula dicha clase abstracta.
 * @version 1.0
 */
var Criatura = {
	/**
	 * Este metodo ha de ser llamado por las clases hijas en el
	 * momento de la inicializacion. Ademas permite que las 
	 * propiedades sean privadas, y por tanto solamente
	 * accesibles desde los metodos privilegiados.
	 * @version 1.0
	 *
	 * @param ptosVida
	 * @param ataque
	 * @param defensa
	 * @param heridas
	 *
	 * @return
	 */
	'inicializar' : function (ptosVida,ataque,defensa,heridas) {
		var ptosVida = ptosVida;
		var ataque = ataque;
		var defensa = defensa;
		var heridas = heridas;


		/**
		 * Obtiene los puntos de vida.
		 * @version 1.0
		 *
		 * @return ptosVida
		 */
		this.getPtosVida = function () { return ptosVida; }

		/**
		 * Obtiene el ataque.
		 * @version 1.0
		 *
		 * @return ataque
		 */
		this.getAtaque = function () { return ataque; }

		/**
		 * Obtiene el ataque.
		 * @version 1.0
		 *
		 * @return ataque
		 */
		this.getDefensa =  function() { return defensa; }

		/**
		 * Obtiene las heridas.
		 * @version 1.0
		 *
		 * @return heridas
		 */
		this.getHeridas = function () { return heridas; }


		/**
		 * Establece los puntos de vida.
		 * @version 1.0
		 *
		 * @param newPtosVida - los nuevos ptosVida.
		 * @return
		 */
		this.setPtosVida = function (newPtosVida) {
			ptosVida = newPtosVida;
		}

		/**
		 * Establece las heridas.
		 * @version 1.0
		 *
		 * @param newHeridas - las nuevas heridas.
		 * @return
		 */
		this.setHeridas = function (newHeridas) {
			heridas = newHeridas;
		}


		/**
		 * Determina si la criatura esta muerta.
		 * @version 1.0
		 *
		 * @return true|false
		 */
		this.estaMuerto = function() { return  ptosVida <= 0; }

		/**
		 * Realiza un ataque a la criatura oponente.
		 * @version 1.0
		 *
		 * @param oponente - criatura a la que atacar.
		 * @return
		 */
		this.atacar = function(oponente) {
			var dado1 = Math.floor(Math.random()*6)+1;
			var dado2 = Math.floor(Math.random()*6)+1;

			if(dado1 + ataque > dado2 + oponente.getDefensa())
				oponente.addHeridas(1);
		}

		/**
		 * Suma heridas a la criatura.
		 * @version 1.0
		 *
		 * @param numeroHeridas - numero de heridas a sumar.
		 * @return
		 */
		this.addHeridas = function(numeroHeridas) {
			heridas += numeroHeridas;
		}

		/**
		 * Suma heridas a la criatura.
		 * @version 1.0
		 *
		 * @param numeroHeridas - numero de heridas a sumar.
		 * @return
		 */
		this.aplicarHeridas = function() {
			ptosVida -= heridas;
			heridas = 0;
		}
	}
}
