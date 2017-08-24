window.$ = window.jQuery = require("jquery");
import CommentsService from "./CommentsService";
import UiManager from "./UiManager";
import CommentsManager from "./CommentsManager"
import CommentsFormManager from "./CommentsFormManager"

const commentService = new CommentsService("/comentarios/");
const commentsListUIManager = new UiManager(".comments");

const commentsManager = new CommentsManager(commentService, commentsListUIManager);
commentsManager.init();

const commentsFormManager = new CommentsFormManager(".comment-form", commentService);
commentsFormManager.init();