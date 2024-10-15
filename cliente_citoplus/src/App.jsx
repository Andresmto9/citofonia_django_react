import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/login/Login"
import Usuarios from "./pages/usuarios/Usuarios"
import Residentes from "./pages/eventos/EventosResidentes"
import Empleados from "./pages/eventos/EventosEmpleados"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/residentes" element={<Residentes />} />
                    <Route path="/empleados" element={<Empleados />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
