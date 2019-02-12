//01-tipos-variables.ts

//tipos de variables en ts

//any puede ser lo quesea

let nombre: any = 'Vinicio';
let edad: number | string = 21.2;
edad = '1';

let casado: boolean = false;
casado = true;


const arregloNumeros: number[] = [1, 2, 3, 4];
arregloNumeros.push(1);


//objecto
//cuando se iguala a es un jason
//: a la variable es un interface

//como se define el tipo de objecto JSON mediante interfacez
//y luego se le asigna al objecto un JSON

//tipar objectos con interfacez


const vinicio: {//:interfaz en un objecto JSON
    nombre: string;
    apellido?: string;
    edad?: number;
    //cuando una propiedad no se requerida
    //se hace obsional con ?
    estado?: 'Activo' | 'Inactivo';
    //tipar funciones dentro de objectos JSon
    saludar?: (nombre: String) => string

} = {
    nombre: 'Vinicio',
};

const fechas: Date = new Date();

//tipar funciones devolver 2 cosas


function saludar(
    nombre: string,
    apellido?: string,
    //tipos ... arreglo
    ...otrosNombres: number[]
): string | number {
    return 'hola';
}

//casterar cambiar de tipo a algo <>
let respuestaSaludar = <number>saludar('1', '2', 1, 2, 3, 4, 5);
respuestaSaludar = 1;

//tipar funciones anonimas
const saludarDos = (nombre): string => {
    return '';
};


class UsuarioClase {
    public nombre: string;

}

interface UsuarioInterface {
    nombre: String;

}


//se tipa
const usuario = {
    nombre: 'vinicio'
};

//tsc nombre-archivo.ts --target es2017