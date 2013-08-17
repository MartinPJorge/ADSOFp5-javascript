/**
 * Constructor de la factoria de huargos.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */




/**
 * Constructor de la factoria de huargos.
 * @version 1.1
 */
function HuargoFactoria () {
	var ptosVida = 1;
	var ataqueMin = 1;
	var ataqueMax = 3;
	var defensaMin = 2;
	var defensaMax = 4;


	/**
	 * Crea un huargo.
	 * @version 1.1
	 *
	 * @return huargo
	 */
	this.crearCriatura = function () {
		var ataque = this.dadoEntre(ataqueMin,ataqueMax);
		var defensa = this.dadoEntre(defensaMin,defensaMax);

		return new Huargo(ptosVida,ataque,defensa,0);
	}
}
A_implementa (HuargoFactoria, CriaturaFactoria);
