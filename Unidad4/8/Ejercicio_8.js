class ProgressBar extends HTMLElement {
    constructor () {
      super ();    
      this.style.width="0%";
      this.style.height="100%";
      this.style.backgroundColor="red";  
    }
	connectedCallback() {
        //recoge la cifra y pasa a milisegundos	 	    
        var seconds = this.getAttribute('seconds');

        if (seconds<0) {
            this.innerHTML("El atributo 'seconds' debe ser mayor o igual que 1 (uno)");
        }

    }

}
customElements.define ('progress-bar', ProgressBar);
document.getElementById("aceptar").addEventListener("click",rellenar);
function rellenar() {
    var barra = document.querySelector("progress-bar");
    console.log(barra);
    barra.style.width="100%";
    barra.style.animationDuration=barra.getAttribute('seconds');
    console.log(barra);
}