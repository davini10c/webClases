//07-callback-propio.js
const fs = require('fs');

let contenidoFinal = 'Inicial';

function appendFile(nombreArchivo,
                    contenidoArchivo,
                    callbacks) {
    //1-> leer archivo
    //2.1-> concatenamos el contenido
    //2.2-> Creamos el archivo

    //recibe el nombre del archivo, la codificacion UTF-8
    //y el callbacks}
    //readFile lee el archivo
    fs.readFile(
        nombreArchivo,
        'utf-8',
        //callback
        (error, contenidoLeido) => {
            if (error) {
                //escribir el archivo
                const contenido = contenidoArchivo;

                //escribir el archivo 2 parametros
                //nombre del archivo, contenido y callbacks
                fs.writeFile(
                    nombreArchivo,
                    contenido,
                    (err) => {

                        if (err) {
                            //console.log('Error', err)
                            callbacks(err);

                        }
                        else {
                            //devolvel algo que pasa en el futuro
                            //devolver el contenido del archivo
                            //para devolver algo que esta en un callback
                            //mediante un otro callbacks

                            //un callback
                            //devolvemos como segundo parametro el contenido
                            callbacks(undefined, contenido);


                        }


                    }
                );


            }
            else {
                //concatenamos
                const contenido = contenidoLeido + contenidoArchivo;

                fs.writeFile(
                    nombreArchivo,
                    contenido,
                    (err) => {

                        //al momento de escribir da un error
                        if (err) {
                            callbacks(err);
                        }
                        else {

                            callbacks(undefined, contenido);

                        }


                    }
                );


            }


        }
    );

}

/*appendFile(
    '07-texto.txt',
    '\nAdios',
    //un callback para devolver la respueta,
    //una llamada despues de terminar la funcion
    (error, contenidoTexto) => {

        if (error) {
            console.log(error)
        }
        else {
            console.log(contenidoTexto)
        }
    });*/


//el callback devolver algo que se ejecuta en el futuro
//para devolver una repuesta asincrona

////////////////////////////////////////////////////////////////////////////


//['A','B','C']

//0-A.txt 'A'
//1-B.txt 'B'
//2-C.txt 'C'

//devolver una arreglo con este tipo de respueta


//devolver un arreglo de respuestas
//[respuesta, respuesta, respuesta]
//cada vez que se cree un archivo se agrega al arreglo
//metodo para agregar un elemento al arreglo un push

function ejercicio(arregloStrings,
                   callback) {

    const arregloRespuestas = [];

    //recorrer el arreglo con el forEach
    arregloStrings.forEach(
        (string, indice) => {
            const nombreArchivo = `${indice}-${string}.txt`;//nombre del archivo
            const contenidoArchivo = string;//contenido del archivo

            //escribir el archivo y guardale con el contenido
            fs.writeFile(
                nombreArchivo,
                contenidoArchivo,
                //callback error
                (err) => {
                    const respuesta = {
                        nombreArchivo: nombreArchivo,
                        contenidoArchivo: contenidoArchivo,
                        erro: err
                    };
                    //al arreglo de respuesta se le agrega la respuesta
                    //con el push
                    arregloRespuestas.push(respuesta);
                    //si el tamano del arreglo de strings es igual al tamaño de arreglo de respuestas
                    const terminoElArreglo = arregloStrings.length === arregloRespuestas.length
                    if (terminoElArreglo) {
                        callback(arregloRespuestas);

                    }


                }
            );


        }
    );
}

/*ejercicio(['A', 'B', 'C'],

    (arregloRespuestas) => {
        console.log(arregloRespuestas);

    }
);*/

//callback devolver una respuesta asincrona


///promesa ejercicios


//se crea la promesa
const ejercicioPromesa = (arregloStrings) => {
    return new Promise(
        (resolver) => {
            const arregloRespuesta = [];


            //forEach recorre al array
            arregloStrings.forEach(
                (string, indice) => {
                    const nombreArchivo = `${indice}-${string}.txt`;
                    const contenidoArchivo = string;

                    //se escribe en el aechivo
                    fs.writeFile(
                        nombreArchivo,
                        contenidoArchivo,
                        //callback

                        //se escribe la respuesta
                        (err) => {
                            const respuesta = {
                                nombreArchivo: nombreArchivo,
                                contenidoArchivo: contenidoArchivo,
                                error: err

                            };

                            // se agrega en el vecto de respuesta
                            arregloRespuesta.push(respuesta);
                            const terminoArreglo = arregloStrings.length === arregloRespuesta.length;

                            if (terminoArreglo) {
                                resolver(arregloRespuesta);

                            }


                        }
                    );


                }
            )
        }
    );


};


/*ejercicioPromesa(['A', 'B', 'C'])
    .then(
        (respuesta) => {
            console.log(respuesta)

        }
    )
    .catch(
        (error) => {
            console.log('Mal', error);
        }
    );*/

////////////////////////////////////////////////////////////////////////////////
//funcion abrir un documento con promesas

function appendFilePromesa(nombreArchivo, contenidoArchivo) {
    //se crea la promesa
    return new Promise(
        (resolve, reject) => {
            //se lee el archivo
            fs.readFile(
                nombreArchivo,
                'utf-8',
                //callbacks
                (error, contenidoLeido) => {
                    if (error) {
                        const contenido = contenidoArchivo;

                        //escribir en el archivo

                        fs.writeFile(
                            nombreArchivo,
                            contenido,

                            (err) => {
                                //si se produce un error
                                if (err) {
                                    //mal
                                    reject(err);

                                }
                                else {
                                    //bien
                                    resolve(contenido);

                                }

                            }
                        );


                    }
                    else {
                        //si existe el archivo se concatena

                        const contenido = contenidoLeido + contenidoArchivo;
                        //se escribe en el archivo el contenido concatenado
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            //callBacks
                            (erro) => {
                                if (erro) {
                                    reject(erro);
                                }
                                else {
                                    resolve(contenido);

                                }

                            }
                        );


                    }


                }
            );

        }
    );

}


appendFilePromesa('07-texto.txt', '\nAdios')
    .then(
        //funcion anonima
        (contenido) => {

            console.log(contenido)


        }
    )
    .catch(

        (error) => {
            console.log(error)


        }
    );
























