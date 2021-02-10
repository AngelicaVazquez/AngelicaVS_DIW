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
respuestas = ["residuo","turquesa","mirar"];
var audios = [];
var tic = new Audio();
tic.src="./audio/tic1.mp3";
const objetivo = 7;
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
      div.style.background="linear-gradient(grey,lightgrey,grey)"
      div.style.border="2px solid black";
      div.style.borderRadius="5px";
      div.style.margin="0.5rem";
      div.style.padding="0.5rem";
      div.id=indexAparicion;
      div.innerHTML = lista[indexAparicion];
      this.shadowRoot.appendChild(div);
      tic.play();
      indexAparicion++;
      if(indexAparicion==7){
        clearInterval(timer);
    }
    },300);
    }
  }
  
  window.customElements.define('lista-palabras', Palabras);


document.addEventListener("DOMContentLoaded", function(event) {
  var fondo = document.getElementById("fondo");
  fondo.classList.remove("blur");
  
  //TIMER
  (function() {
    const endTime = new Date().getTime()+2*60000;
    
    function getRemainingTime(deadline) {
      const currentTime = new Date().getTime();
      return deadline - currentTime;
    }
    
    function pad(value) {
      return ('0' + Math.floor(value)).slice(-2);
    }
  
    function showTime() {
      const remainingTime = getRemainingTime(endTime);
      const seconds = pad((remainingTime / 1000) % 60);
      const minutes = pad((remainingTime / (60 * 1000)) % 60);
  
      document.getElementById("timer").innerHTML = `${minutes}:${seconds}`;
  
      if (remainingTime >= 1000) {
        requestAnimationFrame(showTime);
      }else{
        cancelAnimationFrame(showTime);
      }
    }
    requestAnimationFrame(showTime);
  })();

//reproducir();

  var respuesta = document.getElementById("respuesta");

  respuesta.addEventListener("input", function() {
    for(palabra in respuestas) {
      if(respuestas[palabra] == respuesta.value){
          respuesta.value="";
          var letras = document.querySelector("lista-palabras").shadowRoot.getElementById(palabra);
          letras.style.visibility="hidden";
          tic.play();
          aciertos++;
      }
    }
  });

});//Fin DOMContentLoaded


function reproducir(){
    audio.src = audios[index];
    audio.play();
}


function jugar(){
  
  if (aciertos != objetivo){
    var respuesta = document.getElementById("respuesta").value;
    reproducir();
    check(respuesta);
  }else{
    window.alert("has ganado");
  }
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