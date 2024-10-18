import React, { useState, useEffect } from 'react';
import { getEventos, updateEvento } from "../../api/empleados.api"

/**
 * Funcionalidad para visualizar de manera dinamica el label del estado asociado al evento
 * 
 * @param {strin} estadoNombre Recibe por parametro el nombre del estado que se le asignara al label
 * @param {strin} estadoClase Recibe por paremtro la clase que se usara en el label
 * @returns 
 */
const EstadoEvento = ({ estadoNombre, estadoClase }) => {
    return (
      <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded ${estadoClase} uppercase last:mr-0 mr-1`}>
        {estadoNombre}
      </span>
    );
};

const BotonAprobar = ({id, evento}) => {
    return (
        <button data-estado="2" data-id={id} className="flex px-3 py-2 bg-green-400 mr-1 text-white font-semibold rounded" onClick={evento}>
            <span className="ml-1">Aprobar</span>
        </button>
    )
}

async function getDataEventos(){
    const resp = await getEventos();
    return resp
}

async function updaEvent(eventID){
    const resp = await updateEvento(eventID);
    return resp
}

function Empleados() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /** Realiza el consumo de los eventos creado por parte del empleado **/
    useEffect(() => {
        if(Cookies.get('cookie_token') == undefined){
            window.location.href = 'login'
        }

        getDataEventos()
            .then((data) => {
                if(data.status == 200){
                    data.data.map((evento, index) => {
                        if(evento.estado == false){
                            data.data[index].estado_nombre = 'Creado';
                            data.data[index].estado_clase = 'text-blue-600 bg-blue-200';
                        }else{
                            data.data[index].estado_nombre = 'Aprobado';
                            data.data[index].estado_clase = 'text-green-600 bg-green-200';
                        }
                    })
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
     * Funcionalidad para actualizar el estado del evento seleccionado
     */
    const actualizarEvento = (event) => {
        /** Apartado para obtener el ID del evento que se actualizara **/
        let evenID = event.currentTarget.dataset.id;
        /*******************************************************************/

        updaEvent(evenID)
            .then((data) => {
                if(data.status == 200){
                    handleRefresh()
                    Swal.fire({
                        title: "¡PERFECTO!",
                        text: "El evento fue aprobado con éxito.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#19a054",
                        confirmButtonText: "OK"
                    })
                }else{
                    Swal.fire("¡UN MOMENTO!", "Ocurrio un problema al aprobar el evento.", "error");
                }
            })
            .catch((error) => console.log(error));

    }

    function handleRefresh() {
        getDataEventos()
            .then((data) => {
                if(data.status == 200){
                    data.data.map((evento, index) => {
                        if(evento.estado == false){
                            data.data[index].estado_nombre = 'Creado';
                            data.data[index].estado_clase = 'text-blue-600 bg-blue-200';
                        }else{
                            data.data[index].estado_nombre = 'Aprobado';
                            data.data[index].estado_clase = 'text-green-600 bg-green-200';
                        }
                    })
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


    return (
        <>
            <div className='flex min-h-screen items-center justify-center bg-gray-100'>
                <div className='grid grid-cols-12 h-full bg-gray-100'>
                    {eventos.map((evento) => (
                        <div  key={evento.id} className="col-span-12 md:col-span-4 border-2 border-solid rounded border-black p-5 ml-2 mr-2">
                            <div className="max-w-[720px] min-w-[520px] mx-auto">
                                <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
                                    <p className="block w-full px-4 py-2 text-center text-slate-700 transition-all">
                                       {evento.nombre}.
                                    </p>
                                </div>
                                <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                                    <div className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                                        <div className="flex w-full flex-col gap-0.5">
                                            <div className="flex items-center justify-between">
                                                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                                    {evento.name}
                                                </h5>
                                                <div className="flex items-center gap-0.5">
                                                    <EstadoEvento estadoNombre={evento.estado_nombre} estadoClase={evento.estado_clase} />
                                                </div>
                                            </div>
                                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                                                {evento.celular}
                                            </p>
                                            <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                                                {evento.info_visita}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-0 mb-6">
                                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                                            {evento.descripcion}
                                        </p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-12'>
                                    <div className="col-span-12 md:col-span-2 md:col-end-13 mb-2 grid place-items-center">
                                        {evento.estado == false ? <BotonAprobar id={evento.id} evento={actualizarEvento}/> : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Empleados