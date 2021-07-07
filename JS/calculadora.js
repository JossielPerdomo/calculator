// OBJETO CON LAS PROPIDADES DE LA CALCULADORA

var p = {

    teclas: document.querySelectorAll(".container__grid .item"),
    accion: null,
    digito: null,
    operaciones: document.querySelector("#screen"),
    banderaSignos: false,
    banderaPunto: false,
    resultado: false
}


// OBJETO CON LOS METODOS DE LA CALCULADORA

var m = {

    inicio: function(){
        
        for(var i = 0; i < p.teclas.length; i++){
            p.teclas[i].addEventListener("click",m.oprimirTecla);
        }
    },

    oprimirTecla: function(event){
        var cadena = event.target.getAttribute("class");
        p.digito = event.target.innerHTML;
        var tecla = cadena.split(" ");
        
        p.accion = tecla[0];
        m.calculadora(p.accion, p.digito);
    },

    calculadora: function(accion, digito){

        switch(accion){
            
            case "numero": 
                //Habilitamos el uso de signos cuando estemos trabajando con numeros
                p.banderaSignos = false;

                // Comprobamos si en la pantalla solo esta el cero
                if(p.operaciones.innerHTML == "0"){

                    p.operaciones.innerHTML = digito;

                }else{
                    //Comprobamos que no se ha pulsado el boton de resultado
                    if(!p.resultado){

                        p.operaciones.innerHTML += digito;

                        //En caso de que se haya pulsado
                    }else{
                        p.operaciones.innerHTML = digito;
                        p.resultado = false;
                        console.log("resultado",p.resultado)
                    }
                    
                }

            break;

            case "signo": 
                //Cuando estemos utilizando un signo, entonces habilitamos el uso de el decimal
                p.banderaPunto = false;
                p.resultado = false;

                // Comprobamos que no se pulse un signo mas de una vez
                if(!p.banderaSignos){
                    p.operaciones.innerHTML += digito;
                    p.banderaSignos = true;
                }

            break;

            case "punto": 
                
            //Comprobamos que en la pantalla este el cero y que este habilitado el uso de decimales
                if(p.operaciones.innerHTML == "0" && !p.banderaPunto || p.resultado){

                    //Sustituimos el cero en pantalla por "0."
                    p.operaciones.innerHTML = "0" + digito
                    p.banderaPunto = true;
                    p.resultado = false;

                    //para pruebas
                    console.log("resultado",p.resultado);
                    console.log("banderaPunto",p.banderaPunto);

                    //En caso de que no este solo el cero en pantalla
                }else if(!p.banderaPunto){

                    //Comprobamos que no este un signo antes de la expresion
                    if(!p.banderaSignos){
                        
                        p.operaciones.innerHTML += digito;
                        p.banderaPunto = true;

                        //para pruebas
                        console.log("banderaPunto",p.banderaPunto);

                        //En caso de que este un signo antes de la expresion
                    }else{

                        p.operaciones.innerHTML += "0" + digito;
                        p.banderaPunto = true;
                    }
                }

            break;

            case "igual": 
                
                //Ejecutamos el metodo eval de JS, le pasamos como parametro el contenido de la pantalla, finalmente mostramos el resultado en pantalla
                p.operaciones.innerHTML = eval(p.operaciones.innerHTML)

                if(p.operaciones.innerHTML != 0){
                    p.resultado = true
                }
                if(p.operaciones.innerHTML == 0 || p.resultado){
                    p.banderaPunto = false;
                }
                console.log("resultado", p.resultado)

            break;

            case "borrar": 
                
                p.operaciones.innerHTML = 0;
                p.banderaPunto = false;
                p.resultado = false;

            break;
        }
    }
}
m.inicio();