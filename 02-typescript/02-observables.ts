//02-observables.ts

declare var require: any;
declare var Promise: any;


const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const distinct = require('rxjs/operators').distinct;
const concat = require('rxjs/operators').concat;


//con el signo de dolar es observable
const numeros$ = rxjs.of(2, 2, 'Vinicio', {nombre: 'Vinicio'}, ['oli'], function () {

});

//subcribe la mas importante
//3 funciones

//pipe
/*
numeros$

//cualquier operacion dentro del pipe
    .pipe(
        distinct(),//elimina los repetidos

        //funcion anonima
        map(
            (valorActual) => {
                //  return false;//se crea un arreglo de falsos

                return {
                    data: valorActual
                    //permite despleglar todos los valores del arreglo
                };

            }
        )
    )
    .subscribe(
        //cuandotodo este bn
        (ok) => {
            //esta funcion se ejecuta cuando complilas es codigo
            console.log('En ok', ok)

        },
        (error) => {
            console.log('En error', error)

        },
        //cuando de complete algo
        () => {

        }
    );
*/

const promesita = (funciona: boolean): Promise<string> => {
    return new Promise(
        (resolve, reject) => {
            if (funciona) {
                resolve(' :) ');
            } else {
                reject(' :( ');
            }
        }
    );
};

const promesita$ = rxjs.from(promesita(true));//le transforma la promesa
//en observables
promesita$
    .subscribe(
        (ok) => {
            console.log('Promesita bien ', ok);
        },
        (error) => {
            console.log('Promesita mal', error);
        },
        () => {
            console.log('Completado');
        }
    );

//funcion para concatenar observables
// es un nuevo observable con los 2 datos de los onservables
const observableConcatenado$ = numeros$
    .pipe(//todas las funciones dentro del pipe
        concat(promesita$),//permite concatenar observables
        distinct(),//elimina repetidos
        map(//funcion anonima
            (valorActual) => {
                console.log('Ejecuto');//
                return {
                    data: valorActual//devuelve el valor de la promesa uno por unos
                };
            }
        )
    );

//despliega los datos concatenados

observableConcatenado$
    .subscribe(
        (ok) => {
            console.log('Concatenado bien ', ok);
        },
        (error) => {
            console.log('Error', error);
        },
        () => {
            console.log('Completado');
        }
    );