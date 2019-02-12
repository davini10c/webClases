//08-promosas.js

//promesa es una instancia de una clase que se llama Promise();
//la promesa recibe una funcion anonima

//la promesa recibe 2 parametros resolve and reject

//mientras no se ejecute el resolve no ejecuta el punto .then
//mientras no se ejecute el reject no ejecuta el punto .catch


/*

//ejecutando una promesa dentro de una funcion anonima
const promesa = () => {
    return new Promise(
        (resolve, reject) => {
             resolve(10); //se ejecuta el then
            // reject(); //se ejecuta el catch
        }
    );
};

//toda promesa tiene un then y catch asincrona
console.log(promesa);
promesa()
//estas funciones reciven una funcion como parametros
    .then(
        //se ejecuatan las cosas cuando estan bien
        //enviar datos desde resolve y los visualiza el then
        (numero) => {
            console.log('ok', numero)
        }
    )
    .catch(
        //se ejecuatan las cosas cuando no estan bien
        () => {
            console.log('Mal')
        }
    );*/
//con las promesas ya no se enviar callbacks
/////////////////////////////////////
//promesa para leer un archivo
const fs = require('fs');


//con promesas ya no se envia callbacks
//ahora se tiene el then y catch


const promesa = (nombreArchivo) => {
    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error, contenidoLeido) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(contenidoLeido);
                    }
                }
            );
        }
    );
};




//escribir archivos
const promesaEscritura = (nombreArchivo,
                          contenidoArchivo) => {
    return new Promise(
        (resolve, reject) => {

            //funcion para leer un archivo
            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                //callback
                (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(contenidoArchivo);

                    }


                }
            );


        }
    );
};


//ejecutar la funcion
promesa('07-texto.txt')
    .then(
        (contenido) => {

            console.log('ok', contenido);
            //en el return lo unica se devulve una promesa

            return promesaEscritura('07-texto.txt',
                contenido + 'Nuevo Contenido' )


        }
    )

    // se puede concatenar promesas
    .then(
        (contenidoCompleto)=>{
            console.log(contenidoCompleto);


        }


    )
    .catch(
        (error) => {
            console.log('Mal', error);
        }
    );
