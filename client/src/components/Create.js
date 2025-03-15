import AxiosRequest from "../utils/Axios";

function Create({handleCreate, handleDisplay}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const make = document.getElementById("make").value;
        const model = document.getElementById("model").value;
        const color = document.getElementById("color").value;
        const carType = document.getElementById("carType").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const quantity = document.getElementById("quantity").value;

        // check if any fields are empty
        if (!make || !model || !description || !price || !quantity || !color || !carType) {
            document.getElementById("alert").classList.remove("d-none");
            document.querySelectorAll(".create").forEach((input) => {
                if (!input.value) {
                    input.classList.add("is-invalid");
                } else {
                    input.classList.remove("is-invalid");
                }
            });
            return;
        }

        // update the database
        AxiosRequest({
            url: "/products",
            method: "POST",
            data: {
                make: make,
                model: model,
                description: description,
                price: price,
                quantity: quantity,
                color: color,
                carType: carType
            },
        })
        .then((res) => {
            handleCreate(res.data);
            handleDisplay();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="position-fixed top-50 start-50 translate-middle w-100 h-100 z-3 bg-black bg-opacity-75">
            {/*https://getbootstrap.com/docs/5.0/layout/containers/*/}
            <div className="container bg-white text-black p-3 position-relative rounded rounded-3 border border-secondary" style={{maxWidth: "500px", top: "50%", transform: "translateY(-50%)"}}>
                {/*https://getbootstrap.com/docs/5.0/components/buttons/*/}
                <button className="btn-close position-absolute top-0 end-0 m-3" onClick={() => handleDisplay()}></button>
                <h1>Create</h1>
                <p className="text-muted m-0">Fill in the form below to create a new product.</p>
                <hr className="mt-1"/>

                {/*error message*/}
                <p id="alert" className="alert alert-danger d-none p-1">Please fill in all fields.</p>

                {/*https://getbootstrap.com/docs/5.0/forms/layout/*/}
                <form onSubmit={handleSubmit} onChange={(e) => {
                    e.target.classList.remove("is-invalid")
                    document.getElementById("alert").classList.add("d-none");
                }}>
                    <div className="d-flex flex-row">
                        <div className = "mb-3 w-100 me-3">
                            <label htmlFor="make" className="form-label">Make</label>
                            {/*https://getbootstrap.com/docs/5.0/forms/input/*/}
                            <input 
                                type="text" 
                                className="form-control create" 
                                id="make" 
                                placeholder="eg. Pagani"
                            />
                        </div>
                        <div className="mb-3 w-100">
                            <label htmlFor="model" className="form-label">Model</label>
                            {/*https://getbootstrap.com/docs/5.0/forms/input/*/}
                            <input 
                                type="text" 
                                className="form-control create" 
                                id="model" 
                                placeholder="eg. Zonda F"
                            />
                        </div>
                    </div>

                    <div className="d-flex flex-row">
                        <div className = "mb-3 w-100 me-3">
                            <label htmlFor="color" className="form-label">Colour</label>
                            {/*https://getbootstrap.com/docs/5.0/forms/input/*/}
                            <input 
                                type="text" 
                                className="form-control create" 
                                id="color" 
                                placeholder="eg. Red"
                            />
                        </div>
                        <div className="mb-3 w-100">
                            <label htmlFor="carType" className="form-label">Vehicle Type</label>
                            {/*https://getbootstrap.com/docs/5.0/forms/input/*/}
                            <input 
                                type="text" 
                                className="form-control create" 
                                id="carType" 
                                placeholder="eg. Sports Car"
                            />
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        {/*https://getbootstrap.com/docs/5.0/forms/input/*/}
                        <textarea 
                            className="form-control create" 
                            id="description" 
                            rows="3"
                            maxLength="150" 
                            placeholder="eg. A car that is fast and expensive."
                        />
                    </div>
                    <div className="mb-3 d-flex">
                        <div className="me-3 w-100">
                            <label htmlFor="price" className="form-label">Price</label>
                            {/*https://getbootstrap.com/docs/5.0/forms/input/*/}
                            <input 
                                type="number" 
                                className="form-control create" 
                                id="price" 
                                step="0.01"
                                pattern={"[0-9]+([0-9]+)?"}
                                placeholder="eg. 1.00"
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            {/*https://getbootstrap.com/docs/5.0/forms/input/*/}
                            <input 
                                type="number" 
                                className="form-control create" 
                                id="quantity" 
                                step="1"
                                pattern="[0-9]+"
                                placeholder="eg. 100"
                            />
                        </div>
                    </div>
                    {/*https://getbootstrap.com/docs/5.0/components/buttons/*/}
                    <div className = "d-flex justify-content-center gap-3">
                        <button type="submit" className="btn btn-primary w-75">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;