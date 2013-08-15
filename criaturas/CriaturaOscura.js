/**
 * Literal de criaturas oscuras.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */




/**
 * Literal del objeto Criatura oscura que simula dicha clase
 * abstracta.
 * @version 1.1
 */
var CriaturaOscura = {
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
		CriaturaOscura.__proto__.inicializar.call(this, ptosVida,ataque, 
			defensa,heridas);
	},

	/**
	 * Hace que la criatura oscura ruja.
	 * @version 1.0
	 *
	 * @return
	 */
	'ruge' : function () { alert('Grrr'); }
}
//A_heredaDe_B (CriaturaOscura,Criatura);
A_heredaDe_B_2 (CriaturaOscura,Criatura);
