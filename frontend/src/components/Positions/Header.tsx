import type { TableColumnsType } from 'antd';
import type { PositionDtoView } from '../../dto/position.ts';

const Header: TableColumnsType<PositionDtoView> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Public',
    dataIndex: 'isPublic',
    key: 'isPublic',
  },
];

export default Header;
