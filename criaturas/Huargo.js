/**
 * Constructor para la criatura 'huargo'.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de objetos de tipo Huargo.
 * @version 1.0
 *
 * @param ptosVida
 * @param ataque
 * @param defensa
 * @param heridas
 *
 */
function Huargo (ptosVida,ataque,defensa,heridas) {
	Huargo.prototype.inicializar.call(this, ptosVida,ataque,defensa,heridas);
}
A_heredaDe_B_2 (Huargo,CriaturaOscura);

