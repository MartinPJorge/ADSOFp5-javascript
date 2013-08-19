/**
 * Constructor de las bolas que representan las tropas.
 *
 * @author Jorge Martin Perez
 * @version 1.0
 */




/**
 * Constructor de las bolas que representan las tropas.
 * @version 1.0
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
		ctx.fillText(cantidad, cx-7,cy+3);
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
}