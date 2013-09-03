/**
 * Gestion de la interfaz del usuario.
 * Aquí se encuentra todo el Javascript encargado del input, y
 * de las animaciones.
 *
 * @author Jorge Martin Perez
 * @version 1.1
 */

var pelea = null;

// --- DOM variables ---
var criaturasLibres = document.getElementById('criaturasLibres');
var cantidadLibres = document.getElementById('cantidadLibres');
var selectTropasLibres = document.getElementById('tropasLibres');
var addTropaLibre = document.getElementById('addLibres');
var borrarTropaLibre = document.getElementById('borrarLibres');

var criaturasOscuras = document.getElementById('criaturasOscuras');
var cantidadOscuras = document.getElementById('cantidadOscuras');
var selectTropasOscuras = document.getElementById('tropasOscuras');
var addTropaOscura = document.getElementById('addOscuras');
var borrarTropaOscura = document.getElementById('borrarOscuras');

var despliegaHistorial = document.getElementById('despliega');
var historialBatalla = document.getElementById('historialBatalla');
var startButton = document.getElementById('empezar');

var canvas = document.getElementById('battleScreen');
var ctx = canvas.getContext('2d');
var finMsgContainer = document.getElementById('mensajeContainer');
var finBatallaMsg = new MensajeFinBatalla(
		finMsgContainer,canvas.height
	);



/* Estas 2 variables contienen un array de objetos de tipo:
 * {
 *	'factoria': orcoFactoria,
 *  'tropas' : [20,200,10],
 * }
 */
var ejercitoLibre = [];
var ejercitoOscuro = [];



/**
 * Determina el constructor de la factoria correspondiente al
 * tipo de criatura pasada por argumento.
 * @version 1.0
 *
 * @param criatura - string con el tipo de criatura
 * @return constructor de la factoria correspondiente
 */
function determinaFactoria (criatura) {
	if(criatura == 'Orco')
		return OrcoFactoria;
	else if(criatura == 'Elfo')
		return ElfoFactoria;
	else if(criatura == 'Enano')
		return EnanoFactoria;
	else if(criatura == 'Hombre')
		return HombreFactoria;
	else if(criatura == 'Huargo')
		return HuargoFactoria;
}


/**
 * Añade una tropa de la especie aportada al ejercito indicado.
 * @version 1.0
 *
 * @param criatura - string con el tipo de criatura
 * @param numGuerreros
 * @param tipoEjercito - 'libre'|'oscuro'
 * @return
 */
function addTropa (criatura,numGuerreros,tipoEjercito) {
	var hayTropas = false, indiceTropa;
	var constructorFactoria = determinaFactoria(criatura);
	var ejercito = (tipoEjercito == 'libre') ? ejercitoLibre : ejercitoOscuro;

	for (var i = 0; i < ejercito.length; i++)
		if(ejercito[i].factoria instanceof constructorFactoria) {
			hayTropas = true;
			indiceTropa = i;
		}

	if(hayTropas)
		ejercito[indiceTropa].tropas.push(numGuerreros);
	else
		ejercito.push({
			'factoria' : new constructorFactoria(),
			'tropas' : [numGuerreros],
		});
}


/**
 * Imprime en el span de creaciones de tropas, la tropa creada.
 * @version 1.0
 *
 * @param criatura - string con el tipo de criatura
 * @param numGuerreros
 * @param tipoEjercito - 'libre'|'oscuro'
 * @return
 */
function printNuevaTropa (criatura,numGuerreros,tipoEjercito) {
	var tropaSelec = document.createElement('option');
	tropaSelec.innerHTML = '<span>' + criatura + '</span> - <span>' + numGuerreros + '</span>';
	var selectCreaciones = (tipoEjercito == 'libre') ? selectTropasLibres : selectTropasOscuras;
	selectCreaciones.appendChild(tropaSelec);
}


/**
 * Handler para los botones de incluir una nueva tropa.
 * @version 1.0
 *
 * @param ev - click event
 * @param tipoEjercito - 'libre'|'oscuro'
 * @return
 */
function addTropaClickHandler (ev, tipoEjercito) {
	var criaturaDD = (tipoEjercito == 'libre') ? criaturasLibres : criaturasOscuras;
	criaturaDD = criaturaDD.options[criaturaDD.selectedIndex].innerHTML;
	var cantidadCriaturas = (tipoEjercito == 'libre') ? cantidadLibres : cantidadOscuras;

	cantidadCriaturas = parseInt(cantidadCriaturas.value);
	if(isNaN(cantidadCriaturas) || (cantidadCriaturas <= 0))
		throw new TropaVaciaEx('Tropa sin unidades.');
	

	addTropa(criaturaDD, cantidadCriaturas, tipoEjercito);
	printNuevaTropa(criaturaDD, cantidadCriaturas, tipoEjercito);
}


// Especificamos listeners a los botones de anadir tropa.
addTropaLibre.addEventListener('click', function (ev) {
	try {
		addTropaClickHandler(ev,'libre');
	}
	catch(e){
		if(e instanceof TropaVaciaEx)
			alert(e.mensaje);
		else
			throw e;
	}
}, false);
addTropaOscura.addEventListener('click', function (ev) {
	try {
		addTropaClickHandler(ev,'oscuro');
	}
	catch(e){
		if(e instanceof TropaVaciaEx)
			alert(e.mensaje);
		else
			throw e;
	}
}, false);



/**
 * Obtiene la tropa seleccionada para borrar.
 * @version 1.0
 *
 * @param tipoEjercito - 'libre'|'oscuro'
 * @return {
 *           'nodo' - nodo HTML seleccionado,
 *           'criatura' - string del tipode criatura,
 *           'cantidad' - numero de guerreros
 *         }
 */
function tropaSeleccionada (tipoEjercito) {
	var selecTropas = (tipoEjercito == 'libre') ? selectTropasLibres : selectTropasOscuras;
	var tropaSelected = selecTropas.options[selecTropas.selectedIndex];

	var criatura = tropaSelected.children[0].innerHTML;
	var numGuerreros = parseInt(tropaSelected.children[1].innerHTML);

	return {
		'nodo' : tropaSelected,
		'criatura' : criatura,
		'cantidad' : numGuerreros
	};
}

/**
 * Borra la tropa seleccionada
 * @version 1.0
 *
 * @param tipoEjercito - 'libre'|'oscuro'
 * @return
 */
function borrarTropa (tipoEjercito) {
	var tropaBorrar = tropaSeleccionada(tipoEjercito);
	var factoria = determinaFactoria(tropaBorrar.criatura);
	var ejercitoAfectado = (tipoEjercito == 'libre') ? ejercitoLibre : ejercitoOscuro;

	var encontrada = false, i = 0;
	while(!encontrada && (i < ejercitoAfectado.length)) {
		if(ejercitoAfectado[i].factoria instanceof factoria) {
			encontrada = true;

			if(ejercitoAfectado[i].tropas.length > 1) {
				var index = ejercitoAfectado[i].tropas.indexOf(tropaBorrar.cantidad);
				ejercitoAfectado[i].tropas.splice(index,1);
			}
			else
				ejercitoAfectado.splice(i,1);
		}

		i++;
	}

	tropaBorrar.nodo.parentNode.removeChild(tropaBorrar.nodo);
}


// Especificamos listeners a los botones de borrar tropa.
borrarTropaLibre.addEventListener('click', function (ev) {
	borrarTropa('libre');
}, false);
borrarTropaOscura.addEventListener('click', function (ev) {
	borrarTropa('oscuro');
}, false);



// Especificamos el listener para el boton de empezar la batalla
startButton.addEventListener('click', function (ev) {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	selectTropasLibres.innerHTML =
	    selectTropasOscuras.innerHTML = 
	    historialBatalla.innerHTML = '';

	pelea = new Batalla(ejercitoLibre,ejercitoOscuro,
		historialBatalla,canvas, finBatallaMsg);

	// Borramos los ejercitos
	ejercitoLibre.length = 0;
	ejercitoOscuro.length = 0;

	pelea.simular();
}, false);



// -----------------------------
// --- Desplegable historial ---
// -----------------------------
despliegaHistorial.addEventListener('click', function (ev) {
	if(historialBatalla.style.height != '230px')
		historialBatalla.style.height = '230px';
	else 
		historialBatalla.style.height = '0px';
}, false);

// --------------------------------
// --- Secciones de explicacion ---
// --------------------------------
var secciones = document.querySelectorAll('section.explicacion');
for(var i = 0; i < secciones.length; i++) {
	secciones[i].addEventListener('focus', function (ev) {
		this.children[0].style.width = '25px';
		this.children[0].style.height = '25px';
		this.children[1].style.textDecoration = 'underline';
	},false);
	secciones[i].addEventListener('blur', function (ev) {
		this.children[0].style.width = '0';
		this.children[0].style.height = '0';
		this.children[1].style.textDecoration = 'none';
	},false);
}
