import axios from 'axios';
import * as React from 'react';

import { useEffect, useState } from 'react';
import { Table, Button, Flex, Modal } from 'antd';
import type { TableProps } from 'antd';
// import { notification } from 'antd';
import Header from './Header.tsx';
import type { PositionDto } from '../../dto/position.ts';

type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

// type NotificationType = 'success' | 'error';

// success' | 'info' | 'warning' | 'error';

const PositionsList: React.FC = () => {
  const [positions, setPositions] = useState<PositionDto[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [loadingDelete, setLoadingDelete] = useState(false);
  // const [loadingEdit, setLoadingEdit] = useState(false);
  // const [loadingAdd, setLoadingAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  // const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchData = async () => {
      setPositions(
        (await axios.get<PositionDto[]>(`${import.meta.env.VITE_URL}/position`))
          .data,
      );
    };
    fetchData().catch(console.error);
  }, []);

  const rowSelection: TableRowSelection<PositionDto> = {
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

  return (
    <Flex gap="small" vertical>
      <Flex align="center" gap="medium">
        <>
          {/*{contextHolder}*/}
          <Button
            type="primary"
            onClick={() => setIsModalOpenAdd(true)}
            // loading={loadingAdd}
          >
            Add
          </Button>
          <Modal
            title="Add Attribute"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpenAdd}
            footer={null}
            onCancel={() => setIsModalOpenAdd(false)}
          >
            {/*<AddForm*/}
            {/*  setIsModalOpen={setIsModalOpenAdd}*/}
            {/*  setAttributes={setAttributes}*/}
            {/*  setLoading={setLoadingAdd}*/}
            {/*  attributes={attributes}*/}
            {/*  openNotificationWithIcon={openNotificationWithIcon}*/}
            {/*/>*/}
          </Modal>
        </>
        <>
          <Button
            type="primary"
            onClick={() => setIsModalOpenEdit(true)}
            disabled={selectedRowKeys.length !== 1}
            // loading={loadingEdit}
          >
            Edit
          </Button>
          <Modal
            title="Edit Attribute"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpenEdit}
            footer={null}
            onCancel={() => setIsModalOpenEdit(false)}
          >
            {/*<EditForm*/}
            {/*  setIsModalOpen={setIsModalOpenEdit}*/}
            {/*  attribute={attributes.find((a) => a.id === selectedRowKeys[0])!}*/}
            {/*  setAttributes={setAttributes}*/}
            {/*  setLoading={setLoadingEdit}*/}
            {/*  openNotificationWithIcon={openNotificationWithIcon}*/}
            {/*/>*/}
          </Modal>
        </>
        <Button
          type="primary"
          // onClick={() =>
          //   deleteAttributes(
          //     selectedRowKeys,
          //     setSelectedRowKeys,
          //     setAttributes,
          //     setLoadingDelete,
          //     openNotificationWithIcon,
          //   )
          // }
          disabled={selectedRowKeys.length <= 0}
          // loading={loadingDelete}
        >
          Delete
        </Button>
        {selectedRowKeys.length > 0
          ? `Selected ${selectedRowKeys.length} items`
          : null}
      </Flex>
      <Table<PositionDto>
        rowSelection={rowSelection}
        columns={Header}
        dataSource={positions}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </Flex>
  );
};

export default PositionsList;
