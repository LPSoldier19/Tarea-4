var calculadora = {
	
	display: document.getElementById("display"),
	valorDisplay: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	teclaIgual: false,
	
	init: (function(){
		this.asignarEventosBotones(".tecla");
		this.asignarEventos();
	}),
	
	
	asignarEventosBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.eventoDisminuir;
			x[i].onmouseleave = this.eventoBotonNormal;
		};
	},

	eventoDisminuir: function(event){
		calculadora.AchicaBoton(event.target);
	},

	eventoBotonNormal: function(event){
		calculadora.crecerBoton(event.target);
	},
	
	
	AchicaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},
	
	crecerBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},
	
	asignarEventos: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarDisplay();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresarDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.operacionMatematica("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.operacionMatematica("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.operacionMatematica("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.operacionMatematica("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.operacionMatematica("+");});
	},
	
	borrarDisplay: function(){ 

	    this.valorDisplay = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.teclaIgual = false;
		this.ultimoValor = 0;
		this.actualizarDisplay();
	},
	
	cambiarSigno: function(){
		if (this.valorDisplay !="0") {
			var aux;
			if (this.valorDisplay.charAt(0)=="-") {
				aux = this.valorDisplay.slice(1);
			}	else {
				aux = "-" + this.valorDisplay;
			}
		this.valorDisplay = "";
		this.valorDisplay = aux;
		this.actualizarDisplay();
		}
	},
	
	ingresarDecimal: function(){
		if (this.valorDisplay.indexOf(".")== -1) {
			if (this.valorDisplay == ""){
				this.valorDisplay = this.valorDisplay + "0.";
			} else {
				this.valorDisplay = this.valorDisplay + ".";
			}
			this.actualizarDisplay();
		}
	},
	
	ingresarNumero: function(valor){
		if (this.valorDisplay.length < 8) {
		
			if (this.valorDisplay=="0") {
				this.valorDisplay = "";
				this.valorDisplay = this.valorDisplay + valor;
			} else {
				this.valorDisplay = this.valorDisplay + valor;
			}
		this.actualizarDisplay();
		}
	},
	
	operacionMatematica: function(oper){
		this.primerValor = parseFloat(this.valorDisplay);
		this.valorDisplay = "";
		this.operacion = oper;
		this.teclaIgual = false;
		this.actualizarDisplay();
	},
	
	verResultado: function(){ 

		if(!this.teclaIgual){ 
			this.segundoValor = parseFloat(this.valorDisplay);
			this.ultimoValor = this.segundoValor;
		
		
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);
		
		} else { 
		this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}
	
		this.primerValor = this.resultado;
	
		this.valorDisplay = "";
	

		if (this.resultado.toString().length < 9){
			this.valorDisplay = this.resultado.toString();
		} else {
			this.valorDisplay = this.resultado.toString().slice(0,8) + "...";
		}
	
		this.teclaIgual = true;		
		this.actualizarDisplay();
	
	},
	
	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+": 
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-": 
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*": 
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/": 
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},
	
	actualizarDisplay: function(){
		this.display.innerHTML = this.valorDisplay;
	}
	
};

calculadora.init(); 