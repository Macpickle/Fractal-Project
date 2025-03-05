import AxiosRequest from "../utils/Axios";

function Create({handleCreate, handleDisplay}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const brand = document.getElementById("brand").value;
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;

        if (!brand || !name || !description || !price) {
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

        AxiosRequest({
            url: "/products",
            method: "POST",
            data: {
                brand: brand,
                name: name,
                description: description,
                price: price,
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
        <div className="position-fixed top-50 start-50 translate-middle z-3 bg-black bg-opacity-75 p-3 p-md-5 w-100 h-100">
            <div className="container-fluid bg-white text-black p-3 p-md-5 w-100 position-relative rounded rounded-3 border border-secondary" style={{maxWidth: "500px"}}>
                <button className="btn-close position-absolute top-0 end-0 m-3" onClick={() => handleDisplay()}></button>
                <h1>Create</h1>
                <p className="text-muted m-0">Fill in the form below to create a new product.</p>
                <hr className="mt-1"/>

                <p id="alert" className="alert alert-danger d-none p-1">Please fill in all fields.</p>
                <form onSubmit={handleSubmit} onChange={(e) => {
                    e.target.classList.remove("is-invalid")
                    document.getElementById("alert").classList.add("d-none");
                }}>
                    <div className="mb-3">
                        <label htmlFor="brand" className="form-label">Brand</label>
                        <input type="text" className="form-control create" id="brand" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control create" id="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control create" id="description" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input pattern="^\d*(\.\d{0,2})?$" className="form-control create" id="price" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;