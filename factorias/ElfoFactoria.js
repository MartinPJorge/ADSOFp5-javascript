/**
 * Constructor de la factoria de elfos.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */




/**
 * Constructor de la factoria de elfos.
 * @version 1.1
 */
function ElfoFactoria () {
	var ptosVida = 2;
	var ataqueMin = 2;
	var ataqueMax = 3;
	var defensaMin = 2;
	var defensaMax = 3;


	/**
	 * Crea un elfo.
	 * @version 1.1
	 *
	 * @return elfo
	 */
	this.crearCriatura = function () {
		var ataque = this.dadoEntre(ataqueMin,ataqueMax);
		var defensa = this.dadoEntre(defensaMin,defensaMax);

		return new Elfo(ptosVida,ataque,defensa,0);
	}
}
A_implementa (ElfoFactoria, CriaturaFactoria);
