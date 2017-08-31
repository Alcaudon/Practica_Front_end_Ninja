const $ = require("jquery")

$(function () {

    let header = document.getElementById('header');
    let headroom = new Headroom(header);
    let menuAjust = 961;
    headroom.init();

    //Menu responsive
    //Calculamos el ancho de la página

    let ancho = $(window).width(),
        enlaces = $('#enlaces'),
        search = $('input'),
        btnMenu = $('#btn-menu'),
        icono = $('#btn-menu .icono');

    if (ancho < menuAjust) {
        enlaces.hide();
        search.hide();
        icono.addClass('fa-bars');
    }

    btnMenu.on('click', function () {
        enlaces.slideToggle();
        icono.toggleClass('fa-bars');
        icono.toggleClass('fa-times');
    });

    $(window).on('resize', function () {
        if ($(this).width() > menuAjust) {
            enlaces.show();
            icono.addClass('fa-times');
            icono.removeClass('fa-bars');
            search.addClass('search');
            search.removeClass('no-search');
        } else {
            enlaces.hide();
            icono.addClass('fa-bars');
            icono.removeClass('fa-times');
            search.addClass('no-search');
            search.removeClass('search');
        }
    })
})
