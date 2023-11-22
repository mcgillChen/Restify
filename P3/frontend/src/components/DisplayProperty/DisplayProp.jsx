
import './styles.css';
import { Link } from 'react-router-dom';
import phimage  from "../../images/temp_h.webp"

export default function DisplayProp(data){

    const dataArray = Object.values(data);

    

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

    return       (
        <div className='prop-container'>
            { dataArray && dataArray.map(({id,title,location,price}) =>
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
 

    )



}