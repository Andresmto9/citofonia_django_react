import React, { useState, useEffect } from 'react';
import { getUsuarios } from "../api/usuarios.api"

async function getDataUsuarios() {
    const resp = await getUsuarios();
    return resp
}

function DatatableUsuarios() {
    const [data, setData] = useState([]);

    useEffect(() => {
      getDataUsuarios()
        .then((data) => {
            setData(data);
            
            $('#tblUsuario').DataTable();
        })
        .catch((error) => console.log(error));
    }, []);

    function handleRefresh() {
        getDataUsuarios()
            .then((data) => {
                setData(data);
                    $('#tblUsuario').DataTable().destroy(); // Destruir la instancia anterior
                    $('#tblUsuario').DataTable(); // Reiniciar DataTables
                })
            .catch((error) => console.log(error));
    }
  
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 display" id="tblUsuario">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.rol}</td>
                        <td>{item.username}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
  
export default DatatableUsuarios;