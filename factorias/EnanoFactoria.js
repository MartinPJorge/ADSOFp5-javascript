/**
 * Constructor de la factoria de enanos.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de la factoria de enanos.
 * @version 1.0
 */
function EnanoFactoria () {
	var ptosVida = 1;
	var ataqueMin = 1;
	var ataqueMax = 4;
	var defensaMin = 1;
	var defensaMax = 2;

	this.crearCriatura = function () {
		var ataque = undefined; //__COMPLETAR__
		var defensa = undefined; //__COMPLETAR__

		return new Enano(ptosVida,ataque,defensa,0);
	}
}
A_implementa (EnanoFactoria, CriaturaFactoria);
