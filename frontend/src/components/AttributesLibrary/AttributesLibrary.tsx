import axios from 'axios';
import {AttributeDto} from "../../dto/attribute.ts";
import {useEffect, useState} from "react";
import Attributes from './Attributes.tsx'
import Header from './Header.tsx'
const AttributesLibrary =  () => {
    const [attributes, setAttributes] = useState<AttributeDto[]>([])
    useEffect(() =>{
        const fetchData = async () => {

            setAttributes((await axios.get<AttributeDto[]>('http://localhost:3000/attribute')).data);
        }
        fetchData().catch(console.error);
    },[])


   return (
       <table>
           <thead><Header/></thead>
      <tbody><Attributes attributes = {attributes}/></tbody>
   </table>)
}

export default AttributesLibrary