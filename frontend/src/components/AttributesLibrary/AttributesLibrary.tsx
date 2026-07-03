import axios from 'axios';
import {AttributeDto, AttributeDtoView} from "../../dto/attribute.ts";
import {useEffect, useState} from "react";
import Attributes from './Attributes.tsx'
import Header from './Header.tsx'
import {Table} from "antd";
const AttributesLibrary =  () => {
    const [attributes, setAttributes] = useState<AttributeDto[]>([])
    useEffect(() =>{
        const fetchData = async () => {

            setAttributes((await axios.get<AttributeDto[]>('http://localhost:3000/attribute')).data);
        }
        fetchData().catch(console.error);
    },[])



   return (
       <Table<AttributeDtoView> columns={Header} />)
}

export default AttributesLibrary