// usuario.controller.ts
import {Body, Controller, ForbiddenException, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Usuario, UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario-entity";
import {Like} from "typeorm";
import {UsuarioCreateDto} from "./dto/usuario-create.dto";
import {validate, ValidationError} from "class-validator";

@Controller('Usuario')
export class UsuarioController {

    constructor(
        private readonly _usuarioService: UsuarioService,
    ) {

    }


    @Get('inicio')
    async inicio(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion,
    ) {

        if(sesion.usuario){
            let mensaje; // undefined
            let clase; // undefined

            if (accion && nombre) {
                switch (accion) {
                    case 'actualizar':
                        clase = 'info';
                        mensaje = `Registro ${nombre} actualizado`;
                        break;
                    case 'borrar':
                        clase = 'danger';
                        mensaje = `Registro ${nombre} eliminado`;
                        break;
                    case 'crear':
                        clase = 'success';
                        mensaje = `Registro ${nombre} creado`;
                        break;
                }
            }

            let usuarios: UsuarioEntity[];
            if (busqueda) {

                const consulta = {
                    where: [
                        {
                            nombre: Like(`%${busqueda}%`)
                        },
                        {
                            biografia: Like(`%${busqueda}%`)
                        }
                    ]
                };
                usuarios = await this._usuarioService.buscar(consulta);
            } else {
                usuarios = await this._usuarioService.buscar();
            }

            const roles = [
                {
                    id: 1,
                    nombre: 'Usuario'
                },
                {
                    id: 2,
                    nombre: 'Administrador'
                }
            ];

            const esUsuario = roles.some(rol => rol.id === 1);
            const esAdministrador = roles.some(rol => rol.id === 2);


            response.render('inicio', {
                nombre: 'Adrian',
                arreglo: usuarios,
                mensaje: mensaje,
                accion: clase,
                titulo: 'Gestion de usuarios',
                esUsuario: esUsuario,
                esAdministrador: esAdministrador
            });
        }else{
            throw new ForbiddenException({mensaje:'No puedes entrar'});
        }



    }

    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioEncontrado = await this._usuarioService
            .buscarPorId(+idUsuario);

        await this._usuarioService.borrar(Number(idUsuario));

        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrado.nombre}`;

        response.redirect('/Usuario/inicio' + parametrosConsulta);
    }

    @Get('crear-usuario')
    crearUsuario(
        @Res() response
    ) {
        response.render(
            'crear-usuario'
        )
    }

    @Get('actualizar-usuario/:idUsuario')
    async actualizarUsuario(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioAActualizar = await this
            ._usuarioService
            .buscarPorId(Number(idUsuario));

        response.render(
            'crear-usuario', {
                usuario: usuarioAActualizar
            }
        )
    }


    @Post('actualizar-usuario/:idUsuario')
    async actualizarUsuarioFormulario(
        @Param('idUsuario') idUsuario: string,
        @Res() response,
        @Body() usuario: Usuario
    ) {
        usuario.id = +idUsuario;

        await this._usuarioService.actualizar(+idUsuario, usuario);

        const parametrosConsulta = `?accion=actualizar&nombre=${usuario.nombre}`;

        response.redirect('/Usuario/inicio' + parametrosConsulta);

    }


    @Post('crear-usuario')
    async crearUsuarioFormulario(
        @Body() usuario: Usuario,
        @Res() response
    ) {
        const usuarioValidado = new UsuarioCreateDto();

        usuarioValidado.nombre = usuario.nombre;
        usuarioValidado.biografia = usuario.biografia;
        usuarioValidado.username = usuario.username;
        usuarioValidado.password = usuario.password;

        const errores: ValidationError[] = await validate(usuarioValidado);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);
            response.redirect('/Usuario/crear-usuario?error=Hay errores');

        } else {
            await this._usuarioService.crear(usuario);

            const parametrosConsulta = `?accion=crear&nombre=${usuario.nombre}`;

            response.redirect('/Usuario/inicio' + parametrosConsulta);
        }


    }

    @Get(':id')
    obtenerPorId(
        @Param('id') idUsuario
    ) {
        console.log(idUsuario);
        return this._usuarioService.buscarPorId(+idUsuario);
    }
}


// DTO -> Data Transfer Object

// CREAR  UsuarioCreateDTO

// nombre*
// cedula*
// password*
// direccion
// numeroTelefono
// celular
// apodo


// ACTUALIZAR UsuarioUpdateDTO

// nombre
// password
// cedula -> no actualizamos la cedula
// direccion
// numeroTelefono
// celular
// apodo

// VISUALIZANDO DTO

// nombre
// cedula
// direccion
// numeroTelefono
// celular
// apodo










