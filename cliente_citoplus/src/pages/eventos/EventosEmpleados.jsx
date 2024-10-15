import React, { useEffect } from 'react';

function Empleados() {

    useEffect(() => {
        if(Cookies.get('cookie_token') == undefined){
            window.location.href = 'login'
        }
    }, []);

    return (
        <div className="text-center">
            Empleados
        </div>
    )
}

export default Empleados