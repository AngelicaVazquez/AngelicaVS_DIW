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


lista = ["ABS","CUR","ENT","GRU","LAP","LOC","OPE"];
respuestas = ["ABSOLUTO","CURSI","ENTREGAR","GRUÑIR","LAPSUS","LOCALIZADOR","OPERATIVO"];
var absolutoA = new Audio();
absolutoA.src ="./audio/absoluto.mp3";
var cursiA = new Audio();
cursiA.src ="./audio/cursi.mp3";
var entregarA = new Audio();
entregarA.src ="./audio/entregar.mp3";
var gruñirA = new Audio();
gruñirA.src ="./audio/gruñir.mp3";
var lapsusA = new Audio();
lapsusA.src = "./audio/lapsus.mp3";
var localizadorA = new Audio();
localizadorA.src = "./audio/localizador.mp3";
var operativoA = new Audio();
operativoA.src = "./audio/operativo.mp3";
var audios = [absolutoA,cursiA,entregarA,gruñirA,lapsusA,localizadorA,operativoA];
var tic = new Audio();
tic.src ="./audio/tic1.mp3";
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

  reproducir();

  var respuesta = document.getElementById("respuesta");

  respuesta.addEventListener("input", function() {
    for(palabra in respuestas) {
      if(respuestas[palabra] == respuesta.value.toUpperCase()){
          respuesta.value="";
          audios.splice(palabra,1);
          console.log(palabra);
          var letras = document.querySelector("lista-palabras").shadowRoot.getElementById(palabra);
          letras.style.visibility="hidden";
          tic.play();
          index++;
          pasar();
          aciertos++;
      }
    }
  });

  var botonPasar = document.getElementById("pasar");

  botonPasar.addEventListener("click", pasar);

});//Fin DOMContentLoaded


function reproducir(){
    var audioActual = audios[index];
    console.log(audioActual)
    audioActual.play();
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
    if (index >= audios.length) {
        index = 0;
    }
    reproducir();
}