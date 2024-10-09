function App() {
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success"
    });
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-6 text-center">
                    Hola
                </div>
                <div className="col-span-6 text-center">
                    mundo
                </div>
            </div>
        </>
    )
}

export default App
