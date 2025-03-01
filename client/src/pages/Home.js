import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Create from '../components/Create';
import Modify from '../components/Modify';
import { useState, useEffect } from 'react';
import AxiosRequest from '../utils/Axios';

function Home() {
    const [catalog, setCatalog] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showModify, setShowModify] = useState(false);

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

    const handleDelete = (id) => {
        AxiosRequest({
            url: `/products/${id}`,
            method: "delete",
            data: {},
        })
        .then((res) => {
            setCatalog(catalog.filter((item) => item.id !== id));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleCreate = (data) => {
        setCatalog([...catalog, data]);
    }

    const handleModify = (data) => {
        setCatalog(catalog.map((item) => item.id === data.id ? data : item));
    }
    
    return (
        <div className='bg-white min-vh-100'>
            <Navbar>
                <li>Home</li>
            </Navbar>
            <main className="container min-vh-100">
                { showModify && <Modify handleModify={handleModify} handleDisplay={() => setShowModify(!showModify)} id={showModify} /> }
                <div className="container-fluid mt-3">
                    <div className="row mb-3">
                        <div className="col-md-7 col-sm-12 mb-2">
                            <input type="text" className="form-control" placeholder="Search..." onChange={(e) => console.log("search")}/>
                        </div>
                        <div className="col-md-3 col-sm-8 mb-2">
                            <select className="form-control" onChange={(e) => console.log(e.target.value)}>
                                <option value="" default>Sort by...</option>
                                <option value="brand">Brand</option>
                                <option value="price">Price</option>
                                <option value="time">Time of Add</option>
                            </select>
                        </div>
                        <div className="col-md-2 col-sm-4">
                            <button className="btn btn-secondary w-100" onClick={() => setShowCreate(!showCreate)}>
                                Create
                            </button>
                            {showCreate && <Create handleCreate={handleCreate} handleDisplay={() => setShowCreate(!showCreate)} />}
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        {catalog.map((item) => (
                            <div key={item.id} className="col-md-4 col-sm-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <input type="hidden" value={item._id} />
                                        <h5 className="card-title">{item.brand} - {item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">Price: ${item.price}</p>
                                        <p className="card-text">Time: {item.time}</p>
                                        <div className="d-flex gap-1">
                                            <button className="btn btn-secondary" onClick={() => setShowModify(item.id)}>Modify</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
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