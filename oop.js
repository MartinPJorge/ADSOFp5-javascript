/**
 * Funciones para llevar a cabo la herencia y el uso de
 * interfaces.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */




/**
 * Establece la relación de herencia entre padre e hijo.
 * @version 1.0
 *
 * @param Hijo - constructor u objeto literal que hereda.
 * @param Padre - constructor u objeto literal del que se hereda.
 * @return
 */
function A_heredaDe_B (Hijo, Padre) {
	var padreAbstracto = (Padre.constructor != Function);

	if(Hijo.constructor == Function) {
		Hijo.prototype = (padreAbstracto) ? Padre : new Padre;
		Hijo.prototype.constructor = Hijo;
		Hijo.prototype.parent = (padreAbstracto) ? Padre : Padre.prototype;
	}
	else {
		Hijo.__proto__ = (padreAbstracto) ? Padre : Padre.prototype;
		Hijo.parent = (padreAbstracto) ? Padre : Padre.prototype;
	}
}

/**
 * Establece la relación de herencia entre padre e hijo.
 * Pero entre hijo con constructor y padre literal, es el
 * prototipo del hijo el que entra en la cadena de protitipos.
 * @version 1.0
 *
 * @param Hijo - constructor u objeto literal que hereda.
 * @param Padre - constructor u objeto literal del que se hereda.
 * @return
 */
function A_heredaDe_B_2 (Hijo, Padre) {
	var padreAbstracto = (Padre.constructor != Function);

	if(Hijo.constructor == Function) {
		if(padreAbstracto)
			Hijo.prototype.__proto__ = Padre;
		else {
			Hijo.prototype = new Padre;
			Hijo.prototype.constructor = Hijo;
			Hijo.prototype.parent = Padre.prototype;
		}
	}
	else {
		Hijo.__proto__ = (padreAbstracto) ? Padre : Padre.prototype;
		Hijo.parent = (padreAbstracto) ? Padre : Padre.prototype;
	}
}


/**
 * Consigue que un constructor u objeto literal implemente los
 * metodos y propiedades de los multiples literales pasados por
 * argumento.
 * Argumentos: [A, interfaz1,interfaz2,...]
 * @version 1.0
 *
 * @param A - constructor u objeto literal que implementa las 
 *            interfaces.
 * @param interfazN - interfaz de la que se obtienen los metodos
 *                    y propiedades a implementar por A.
 * @return
 */
function A_implementa () {
	var interfaces = arguments;
	var A = arguments[0];

	if(A.constructor == Function)  //A-constructor
		for(var i = 1; i < interfaces.length; i++)
			for(var key in interfaces[i]) {
				A.prototype[key] = interfaces[i][key];
			}

	else
		for(var i = 1; i < interfaces.length; i++)
			for(var key in interfaces[i])
				A[key] = interfaces[i][key];

}


/**
 * Determina si el objeto o constructor 'A' implementa los
 * metodos y propiedades del objeto o constructor 'B',
 * @version 1.1
 *
 * @param A - constructor u objeto a analizar
 * @param B - constructor u objeto con las propiedades
 * @return true|false
 */
function A_implementa_B(A,B) {
	var elemInstanciaA = (A.constructor == Function) ? A.prototype : A;
	var elemInstanciaB = (B.constructor == Function) ? B.prototype : B;

	if((B.constructor == Function) && (elemInstanciaA instanceof B))
		return true;

	var AimplementaB = true;
	for(var key in elemInstanciaB)
		AimplementaB = AimplementaB && (key in elemInstanciaA);

	return AimplementaB;
}
