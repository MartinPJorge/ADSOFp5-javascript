/**
 * Constructor para la criatura 'orco'.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de objetos de tipo Orco.
 * @version 1.0
 *
 * @param ptosVida
 * @param ataque
 * @param defensa
 * @param heridas
 *
 */
function Orco (ptosVida,ataque,defensa,heridas) {
	Orco.prototype.inicializar.call(this, ptosVida,ataque,defensa,heridas);
}
A_heredaDe_B_2 (Orco,CriaturaOscura);
A_implementa (Elfo, PrimerNacido);

Orco.prototype.curarHerida = function() {
	return (Math.random() <= 0.2);
}
