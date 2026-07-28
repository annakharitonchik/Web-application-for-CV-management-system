import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, Button, Flex, notification } from 'antd';
import type { TableProps } from 'antd';
import { type PositionDto, PositionDtoView } from '../../dto/position.ts';
import { getHeader } from './Header.tsx';
import transformPositionDto from '../Positions/operations/transformPositionDto.ts';
import { applyPositions } from '../Positions/operations/applyPositions.ts';
import { AccessTokenService } from '../AccessTokenService.ts';
import { axiosApi } from '../../axios.ts';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

type NotificationType = 'success' | 'error';

const Home: React.FC = () => {
  const [positions, setPositions] = useState<PositionDto[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [loadingApply, setLoadingApply] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const accessTokenService = new AccessTokenService();
  useEffect(() => {
    const fetchData = async () => {
      const { role } = accessTokenService.decodeToken();

      const { data } = await axiosApi.get<PositionDto[]>(`/position`);
      setPositions(data);
      setRole(role);
    };

    fetchData().catch(console.error);
  }, []);

  const { email } = accessTokenService.decodeToken();

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
          columns={getHeader(role)}
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
