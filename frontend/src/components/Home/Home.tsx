import axios from 'axios';
import * as React from 'react';

import { useEffect, useState } from 'react';
import { Table, Button, Flex } from 'antd';
import type { TableProps } from 'antd';

import { type PositionDto, PositionDtoView } from '../../dto/position.ts';

// import { deletePositions } from './operations/deletePositions.ts';
import Header from './Header.tsx';
import transformPositionDto from '../Positions/operations/transformPositionDto.ts';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

// type NotificationType = 'success' | 'error';

// success' | 'info' | 'warning' | 'error';

const Home: React.FC = () => {
  const [positions, setPositions] = useState<PositionDto[]>([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // const [loadingDelete, setLoadingDelete] = useState(false);
  // const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const { data } = await axios.get<PositionDto[]>(
        `${import.meta.env.VITE_URL}/position`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setPositions(data);
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
    <Flex gap="small" vertical style={{ padding: '10px' }}>
      <Flex align="center" gap="medium">
        {/*{contextHolder}*/}

        <Button
          type="primary"
          // onClick={() =>
          // }
          disabled={selectedRowKeys.length <= 0}
          // loading={loadingDelete}
        >
          Delete
        </Button>
      </Flex>
      <Table<PositionDtoView>
        rowSelection={rowSelection}
        columns={Header}
        dataSource={dataSource}
      />
    </Flex>
  );
};

export default Home;
