import { type TableColumnsType, Tag } from 'antd';
import type { PositionDtoView } from '../../dto/position.ts';

import { AccessTokenService } from '../AccessTokenService.ts';

const accessTokenService = new AccessTokenService();

const { email } = accessTokenService.decodeToken();

export const getHeader = (
  role: string | null,
): TableColumnsType<PositionDtoView> => {
  const header: TableColumnsType<PositionDtoView> = [
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
  ];

  if (role === 'CANDIDATE') {
    header.push({
      title: 'Status',
      render: (_, record) => {
        const applied = record.users.some((user) => user.email === email);

        return (
          <Tag color={applied ? 'green' : 'blue'}>
            {applied ? 'Applied' : 'Available'}
          </Tag>
        );
      },
    });
  }

  return header;
};

export default getHeader;
