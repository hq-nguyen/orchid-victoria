import { useEffect, useState } from 'react'
import { fetchOrchids } from '../config/axios'
import { Image, Table } from 'antd';

const AdminLayout = () => {

    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getOrchids = async () => {
            try {
                const orchidData = await fetchOrchids();
                setOrchids(orchidData);
                console.log(orchidData);
            } catch (error) {
                console.error('Error while fetching orchid data', error);
            } finally {
                setLoading(false);
            }
        }
        getOrchids();
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => {
                if (image && image.length > 0) { // Make sure image exist and is an array
                    return (
                        <Image
                            src={image[0]} // Display the first image
                            alt="product"
                            style={{ width: 50, height: 50 }}
                            onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.src = "no img"; // Replace with a default image URL
                            }}
                        />
                    );
                } else {
                    return <div>No Image</div>;
                }
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Special',
            dataIndex: 'special',
            key: 'special',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Video',
            dataIndex: 'video',
            key: 'video',
        },

    ]

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl text-rose-500 dark:text-white font-bold'>Orchid List</h1>
                <button className='bg-rose-500 dark:bg-blue-500 hover:opacity-90 text-white px-4 py-2 rounded-md'>Add Orchid</button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={orchids}
                    rowKey={(record) => record.id}
                    pagination={false}
                    rowClassName={(_, index) => (index % 2 === 0 ? "bg-gray-100" : "bg-white")}
                    className="w-full border rounded-lg shadow-md"
                />
            )}
        </div>
    )
}

export default AdminLayout
