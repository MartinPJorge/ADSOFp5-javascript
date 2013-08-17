/**
 * Constructor de la factoria de orcos.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */




/**
 * Constructor de la factoria de orcos.
 * @version 1.1
 */
function OrcoFactoria () {
	var ptosVida = 2;
	var ataqueMin = 2;
	var ataqueMax = 4;
	var defensaMin = 1;
	var defensaMax = 2;


	/**
	 * Crea un orco.
	 * @version 1.1
	 *
	 * @return orco
	 */
	this.crearCriatura = function () {
		var ataque = this.dadoEntre(ataqueMin,ataqueMax);
		var defensa = this.dadoEntre(defensaMin,defensaMax);

		return new Orco(ptosVida,ataque,defensa,0);
	}
}
A_implementa (OrcoFactoria, CriaturaFactoria);
