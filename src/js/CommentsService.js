const $ = require("jquery")

export class CommentsService{

    constructor(){

    }

    list(successCallback, errorCallback){
        $.ajax({
            url: "/comentarios/",
            success: successCallback,
            error: errorCallback
        });
    }
    create(comment){};

    getDetail(commentId){}

    update(comment){}

    delete(commentId){

    }
}