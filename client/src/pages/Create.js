import AxiosRequest from "../utils/Axios";
import EditWrapper from "../components/EditWrapper";

// function to create a new product
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
            if (res.data.ok) {
                handleCreate(res.data);
                handleDisplay();
            } else {
                document.getElementById("exists").classList.remove("d-none");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleCSV = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // make formdata object
        const formData = new FormData();
        formData.append("file", file);

        // upload to server
        AxiosRequest({
            url: "/products/upload",
            method: "POST",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                if (res.data.ok) {
                    handleCreate();
                    handleDisplay();
                }
            })
            .catch((err) => {
                console.error("Error uploading file:", err);
            });
    }

    return (
        <EditWrapper 
            title="Create" 
            description="Fill in the form below to create a new product."
            handleSubmit={handleSubmit} 
            handleDisplay={handleDisplay} 
            handleCSV={handleCSV}
            card={null}
        />
    )

}

export default Create;