import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { type PositionDto, PositionEditDto } from '../../../dto/position.ts';
import { AttributeDto } from '../../../dto/attribute.ts';
import { addPosition } from '../operations/addPosition.ts';

type NotificationType = 'success' | 'error';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};

const EditModal: React.FC<{
  attributes: AttributeDto[];
  setIsModalOpen: (arg0: boolean) => void;
  position: PositionDto;
  setPositions: (arg0: PositionDto[]) => void;
  setLoading: (arg0: boolean) => void;
  openNotificationWithIcon: (
    type: NotificationType,
    title: string,
    description: string,
  ) => void;
}> = ({
  attributes,
  setIsModalOpen,
  position,
  setPositions,
  setLoading,
  openNotificationWithIcon,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: ``,
      description: ``,
      isPublic: true,
      attributes: [],
    });
  }, [position, form]);

  const handlePosition = (createdPosition: PositionEditDto) => {
    setIsModalOpen(false);
    addPosition(
      setPositions,
      setLoading,
      createdPosition,
      openNotificationWithIcon,
    );
  };

  return (
    <Form
      {...layout}
      form={form}
      onFinish={handlePosition}
      name="control-hooks"
      style={{ maxWidth: 600 }}
      initialValues={{
        name: ``,
        description: ``,
        isPublic: true,
        attributes: [],
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            validator: (_, value) => {
              if (value.trim()) {
                return Promise.resolve();
              } else {
                return Promise.reject("'Name' is required");
              }
            },
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="isPublic" valuePropName="checked">
        <Checkbox>Public</Checkbox>
      </Form.Item>
      <Form.Item
        name="attributes"
        label="Attributes"
        rules={[
          {
            required: true,
            message: 'Please select positions!',
            type: 'array',
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="Please select positions"
          options={attributes.map((attribute) => ({
            label: attribute.name,
            value: attribute.name,
          }))}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default EditModal;
