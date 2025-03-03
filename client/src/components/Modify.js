import AxiosRequest from "../utils/Axios";
import { useEffect } from "react";

function Modify({handleModify, handleDisplay, id}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const brand = document.getElementById("brand").value;
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;

        if (!brand || !name || !description || !price) {
            document.getElementById("alert").classList.remove("d-none");
            document.querySelectorAll(".modify").forEach((input) => {
                if (!input.value) {
                    input.classList.add("is-invalid");
                } else {
                    input.classList.remove("is-invalid");
                }
            });
            return;
        }

        const data = {
            brand: brand,
            name: name,
            description: description,
            price: price,
            id: id,
        }

        AxiosRequest({
            url: `/products/${id}`,
            method: "PUT",
            data: data,
        })
        .then((res) => {
            handleModify(res.data.data);
            handleDisplay();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        AxiosRequest({
            url: `/products/${id}`,
            method: "GET",
            data: {},
        })
        .then((res) => {
            document.getElementById("brand").value = res.data.brand;
            document.getElementById("name").value = res.data.name;
            document.getElementById("description").value = res.data.description;
            document.getElementById("price").value = res.data.price;
        })
        .catch((err) => {
            console.log(err);
        });
    }, [id]);

    return (
        <div className="position-fixed top-50 start-50 translate-middle z-3 bg-black bg-opacity-75 p-5 w-100 h-100">
            <div className="container bg-white text-black p-5 w-50 position-relative rounded rounded-3 border border-secondary">
                <button className="btn-close position-absolute top-0 end-0 m-3" onClick={() => handleDisplay()}></button>
                <h1>Modify</h1>
                <p className="text-muted m-0">Edit the form below to modify the product.</p>
                <hr className="mt-1"/>

                <p id="alert" className="alert alert-danger d-none p-1">Please fill in all fields.</p>
                <form onSubmit={handleSubmit} onChange={(e) => {
                    e.target.classList.remove("is-invalid")
                    document.getElementById("alert").classList.add("d-none");
                }}>
                    <div className="mb-3">
                        <label htmlFor="brand" className="form-label">Brand</label>
                        <input type="text" className="form-control modify" id="brand" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control modify" id="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control modify" id="description" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control modify" id="price" step = "0.01"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Modify;