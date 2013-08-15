/**
 * Constructor para la criatura 'enano'.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de objetos de tipo Enano.
 * @version 1.0
 *
 * @param ptosVida
 * @param ataque
 * @param defensa
 * @param heridas
 *
 */
function Enano (ptosVida,ataque,defensa,heridas) {
	Enano.prototype.inicializar.call(this, ptosVida,ataque,defensa,heridas);
}
A_heredaDe_B_2 (Enano,CriaturaLibre);

