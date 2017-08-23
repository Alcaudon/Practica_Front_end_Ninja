window.$ = window.jQuery = require("jquery");
import CommentsService from "./CommentsService";
import UiManager from "./UiManager";
import CommentsManager from "./CommentsManager"

const commentService = new CommentsService("/comentarios/");
const commentsListUIManager = new UiManager(".comments");
const commentsManager = new CommentsManager(commentService, commentsListUIManager);

commentsManager.init();
