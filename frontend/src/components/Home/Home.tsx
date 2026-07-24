import axios from 'axios';
import * as React from 'react';

import { useEffect, useState } from 'react';
import { Table, Button, Flex } from 'antd';
import type { TableProps } from 'antd';

import { type PositionDto, PositionDtoView } from '../../dto/position.ts';

// import { deletePositions } from './operations/deletePositions.ts';
import Header from './Header.tsx';
import transformPositionDto from '../Positions/operations/transformPositionDto.ts';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
// import { Link } from 'react-router-dom';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

// type NotificationType = 'success' | 'error';

// success' | 'info' | 'warning' | 'error';
interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const Home: React.FC = () => {
  const [positions, setPositions] = useState<PositionDto[]>([]);
  const [role, setRole] = useState<string>('');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // const [loadingDelete, setLoadingDelete] = useState(false);
  // const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const role = jwtDecode<CustomJwtPayload>(accessToken!).role || '';
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

  // const openNotificationWithIcon = (
  //   type: NotificationType,
  //   title: string,
  //   description: string,
  // ) => {
  //   api[type]({
  //     title,
  //     description,
  //   });
  // };

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
          {/*{contextHolder}*/}
          {role === 'ADMIN' || role === 'RECRUITER' ? (
            <></>
          ) : (
            <Button
              type="primary"
              // onClick={() =>
              // }
              disabled={selectedRowKeys.length <= 0}
              // loading={loadingDelete}
            >
              Delete
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
