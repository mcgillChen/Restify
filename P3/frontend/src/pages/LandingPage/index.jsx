import React, { useEffect, useState } from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import GetProp from "../api/GetProp";

import SearchPropForm from "../../components/Forms/SearchPropForm/SearchPropForm";
import DisplayProp from "../../components/DisplayProperty/DisplayProp";


const temp = {
    "str_q": "",
    "amenity_id": "", 
    "location": "",
    "num_beds": "",
    "num_rooms": "",
    "num_washrooms": "", 
    "start_price": "",
    "max_price": "",
    "guest": "",
    "sort_by": "" 
}

function Home() {


    const query = {
        "str_q": "",
        "amenity_id": "", 
        "location": "",
        "num_beds": "",
        "num_rooms": "",
        "num_washrooms": "", 
        "start_price": "",
        "max_price": "",
        "guest": "",
        "sort_by": "" 
    }

    const [properties, setProperties] = useState([]);

    // const properties = DisplayProp()

    useEffect(() => {
        
        const data = async () => {
            
            const res = await GetProp(query);
            // setProperties(DisplayProp(res));
            setProperties(res);
            
            
        }
        
            // setProperties(GetProp(query))
            // console.log(123123);
            console.log(data);

            data();

            // console.log(properties);


        }
        , []);


    return <PageContainter >
        <Nav/>
        <div className="search-container">
            <SearchPropForm/>
            {/* {properties} */}

        </div>
        <p>hi there, I should be in the center</p>
    </PageContainter>
    
}

export default Home;