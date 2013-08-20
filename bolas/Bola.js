/**
 * Constructor de las bolas que representan las tropas.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de las bolas que representan las tropas.
 * @version 1.1
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
	 * @version 1.0
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

		// -----------------------------
		// --- DECIDIR SI SE SOLAPAN ---
		// -----------------------------
	}
}