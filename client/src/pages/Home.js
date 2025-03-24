import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Create from '../components/Create';
import Modify from '../components/Modify';
import { useState, useEffect } from 'react';
import AxiosRequest from '../utils/Axios';
import SideNav from '../components/Sidenav';

function Home() {
    const [catalog, setCatalog] = useState([]); // stores the catalog of products
    const [filteredCatalog, setFilteredCatalog] = useState([]); // stores the filtered catalog of products
    const [showCreate, setShowCreate] = useState(false); // toggles the create product form
    const [showModify, setShowModify] = useState(false); // toggles the modify product form
    
    // user entry
    const LoggedIn = localStorage.getItem("LoggedIn") || "";

    // loads the catalog of products on mount
    useEffect(() => {
        // makes a request to database API
        AxiosRequest({
            url: "/products",
            method: "GET",
            data: {},
        })
        .then((res) => {
            // set the catalog of products
            setCatalog(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    // deletes a product from the catalog
    const handleDelete = (id) => {
        // makes a request to database API
        AxiosRequest({
            url: `/products/${id}`,
            method: "delete",
            data: {},
        })
        .then((res) => {
            // remove the product from the catalog
            setCatalog(catalog.filter((item) => item.id !== id));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // sorts catalog based on value
    const handleSort = (e) => {
        const value = e.target.value;

        switch (value) {
            case "price-low":
                setFilteredCatalog([...filteredCatalog].sort((a, b) => a.price - b.price));
                break;
            case "price-high":
                setFilteredCatalog([...filteredCatalog].sort((a, b) => b.price - a.price));
                break;
            case "time-low":
                setFilteredCatalog([...filteredCatalog].sort((a, b) => new Date(b.time) - new Date(a.time)));
                break;
            case "time-high":
                setFilteredCatalog([...filteredCatalog].sort((a, b) => new Date(a.time) - new Date(b.time)));
                break;
            default:
                setFilteredCatalog(catalog === filteredCatalog ? catalog : filteredCatalog);
                break;
        }
    }

    // filters catalog based on value
    const handleFilter = (type, value) => {
        if (!value) {
            setFilteredCatalog(catalog);
            return;
        }

        switch (type) {
            case "make":
                setFilteredCatalog(catalog.filter((item) => item.make === value));
                break;
            case "model":
                setFilteredCatalog(catalog.filter((item) => item.model === value));
                break;
            case "type":
                setFilteredCatalog(catalog.filter((item) => item.carType === value));
                break;
            case "color":
                setFilteredCatalog(catalog.filter((item) => item.color === value));
                break;
            case "price":
                const [min, max] = value;
                setFilteredCatalog(catalog.filter((item) => item.price >= min && item.price <= max));
                break;
            default:
                setFilteredCatalog(catalog);
                break;
        }
    }

    // updates the catalog with the search results, search through Make and Model
    const handleSearch = (e) => {
        const value = e;

        // only filter if the search value is greater than 1 character
        if (value.length < 1) {
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

            <div className="container-fluid bg-light d-flex flex-row">
                <SideNav catalog={catalog} handleFilter={handleFilter}/>

                {/*https://getbootstrap.com/docs/5.0/layout/containers/*/}
                <main className="container min-vh-100 p-0 m-0">
                    { showModify && <Modify 
                        handleModify={handleModify} 
                        handleDisplay={() => setShowModify(!showModify)} 
                        card={showModify}
                        /> 
                    }
                    <div className="container-fluid mt-3">

                        {/*https://getbootstrap.com/docs/4.0/layout/grid/*/}
                        <div className="row mb-3">
                            <div className="col-md-8 col-sm-12 mb-2">
                                <input type="text" 
                                    className="form-control" 
                                    placeholder="Search..." 
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </div>
                            <div className="col-md-2 col-sm-8 mb-2">
                                {/*https://getbootstrap.com/docs/4.0/components/forms/*/}
                                <select className="form-control" onChange={(e) => handleSort(e)}>
                                    <option value="" default>Sort   by...</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="time-low">Time: Newest</option>
                                    <option value="time-high">Time: Oldest</option>
                
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
                                                <div className="d-flex flex-row align-items-center gap-2">
                                                    <h5 dangerouslySetInnerHTML={{__html: item.make}}></h5>
                                                    <h6 className="card-subtitle text-muted" dangerouslySetInnerHTML={{__html: item.model}}></h6>
                                                </div>

                                                <p className="mb-0">x{item.quantity} in stock</p>
                                            </div>
                                            <hr className="mt-0"/>

                                            <div className="d-flex flex-row align-items-center gap-1 mb-1">
                                                <h6 className="card-subtitle">{item.color}</h6>
                                                <h6 className="card-subtitle">{item.carType}</h6>
                                            </div>
                                            <p>{item.description}</p>

                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="card-subtitle text-muted">${item.price.toLocaleString()}</h6>
                                                <p className="card-subtitle text-muted">{new Date(item.time).toLocaleString()}</p>
                                            </div>

                                            { (LoggedIn) && (
                                            <div className="d-flex gap-1">
                                                {/*https://getbootstrap.com/docs/4.0/components/buttons/*/}
                                                    <button className="btn btn-secondary" onClick={() => setShowModify(item)}>Modify</button>
                                                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default Home;