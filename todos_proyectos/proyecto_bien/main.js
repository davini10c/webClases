const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Escoja una opción: ',
    choices: [
        '1.- Crear Producto',
        '2.- Borrar Producto',
        '3.- Buscar Producto',
        '4.- Actualizar Producto',
    ]
};
const ingresarProductos = [{
        name: 'nombre',
        type: 'input',
        message: 'Ingrese el nombre del producto: '
    }, {
        name: 'categoria',
        type: 'input',
        message: 'Ingrese la categoria del producto: '
    }, {
        name: 'precio',
        type: 'input',
        message: 'Ingrese el precio del producto: '
    }];
const preguntaBuscarProducto = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Ingrese el nombre del producto',
    }
];
const preguntaEdicionProducto = [{
        name: 'nombre',
        type: 'input',
        message: 'Ingrese el nuevo nombre del producto: '
    }, {
        name: 'categoria',
        type: 'input',
        message: 'Ingrese la nueva categoria del producto: '
    }, {
        name: 'precio',
        type: 'input',
        message: 'Ingrese el nuevo precio del producto: '
    }];
function inicialiarBDD() {
    return new Promise((resolve, reject) => {
        fs.readFile('bdd.json', 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                fs.writeFile('bdd.json', '{"productos":[]}', (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{"productos":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD leida',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
function main() {
    const respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), ejecutarAcccion(), guardarBaseDeDatos())
        .subscribe((data) => {
        //
        console.log("\n*************Base Final*****************\n");
        console.log(data.bdd.productos);
    }, (error) => {
        //
        console.log(error);
    }, () => {
        main();
        console.log('Complete');
    });
}
function guardarBDD(bdd) {
    return new Promise((resolve, reject) => {
        fs.writeFile('bdd.json', JSON.stringify(bdd), (error) => {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
function preguntarOpcionesMenu() {
    return mergeMap((respuestaBDD) => {
        return rxjs.from(inquirer.prompt(preguntaMenu)).pipe(map((respuesta) => {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
        }));
    });
}
function opcionesRespuesta() {
    return mergeMap((respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case '1.- Crear Producto':
                return rxjs
                    .from(inquirer.prompt(ingresarProductos))
                    .pipe(map((producto) => {
                    respuestaBDD.producto = producto;
                    return respuestaBDD;
                }));
            case '3.- Buscar Producto':
                return buscarProducto(respuestaBDD);
                break;
            case '4.- Actualizar Producto':
                return preguntarNombre(respuestaBDD);
            case '2.- Borrar Producto':
                return borrarProducto(respuestaBDD);
                break;
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    (respuestaBDD) => {
        // OBS
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    (respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case '1.- Crear Producto':
                const producto = respuestaBDD.producto;
                respuestaBDD.bdd.productos.push(producto);
                return respuestaBDD;
            case '4.- Actualizar Producto':
                const indice = respuestaBDD.indiceUsuario;
                respuestaBDD.bdd.productos[indice].nombre = respuestaBDD.producto.nombre;
                respuestaBDD.bdd.productos[indice].categoria = respuestaBDD.producto.categoria;
                respuestaBDD.bdd.productos[indice].precio = respuestaBDD.producto.precio;
                return respuestaBDD;
            case '2.- Borrar Producto':
                return respuestaBDD;
            case '3.- Buscar Producto':
                return respuestaBDD;
        }
    });
}
function preguntarNombre(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarProducto))
        .pipe(mergeMap(// RESP ANT OBS
    (respuesta) => {
        const indiciProducto = respuestaBDD.bdd.productos
            .findIndex(// -1
        (producto) => {
            return producto.nombre === respuesta.nombre;
        });
        if (indiciProducto === -1) {
            console.log('*************************');
            return preguntarNombre(respuestaBDD);
        }
        else {
            console.log(indiciProducto);
            respuestaBDD.indiceUsuario = indiciProducto;
            return rxjs.from(inquirer.prompt(preguntaEdicionProducto)).pipe(map((respuesta) => {
                respuestaBDD.producto = {
                    nombre: respuesta.nombre,
                    categoria: respuesta.categoria,
                    precio: respuesta.precio
                };
                return respuestaBDD;
            }));
        }
    }));
}
function borrarProducto(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarProducto))
        .pipe(mergeMap(// RESP ANT OBS
    (respuesta) => {
        const indiceProducto = respuestaBDD.bdd
            .productos
            .findIndex(// -1
        (producto) => {
            return producto.nombre === respuesta.nombre;
        });
        if (indiceProducto === -1) {
            console.log('Borrar****************');
            return preguntarNombre(respuestaBDD);
        }
        else {
            console.log(indiceProducto);
            return rxjs.from(promesaEliminar(respuestaBDD.bdd.productos, indiceProducto)).pipe(map(() => {
                return respuestaBDD;
            }));
        }
    }));
}
function buscarProducto(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarProducto))
        .pipe(mergeMap((respuesta) => {
        const indiceProducto = respuestaBDD.bdd.productos
            .findIndex(// -1
        (producto) => {
            return producto.nombre === respuesta.nombre;
        });
        if (indiceProducto === -1) {
            console.log('Buscar***********');
            return preguntarNombre(respuestaBDD);
        }
        else {
            return rxjs.from(promesaBuscar(respuestaBDD.bdd.productos[indiceProducto])).pipe(map(() => {
                return respuestaBDD;
            }));
        }
    }));
}
const promesaBuscar = (respuestaBDD) => {
    return new Promise((resolve) => {
        const resultado = {
            respuesta: respuestaBDD
        };
        console.log('\nRespuesta:\n', respuestaBDD);
        resolve(resultado);
    });
};
const promesaEliminar = (respuestaBDD, indiceProducto) => {
    return new Promise((resolve) => {
        resolve(respuestaBDD.splice(indiceProducto, 1));
    });
};
main();
