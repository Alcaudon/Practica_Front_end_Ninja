import PubSub from "pubsub-js";

export default class CommentsManager{

    constructor(commentService, commentsListUIManager){
        this.commentService=commentService;
        this.commentsListUIManager=commentsListUIManager;
    }

    init(){
        this.loadComments();
        PubSub.subscribe("new-comment", (topic, song) => {
                this.loadComments();
        });
    }
    
    loadComments(){
        this.commentService.list(comments => {
            //comprobamos si hay comentarios
            if (comments.length == 0){
                this.commentsListUIManager.setEmpty();
            }else{
                this.renderComments(comments);
                this.commentsListUIManager.setIdeal();
            }
            
        },error => {
            this.commentsListUIManager.setError();
            console.log("Error al cargar los comentarios", error);
        });
    }

    renderComments(comments){
        let html ="";
        for (let comment of comments){
            html += this.renderComment(comment);
        }        
        this.commentsListUIManager.setIdealHtml(html);
    }

    renderComment(comment){
        return `<article class="comment">
                        <div class="comment-name">
                            <span>${comment.nombre}</span>
                            <span>•</span>
                            <span>hace 9 años</span>
                        </div>
                        <div class="comment-body">
                            <p> 
                             ${comment.comentario}
                            </p>
                        </div>
                        <div class="comment-mail">
                            <a href="mailto:luis@zerone.es">${comment.mail}</a>
                        </div>
                 </article>`;
    }
    
}