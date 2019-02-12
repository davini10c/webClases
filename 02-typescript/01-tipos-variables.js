//01-tipos-variables.ts
//tipos de variables en ts
//any puede ser lo quesea
let nombre = 'Vinicio';
let edad = 21.2;
edad = '1';
let casado = false;
casado = true;
const arregloNumeros = [1, 2, 3, 4];
arregloNumeros.push(1);
//objecto
//cuando se iguala a es un jason
//: a la variable es un interface
//como se define el tipo de objecto JSON mediante interfacez
//y luego se le asigna al objecto un JSON
//tipar objectos con interfacez
const vinicio = {
    nombre: 'Vinicio',
};
const fechas = new Date();
//tipar funciones devolver 2 cosas
function saludar(nombre, apellido, 
//tipos ... arreglo
...otrosNombres) {
    return 'hola';
}
//casterar cambiar de tipo a algo <>
let respuestaSaludar = saludar('1', '2', 1, 2, 3, 4, 5);
respuestaSaludar = 1;
//tipar funciones anonimas
const saludarDos = (nombre) => {
    return '';
};
class UsuarioClase {
}
//se tipa
const usuario = {
    nombre: 'vinicio'
};
//tsc nombre-archivo.ts --target es2017
