import {SalirIcono} from "./Iconos"

function logout(){
    Cookies.remove('cookie_token')
    window.location.href = '/login'
}

function ButtonExit() {
    return (
        <div className="bg-gray-100 grid grid-cols-12 pt-2">
            <div className="col-end-13 col-span-2">
                <button onClick={logout} title="salir" className="rounded-md bg-slate-800 p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                    <SalirIcono/>
                </button>
            </div>
        </div>
    );
}
  
export default ButtonExit;