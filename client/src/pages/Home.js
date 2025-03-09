import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Create from '../components/Create';
import Modify from '../components/Modify';
import { useState, useEffect } from 'react';
import AxiosRequest from '../utils/Axios';

function Home() {
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showModify, setShowModify] = useState(false);

    // loads the catalog of products on mount
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

    // deletes a product from the catalog
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

    // updates the catalog with the search results, search through Make and Model
    const handleSearch = (e) => {
        const value = e;

        // only filter if the search value is greater than 2 characters
        if (value.length < 2) {
            setFilteredCatalog(catalog);
            return;
        }
        
        // filter the catalog based on the search value
        if (value) {
            const filtered = catalog.filter((item) => {
                return item.make.toLowerCase().includes(value.toLowerCase()) || item.model.toLowerCase().includes(value.toLowerCase());
            });
            const highlighted = filtered.map((item) => {

                // highlight the search value in the make and model
                const regex = new RegExp(`(${value})`, 'gi');
                return {
                    ...item,
                    make: item.make.replace(regex, '<span class="text-primary">$1</span>'),
                    model: item.model.replace(regex, '<span class="text-primary">$1</span>'),
                };
            });
            setFilteredCatalog(highlighted);
            return;
        }
    }

    // updates the catalog with a new product
    const handleCreate = (data) => {
        setCatalog([...catalog, data]);
    }

    // updates the catalog with a modified product
    const handleModify = (data) => {
        setCatalog(catalog.map((item) => item.id === data.id ? data : item));
    }

    useEffect(() => {
        setFilteredCatalog(catalog);
    }, [catalog]);
    
    return (
        <div className='bg-white min-vh-100'>
            <Navbar>
                <li>Home</li>
            </Navbar>
            {/*https://getbootstrap.com/docs/5.0/layout/containers/*/}
            <main className="container min-vh-100">
                { showModify && <Modify 
                    handleModify={handleModify} 
                    handleDisplay={() => setShowModify(!showModify)} 
                    card={showModify}
                    /> 
                }
                <div className="container-fluid mt-3">

                    {/*https://getbootstrap.com/docs/4.0/layout/grid/*/}
                    <div className="row mb-3">
                        <div className="col-md-7 col-sm-12 mb-2">
                            <input type="text" 
                                className="form-control" 
                                placeholder="Search..." 
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                        <div className="col-md-3 col-sm-8 mb-2">
                            {/*https://getbootstrap.com/docs/4.0/components/forms/*/}
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
                            { showCreate && <Create 
                                handleCreate={handleCreate} 
                                handleDisplay={() => setShowCreate(!showCreate)} 
                                />
                            }
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        {/*https://getbootstrap.com/docs/4.0/components/card/*/}
                        {/* this is where cars are displayed */}
                        {filteredCatalog.map((item) => (
                            <div key={item.id} className="col-md-4 col-sm-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <input type="hidden" value={item._id} />
                                        <div className="card-title d-flex justify-content-between align-items-center mb-0">
                                            <h5 className="mb-0" dangerouslySetInnerHTML={{__html: `${item.make} ${item.model}`}}></h5>
                                            <p className="mb-0">x{item.quantity} in stock</p>
                                        </div>
                                        <hr />
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">Price: ${item.price}</p>
                                        <p className="card-text">Time: {item.time}</p>
                                        <div className="d-flex gap-1">
                                            {/*https://getbootstrap.com/docs/4.0/components/buttons/*/}
                                            <button className="btn btn-secondary" onClick={() => setShowModify(item)}>Modify</button>
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