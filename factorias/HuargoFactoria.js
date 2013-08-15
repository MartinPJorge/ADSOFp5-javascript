/**
 * Constructor de la factoria de huargos.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de la factoria de huargos.
 * @version 1.0
 */
function HuargoFactoria () {
	var ptosVida = 1;
	var ataqueMin = 1;
	var ataqueMax = 3;
	var defensaMin = 2;
	var defensaMax = 4;

	this.crearCriatura = function () {
		var ataque = undefined; //__COMPLETAR__
		var defensa = undefined; //__COMPLETAR__

		return new Huargo(ptosVida,ataque,defensa,0);
	}
}
A_implementa (HuargoFactoria, CriaturaFactoria);
