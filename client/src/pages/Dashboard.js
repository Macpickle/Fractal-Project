// components
import Sidenav from '../components/Sidenav';

// hooks
import { useState } from 'react';

function Dashboard() {
    // stores commands used / recieved from database
    const [commands, setCommands] = useState([]);
    
    // card component for numerical data
    const card = (title, value, change) => {
        return (
            <div className="card h-100">
                <div className="card-body">
                    <p>{title}</p>
                    <h4>{value}</h4>
                </div>
            </div>
        );
    }

    // handle key press event for console, adds to commands
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            // if we decide to go this route, need to check for valid command before adding
            setCommands([...commands, e.target.value]);
            e.target.value = "";
        }
    }

    return (
        <div className="d-flex flex-row">
            <Sidenav title={"Dashboard"} />
            
            <div className="container-fluid d-flex flex-column">
                <div className="row">
                    <h1>Dashboard</h1>
                </div>

                <div className="container-fluid d-flex flex-column h-100">
                    <div className="row d-flex h-50">
                        <div className="col-5">
                            <div className="row g-3">
                                <div className="col">
                                    {card("Users", 0, 0)}
                                </div>
                                <div className="col">
                                    {card("Orders", 0, 0)}
                                </div>
                            </div>
                            <div className="row g-3 mt-3">
                                <div className="col">
                                    {card("Revenue", "$0", 0)}
                                </div>
                                <div className="col">
                                    {card("Expenses", "$0", 0)}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100">
                                <div className="card-body">
                                    <p>Graph</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row d-flex h-50 mt-3 mb-3">
                        <div className="col-8">
                            <div className="card h-100 overflow-hidden">
                                <div className="card-body p-0 d-flex flex-column bg-light">
                                    <div className="row flex-grow-1">
                                        <div className="col d-flex flex-column overflow-auto" style={{maxHeight: "270px"}}>
                                            {commands.map((command, index) => (
                                                <div key={index} className="p-1">
                                                    {command}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            placeholder="enter commands..."  
                                            onKeyDown={handleKeyPress}
                                            style={{
                                                borderRadius: 0, 
                                                boxShadow: "none", 
                                                border: "none", 
                                                paddingLeft: "20px", 
                                                outline: "solid 1px lightgrey" 
                                            }}
                                        />                 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card h-100">
                                <div className="card-body">
                                    <p>data/table</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;