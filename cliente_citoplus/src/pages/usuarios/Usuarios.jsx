import React, { useState, useEffect } from 'react';
import { getUsuarios, getDetaUsua, deleteUsua, registerUsua, updateUsua } from "../../api/usuarios.api"
import {EditarIcono, BorrarIcono} from "../../components/Iconos"
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';

DataTable.use(DT)

// DataTable.use(DT);

// Funcionalidad sencilla para mostrar el formulario y esconder la tabla de usuario
const showFormUsuario = () => {
    $("#name").val("");
    $("#email").val("");
    $("#rol").val("");
    $("#password").val("");

    $("#btnActuUsua").addClass('hidden');
    $("#btnRegiUsua").removeClass('hidden');

    $("#btnCreaUsua").addClass('hidden');
    $("#btnVolverUsua").removeClass('hidden');

    $("#contTableUsua").addClass('hidden');
    $("#contFormUsua").removeClass('hidden');

    $("#tituloForm").html("Registrar usuario")
}

// Funcionalidad sencilla para mostrar la tabla de usuario y esconder el formulario
const showTableUsuario = () => {
    $("#btnVolverUsua").addClass('hidden');
    $("#btnCreaUsua").removeClass('hidden');

    $("#contFormUsua").addClass('hidden');
    $("#contTableUsua").removeClass('hidden');
}

/**
* Funcionalidad para borrar el usuario seleccionado en la tabla
*/

/**
* Funcionalidad para borrar el usuario seleccionado en la tabla
*/
const getInfoUsuarios = (event) => {
    let usuaID = event.currentTarget.dataset.id;
    getDataUsua(usuaID)
        .then((data) => {
            if(data.status == 200){
                showFormUsuario()
                $("#name").val(data.data.username);
                $("#email").val(data.data.email);
                $("#rol").val(data.data.roles[0]);
                $("#password").val("");

                $("#btnActuUsua").attr("data-id", data.data.id)

                $("#btnRegiUsua").addClass('hidden');
                $("#btnActuUsua").removeClass('hidden');

                $("#btnCreaUsua").addClass('hidden');
                $("#btnVolverUsua").removeClass('hidden');

                $("#tituloForm").html("Editar usuario")
            }
        })
        .catch((error) => {
            console.log(error)
        });
}

async function getDataUsuarios() {
    const resp = await getUsuarios();
    return resp
}

async function getDataUsua(usuaID){
    const resp = await getDetaUsua(usuaID);
    return resp
}

async function deleUsua(usuaID){
    const resp = await deleteUsua(usuaID);
    return resp
}

async function regiUsua(arrUsua){
    const resp = await registerUsua(arrUsua);
    return resp
}

async function updaUsua(arrUsua, usuaID){
    const resp = await updateUsua(arrUsua, usuaID);
    return resp
}

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(Cookies.get('cookie_token') == undefined){
            window.location.href = 'login'
        }

        getDataUsuarios()
            .then((data) => {
                if(data.status == 200){
                    setUsuarios(data.data);
                }else{
                    setError("Error al cargar los datos.");
                }
                setLoading(false);
            })
            .catch((error) => {
                setError("Hubo un error en la petición.");
                setLoading(false);
            });

    }, []);

    function handleRefresh() {
        getDataUsuarios()
            .then((data) => {
                if(data.status == 200){
                    setUsuarios(data.data);
                }else{
                    setError("Error al cargar los datos.");
                }
            })
            .catch((error) => console.log(error));
    }

    const borrarUsuarios = (event) => {
        let usuaID = event.currentTarget.dataset.id;

        Swal.fire({
            title: "¡UN MOMENTO!",
            text: "¿Desea eliminar el usuario seleccionado?",
            icon: "info",
            confirmButtonColor: "#19a054",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "SI",
            denyButtonText: `NO`
        }).then((result) => {
            if (result.isConfirmed) {
                deleUsua(usuaID)
                    .then((data) => {
                        handleRefresh()
                        Swal.fire("Usuario borrado.", "", "success");
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else if (result.isDenied) {
                Swal.close()
            }
        });
    }

    /**
    * Funcionalidad para enviar la soliciutd que actualiza la información del usuario
    */
    const actualizarUsuarios = (event) => {
        let usuaID = event.currentTarget.dataset.id;

        const form = {
            'id' : usuaID,
            'username' : $("#name").val(),
            'email' : $("#email").val(),
            'rol' : $("#rol").val(),
            'password' : $("#password").val(),
        };
    
        const formData = new FormData();
    
        for ( var key in form ) {
            formData.append(key, form[key]);
        }

        // Da formato JSON al formulario del login
        const formJson = Object.fromEntries(formData.entries());

        updaUsua(formJson, usuaID)
            .then((data) => {
                if(data.status == 200){
                    handleRefresh()
                    showTableUsuario()
                    Swal.fire({
                        title: "¡PERFECTO!",
                        text: "El usuario fue actualizado con éxito.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#19a054",
                        confirmButtonText: "OK"
                    })
                }else{
                    Swal.fire("¡UN MOMENTO!", "Ocurrio un problema al actualizar el usuario.", "error");
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    /**
     * Funcionalidad para realizar el envio de datos para el login y genereción del token usado en el sistema
     *
     * @param {event} e Recibe por parametro el evento del login
     */
    function handleSubmit(e) {
        e.preventDefault();

        // Declaración del formulario usado en el registro de usuario, dando como formato FormData
        const form = e.target;
        const formData = new FormData(form);

        // Da formato JSON al formulario del login
        const formJson = Object.fromEntries(formData.entries());

        regiUsua(formJson)
            .then((data) => {
                if(data.status == 201){
                    handleRefresh()
                    showTableUsuario()
                    Swal.fire({
                        title: "¡PERFECTO!",
                        text: "El usuario fue registrado con éxito.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#19a054",
                        confirmButtonText: "OK"
                    })
                }else{
                    Swal.fire("¡UN MOMENTO!", "Ocurrio un problema al crear el usuario.", "error");
                }
            })
            .catch((error) => {
                console.log(error)
            });

    }

    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <div className='grid grid-cols-12'>
                    <div className="col-end-12 col-span-4 md:col-end-13 md:col-span-2 mb-2">
                        <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="btnCreaUsua" onClick={showFormUsuario}>
                            <span className="ml-1">Crear usuario</span>
                        </button>
                        <button className="flex px-3 py-2 bg-red-400 mr-1 text-white font-semibold rounded hidden" id="btnVolverUsua" onClick={showTableUsuario}>
                            <span className="ml-1">Volver</span>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg" id="contTableUsua">
                    {/* <DataTable className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 text-center rounded-tl-lg">ID</th>
                                <th scope="col" className="py-3 px-6 text-center">Email</th>
                                <th scope="col" className="py-3 px-6 text-center">Rol</th>
                                <th scope="col" className="py-3 px-6 text-center">Username</th>
                                <th scope="col" className="py-3 px-6 text-center rounded-tr-lg p-5">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((item, index) => (
                                <tr key={item.id}>
                                    <td className="py-4 px-6 text-center">{++index}</td>
                                    <td className="py-4 px-6 text-center">{item.email}</td>
                                    <td className="py-4 px-6 text-center">{item.rol.length > 0 ? 'item.rol' : 'Sin rol asignado'}</td>
                                    <td className="py-4 px-6 text-center">{item.username}</td>
                                    <td className="py-4 px-6 text-center">
                                        <button title="Editar" onClick={getInfoUsuarios} data-id={item.id} className="m-1 rounded-md bg-blue-500 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                            <EditarIcono/>
                                        </button>
                                        <button title="Borrar" onClick={borrarUsuarios} data-id={item.id} className="m-1 rounded-md bg-red-500 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                            <BorrarIcono/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </DataTable> */}
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="tblUsuario">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 text-center rounded-tl-lg">ID</th>
                                <th scope="col" className="py-3 px-6 text-center">Email</th>
                                <th scope="col" className="py-3 px-6 text-center">Rol</th>
                                <th scope="col" className="py-3 px-6 text-center">Username</th>
                                <th scope="col" className="py-3 px-6 text-center rounded-tr-lg p-5">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((item, index) => (
                                <tr key={item.id}>
                                    {/* <td className="py-4 px-6 text-center">{++index}</td> */}
                                    <td className="py-4 px-6 text-center">{item.id}</td>
                                    <td className="py-4 px-6 text-center">{item.email}</td>
                                    <td className="py-4 px-6 text-center">{item.rol.length > 0 ? item.rol : 'Sin rol asignado'}</td>
                                    <td className="py-4 px-6 text-center">{item.username}</td>
                                    <td className="py-4 px-6 text-center">
                                        <button title="Editar" onClick={getInfoUsuarios} data-id={item.id} className="m-1 rounded-md bg-blue-500 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                            <EditarIcono/>
                                        </button>
                                        <button title="Borrar" onClick={borrarUsuarios} data-id={item.id} className="m-1 rounded-md bg-red-500 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                            <BorrarIcono/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg hidden" id="contFormUsua">
                    <div className="p-8 w-full">
                        <h1 className="text-2xl font-semibold mb-4" id='tituloForm'>Registrar usuario</h1>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-600">Nombre del usuario</label>
                                <input required type="text" id="name" name="username" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Correo del usuario</label>
                                <input required type="text" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Rol del usuario</label>
                                <select required name="rol" id="rol" className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                    <option value="" defaultValue>Seleccione un rol</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Empleado">Empleado</option>
                                    <option value="Residente">Residente</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Constraseña</label>
                                <input required type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <button type="submit" id="btnRegiUsua" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Registrar</button>
                                <button type="button" id="btnActuUsua" onClick={actualizarUsuarios} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full hidden">Actualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usuarios