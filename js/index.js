let canvas = document.getElementById("MyCanvas");
let ctx = canvas.getContext('2d');
let colorDefecto = "black";
let trozoDefecto = 1;
let Borrador = false; 
let gomaEspesor;
let posx;
let posy;
let estado = 0; // 0 en blanco, 1 escribiendo
setTimeout(function(){
	if(!Borrador){
		canvas.style.cursor = "url('img/lapizSin.png') 25 90, auto";
	}else{
		canvas.style.cursor = "url('img/goma.png') 20 70, auto";
	}
	AdaptarCanvas();
	addEventListener("resize", AdaptarCanvas);
}, 15);

function BorrarLineas(){
	if(!Borrador){
		Borrador = true;
		canvas.style.cursor = "url('img/goma.png') 20 70, auto";
	}else{
		Borrador = false;
	}
}
function CrearLinea(e){
	if(estado == 1){
		if(Borrador == false){
			let x = e.clientX;
			let y = e.clientY;
			// ctx.moveTo(posx, posy);
			ctx.lineTo(x, y);
			ctx.stroke();
		}else{
			let x = e.clientX;
			let y = e.clientY;
			ctx.clearRect(x, y, gomaEspesor, gomaEspesor);
		}
	}
}
function LineaTactil(e){
	if(estado == 1){
		if(Borrador == false){
			let posx = e.changedTouches[0].pageX;
			let posy = e.changedTouches[0].pageY;
			// ctx.moveTo(posx, posy);
			ctx.lineTo(posx, posy);
			ctx.stroke();
		}else{
			let posx = e.changedTouches[0].pageX;
			let posy = e.changedTouches[0].pageY;
			ctx.clearRect(posx, posy, gomaEspesor, gomaEspesor);
		}
	} 
}
function EstablecerLinea(e){
	if(Borrador == false){
		canvas.style.cursor = "url('img/lapizSin.png') 25 90, auto";
	}else{
		canvas.style.cursor = "url('img/goma.png') 20 70, auto";
	}
	estado = 1;
	ctx.beginPath();
	ModificarPincel();

}
canvas.addEventListener("resize", AdaptarCanvas());
canvas.addEventListener("mousemove", function(e){CrearLinea(e)});
canvas.addEventListener("mousedown", function(e){EstablecerLinea(e)});
canvas.addEventListener("mouseup", function(e){
	estado = 0;
});

canvas.addEventListener("touchmove", function(e){LineaTactil(e)});
canvas.addEventListener("touchstart", function(e){EstablecerLinea(e)});
canvas.addEventListener("touchend", function(e){
	estado = 0;
});

// #--------------------Funciones Secundarias------------------------------#


function AdaptarCanvas(){
 	canvas.width = parseInt(getComputedStyle(document.getElementById('juego')).getPropertyValue('width'));
    canvas.height = parseInt(getComputedStyle(document.getElementById('juego')).getPropertyValue('height'));
}
function ModificarPincel(){
	let colorElegido = document.getElementById("color-chose").className;
	let trazoElegido = document.getElementById("width-chose").className;

	if(trazoElegido == null || trazoElegido == ""){
		ctx.lineWidth = 1;
	}else{
		ctx.lineWidth = trazoElegido;
	}
	if(colorElegido == null || colorElegido == ""){
		ctx.strokeStyle  = "black";
	}else{
		ctx.strokeStyle = colorElegido;
	}
	if(ctx.lineWidth == 1){
		gomaEspesor = 10;
	}else{
		gomaEspesor = parseInt(ctx.lineWidth) * 5;
	}
	// console.log("Elegido: " + colorElegido + " Normal: " + colorDefecto);
}