import type {AttributeDtoView} from "../../dto/attribute.ts";
import type { TableProps } from 'antd';

const Header : TableProps<AttributeDtoView>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Name',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Type',
        dataIndex: 'dataType',
        key: 'type',
    }]

export default Header