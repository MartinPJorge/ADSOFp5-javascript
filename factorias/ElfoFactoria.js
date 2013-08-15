/**
 * Constructor de la factoria de elfos.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de la factoria de elfos.
 * @version 1.0
 */
function ElfoFactoria () {
	var ptosVida = 2;
	var ataqueMin = 2;
	var ataqueMax = 3;
	var defensaMin = 2;
	var defensaMax = 3;

	this.crearCriatura = function () {
		var ataque = undefined; //__COMPLETAR__
		var defensa = undefined; //__COMPLETAR__

		return new Elfo(ptosVida,ataque,defensa,0);
	}
}
A_implementa (ElfoFactoria, CriaturaFactoria);
