import { Tag, Space, Button, Avatar } from 'antd';
import inventory from '../../mockData/inventory.json'

export const getColumns = (addToCart) => [
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
    },
    {
        title: 'image',
        dataIndex: 'images',
        key: 'image',
        render: images => (
            <>
                {images.map((image, index) =>
                    <Avatar key={index} shape="square" size={64} icon={<img src={image} alt={`product-${index}`} />} />)
                }
            </>
        )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <Button onClick={() => addToCart(record)}>Add To Cart</Button>
            </Space>
        ),
    },
    {
        title: 'Note',
        key: 'note',
        render: product => (
            <>
                {
                    inventory[product.sku] < 3 && <Tag color="red">
                        Please Hurry! Only 2 products are remaining!
                    </Tag>
                }
            </>
        ),
    },
];