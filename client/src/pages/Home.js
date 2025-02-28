import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import AxiosRequest from '../utils/Axios';

function Home() {
    const [catalog, setCatalog] = useState([]);

    // inital load of sample data
    useEffect(() => {
        AxiosRequest({
            url: "/products",
            method: "GET",
            data: {},
        })
        .then((res) => {
            setCatalog(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    // sort function
    const handleSort = (e) => {
        const value = e.target.value;
        if (value === "brand") {
            setCatalog(catalog.sort((a, b) => a.brand.localeCompare(b.brand)));
        } else if (value === "price") {
            setCatalog(catalog.sort((a, b) => a.price - b.price));
        } else if (value === "time") {
            setCatalog(catalog.sort((a, b) => new Date(a.time) - new Date(b.time)));
        } else {
            setCatalog([...catalog]); // reset to original
            return;
        }

        // force re-render
        setCatalog([...catalog]);
    };

    // search function
    const handleSearch = (e) => {
        const value = e.target.value;
        if (value) {
            setCatalog(catalog.filter((item) => item.brand.toLowerCase().includes(value.toLowerCase())));
        } else {
            setCatalog([...catalog]); // reset to original
        }
    }

    return (
        <div className='bg-white min-vh-100'>
            <Navbar>
                <li>Home</li>
            </Navbar>
            <main className="container min-vh-100">
                <div className="container-fluid mt-3">
                    <div className="row mb-3">
                        <div className="col-md-7 col-sm-12 mb-2">
                            <input type="text" className="form-control" placeholder="Search..." onChange={(e) => handleSearch(e)}/>
                        </div>
                        <div className="col-md-3 col-sm-8 mb-2">
                            <select className="form-control" onChange={(e) => handleSort(e)}>
                                <option value="" default>Sort by...</option>
                                <option value="brand">Brand</option>
                                <option value="price">Price</option>
                                <option value="time">Time of Add</option>
                            </select>
                        </div>
                        <div className="col-md-2 col-sm-4">
                            <button className="btn btn-secondary w-100">Add</button>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        {catalog.map((item) => (
                            <div key={item.id} className="col-md-4 col-sm-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.brand}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">Price: ${item.price}</p>
                                        <p className="card-text">Time: {item.time}</p>
                                        <div className="d-flex gap-1">
                                            <button className="btn btn-secondary">Modify</button>
                                            <button className="btn btn-danger">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;