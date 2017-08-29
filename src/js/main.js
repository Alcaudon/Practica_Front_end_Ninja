window.$ = window.jQuery = require("jquery");
import CommentsService from "./CommentsService";
import UiManager from "./UiManager";
import CommentsManager from "./CommentsManager"
import CommentsFormManager from "./CommentsFormManager"
import menu from "./menu"
import PubSub from "pubsub-js";

const commentService = new CommentsService("/comentarios/");
const commentsListUIManager = new UiManager(".comments");

const commentsManager = new CommentsManager(commentService, commentsListUIManager, PubSub);
commentsManager.init();

const commentsFormManager = new CommentsFormManager(".comment-form", commentService, PubSub);
commentsFormManager.init();