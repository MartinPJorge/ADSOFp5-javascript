/**
 * Constructor para la criatura 'hombre'.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de objetos de tipo Hombre.
 * @version 1.0
 *
 * @param ptosVida
 * @param ataque
 * @param defensa
 * @param heridas
 *
 */
function Hombre (ptosVida,ataque,defensa,heridas) {
	Hombre.prototype.inicializar.call(this, ptosVida,ataque,defensa,heridas);
}
A_heredaDe_B_2 (Hombre,CriaturaLibre);
