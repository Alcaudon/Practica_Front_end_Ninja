const $ = require("jquery")
window.onload = cargarDatos;


var botonesMeGusta = $('i.like')
var fechasPublicacion = $('p.fecha')

function meGusta(botonMeGusta) {
    if ($(botonMeGusta).hasClass('fa-2x')){        
        $(botonMeGusta).removeClass('fa-2x');
        $(botonMeGusta).css("color", "#000000");
        localStorage.setItem(botonMeGusta.id, '');
    }else{
        $(botonMeGusta).addClass('fa-2x');
        $(botonMeGusta).css("color", "#CD5C5C");
        localStorage.setItem(botonMeGusta.id, 'fa-2x');
    }
}

$.each(botonesMeGusta,function(index,botonMeGusta){
    botonMeGusta.addEventListener("click", function () {
        meGusta(botonMeGusta)
    });
});


function cargarDatos(){ 
    $.each(botonesMeGusta,function(index,botonMeGusta){
        var valor = localStorage.getItem(botonMeGusta.id);
        if (valor == 'fa-2x'){
            $(botonMeGusta).addClass('fa-2x');
            $(botonMeGusta).css("color", "#CD5C5C");
        }
    });
    
    $.each(fechasPublicacion,function(index,fechaPublicacion){
        fechaPublicacion.innerText=calcularFechaPublicacion(fechaPublicacion.innerText)
    }); 
}

function diaSemana(fecha) {
    var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado","Domingo"]        
    return dias[fecha.getDay()];
}

Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}

function convertDate(inputFormat) {
    var dformat = [(inputFormat.getDate()).padLeft(),
                  (inputFormat.getMonth()+1).padLeft(),
                  inputFormat.getFullYear()].join('/') +' ' +
              [inputFormat.getHours().padLeft(),
                  inputFormat.getMinutes().padLeft(),
                  inputFormat.getSeconds().padLeft()].join(':');
                  inputFormat.getDate().padLeft()
    return dformat;
}

function calcularFechaPublicacion(fechaLuis){
    var fechaActual = new Date();
    var fechaPublicacion = new Date(fechaLuis);   
    var tiempoTranscurrido = ((fechaActual-fechaPublicacion)/1000);      
    if (tiempoTranscurrido<60){
        if (tiempoTranscurrido==1){
            return( "Hace 1 segundo");
        }else{
            return( "Hace " +Math.floor(tiempoTranscurrido) + " segundos");
        }
    
    }else {
        if (tiempoTranscurrido >= 60 && tiempoTranscurrido < 3600) {
            if (Math.floor(tiempoTranscurrido / 60)==1){
                return( "Hace 1 minuto");
            }else{
                return("Hace " + Math.floor(tiempoTranscurrido / 60) + " minutos");
            }
        } else {
            if (tiempoTranscurrido >= 3600 && tiempoTranscurrido < 86400) {
                if (Math.floor(tiempoTranscurrido / 3600)==1){
                    return( "Hace 1 hora");
                }else{
                    return("Hace " + Math.floor(tiempoTranscurrido / 3600) + " horas");
                }
    
            } else {
                if (tiempoTranscurrido >= 86400 && tiempoTranscurrido < 604800) {
                    return("Publicado el " + diaSemana(fechaPublicacion ));
                }else{
                    return(convertDate(fechaPublicacion ))
                }
            }
        }
    }
    
}