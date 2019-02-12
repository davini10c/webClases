// 06-callbacks.js

const fs = require('fs'); //nombre del modulo

console.log('inicio'); //no depende

//2 parametros y el callback. Depende del sistema operativo, el responde
fs.readFile(
    '06-texto.txt', //nombre del archivo
    'utf-8',//codificacion en la que va a leer

    //el error en caso de existir y el texto leido
    (error, textoLeidoArchivo) => {

        //TERMINA EN PROCESO EN 1 ALGO PASO

        //si no existe el archivo me da un error
        if (error) {//callback
            //try- catch sirve para terminar el proceso bn con error 0

            try {
                throw new Error(error);//mensaje de error

            }
            catch (e) {
                console.log(e)
            }

        }
        else {
            //funcion para concatenar texto
            console.log('Inicio2');//segundo en ejecutar
            fs.writeFile(
                '06-texto.txt',
                textoLeidoArchivo + 'Mundo',//mensaje final ultimo en ejecutarse
                (err) => {//si se necesita el texto se ejecuta en el call back
                    if (err) console.log('error');
                    console.log('Archivo Actualizado');


                    //callback hell se va a la derecha
                    fs.writeFile(
                        '06-texto.txt',
                        textoLeidoArchivo + 'Mundo',//mensaje final ultimo en ejecutarse
                        (err) => {//si se necesita el texto se ejecuta en el call back
                            if (err) console.log('error');
                            console.log('Archivo Actualizado');


                            fs.writeFile(
                                '06-texto.txt',
                                textoLeidoArchivo + 'Mundo',//mensaje final ultimo en ejecutarse
                                (err) => {//si se necesita el texto se ejecuta en el call back
                                    if (err) console.log('error');
                                    console.log('Archivo Actualizado');


                                    fs.writeFile(
                                        '06-texto.txt',
                                        textoLeidoArchivo + 'Mundo',//mensaje final ultimo en ejecutarse
                                        (err) => {//si se necesita el texto se ejecuta en el call back
                                            if (err) console.log('error');
                                            console.log('Archivo Actualizado');

                                        }
                                    );
                                }
                            );

                        }
                    );

                }
            );
            console.log('fin2');//segundo en ejecutar


            // console.log(textoLeidoArchivo);

        }
    }
);

console.log('fin');//no depende


//programacion sincrona linea por linea y pasa la siguiente
// hilos

//programacion asincrona si necesita alguien externo esa linea de codigo
//se ponen en cola de espera, sino depende de nadie, se ejecuta
//cada linea
// se ahora muchos recurso,
//cuando se hace muchos peticiones web

//callback se ejecuta en el futuro,luego de algun tiempo