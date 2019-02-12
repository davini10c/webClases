function sumarDosNumeros(numUno, numDos) {
    //validaciones
    var numeroUnoEsNumber = typeof numUno == "number"; //verdadero
    var numeroDosEsNumber = typeof numDos == "number"; //verdadero

    if (numeroUnoEsNumber && numeroDosEsNumber) {

        return numUno + numDos;

    }
    else {

        return 0;
    }

    return numUno + numDos;
}

//console.log( );

//envio otro parametros
console.log(sumarDosNumeros('a', null));

//no envio   parametros
console.log(sumarDosNumeros());

//envio parametros extras
console.log(sumarDosNumeros(1, 2, 3, 4, 5, 6)); //3


//envio parametros  correctos
console.log(sumarDosNumeros(5, 6));

//no es 100% confiable

function saluar() {
    console.log('hola a todos');

}

console.log(saluar()); //undefined = void

sumarNumeros(1, 2, 3, 4, 5, 6, 7);


//...parametros un arreglo al principo no, al final
function sumarNumeros(...parametros) {
    console.log(parametros);

}

sumarNumeros(1, 2, 3, 4);

//"Vinicio", "Hola vinicio"


function saludar(nombre, funcionMensajeria) {
    //toUpperCase mayuscula
    var saludo = `Hola ${nombre.toUpperCase()}`;
    funcionMensajeria(saludo);
    return saludo;

}

saludar("vinicio", imprimirEnConsola())


function imprimirEnConsola(texto) {
    console.log("texto");

}


//var
var variable = 'valor';//nunca mas

//dos diferentes formas

let edad = 29; //mutar el objecto
edad = 30;

const casado = false; //Inmutable no puede ser reasignada numeros, string


//siempre usar const en todo lo que se pueda

const mascotas = {}
mascotas.cachetes = 'Cachetes';
mascotas.numero = 1;
delete mascotas.numero;


const carros = [];

carros[0] = 123;
carros.push('final')
carros.pop();

// anonymous functions


//una funcion sin nombre
//asignar una varible
const saludarV2 = function () {
    //implementacion

};

saludarV2();


//asignar como metodo para obkectos
const usuario = {


    nombre: 'Vinicio',
    saluar: function () {
        return this.nombre
    }
};


//enviar como parametros
saluar("Vinicio", function (texto) {
    console.log(texto)
})


//anonymous function envez utilizamos fat arrow functions -> => funciones de flecha gorda


const saludarV3 = () => {
//implementacion
};
saludarV3();


const usuarioV2 = {
    nombre: 'Vinicio',
    saluar: () => {

    }
};


//

saludar("vinicio",  (texto) => {
    console.log(isSecureContext)
});



const sumarDosNumerosV2 = function (numeroUno, numeroDos) {
    return numeroDos + numeroUno

};


const sumarDosNumerosV3 = (numeroUno, numeroDos) => numeroUno+numeroDos;

const saludarV5 = saludo =>console.log(saludo);

const saludarV6 = saludo =>{

    return console.log(saludo)

};

















