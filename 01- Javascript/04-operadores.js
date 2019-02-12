const arreglo11 = ['A', 'b', 'C'];


//foreach
/*
const respuestaForEach= arreglo
.forEach(

    (valorActual,indiceActual, arreglo)=>{

        console.log('valor',valor)
        console.log('indice',indice)
        console.log('arreglo',arreglo)

    }

);
*/


const respuestaForEach = arreglo.forEach((valorActual) => console.log(valorActual));

console.log(respuestaForEach);//undefined


//map

//nos devulve un arreglo
const respuestaMap = arreglo
    .map((valorActual) => valorActual.toUpperCase())
    // return valorActual.toUpperCase();
    // return 1;

    .forEach((valorActual) => console.log(valorActual));


/*
console.log(arreglo);
console.log(respuestaMap);*/


const arregloNumeores = [5, 7, 3, 8, 1, 2, 9, 4, 6, 10]
/*
const respuestaFilter = arregloNumeores
    .filter(

        (valorActual)=>{

            return valorActual %2 === 0; //true//expreciones
            //return true todo
            //return false vacio
          }

    );*/


const respuestaFilter = arregloNumeores
    .filter((valorActual) => valorActual % 2 === 0); //true//expreciones


console.log(respuestaFilter);
//filter

// no tiene el objeccto completo
const respuestaFindIndex = arregloNumeores.findIndex(
    (valorActual) => {
        return valorActual === 7

    }
);

console.log(respuestaFindIndex);


/*

if (0===''){//el triple igual los tipos y los valores

    console.log('si')
} else{
    console.log('no')


}
*/

//alguno cumple esa condicion
const respuestaSome = arregloNumeores
    .some(
        (valorActual) => {
            return valorActual > 5;
        }
    );

console.log(respuestaSome);

//every todos culpen esa condicion

//50 registros se puede buscar
const respuestaEvery = arregloNumeores
    .every(
        (valorActual) => {
            return valorActual < 4;
        }
    );

console.log(respuestaEvery);


//operacion con  numeros reduce

//console.log(arregloNumeores);
/*
//sumar el vector
const respuestaReduce = arregloNumeores
    .reduce((valorAcumulado, valorActual) => {

            return   valorAcumulado - valorActual
        },
        100//valor con la empienza la operacion
    );*/

const respuestaReduce = arregloNumeores
    .reduce((valorAcumulado, valorActual) => valorAcumulado - valorActual, 100 );


const respuestaReduceV2 = arregloNumeores
    .reduceRight((valorAcumulado, valorActual) => valorAcumulado + valorActual, 0 );




//console.log(respuestaReduce);
//console.log(respuestaReduceV2);


//sort
const arregloNuemerosClonados = JSON.parse(JSON.stringify((arregloNumeores)));
console.log(arregloNuemerosClonados);


const respuestaShor = arregloNumeores
    .sort((a,b)=>a-b);


console.log(respuestaShor);




