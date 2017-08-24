const $ = require("jquery")

export default class CommentsService{

    constructor(url){
        this.url=url;
    }

    list(successCallback, errorCallback){
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

    create(comment, successCallback, errorCallback){
        $.ajax({
            url:this.url,
            method:'post',
            data:comment,
            success: successCallback,
            error: errorCallback
        });
    };

    save(comment, successCallback, errorCallback){
        if (comment.id){
            this.update(comment, successCallback, errorCallback);
        }else{
            this.create(comment, successCallback, errorCallback);
        }
    };

    getDetail(commentId, successCallback, errorCallback){
        $.ajax({
            url:`${this.url}${id}`,
            success: successCallback,
            error: errorCallback
        });
    }

    update(comment, successCallback, errorCallback){
        $.ajax({
            url:`${this.url}${comment.id}`,
            method:'put',
            data:comment,
            success: successCallback,
            error: errorCallback
        });
    }

    delete(commentId, successCallback, errorCallback){
        $.ajax({
            url:`${this.url}${id}`,
            method:'delete',
            success: successCallback,
            error: errorCallback
        });
    }
}