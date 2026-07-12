import axios from 'axios';
import * as React from 'react';
import { AttributeDto, AttributeDtoView } from '../../dto/attribute.ts';
import { useEffect, useState } from 'react';
import changeAttributes from './operations/changeAttributes.ts';
import Header from './Header.tsx';
import { Table, Button, Flex, Modal } from 'antd';
import type { TableProps } from 'antd';
import { useGetColumnSearchProps } from './useGetColumnSearchProps.tsx';
import { deleteAttributes } from './operations/deleteAttributes.ts';
import EditForm from './EditForm.tsx';
type TableRowSelection<T extends object = object> =
  TableProps<T>['rowSelection'];

const AttributesLibrary: React.FC = () => {
  const [attributes, setAttributes] = useState<AttributeDto[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const columnSearchProps = useGetColumnSearchProps();
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setAttributes(
        (
          await axios.get<AttributeDto[]>(
            `${import.meta.env.VITE_URL}/attribute`,
          )
        ).data,
      );
    };
    fetchData().catch(console.error);
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const rowSelection: TableRowSelection<AttributeDtoView> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) =>
      setSelectedRowKeys(newSelectedRowKeys),
  };

  const dataSource = changeAttributes(attributes);

  return (
    <Flex gap="small" vertical>
      <Flex align="center" gap="medium">
        <>
          <Button
            type="primary"
            onClick={showModal}
            disabled={selectedRowKeys.length !== 1}
            loading={loadingEdit}
          >
            Edit
          </Button>
          <Modal
            title="Edit Attribute"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            footer={null}
            onCancel={() => setIsModalOpen(false)}
          >
            <EditForm
              setIsModalOpen={setIsModalOpen}
              attribute={attributes.find((a) => a.id === selectedRowKeys[0])!}
              setAttributes={setAttributes}
              setLoading={setLoadingEdit}
            />
          </Modal>
        </>
        <Button
          type="primary"
          onClick={() =>
            deleteAttributes(
              selectedRowKeys,
              setSelectedRowKeys,
              setAttributes,
              setLoadingDelete,
            )
          }
          disabled={selectedRowKeys.length <= 0}
          loading={loadingDelete}
        >
          Delete
        </Button>
        {selectedRowKeys.length > 0
          ? `Selected ${selectedRowKeys.length} items`
          : null}
      </Flex>
      <Table<AttributeDtoView>
        rowSelection={rowSelection}
        columns={Header(columnSearchProps)}
        dataSource={dataSource}
        showSorterTooltip={{ target: 'sorter-icon' }}
      />
    </Flex>
  );
};

export default AttributesLibrary;
