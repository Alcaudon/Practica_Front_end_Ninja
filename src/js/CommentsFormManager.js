const $ = require("jquery");

import UiManager from "./UiManager";

export default class CommentsFormManager extends UiManager{

    constructor(elementSelector, commentService){
       super(elementSelector);
        this.commentService = commentService;
    }

    init (){
        this.setupSubmitEventHandler();
    }

    setupSubmitEventHandler() {
        this.element.on("submit", () => {
            this.validateAndSendData();
            // en jQuery podemos hacer un preventDefault haciendo un return false en los manejadores de evento
            return false; // == event.preventDefault();
        });
    }

    validateAndSendData() {
        if (this.isValid()) {
            this.send();
        }
    }


    isValid(){
        const inputs = this.element.find("input");
        for (let input of inputs) {
            if (input.checkValidity()==false){
                const errorMessage = input.validationMessage;
                input.focus();
                this.setErrorHtml(errorMessage);
                this.setError();
                return false;
            }
        }
        this.setIdeal();
        return true
    }

    send() {
        this.setLoading();
        const comment = {
            nombre: this.element.find("#nombre").val(),
            mail: this.element.find("#mail").val(),
            comentario: this.element.find("#comment").val()
        };
        this.commentService.save(comment, success => {
            this.pubSub.publish("new-comment", comment); // publicamos el evento que informa de la creación de una canción 
            this.resetForm();
            this.setIdeal();
        }, error => {
            this.setErrorHtml("Se ha producido un error al cargar el cometario en el servidor.");
            this.setError();
        });
    }

    resetForm() {
        this.element[0].reset(); // resetea el formulario
    }

    disableFormControls() {
        this.element.find("input, button, textarea").attr("disabled", true);
    }

    enableFormControls() {
        this.element.find("input, button, textarea").attr("disabled", false);
    }

    setLoading() {
        super.setLoading();
        this.disableFormControls();
    }

    setError() {
        super.setError();
        this.enableFormControls();
    }

    setIdeal() {
        super.setIdeal();
        this.enableFormControls();
    }

}