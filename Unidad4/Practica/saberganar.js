/*
- PANTALLA INICIO
- PANTALLA FIN (GANAR O PERDER)
- TEMPORIZADOR 1:30 MIN
- INTERVALO APARICIÓN LETRAS 0.5 SEG

- CONSTANTE CON NÚM ACIERTOS PARA GANAR Y VARIABLE CON ACIERTOS QUE LLEVA USUARIO. SI COINCICEN SE ACABA EL JUEGO. SE INCREMENTA EN FUNCIÓN CHECK IF ACIERTO
- INPUT RESPUESTAS. ENVIAR RESPUESTA (caseinsensitive) A FUNCIÓN CHECK
->IF:
- SI UNA PALABRA LA HA ACERTADO SE QUITA DEL ARRAY Y DE LAS LETRAS

- BOTÓN PASAR DE PALABRA
*/


lista = ["res","tur","mir"];
audios = [];
audio = new Audio();
audioAparicion = new Audio();
const objetivo = 8;
var aciertos = 0;
var index = 0;
var indexAparicion = 0;



class Palabras extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback(){
    var timer = setInterval(() => {
      var div = document.createElement("div");
      div.style.background="linear-gradient(grey,lightgrey)"
      div.style.border="2px solid black";
      div.style.borderRadius="5px";
      div.style.margin="0.5rem";
      div.style.padding="0.5rem"
      div.innerHTML = lista[indexAparicion];
      this.shadowRoot.appendChild(div);
      audioAparicion.play();
      indexAparicion++;
      if(indexAparicion==3){
        clearInterval(timer);
    }
    },500);
    }
  }
  
  window.customElements.define('lista-palabras', Palabras);

function reproducir(){
    audio.src = audios[index];
    audio.play();
}

function jugar(){

    var fondo = document.getElementsByClassName("fondo");
    fondo.removeClass("blur",1000);
/*
    do {
        reproducir();
        var respuesta = queryselector(input);
        check(respuesta);
    } while (aciertos==objetivo);
    */
}

function check(){
    for(palabra in lista) {

        if(lista[palabra] == input){
            queryslector(divConLetrasDeLaQueAcierta).style.visibility=hidden;
            aciertos++;
        }else{
            //limpiar input
            pasar();
        }
    }
}

function pasar(){
    index++;
    if (index > 7) {
        index = 0;
    }
    audio.src = audios[index];
    reproducir();
}