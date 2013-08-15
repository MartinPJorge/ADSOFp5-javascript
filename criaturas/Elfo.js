/**
 * Constructor para la criatura 'elfo'.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de objetos de tipo Elfo.
 * @version 1.0
 *
 * @param ptosVida
 * @param ataque
 * @param defensa
 * @param heridas
 *
 */
function Elfo (ptosVida,ataque,defensa,heridas) {
	Elfo.prototype.inicializar.call(this, ptosVida,ataque,defensa,heridas);
}
A_heredaDe_B_2 (Elfo,CriaturaLibre);
A_implementa (Elfo, PrimerNacido);

Elfo.prototype.curarHerida = function() {
	return (Math.random() <= 0.3);
}
