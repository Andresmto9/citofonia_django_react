import React, { useState, useEffect } from 'react';
import { getUsuarios, getDetaUsua } from "../../api/usuarios.api"
import {EditarIcono, BorrarIcono} from "../../components/Iconos"

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
const borrarUsuarios = (event) => {
    
}

/**
* Funcionalidad para borrar el usuario seleccionado en la tabla
*/
const getInfoUsuarios = (event) => {
    let usuaID = event.currentTarget.dataset.id;
    getDataUsua(usuaID)
        .then((data) => {
            console.log(data)
            // if(data.status == 200){        
            // }else{
            // }
        })
        .catch((error) => {
            console.log(error)
        });
}

async function getDataUsua(usuaID){
    const resp = await getDetaUsua(usuaID);
    return resp
}

/**
 * Funcionalidad para enviar la soliciutd que actualiza la información del usuario
 */
const actualizarUsuarios = (event) => {
    
}

/**
 * Funcionalidad para realizar el envio de datos para el login y genereción del token usado en el sistema
 *
 * @param {event} e Recibe por parametro el evento del login
 */
function handleSubmit(e) {
    e.preventDefault();
}

async function getDataUsuarios() {
    const resp = await getUsuarios();
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
                
                    // $('#tblUsuario').DataTable();
                }else{
                    setError("Error al cargar los datos.");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setError("Hubo un error en la petición.");
                setLoading(false);
            });

    }, []);

    function handleRefresh() {
        getDataUsuarios()
            .then((data) => {
                if(data.status == 200){
                    setUsuarios(data.data);
                    // $('#tblUsuario').DataTable().destroy(); // Destruir la instancia anterior
                    // $('#tblUsuario').DataTable(); // Reiniciar DataTables
                }else{
                    setError("Error al cargar los datos.");
                }
            })
            .catch((error) => console.log(error));
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
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" id="tblUsuario">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 text-center">ID</th>
                                <th scope="col" className="py-3 px-6 text-center">Email</th>
                                <th scope="col" className="py-3 px-6 text-center">Rol</th>
                                <th scope="col" className="py-3 px-6 text-center">Username</th>
                                <th scope="col" className="py-3 px-6 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-4 px-6 text-center">{item.id}</td>
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
                    </table>
                </div>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg hidden" id="contFormUsua">
                    <div className="p-8 w-full">
                        <h1 className="text-2xl font-semibold mb-4">Registrar usuario</h1>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-600">Nombre del usuario</label>
                                <input type="text" id="name" name="name" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Correo del usuario</label>
                                <input type="text" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Rol del usuario</label>
                                <select name="rol" id="rol" className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                                    <option value="" defaultValue>Seleccione un rol</option>
                                    <option value="2">Empleado</option>
                                    <option value="3">Residente</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600">Constraseña</label>
                                <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
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