
import './styles.css';
import { useEffect, useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import Get from '../../../pages/api/Get';
import GetProp from '../../../pages/api/GetProp';
import DisplayProp from '../../DisplayProperty/DisplayProp';
import { Link } from 'react-router-dom';
import phimage  from '../../../images/temp_h.webp'


export default function SearchPropForm(){

    const [text, setText] = useState("");
    const [type, setType] = useState("");
    const [amenity, setAmenity] = useState();
    const [selectedAmenity, setSelectedAmenity] = useState([]);
    const [amenity_id, setAmenity_id] = useState("");
    const [price, setPrice] = useState("");
    const [guest, setGuest] = useState("");
    const [order, setOrder] = useState("");


    const [properties, setProperties] = useState([]);
    const [displayProperty, setDisplayProperties] = useState();

    const types = ["House", "Apartment", "Cabin","Cave", "Hotel"]
    
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

    const itemsPerPage = 12

    // const 

    function convertAmenity_id(){
        console.log(selectedAmenity);
        console.log(selectedAmenity.length == 0)
        if (selectedAmenity.length == 0){
            console.log('lmao')
            setAmenity_id('');
            return;
        }

        let a_id = ""
        for (let obj of selectedAmenity){
            a_id += obj.id + ","
        }
        setAmenity_id(a_id.substring(0,a_id.length-1))
        
    }

    async function submit(e){

        e.preventDefault();
        convertAmenity_id();

        const query = {
            'str_q':text,
            'amenity_id':amenity_id,
            // 'prop_type':type,
            'max_price':price,
            'guest':guest,
            'sort_by':order,



            "location": "",
            "num_beds": "",
            "num_rooms": "",
            "num_washrooms": "",
            "start_price": "",
        }

        console.log(query);
        const result = await GetProp(query);
        setProperties(result)
    }


    useEffect(()=> {
        const data = async () => {

            const req = await Get("prop/amenity/");
            const res = await GetProp(query);
            setDisplayProperties(DisplayProp(res))
            setProperties(res)
            console.log(res)

            for (let item of res){
                console.log(item);
            }

            setAmenity(req);
            console.log(req);
        }

        data();
    },[])


    function ListWithPagination(prop) {
        console.log(prop)
    
        console.log(prop.prop)

        const [currentPage, setCurrentPage] = useState(1);
        const totalPages = Math.ceil(prop.prop.length / itemsPerPage);
      
        // Get the slice of items to display for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsToDisplay = prop.prop.slice(startIndex, endIndex);
      
        // Handle changing the current page
        function handlePageChange(newPage) {
          setCurrentPage(newPage);
        }

        function clip(string){

            let clippedStr;
            if (string.length > 20){
                clippedStr = string.slice(0,20)
                return clippedStr + "..."
            }
            else{
                return string
            }
        }
    
      
        return (
          <>
            {/* {displayProperty} */}
            {itemsToDisplay.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}

        <div className='prop-container'>
            { itemsToDisplay && itemsToDisplay.map(({id,title,location,price}) =>
            <Link key={id} id={id} to={"/propdetail/"+id+'/'} className="property_card" >
                <img src={phimage}></img>
                <div className="prop-info">
                    <p>{clip(title)}</p>
                    <p>{clip(location)}</p>
                    <p>${price}/day</p>
                </div>
            </Link>
        )}
        </div>
 
      
            {/* Add pagination controls */}
            <div>
              {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
              )}
      
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={index + 1 === currentPage}
                >
                  {index + 1}
                </button>
              ))}
      
              {currentPage < totalPages && (
                <button onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              )}
            </div>
          </>
        );
    }
    
    return  (
    <div>

    <form  className="search" onSubmit={submit}>
      
        <input 
            type="text" 
            placeholder="Search by title" 
            name="search"
            onChange={(e)=>{
                setText(e.target.value)
                console.log(e.target.value);    
            }}
            ></input>


            <input 
            type="text" 
            placeholder="Guests" 
            name="guests"
            onChange={(e)=>{
                setGuest(e.target.value)
                console.log(e.target.value)
            }}

            ></input>


        <input 
            type="text" 
            placeholder="Price" 
            name="max price"
            onChange={(e)=>{setPrice(e.target.value)
                console.log(e.target.value)
            }}

            ></input>

        {/* <Multiselect
            options={types}
            isObject={false}
            // displayValue="amenity_name"
            onKeyPressFn={function noRefCheck(){}}
            onRemove={(e) => {
                  console.log(e)
                  setType(e[0]);
                //   convertAmenity_id();
            }}
            onSearch={function noRefCheck(){}}
            onSelect={(e) => {
                  console.log(e)
                  setType(e[0]);
                //   convertAmenity_id();
                  
                  // setAmenity_id(amenity_id+","+e.target.id);
              }}
            avoidHighlightFirstOption
            placeholder='select wanted rent type'
            selectionLimit={1}
        /> */}


        <Multiselect 
            // className='search_select'
            // id = "multiselectid1"
            displayValue="amenity_name"
            onKeyPressFn={function noRefCheck(){}}
            onRemove={(e) => {
                  console.log(e)
                  setSelectedAmenity(e);
                  convertAmenity_id();
            }}
            onSearch={function noRefCheck(){}}
            onSelect={(e) => {
                  console.log(e)
                  setSelectedAmenity(e);
                  convertAmenity_id();
                  
                  // setAmenity_id(amenity_id+","+e.target.id);
              }}
            options={amenity}
            placeholder='select wanted amenity'
            avoidHighlightFirstOption
        />

        <Multiselect
        placeholder='Order by ..'
        onKeyPressFn={function noRefCheck(){}}
        onRemove={(e) => {
                console.log(e)
                setOrder(e[0]);
                // convertAmenity_id();
            }}
            onSearch={function noRefCheck(){}}
            onSelect={(e) => {
                console.log(e)
                setOrder(e[0]);
                // convertAmenity_id();
                
                // setAmenity_id(amenity_id+","+e.target.id);
            }}
        selectionLimit={1}
        options={['price','avaliable_guests']}
        isObject={false}
        singleSelect
        />

        <button id="searchbtn" type="submit" >Submit</button>
    </form>

    {/* <DisplayProp data={properties}/> */}

    <ListWithPagination prop={properties}/>
    </div>
    )
}