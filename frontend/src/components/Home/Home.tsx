import axios from 'axios';
import * as React from 'react';

import { useEffect, useState } from 'react';
import { Table, Button, Flex, notification } from 'antd';
import type { TableProps } from 'antd';

import { type PositionDto, PositionDtoView } from '../../dto/position.ts';

import Header from './Header.tsx';
import transformPositionDto from '../Positions/operations/transformPositionDto.ts';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { applyPositions } from '../Positions/operations/applyPositions.ts';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

type NotificationType = 'success' | 'error';

// success' | 'info' | 'warning' | 'error';
interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const Home: React.FC = () => {
  const [positions, setPositions] = useState<PositionDto[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [loadingApply, setLoadingApply] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const role =
        (accessToken && jwtDecode<CustomJwtPayload>(accessToken).role) || '';

      const { data } = await axios.get<PositionDto[]>(
        `${import.meta.env.VITE_URL}/position`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setPositions(data);
      setRole(role);
    };

    fetchData().catch(console.error);
  }, []);

  const rowSelection: TableRowSelection<PositionDtoView> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) =>
      setSelectedRowKeys(newSelectedRowKeys),
  };

  const openNotificationWithIcon = (
    type: NotificationType,
    title: string,
    description: string,
  ) => {
    api[type]({
      title,
      description,
    });
  };

  const dataSource = transformPositionDto(positions);

  return (
    <Flex vertical>
      <Flex
        align="center"
        justify="center"
        style={{ backgroundColor: 'white' }}
      >
        <p>POSITIONS</p>
      </Flex>

      <Flex gap="small" vertical style={{ padding: '10px' }}>
        <Flex align="center" gap="medium">
          {contextHolder}
          {role !== null && role === 'CANDIDATE' && (
            <Button
              type="primary"
              onClick={() =>
                applyPositions(
                  selectedRowKeys,
                  setSelectedRowKeys,
                  setLoadingApply,
                  openNotificationWithIcon,
                )
              }
              disabled={selectedRowKeys.length <= 0}
              loading={loadingApply}
            >
              Apply for a position
            </Button>
          )}
        </Flex>
        <Table<PositionDtoView>
          rowSelection={rowSelection}
          columns={Header}
          dataSource={dataSource}
          pagination={false}
          scroll={{
            y: 450,
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Home;
