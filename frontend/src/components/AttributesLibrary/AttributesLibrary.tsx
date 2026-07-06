import axios from 'axios';
import * as React from "react";
import {AttributeDto, AttributeDtoView} from "../../dto/attribute.ts";
import {useEffect, useState} from "react";
import changeAttributes from './changeAttributes.ts'
import Header from './Header.tsx'
import {Table, Button, Flex} from "antd";
import type { TableProps } from 'antd';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const AttributesLibrary: React.FC =  () => {
    const [attributes, setAttributes] = useState<AttributeDto[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const fetchData = async () => {

            setAttributes((await axios.get<AttributeDto[]>(`${import.meta.env.VITE_URL}/attribute`)).data);
        }
        fetchData().catch(console.error);
    },[])

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<AttributeDtoView> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const dataSource = changeAttributes(attributes)

   return (
       <Flex gap="medium" vertical>
           <Flex align="center" gap="medium">
               <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                   Delete
               </Button>
               {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
           </Flex>
           <Table<AttributeDtoView> rowSelection={rowSelection} columns={Header} dataSource={dataSource} />
       </Flex>
   )
}

export default AttributesLibrary