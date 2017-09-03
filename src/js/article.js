import CommentsService from "./CommentsService";
import UiManager from "./UiManager";
import CommentsManager from "./CommentsManager";
import CommentsFormManager from "./CommentsFormManager";


if (location.href == "http://localhost:3000/detail.html") {
    var isloading = 0;
    var page = 0;

    const $ = require("jquery")
    $(function () {
        $(window).scroll(function () {
            checkcontent();
        });

        $(window).resize(function () {
            checkcontent();
        });

        checkcontent();
    });


    function checkcontent() {
        if (isloading == 1) return;

        var el = $(".commentLoader");

        if ($(window).scrollTop() + $(window).height() > el.offset().top)
            loadcontent(el);
    }


    function loadcontent(el) {
        isloading = 1;

        const commentService = new CommentsService("/comentarios/");
        const commentsListUIManager = new UiManager(".comments");

        const commentsManager = new CommentsManager(commentService, commentsListUIManager, PubSub);
        commentsManager.init();

        const commentsFormManager = new CommentsFormManager(".comment-form", commentService, PubSub);
        commentsFormManager.init();

        document.getElementById('flotante').style.display = '';
    }
}