window.$ = window.jQuery = require("jquery");
import CommentsService from "./CommentsService";
import UiManager from "./UiManager";

const commentService = new CommentsService("/comentarios/");
const commentsListUIManager = new UiManager(".comments");

commentService.list(comments => {
        //comprobamos si hay comentarios
        if (comments.length == 0){
            commentsListUIManager.setEmpty();
        }else{
            let html ="";
            for (let comment of comments){
                html += `<article class="comment">
                                <div class="comment-name">
                                    <span>${comment.nombre}</span>
                                    <span>•</span>
                                    <span>hace 9 años</span>
                                </div>
                                <div class="comment-body">
                                    <p> 
                                        ${comment.comment}
                                    </p>
                                </div>
                                <div class="comment-mail">
                                     <a href="mailto:luis@zerone.es">${comment.mail}</a>
                                </div>
                        </article>`;
            }
            $(".comments").html(html);
            commentsListUIManager.setIdeal();
        }
        
    },error => {
        commentsListUIManager.setError();
        console.log("Error al cargar los comentarios", error);
    });