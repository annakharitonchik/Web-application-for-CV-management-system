import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button, Flex, notification } from 'antd';
import type { TableProps } from 'antd';
import { type PositionDto, PositionDtoView } from '../../dto/position.ts';
import { getHeader } from './Header.tsx';
import transformPositionDto from '../Positions/operations/transformPositionDto.ts';
import { applyPositions } from '../Positions/operations/applyPositions.ts';
import { axiosApi } from '../../axios.ts';
import { useUser } from '../AuthContext.tsx';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

type NotificationType = 'success' | 'error';

const Home: React.FC = () => {
  const [positions, setPositions] = useState<PositionDto[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [reload, setReload] = useState(false);
  const [loadingApply, setLoadingApply] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosApi.get<PositionDto[]>(`/position`);
      setPositions(data);
    };

    fetchData().catch(console.error);
  }, [reload]);

  const user = useUser();
  const { email, role } = user;

  const rowSelection: TableRowSelection<PositionDtoView> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) =>
      setSelectedRowKeys(newSelectedRowKeys),
    getCheckboxProps: (record) => ({
      disabled: record.users.some((user) => user.email === email),
    }),
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
                  setReload,
                  email!,
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
          rowSelection={
            role !== null && role === 'CANDIDATE' ? rowSelection : undefined
          }
          columns={getHeader(user)}
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
