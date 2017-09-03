const $ = require("jquery");

import UiManager from "./UiManager";

const wordLen = 120

export default class CommentsFormManager extends UiManager{

    constructor(elementSelector, commentService, pubSub){
       super(elementSelector);
        this.commentService = commentService;
        this.pubSub = pubSub;
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
        const inputs = this.element.find("input, textarea") 
        var paso;
        for (paso = 0; paso < inputs.length; paso++) {
            if (inputs[paso].checkValidity()==false)  {
                this.setErrorMessage(inputs[paso]);
                return false;
            }
        };
        
        /*for (let input of inputs) {
            if (input.checkValidity()==false)  {
                this.setErrorMessage(input);
                return false;
            }
        }*/
        if (this.contarPalabrasComentarios() == false){
            this.setErrorMessage(this.element.find("textarea")[0]);
            return false;
        }
        this.setIdeal();
        return true
    }

    send() {
        this.setLoading();
        const comment = {
            nombre: this.element.find("#nombre").val(),
            mail: this.element.find("#mail").val(),
            comentario: this.element.find("#comentario").val()
        };
        this.commentService.save(comment, success => {
            this.pubSub.publish("new-comment", comment);
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

    setErrorMessage(element) {
        let errorMessage;
        switch(element.id) {
            case "nombre":
                errorMessage= ("Por favor, introduce el nombre y apellidos de manera correcta");
                break;
            case "mail":
                errorMessage=  ("Por favor, escribe el mail de manera correcta");
                break;
            case "comentario":
                errorMessage=  (`El comentario no puede quedar en blanco ni contener mas de ${wordLen} palabras`);
                break;
            default:
                errorMessage=  ("Por favor, comprueba que todo es correcto para enviar el formulario.");
                break;
        }
        element.focus();
        this.setErrorHtml(errorMessage);
        this.setError();
    }

    contarPalabrasComentarios(){
        let validacionTexto= true;
        let len = this.element.find("#comentario").val().trim().split(/[\s]+/);
        if(len.length > wordLen){            
            validacionTexto= false;
        }
        return validacionTexto
    }

       

}