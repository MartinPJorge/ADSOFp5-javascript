/**
 * Constructor de las bolas que representan las tropas.
 *
 * @author Jorge Martin Perez
 * @version 2.6
 */




/**
 * Constructor de las bolas que representan las tropas.
 * @version 2.6
 *
 * @param cx - coord.x del centro
 * @param cy - coord.y del centro
 * @param r - radio
 * @param colorDentro 
 * @param colorBorde
 * @param colorDano
 *
 * @return
 */
function Bola (cx,cy,r,colorDentro,colorBorde,
	colorDano,colorTexto,cantidad) {
	var cx = cx, cy = cy, r = r;
	var colorDentro = colorDentro;
	var colorBorde = colorBorde;
	var colorDano = colorDano;
	var colorTexto = colorTexto;
	var cantidad = cantidad;
	var bordes = {
		'arriba' : [cx-r-3, cx+r+3],
		'derecha' : [cy-r-3, cy+r+3], 
		'abajo' : [cx-r-3, cx+r+3], 
		'izquierda' : [cy-r-3, cy+r+3], 
	};


	/**
	 * Getter de cx.
	 * @version 1.0
	 *
	 * @return cx - coordenada x del centro
	 */
	this.getCX = function () { return cx; }


	/**
	 * Getter de cy.
	 * @version 1.0
	 *
	 * @return cy - coordenada y del centro
	 */
	this.getCY = function () { return cy; }


	/**
	 * Getter del radio.
	 * @version 1.0
	 *
	 * @return r - radio de la bola
	 */
	this.getRadio = function () { return r; }


	/**
	 * Getter del radio.
	 * @version 1.0
	 *
	 * @param limite - 'arriba'|'derecha'|'abajo'|'izquierda'
	 *
	 * @return limiteRet - la coordenada correspondiente
	 *                     al limite.
	 */
	this.getLimite = function (limite) {
		var limiteRet = undefined;
		if(limite == 'arriba') limiteRet = cy-r-3;
		else if(limite == 'derecha') limiteRet = cx+r+3;
		else if(limite == 'abajo') limiteRet = cy+r+3;
		else if(limite == 'izquierda') limiteRet = cx-r-3;

		return limiteRet;
	}


	/**
	 * Getter de los bordes.
	 * @version 1.0
	 *
	 * @return bordes - bordes de la bola
	 */
	this.getBordes = function () { return bordes; }


	/**
	 * Setter de cx.
	 * @version 1.1
	 *
	 * @param newCX
	 *
	 * @return
	 */
	this.setCX = function (newCX) {
		cx = newCX;
		bordes.arriba[0] = bordes.abajo[0] = cx-r-3;
		bordes.arriba[1] = bordes.abajo[1] = cx+r+3;
	}


	/**
	 * Setter de cy.
	 * @version 1.1
	 *
	 * @param newCY
	 *
	 * @return
	 */
	this.setCY = function (newCY) {
		cy = newCY;
		bordes.izquierda[0] = bordes.derecha[0] = cy-r-3;
		bordes.izquierda[1] = bordes.derecha[1] = cy+r+3;
	}


	/**
	 * Setter de un borde.
	 * @version 1.1
	 *
	 * @param borde - 'arriba'|'abajo'|'izquierda'|'derecha'
	 * @param array - [ini,end]
	 *
	 * @return
	 */
	this.setBorde = function (borde,array) {
		bordes[borde][0] = array[0];
		bordes[borde][1] = array[1];
	}


	/**
	 * Dibuja la bola.
	 * @version 1.0
	 *
	 * @param ctx - contexto del canvas
	 * @param dentro[opcional] - color de dentro
	 *
	 * @return
	 */
	this.dibujar = function (ctx, dentro) {
		var dentro = (arguments.length == 1) ? colorDentro : dentro;
		var c = r;

		ctx.beginPath();
		ctx.moveTo(cx+r,cy);
		ctx.arc(cx,cy,r, 0,2*Math.PI, true);
		ctx.fillStyle = dentro;
		ctx.fill();

		ctx.moveTo(cx+r,cy);
		ctx.arc(cx,cy,r+1, 0,2*Math.PI, true);
		ctx.lineWidth = 1;
		ctx.strokeStyle = colorBorde;
		ctx.stroke();

		ctx.save();

		ctx.fillStyle = colorTexto;
		ctx.shadowBlur = 3;
		ctx.shadowColor = 'black';
		ctx.font = '20px Times';
		ctx.fillText(cantidad, cx-(String(cantidad).length*5),cy+3);
		ctx.closePath();

		ctx.restore();
	}


	/**
	 * Borra la bola.
	 * @version 1.0
	 *
	 * @param ctx - contexto del canvas
	 *
	 * @return
	 */
	this.borrar = function (ctx) {
		ctx.clearRect(cx-r-3,cy-r-3, (2*r)+6,(2*r)+6);
	}


	/**
	 * Borra la bola.
	 * @version 1.0
	 *
	 * @param ctx - contexto del canvas
	 * @param newRadius
	 * @param newCantidad
	 *
	 * @return
	 */
	this.parpadear = function (ctx,newRadius,newCantidad) {
		var esto = this;
		this.dibujar(ctx,colorDano);

		setTimeout(function () {
			esto.borrar(ctx);
			r = newRadius;
			cantidad = newCantidad;
			esto.dibujar(ctx);
		},100);	
	}


	/**
	 * Determina si la bola pasada por arumento se solapa con
	 * esta.
	 * @version 1.1
	 *
	 * @param bola
	 *
	 * @return true|false
	 */
	this.seSolapaCon = function (bola) {
		var startX = cx-r-3;
		var endX = cx+r+3;
		var startY = cy-r-3;
		var endY = cy+r+3;

		var startX2 = bola.getCX()-bola.getRadio()-3;
		var endX2 = bola.getCX()+bola.getRadio()+3;
		var startY2 = bola.getCY()-bola.getRadio()-3;
		var endY2 = bola.getCY()+bola.getRadio()+3;

		var seSolapan = false;
		if((endX >= startX2 && endX <= endX2) || (startX >= startX2 && startX <= endX2))
			if((endY >= startY2 && endY <= endY2) || (startY >= startY2 && startY <= endY2))
				seSolapan = true;

		if((endX == startX2) || (startX == endX2) || (endY == startY2) || (startY == endY2))
			seSolapan = false;

		return seSolapan;
	}


	/**
	 * Determina si la bola esta rodeada.
	 * @version 1.0
	 *
	 * @param bola
	 *
	 * @return true|false
	 */
	this.estaRodeada = function () {
		var estaRodeada = false;

		if((bordes.arriba[0] == bordes.arriba[1]) && 
			(bordes.derecha[0] == bordes.derecha[1]) && 
			(bordes.abajo[0] == bordes.abajo[1]) && 
			(bordes.izquierda[0] == bordes.izquierda[1]))
			estaRodeada = true;

		return estaRodeada;
	}


	/**
	 * Obtiene los lados en los que se puede pegar la bola
	 * pasada por argumento.
	 * @version 1.1
	 *
	 * @param bola
	 *
	 * @return ['arriba','derecha','abajo','derecha']
	 */
	this.sePuedePegar = function (bola) {
		var lado = 2 * (bola.getRadio() + 3);
		var dondeSePega = [];

		for(var key in bordes)
			if(lado <= (bordes[key][1] - bordes[key][0]))
				dondeSePega.push(key);

		return dondeSePega;
	}


	/**
	 * Pega una bola junto a otra.
	 * @version 1.0
	 *
	 * @param bola
	 *
	 * @return
	 */
	this.pegar = function (bola) {
		var lado = 2 * (bola.getRadio() + 3);
		
		for(var key in bordes)
			if(lado <= (bordes[key][1] - bordes[key][0])) {
				if(key == 'arriba') {
					bola.setBorde('abajo', [bordes[key][0],bordes[key][0]]);
					bola.setCX(bordes[key][0]+3+bola.getRadio());
					bola.setCY(cy-r-3 -3-bola.getRadio());
					bordes[key][0] += lado;
				}
				else if(key == 'derecha') {
					bola.setBorde('izquierda', [bordes[key][0],bordes[key][0]]);
					bola.setCX(cx+r+3 +3+bola.getRadio());
					bola.setCY(bordes[key][0]+3+bola.getRadio());
					bordes[key][0] += lado;
				}
				else if(key == 'abajo') {
					bola.setBorde('arriba', [bordes[key][0],bordes[key][0]]);
					bola.setCX(bordes[key][0]+3+bola.getRadio());
					bola.setCY(cy+r+3 +3+bola.getRadio());
					bordes[key][0] += lado;
				}
				else { //'izquierda'
					bola.setBorde('derecha', [bordes[key][0],bordes[key][0]]);
					bola.setCX(cx-r-3 -3-bola.getRadio());
					bola.setCY(bordes[key][0]+3+bola.getRadio());
					bordes[key][0] += lado;
				}

				break;
			}
	}


	/**
	 * Pega la bola pasada por argumento a la del ambito, pero
	 * sin que esta ultima actualice su entorno ocupado.
	 * @version 1.0
	 *
	 * @param bola
	 *
	 * @return
	 */
	this.pegarVirtual = function (bola) {
		var lado = 2 * (bola.getRadio() + 3);
		
		for(var key in bordes)
			if(lado <= (bordes[key][1] - bordes[key][0])) {
				if(key == 'arriba') {
					bola.setCX(bordes[key][0]+3+bola.getRadio());
					bola.setCY(cy-r-3 -3-bola.getRadio());
				}
				else if(key == 'derecha') {
					bola.setCX(cx+r+3 +3+bola.getRadio());
					bola.setCY(bordes[key][0]+3+bola.getRadio());
				}
				else if(key == 'abajo') {
					bola.setCX(bordes[key][0]+3+bola.getRadio());
					bola.setCY(cy+r+3 +3+bola.getRadio());
				}
				else { //'izquierda'
					bola.setCX(cx-r-3 -3-bola.getRadio());
					bola.setCY(bordes[key][0]+3+bola.getRadio());
				}

				break;
			}
	}


	/**
	 * Pega la bola pasada por argumento al borde que hayamos
	 * especificado para la bola del ambito.
	 * [Comment] - se supone que antes se ha comprobado que se
	 *             puede efectuar el pegado.
	 * @version 1.0
	 *
	 * @param bola
	 * @param borde - 'arriba'|'derecha'|'abajo'|'derecha'
	 *
	 * @return
	 */
	this.pegarEnBorde = function(bola,borde) {
		var lado = 2 * (bola.getRadio() + 3);

		if(borde == 'arriba') {
			bola.setCX(bordes[borde][0]+3+bola.getRadio());
			bola.setCY(cy-r-3 -3-bola.getRadio());
			bola.setBorde('abajo', [bordes[borde][0],bordes[borde][0]]);
			bordes[borde][0] += lado;
		}
		else if(borde == 'derecha') {
			bola.setCX(cx+r+3 +3+bola.getRadio());
			bola.setCY(bordes[borde][0]+3+bola.getRadio());
			bola.setBorde('izquierda', [bordes[borde][0],bordes[borde][0]]);
			bordes[borde][0] += lado;
		}
		else if(borde == 'abajo') {
			bola.setCX(bordes[borde][0]+3+bola.getRadio());
			bola.setCY(cy+r+3 +3+bola.getRadio());
			bola.setBorde('arriba', [bordes[borde][0],bordes[borde][0]]);
			bordes[borde][0] += lado;
		}
		else { //'izquierda'
			bola.setCX(cx-r-3 -3-bola.getRadio());
			bola.setCY(bordes[borde][0]+3+bola.getRadio());
			bola.setBorde('derecha', [bordes[borde][0],bordes[borde][0]]);
			bordes[borde][0] += lado;
		}
	}


	/**
	 * Pega la bola pasada por argumento al borde que hayamos
	 * especificado para la bola del ambito. Pero la bola del
	 * ambito, y la pasada por argumento no actualizan su 
	 * entorno ocupado.
	 * [Comment] - se supone que antes se ha comprobado que se
	 *             puede efectuar el pegado.
	 * @version 1.1
	 *
	 * @param bola
	 * @param borde - 'arriba'|'derecha'|'abajo'|'derecha'
	 *
	 * @return
	 */
	this.pegarVirtualEnBorde = function(bola,borde) {
		var lado = 2 * (bola.getRadio() + 3);
		
		if(borde == 'arriba') {
			bola.setCX(bordes[borde][0]+3+bola.getRadio());
			bola.setCY(cy-r-3 -3-bola.getRadio());
		}
		else if(borde == 'derecha') {
			bola.setCX(cx+r+3 +3+bola.getRadio());
			bola.setCY(bordes[borde][0]+3+bola.getRadio());
		}
		else if(borde == 'abajo') {
			bola.setCX(bordes[borde][0]+3+bola.getRadio());
			bola.setCY(cy+r+3 +3+bola.getRadio());
		}
		else { //'izquierda'
			bola.setCX(cx-r-3 -3-bola.getRadio());
			bola.setCY(bordes[borde][0]+3+bola.getRadio());
		}
	}
}

