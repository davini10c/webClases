declare var require;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const map = require('rxjs/operators').map;
const produtosSeleccionados = [];
let total = 0;



function arregloProductos(arreglo) {
    const arr = [];
    arreglo.forEach((elemnto) => {
        arr.push(elemnto.nombre)
    });
    return arr;
}

const productosABuscar = (producto) => {
// @ts-ignore
    return new Promise((resolve, reject) => {
        fs.readFile('Productos.txt', 'utf-8', (err, contenido) => {
            if (err) {
                reject(err)
            } else {
                const arregloUsuarios = contenido.split(/\r?\n/).map((linea) => {
                    var users = linea.split(' ');
                    return {nombre: users[0], categoria: users[1], precio: users[2]};
                });
                arregloUsuarios
                    .forEach((element) => {
                        if (producto === element.nombre) {
                            resolve(element.precio)
                        }
                    });
            }
        });
    })
};


const promesaBuscar = (arreglo) => {
    // @ts-ignore
    return new Promise((resolve) => {
        arreglo.forEach((elemnet) => {
            productosABuscar(elemnet.productos).then((respuesta) => {
                total = total + parseFloat(respuesta.toString());
                console.log(`\t ${elemnet.productos}\t\t${respuesta}\t\t${total}`)
            });
        });
    })
};




function buscarProducto(arreglo) {
    console.log('\n***Discos a comprar: ***');
    console.log('   Nombre Disco\t\tPrecio\t\tTotal');
    promesaBuscar(arreglo).then((reg) => {
        console.log(reg)
    })
}




const music = () => {
    // @ts-ignore

    return new Promise((resolve, reject) => {
        fs.readFile('Productos.txt', 'utf-8', (err, contenido) => {
            if (err) {
                reject(err)
            } else {
                const arregloUsuarios = contenido.split(/\r?\n/).map((linea) => {
                    var users = linea.split(' ');
                    return {nombre: users[0], categoria: users[1], precio: users[2]};
                });
                resolve(arregloUsuarios)
            }
        });
    })
};


const ingresarUsuarios = (nombreArchivo, contenidoArchivo) => {
    // @ts-ignore

    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreArchivo, 'utf-8',
                (error, contenidoArchivoLeido) => {
                    if (error) {
                        fs.writeFile(nombreArchivo, contenidoArchivo,
                            (err) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(contenidoArchivo)
                                }
                            }
                        );
                    } else {
                        fs.writeFile(nombreArchivo, contenidoArchivoLeido + '\n' + contenidoArchivo,
                            (err) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    resolve(contenidoArchivoLeido + '\n' + contenidoArchivo)
                                }
                            }
                        );
                    }
                }
            );

        }
    )
};
const usuarios = (usua) => {
    // @ts-ignore

    return new Promise(
        (resolve, reject) => {
            fs.readFile('Login.txt', 'utf-8', (err, contenido) => {
                if (err) {
                    reject(err)
                } else {
                    const arregloUsuarios = contenido.split(/\r?\n/).map((linea) => {
                        var users = linea.split(' ');
                        return {user: users[0], pass: users[1]};
                    });
                    arregloUsuarios
                        .forEach((element) => {
                            if (usua === element.user) {
                                resolve(element.pass)
                            }
                        });
                }
            });
        }
    )
};
//usuarios('ronald').then((contenido)=>{console.log(contenido)}).catch((err)=>{console.log(err)});
const queEs = {
    name: 'queEsUsted',
    type: 'list',
    message: '¿Qué es usted?',
    choices: ['Comprador', 'Vendedor'],
    default: 1,
};
const menuVendedor = {
    name: 'menuVendedor',
    type: 'list',
    message: 'Escoja una opción:',
    choices: ['Ingresar más Disco', 'Ingresar Usuarios', 'Regresar'],
    default: 2,
};
const ingresarUser = [{
    name: 'login',
    type: 'input',
    message: 'Ingrese un usuario'
}, {
    name: 'password',
    type: 'password',
    message: 'Ingrese un contraseña',
    mask: '*'
}];
const menuComprador = {
    name: 'menuComprador',
    type: 'list',
    message: 'Escoja una opción:',
    choices: ['Escojer disco a comprar', 'lista de discos', 'Regresar'],
    default: 2,
};
const login = [{
    name: 'user',
    type: 'input',
    message: 'Ingrese su usuario: '
}, {
    name: 'pass',
    type: 'password',
    message: 'Ingrese su contraseña: ',
    mask: '*'
}];
const confirmarMasProductos = {
    name: 'confirm',
    type: 'confirm',
    message: 'Desea comprar mas discos',
}
const ingresarProductos = [{
    name: 'nombre',
    type: 'input',
    message: 'Ingrese el nombre del disco: '
}, {
    name: 'categoria',
    type: 'input',
    message: 'Ingrese la Genero del disco: '
}, {
    name: 'precio',
    type: 'input',
    message: 'Ingrese el cantidad del disco: '
}];

function menuProductos(producto) {
    inquirer.prompt([producto]).then((res) => {
        produtosSeleccionados.push(res);
        inquirer.prompt([confirmarMasProductos]).then((resul) => {
            if (resul.confirm === true) {
                menuProductos(producto);
            }
            else {
                subMenuComprador();
            }
        })
    })
}

function regresar() {
    inquirer.prompt(queEs).then((answer) => {
        if (answer.queEsUsted === 'Vendedor') {
            subMenuVendedor();
        }
        else {
            subMenuComprador();
        }
    })
}

function logi() {
    inquirer.prompt(login).then((ans) => {
        usuarios(ans.user).then((user) => {
            if (user === ans.pass) {
                inquirer.prompt([menuVendedor]).then((menu) => {
                    if (menu.menuVendedor === 'Regresar') {
                        regresar();
                    }
                    else if (menu.menuVendedor === 'Ingresar Usuarios') {
                        inquirer.prompt(ingresarUser).then(answ => {
                            const login = answ.login + ' ' + answ.password;
                            ingresarUsuarios('Login.txt', login).then(res => {
                                console.log('\n' + res + '\n')
                            });
                            regresar();
                        })
                    }
                    else if (menu.menuVendedor === 'Ingresar más Disco') {
                        inquirer.prompt(ingresarProductos).then(answ => {
                            const product = answ.nombre + ' ' + answ.categoria + ' ' + answ.precio;
                            ingresarUsuarios('Productos.txt', product).then(res => {
                                console.log('\n' + res + '\n');
                            });
                            regresar();
                        })
                    }
                })
            } else {
                console.log('Usuario o contraseña incorrecta');
                logi();
            }
        }).catch((error) => {
            console.log(error)
        })
    })
}

function subMenuVendedor() {
    logi();
}

function subMenuComprador() {
    inquirer.prompt([menuComprador]).then((ans) => {
        if (ans.menuComprador === 'Regresar') {
            regresar();
        }
        else if (ans.menuComprador === 'Escojer disco a comprar') {
            music().then((resultado) => {
                const producto = {
                    name: 'music',
                    type: 'list',
                    message: 'Escoja un disco',
                    choices: arregloProductos(resultado),
                    default: 1,
                };
                menuProductos(producto);
            });
        }
        else if (ans.menuComprador === 'lista de discos') {
            buscarProducto(produtosSeleccionados)

         //   subMenuComprador()

        }
    })
}

regresar();
