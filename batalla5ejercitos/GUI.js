/**
 * Gestion de la interfaz del usuario,
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */


var criaturasLibres = document.getElementById('criaturasLibres');
var cantidadLibres = document.getElementById('cantidadLibres');
var spanTropasLibres = document.getElementById('tropasLibres');
var addTropaLibre = document.getElementById('addLibres');

var criaturasOscuras = document.getElementById('criaturasOscuras');
var cantidadOscuras = document.getElementById('cantidadOscuras');
var spanTropasOscuras = document.getElementById('tropasOscuras');
var addTropaOscura = document.getElementById('addOscuras');

var historialBatalla = document.getElementById('historialBatalla');
var startButton = document.getElementById('empezar');


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
	var spanCreaciones = (tipoEjercito == 'libre') ? spanTropasLibres : spanTropasOscuras;
	spanCreaciones.innerHTML += '- ' + criatura + ': ' + numGuerreros + '<br/>';
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

	addTropa(criaturaDD, cantidadCriaturas, tipoEjercito);
	printNuevaTropa(criaturaDD, cantidadCriaturas, tipoEjercito);
}


addTropaLibre.addEventListener('click', function (ev) {
	addTropaClickHandler(ev,'libre');
}, false);
addTropaOscura.addEventListener('click', function (ev) {
	addTropaClickHandler(ev,'oscuro');
}, false);



startButton.addEventListener('click', function (ev) {
	var pelea = new Batalla(ejercitoLibre,ejercitoOscuro,historialBatalla);
	pelea.simular();
}, false);


