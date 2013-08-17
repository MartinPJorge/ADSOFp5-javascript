/**
 * Constructor de la factoria de enanos.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */




/**
 * Constructor de la factoria de enanos.
 * @version 1.1
 */
function EnanoFactoria () {
	var ptosVida = 1;
	var ataqueMin = 1;
	var ataqueMax = 4;
	var defensaMin = 1;
	var defensaMax = 2;


	/**
	 * Crea un enano.
	 * @version 1.1
	 *
	 * @return enano
	 */
	this.crearCriatura = function () {
		var ataque = this.dadoEntre(ataqueMin,ataqueMax);
		var defensa = this.dadoEntre(defensaMin,defensaMax);

		return new Enano(ptosVida,ataque,defensa,0);
	}
}
A_implementa (EnanoFactoria, CriaturaFactoria);
