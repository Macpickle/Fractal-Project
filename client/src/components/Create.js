import AxiosRequest from "../utils/Axios";

function Create({handleCreate, handleDisplay}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const brand = document.getElementById("brand").value;
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
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
        <div className="position-fixed top-50 start-50 translate-middle z-3 bg-black bg-opacity-75 p-5 w-100 h-100">
            <div className="container bg-white text-black p-5 w-50 position-relative rounded rounded-3 border border-secondary">
                <button className="btn-close position-absolute top-0 end-0 m-3" onClick={() => handleDisplay()}></button>
                <h1>Create</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="brand" className="form-label">Brand</label>
                        <input type="text" className="form-control" id="brand" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Create;