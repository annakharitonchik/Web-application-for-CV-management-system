import { type TableColumnsType, Tag } from 'antd';
import type { PositionDtoView } from '../../dto/position.ts';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
  email?: string;
}
const accessToken = localStorage.getItem('accessToken');

const email =
  (accessToken && jwtDecode<CustomJwtPayload>(accessToken).email) || '';

const Header: TableColumnsType<PositionDtoView> = [
  {
    title: 'Position',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: {
      showTitle: true,
    },
  },
  {
    title: 'Status',
    render: (_, record) =>
      record.users.some((user) => user.email === email) ? (
        <Tag color="green">Applied</Tag>
      ) : (
        <Tag color="blue">Available</Tag>
      ),
  },
];

export default Header;
