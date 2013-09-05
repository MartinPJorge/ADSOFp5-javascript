ADSOFp5-javascript
==================
Este repositorio es la implementación en JavaScript de una práctica pensada para Java.
Para ello se ha tenido que simular las interfaces y la herencia desde un lenguaje protoripado como es Javascript.

El juego
========
Consiste en añadir tropas a ambos ejércitos, para comenzar la simulación de la batalla. Las criaturas del ejército oscuro son los orcos y huargos, mientras que las del ejército libre son los hombres, elfos y enanos.
Cada criatura tiene unos atributos distintos de ataque y defensa, y estos son determinados en el momento de la creación de los ejércitos.

Atributos de criaturas
----------------------
|                | Hombre | Elfo | Enano | Orco | Huargo |
|:--------------:|:------:|:----:|:-----:|:----:|:------:|
| Puntos de vida |    1   |   2  |   1   |   2  |    1   |
|     Ataque     |  [2,4] | [2,3]| [1,4] | [2,4]|  [1,3] |
|     Defensa    |  [1,3] | [2,3]| [1,2] | [1,2]|  [2,4] |

La batalla
----------
Antes de comenzar la batalla las tropas libres se sitúan a la izquierda del visualizador, y las tropas oscuras a la derecha. Después se comienza a lanzar las rondas de ataque.

1. Ataque:
  1. Cada tropa libre elige de forma totalmente aleatoria a otra tropa oscura a la que atacar.
  2. Cada guerrero de la tropa libre elige de forma totalmente aleatoria a otro guerrero de la tropa oscura al que atacar.
  3. Cada tropa oscura elige de forma totalmente aleatoria a otra tropa libre a la que atacar.
  4. Cada guerrero de la tropa oscura elige de forma totalmente aleatoria a otro guerrero de la tropa libre al que atacar.
2. Aplicar heridas:
  1. Se aplican las heridas a las criaturas libres.
  2. Se aplican las heridas a las criaturas oscuras.
  
El ataque entre criaturas se realiza de la siguiente forma:
```JavaScript
this.atacar = function(oponente) {
	var dado1 = Math.floor(Math.random()*6)+1;
	var dado2 = Math.floor(Math.random()*6)+1;

	if(dado1 + ataque > dado2 + oponente.getDefensa())
		oponente.addHeridas(1);
}

```

Fin de batalla
--------------
Para saber el ejército ganador basta con ver la última línea del historial de batalla, o bien situar el ratón sobre el mensaje 'Fin de batalla' que aparece en el visualizador (en verde aparecerá el ejército ganador).
