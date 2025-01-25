import Sidenav from '../components/Sidenav';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
    const [test, getTest] = useState(""); // state to store data

    // send axios request to server for data (this just sends Hello World as a test)
    useEffect(() => {
        axios.get('http://localhost:8000/')
        .then((res) => {
            // this will print the recieved data, chaneg the URL to specific routes to change data, will not show unless native URL (eg, http://localhost:8000/) is used
            console.log("RECIEVED")
            console.log(res.data)
            getTest(res.data.result)
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    return (
        <div className = "d-flex flex-row">
            <Sidenav title = {"Home"}/>
            
            <div className = "container-fluid">
                <h1>Home</h1>
                <h1>{test}</h1> {/* displays data */}

            </div>
        </div>
    );
}

export default Home;