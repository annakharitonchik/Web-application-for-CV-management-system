import {
  Button,
  Input,
  Space,
  type InputRef,
  type TableColumnType,
} from 'antd';
import { AttributeDtoView } from '../../dto/attribute.ts';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useRef, useState } from 'react';

export const useGetColumnSearchProps =
  (): TableColumnType<AttributeDtoView> => {
    const [searchText, setSearchText] = useState('');
    const searchInput = useRef<InputRef>(null);

    const dataIndex = 'name';

    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search attribute`}
            value={selectedKeys[0]}
            onChange={(e) => {
              const inputValue = e.target.value.trim();
              const keys = inputValue ? [inputValue] : [];
              setSelectedKeys(keys);
              confirm({ closeDropdown: false });
              setSearchText(keys[0]);
            }}
            onPressEnter={() => {
              confirm({ closeDropdown: true });
            }}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              onClick={() => {
                if (clearFilters) {
                  clearFilters();
                  setSearchText('');
                  confirm({ closeDropdown: false });
                }
              }}
              size="small"
              style={{ width: 180 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .startsWith((value as string).toLowerCase()),
      filterDropdownProps: {
        onOpenChange(open) {
          if (open) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },
      },
      render: (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ),
    };
  };
