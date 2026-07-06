import type {AttributeDtoView} from "../../dto/attribute.ts";
import type { TableColumnsType } from 'antd';

const Header : TableColumnsType<AttributeDtoView> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Type',
        dataIndex: 'dataType',
        key: 'type',
    }]

export default Header