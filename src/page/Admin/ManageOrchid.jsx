import { Button, Image, Space, Table, Tag, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { fetchOrchids, createOrchid, updateOrchid, deleteOrchid } from '../../service/api.orchid';
import {
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import OrchidModel from './OrchidModel';
import toast from 'react-hot-toast';

function ManageOrchid() {
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modelVisible, setModelVisible] = useState(false);
    const [editingOrchid, setEditingOrchid] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchOrchidData();
    }, []);

    const fetchOrchidData = async () => {
        try {
            const orchidData = await fetchOrchids();
            const orchidArray = Array.isArray(orchidData) ? orchidData :
                (orchidData.data ? orchidData.data : []);

            setOrchids(orchidArray);
            console.log('Orchid data structure:', orchidArray);
        } catch (error) {
            console.error('Error while fetching orchid data', error);
            message.error('Failed to load orchid data');
        } finally {
            setLoading(false);
        }
    }

    const handleAddOrchid = () => {
        setIsEditing(false);
        setEditingOrchid(null);
        setModelVisible(true);
    };

    const handleEditOrchid = (orchid) => {
        setIsEditing(true);
        setEditingOrchid(orchid);
        setModelVisible(true);
    };

    const handleDeleteOrchid = async (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this orchid?',
            content: 'This action cannot be undone',
            onText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await deleteOrchid(id);
                    toast.success('Orchid deleted successfully');
                    setOrchids((prevOrchids) => prevOrchids.filter((orchid) => orchid.id !== id));
                } catch (error) {
                    console.error('Error deleting orchid:', error);
                    toast.error('Failed to delete orchid');
                }
            }
        })
    };

    const handleModelCancel = () => {
        setModelVisible(false);
        setEditingOrchid(null);
    };

    const handleModelSubmit = async (orchidData) => {
        try {
            if (isEditing) {
                await updateOrchid(editingOrchid.id, orchidData);
                message.success('Orchid updated successfully');
            } else {
                await createOrchid(orchidData);
                message.success('Orchid created successfully');
            }

            setModelVisible(false);
            fetchOrchidData();
        } catch (error) {
            console.error('Error saving orchid:', error);
            message.error('Failed to save orchid');
        }
    };

    const columns = [
        {
            title: 'Index',
            key: 'index',
            width: 70,
            render: (_, __, index) => index + 1,
            fixed: 'left',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            render: (image) => {
                if (image && image.length > 0) {
                    return (
                        <Image
                            src={image[0]}
                            alt="orchid"
                            style={{ width: 50, height: 50 }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/placeholder-image.png";
                            }}
                        />
                    );
                } else {
                    return <div>No Image</div>;
                }
            },
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 120,
        },
        {
            title: 'Special',
            key: 'special',
            width: 150,
            render: (_, record) => (
                <div>
                    {record.special ? <Tag color="gold">Rare Orchid</Tag> : <Tag color="blue">Regular Orchid</Tag>}
                </div>
            ),
        },
        {
            title: 'Nature',
            key: 'nature',
            width: 150,
            render: (_, record) => (
                <div>
                    {record.nature ? <Tag color="green">Wild Orchid</Tag> : <Tag color="gray">Hybrid Orchid</Tag>}
                </div>
            ),
        },
        {
            title: 'Video',
            dataIndex: 'video',
            key: 'video',
            width: 100,
            render: (video) => {
                if (video) {
                    const videoId = video?.split('v=')?.[1]?.split('&')?.[0];
                    return (
                        <div>
                            <iframe
                                width="100%"
                                height="90"
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                                allowFullScreen
                            />
                        </div>
                    );
                } else {
                    return <div>No Video</div>;
                }
            },
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            fixed: 'right',
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined className="text-blue-500 w-5 h-5" />}
                        type="text"
                        onClick={() => handleEditOrchid(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        danger
                        onClick={() => handleDeleteOrchid(record.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className='p-4 my-12 bg-white rounded-md shadow-md'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl text-black font-bold'>Orchid List</h1>
                <button
                    className='bg-blue-500 hover:opacity-90 text-white px-4 py-2 rounded-md'
                    onClick={handleAddOrchid}
                >
                    Add Orchid
                </button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="overflow-x-auto w-full">
                    <style>
                        {`
                            .ant-table-tbody > tr > td {
                                background-color: white;
                            }
                        `}
                    </style>
                    <Table
                        columns={columns}
                        dataSource={Array.isArray(orchids) ? orchids : []}
                        rowKey={(record) => record.id || Math.random().toString()}
                        pagination={{
                            pageSize: 10,
                            className: 'pr-4',
                        }}
                        rowClassName={(_, index) => (index % 2 === 0 ? "bg-gray-100" : "bg-white")}
                        className="min-w-full border rounded-lg"
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            )}

            {modelVisible && (
                <OrchidModel
                    visible={true}
                    onCancel={handleModelCancel}
                    onSubmit={handleModelSubmit}
                    initialValues={editingOrchid}
                    isEdit={isEditing}
                />
            )}
        </div>
    )
}

export default ManageOrchid