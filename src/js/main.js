window.$ = window.jQuery = require("jquery");
//Cargar los comentarios con ajax.

$.ajax({
    url: "/comentarios/",
    success: comments => {
        //comprobamos si hay comentarios
        if (comments.length == 0){
            $(".detail").removeClass("loading").addClass("empty");
        }else{
            let html ="";
            for (let comment of comments){
                html += ` ${comment.user}`;
            }
            $(".detail").html(html);
            $(".detail").removeClass("loading").addClass("ideal");
        }
        
    },
    error: error => {
        $(".detail").removeClass("loading").addClass("error");
        console.log("Error al cargar los comentarios", error);
    }
});