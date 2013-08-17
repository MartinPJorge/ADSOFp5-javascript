/**
 * Constructor de la factoria de hombres.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */




/**
 * Constructor de la factoria de enanos.
 * @version 1.1
 */
function HombreFactoria () {
	var ptosVida = 1;
	var ataqueMin = 2;
	var ataqueMax = 4;
	var defensaMin = 1;
	var defensaMax = 3;

	/**
	 * Crea un hombre.
	 * @version 1.1
	 *
	 * @return hombre
	 */
	this.crearCriatura = function () {
		var ataque = this.dadoEntre(ataqueMin,ataqueMax);
		var defensa = this.dadoEntre(defensaMin,defensaMax);

		return new Hombre(ptosVida,ataque,defensa,0);
	}
}
A_implementa (HombreFactoria, CriaturaFactoria);
