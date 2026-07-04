import axios from 'axios';
import {AttributeDto, AttributeDtoView} from "../../dto/attribute.ts";
import {useEffect, useState} from "react";
import changeAttributes from './changeAttributes.ts'
import Header from './Header.tsx'
import {Table} from "antd";
const AttributesLibrary =  () => {
    const [attributes, setAttributes] = useState<AttributeDto[]>([])
    useEffect(() =>{
        const fetchData = async () => {

            setAttributes((await axios.get<AttributeDto[]>(`${import.meta.env.VITE_URL}/attribute`)).data);
        }
        fetchData().catch(console.error);
    },[])

    const changedAttributes = changeAttributes(attributes)

   return (
       <Table<AttributeDtoView> columns={Header} dataSource={changedAttributes} />)
}

export default AttributesLibrary