/**
 * Constructor de la factoria de orcos.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de la factoria de orcos.
 * @version 1.0
 */
function OrcoFactoria () {
	var ptosVida = 2;
	var ataqueMin = 2;
	var ataqueMax = 4;
	var defensaMin = 1;
	var defensaMax = 2;

	this.crearCriatura = function () {
		var ataque = undefined; //__COMPLETAR__
		var defensa = undefined; //__COMPLETAR__

		return new Orco(ptosVida,ataque,defensa,0);
	}
}
A_implementa (OrcoFactoria, CriaturaFactoria);
