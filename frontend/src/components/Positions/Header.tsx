import type { TableColumnsType } from 'antd';
import type { PositionDto } from '../../dto/position.ts';

const Header: TableColumnsType<PositionDto> = [
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
