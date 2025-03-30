import AxiosRequest from "../utils/Axios";
import { useEffect } from "react";
import EditWrapper from "../components/EditWrapper";

// returns a form to modify a product
function Modify({handleModify, handleDisplay, card}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const make = document.getElementById("make").value;
        const model = document.getElementById("model").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const quantity = document.getElementById("quantity").value;
        const color = document.getElementById("color").value;
        const carType = document.getElementById("carType").value;

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

        // check if any field have been modified
        if (make === card.make && model === card.model && description === card.description && parseInt(price) === parseInt(card.price) && parseInt(quantity) === parseInt(card.quantity) && color === card.color && carType === card.carType) {
            document.getElementById("alert").classList.remove("d-none");
            document.getElementById("alert").innerHTML = "No changes have been made.";
            return;
        }

        const data = {
            make: make,
            model: model,
            description: description,
            price: price,
            quantity: quantity,
            color: color,
            carType: carType,
            id: card.id,
        }

        // update the database
        AxiosRequest({
            url: `/products/${card.id}`,
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

    // load the product data into the form on mount, removing the <span> tags from the make and model fields from search
    useEffect(() => {
        document.getElementById("make").value = card.make.replace(/<span class="text-primary">.*?<\/span>/g, '');
        document.getElementById("model").value = card.model.replace(/<span class="text-primary">.*?<\/span>/g, '');
        document.getElementById("description").value = card.description;
        document.getElementById("price").value = card.price;
        document.getElementById("quantity").value = card.quantity
        document.getElementById("color").value = card.color;
        document.getElementById("carType").value = card.carType;
    }, [card]);

    return (
        <EditWrapper 
            title="Modify" 
            description="Fill in the form below to modify a product." 
            handleSubmit={handleSubmit} 
            handleDisplay={handleDisplay} 
            handleCSV={null}
        />
    );
}

export default Modify;