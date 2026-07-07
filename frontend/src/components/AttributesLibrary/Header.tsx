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

        filters: [
            {
                text: 'Certification',
                value: 'Certification',
            },
            {
                text: 'Professional knowledge',
                value: 'Professional knowledge',
            },
            {
                text: 'Personal information',
                value: 'Personal information',
            },
            {
                text: 'Soft skills',
                value: 'Soft skills',
            },
        ],
        onFilter: (value, record) => record.category.indexOf(value as string) === 0,
    },
    {
        title: 'Type',
        dataIndex: 'dataType',
        key: 'type',

    }]

export default Header