const $ = require("jquery")
window.onload = cargarLikes;


var botonesMeGusta = $('i.like')

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
for (let botonMeGusta of botonesMeGusta) {
    botonMeGusta.addEventListener("click", function () {
        meGusta(botonMeGusta)
    });
}

function cargarLikes(){ 
    for (let botonMeGusta of botonesMeGusta) {
        var valor = localStorage.getItem(botonMeGusta.id);
        if (valor == 'fa-2x'){
            $(botonMeGusta).addClass('fa-2x');
            $(botonMeGusta).css("color", "#CD5C5C");
        }
    }
}