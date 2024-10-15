import React, { useEffect } from 'react';

function Residentes() {

    useEffect(() => {
        if(Cookies.get('cookie_token') == undefined){
            window.location.href = 'login'
        }
    }, []);

    return (
        <div className="text-center">
            Residentes
        </div>
    )
}

export default Residentes