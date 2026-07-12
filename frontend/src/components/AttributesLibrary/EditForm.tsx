import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { AttributeDto } from '../../dto/attribute.ts';
import { categoryMapper } from '../../dto/mappers/categoryMapper.ts';
import { dataTypeMapper } from '../../dto/mappers/dataTypeMapper.ts';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 20, span: 4 },
};

const EditModal: React.FC<{
  setIsModalOpen: (arg0: boolean) => void;
  attribute: AttributeDto;
}> = ({ setIsModalOpen, attribute }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: `${attribute?.name}`,
      category: `${categoryMapper(attribute?.category)}`,
      dataType: `${dataTypeMapper(attribute?.dataType)}`,
    });
  }, [attribute, form]);

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      style={{ maxWidth: 600 }}
      initialValues={{
        name: `${attribute?.name}`,
        category: `${categoryMapper(attribute?.category)}`,
        dataType: `${dataTypeMapper(attribute?.dataType)}`,
      }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="category" label="Category" rules={[{ required: true }]}>
        <Select
          allowClear

          options={[
            { label: 'Certification', value: 'CERTIFICATION' },
            {
              label: 'Professional knowledge',
              value: 'PROFESSIONAL_KNOWLEDGE',
            },
            { label: 'Personal information', value: 'PERSONAL_INFORMATION' },
            { label: 'Soft skills', value: 'SOFT_SKILLS' },
          ]}
        />
      </Form.Item>
      <Form.Item name="dataType" label="Type" rules={[{ required: true }]}>
        <Select
          allowClear
          placeholder="Select the type"
          options={[
            { label: 'String', value: 'STRING' },
            {
              label: 'Markdown',
              value: 'MARKDOWN',
            },
            { label: 'Image', value: 'IMAGE' },

            { label: 'Number', value: 'NUMBER' },
            { label: 'Date', value: 'DATE' },
            { label: 'Period', value: 'PERIOD' },
            { label: 'Boolean', value: 'BOOLEAN' },
          ]}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setIsModalOpen(false)}
          >
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default EditModal;
