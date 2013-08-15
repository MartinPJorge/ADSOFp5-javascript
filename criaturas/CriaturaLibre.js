/**
 * Literal de criaturas libres.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Literal del objeto CriaturaLibre que simula dicha clase
 * abstracta.
 * @version 1.1
 */
var CriaturaLibre = {
	/**
	 * Este metodo ha de ser llamado por las clases hijas en el
	 * momento de la inicializacion. Ademas permite que las 
	 * propiedades sean privadas, y por tanto solamente
	 * accesibles desde los metodos privilegiados.
	 * @version 1.0
	 *
	 * @param ptosVida
	 * @param ataque
	 * @param defensa
	 * @param heridas
	 *
	 * @return
	 */
	'inicializar' : function (ptosVida,ataque,defensa,heridas) {
		CriaturaLibre.__proto__.inicializar.call(this, ptosVida,ataque, 
			defensa,heridas);
	},

	/**
	 * Hace que la criatura libre grite.
	 * @version 1.0
	 *
	 * @return
	 */
	'grita' : function () { alert('Aaaahhh'); }
}
//A_heredaDe_B (CriaturaLibre,Criatura);
A_heredaDe_B_2 (CriaturaLibre,Criatura);
