//var arreglo = [
//1,
//2, 2
//"Hola",
//true,
//false,
//{},
//undefined,
//null,
//  []
//];


var arregloNumeros = [1, 2, 3];

arregloNumeros[0]; //1
arregloNumeros[2]; //3
arregloNumeros[4]; //

//console.log('arregloNumeros[2]', arregloNumeros[2]);


//agregar datos
//arregloNumeros.push(4);
//console.log(arregloNumeros);

//eliminar datos
//arregloNumeros.pop(4);
//console.log(arregloNumeros);


//eliminar con posicion
arregloNumeros.splice(0, 0, 0);
//console.log(arregloNumeros);


//eliminar con posicion
arregloNumeros.splice(2, 0, 1.5);
console.log(arregloNumeros);


var usuario = 1.5;
var indiceUsuario = arregloNumeros.indexOf(usuario);
arregloNumeros.splice(indiceUsuario, 1);
//console.log(arregloNumeros);
//indice
//arregloNumeros.indexOf(1.5);


console.log(arregloNumeros.slice(2, 5));


var arregloNotasPrimerBimestre = [8.5, 9, 4];
var arregloNotasSegundoBimestre = [8.5, 9, 4];
//destructuracion de arreglos con ..
var arregloNotas2018B = [...arregloNotasPrimerBimestre, ...arregloNotasSegundoBimestre];
//

console.log(arregloNotas2018B);

//destructuracion de objectos

var adrian2018A = {
    sexualidad: 0,
    web: 7

};


var adrian2018B = {
    musica: 7,
    moviles: 8

};


var adrian = {
    ...adrian2018A,...adrian2018B

};

console.log('adrian', adrian);