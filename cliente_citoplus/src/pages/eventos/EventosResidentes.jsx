// Se realiza la importación de las dependencias para REACT
import React, { useState, useEffect } from 'react';
import { getEventos, deleteEvento, registerEvento } from "../../api/residentes.api"
import { BorrarIcono } from '../../components/Iconos';

// Funcionalidad sencilla para mostrar el formulario y esconder la tabla de eventos
const showFormEventos = () => {
    $("#nombre").val("");
    $("#informacion").val("");
    $("#descripcion").val("");
    $("#celular").val("");

    $("#btnCreaEvent").addClass('hidden');
    $("#btnVolverEvent").removeClass('hidden');

    $("#contTableEvent").addClass('hidden');
    $("#contFormEventos").removeClass('hidden');
}

// Funcionalidad sencilla para mostrar la tabla de eventos y esconder el formulario
const showTableEventos = () => {
    $("#btnVolverEvent").addClass('hidden');
    $("#btnCreaEvent").removeClass('hidden');

    $("#contFormEventos").addClass('hidden');
    $("#contTableEvent").removeClass('hidden');
}

async function getDataEventos(){
    const resp = await getEventos();
    return resp
}

async function deleEvent(evenID){
    const resp = await deleteEvento(evenID);
    return resp
}

async function regiEvent(arrEvent){
    const resp = await registerEvento(arrEvent);
    return resp
}

function Residentes() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /** Realiza el consumo de los eventos creado por parte del residente **/
    useEffect(() => {
        if(Cookies.get('cookie_token') == undefined){
            window.location.href = 'login'
        }

        getDataEventos()
            .then((data) => {
                if(data.status == 200){
                    setEventos(data.data);
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
    /*******************************************************************/

    /**
     * Funcionalidad para borrar el evento seleccionado en la tabla
     */
    const borrarEvento = (event) => {
        let evenID = event.currentTarget.dataset.id;

        Swal.fire({
            title: "¡UN MOMENTO!",
            text: "¿Desea eliminar el evento seleccionado?",
            icon: "info",
            confirmButtonColor: "#19a054",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "SI",
            denyButtonText: `NO`
        }).then((result) => {
            if (result.isConfirmed) {
                deleEvent(evenID)
                    .then((data) => {
                        handleRefresh()
                        Swal.fire("Evento borrado.", "", "success");
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
     * Funcionalidad para realizar el envio de datos para la creación del evento
     *
     * @param {event} e Recibe por parametro el evento del login
     */
    function handleSubmit(e) {
        e.preventDefault();

        // Declaración del formulario usado en los eventos, dando como formato FormData
        const form = e.target;
        const formData = new FormData(form);

        formData.append('usua_id', sessionStorage.getItem("usua_id"));

        // Da formato JSON al formulario del evento
        const formJson = Object.fromEntries(formData.entries());

        regiEvent(formJson)
            .then((data) => {
                if(data.status == 201){
                    handleRefresh()
                    showTableEventos()
                    Swal.fire({
                        title: "¡PERFECTO!",
                        text: "El evento fue registrado con éxito.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#19a054",
                        confirmButtonText: "OK"
                    })
                }else{
                    Swal.fire("¡UN MOMENTO!", "Ocurrio un problema al crear el evento.", "error");
                }
            })
            .catch((error) => {
                console.log(error)
            });

    }

    function handleRefresh() {
        getDataEventos()
            .then((data) => {
                if(data.status == 200){
                    setEventos(data.data);
                }else{
                    setError("Error al cargar los datos.");
                }
            })
            .catch((error) => console.log(error));
    }

    /** Apartado para mostrar un texto de cargue o error mientras se inicializa el componente **/
    if (loading) {
        return <p>Cargando usuarios...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    /*******************************************************************/

    /** Renderizado del HTML que se visualizara **/
    return (
        <>
            <div className='flex min-h-screen items-center justify-center bg-gray-100'>
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                    <div className='grid grid-cols-12'>
                        <div className="col-end-12 col-span-4 md:col-end-13 md:col-span-2 mb-2">
                            <button className="flex px-3 py-2 bg-blue-400 mr-1 text-white font-semibold rounded" id="btnCreaEvent" onClick={showFormEventos}>
                                <span className="ml-1">Crear evento</span>
                            </button>
                            <button className="flex px-3 py-2 bg-red-400 mr-1 text-white font-semibold rounded hidden" id="btnVolverEvent" onClick={showTableEventos}>
                                <span className="ml-1">Volver</span>
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg" id="contTableEvent">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-center">ID</th>
                                    <th scope="col" className="py-3 px-6 text-center">Nombre</th>
                                    <th scope="col" className="py-3 px-6 text-center">Información visita</th>
                                    <th scope="col" className="py-3 px-6 text-center">Descripción</th>
                                    <th scope="col" className="py-3 px-6 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventos.map((evento) => (
                                    <tr key={evento.id}>
                                        <td className="py-4 px-6 text-center">{evento.id}</td>
                                        <td className="py-4 px-6 text-center">{evento.nombre}</td>
                                        <td className="py-4 px-6 text-center">{evento.info_visita}</td>
                                        <td className="py-4 px-6 text-center">{evento.descripcion}</td>
                                        <td className="py-4 px-6 text-center">
                                            <button title="Borrar" onClick={borrarEvento} data-id={evento.id} className="m-1 rounded-md bg-red-500 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-red-700 focus:shadow-none active:bg-red-700 hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                                <BorrarIcono/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg hidden" id="contFormEventos">
                        <div className="p-8 w-full">
                            <h1 className="text-2xl font-semibold mb-4">Registrar eventos</h1>
                            <form method="post" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-600">Nombre del evento</label>
                                    <input type="text" id="nombre" name="nombre" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600">Celular de contacto</label>
                                    <input type="number" id="celular" name="celular" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600">Información de la visita</label>
                                    <input type="text" id="informacion" name="info_visita" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"/>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600">Descripción</label>
                                    <textarea type="text" id="descripcion" name="descripcion" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"></textarea>
                                </div>
                                <div className="mb-4">
                                    <button type="submit" id="btnRegiEvent" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    /*******************************************************************/
}

export default Residentes