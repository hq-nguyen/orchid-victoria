import { Button, Table, message, Modal, Input, Form, Space, Upload, Image } from 'antd';
import { useEffect, useState } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../service/api.category';
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    UploadOutlined
} from '@ant-design/icons';
import toast from 'react-hot-toast';
import uploadFile from '../../utils/upload';
import { data, orchids } from '../../assets/data';

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await getCategories();
            const categoriesArray = Array.isArray(data) ? data : 
                (data.data ? data.data : []);
            
            setCategories(categoriesArray);
        } catch (error) {
            console.error('Error fetching categories:', error);
            message.error('Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    const showModal = (category = null) => {
        if (category) {
            setIsEditing(true);
            setEditingCategoryId(category.id);
            form.setFieldsValue({ name: category.name });
            setImageUrl(category.image || '');
        } else {
            setIsEditing(false);
            setEditingCategoryId(null);
            form.resetFields();
            setImageUrl('');
        }
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setImageUrl('');
    };

    const handleImageUpload = async (file) => {
        try {
            setUploading(true);
            const uploadedImageUrl = await uploadFile(file);
            setImageUrl(uploadedImageUrl);
            form.setFieldsValue({ image: uploadedImageUrl });
            message.success('Image uploaded successfully');
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            
            // Ensure image is included in the form data
            const categoryData = {
                ...values,
                image: imageUrl
            };
            
            if (isEditing) {
                await updateCategory(editingCategoryId, categoryData);
                toast.success('Category updated successfully');
            } else {
                await createCategory(categoryData);
                toast.success('Category created successfully');
            }
            
            setIsModalOpen(false);
            form.resetFields();
            setImageUrl('');
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            message.error('Failed to save category');
        }
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this category?',
            content: 'This action cannot be undone',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await deleteCategory(id);
                    toast.success('Category deleted successfully');
                    setCategories(prev => prev.filter(category => category.id !== id));
                } catch (error) {
                    console.error('Error deleting category:', error);
                    toast.error('Failed to delete category');
                }
            }
        });
    };

    const columns = [
        {
            title: 'Index',
            key: 'index',
            width: 80,
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: 100,
            render: (image) => (
                <Image 
                    src={image} 
                    alt="Category" 
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = data.orchid_1a;
                    }}
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined className="text-blue-500" />}
                        type="text"
                        onClick={() => showModal(record)}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        danger
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    const uploadProps = {
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('You can only upload image files!');
                return Upload.LIST_IGNORE;
            }
            
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must be smaller than 2MB!');
                return Upload.LIST_IGNORE;
            }
            
            handleImageUpload(file);
            return false;
        },
        showUploadList: false,
    };

    return (
        <div className='p-4 my-12 bg-white rounded-md shadow-md'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl text-black font-bold'>Category Management</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => showModal()}
                    className='bg-blue-500 hover:opacity-90 text-white'
                >
                    Add Category
                </Button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={categories}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                    }}
                    rowClassName={(_, index) => (index % 2 === 0 ? "bg-gray-100" : "bg-white")}
                    className="min-w-full border rounded-lg"
                />
            )}

            <Modal
                title={isEditing ? "Edit Category" : "Add New Category"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        onClick={handleSubmit}
                        loading={uploading}
                        className='bg-blue-500'
                    >
                        {isEditing ? "Update" : "Create"}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Category Name"
                        rules={[
                            { required: true, message: 'Please enter category name' },
                            { min: 2, message: 'Name must be at least 2 characters' },
                            { max: 50, message: 'Name cannot exceed 50 characters' }
                        ]}
                    >
                        <Input placeholder="Enter category name" />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Category Image"
                        rules={[
                            { required: true, message: 'Please upload an image' }
                        ]}
                    >
                        <div className="flex flex-col items-center space-y-4">
                            {imageUrl && (
                                <div className="mb-2">
                                    <Image
                                        src={imageUrl}
                                        alt="Category preview"
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/placeholder-image.png";
                                        }}
                                    />
                                </div>
                            )}
                            <Upload {...uploadProps}>
                                <Button 
                                    icon={<UploadOutlined />} 
                                    loading={uploading}
                                >
                                    {imageUrl ? 'Change Image' : 'Upload Image'}
                                </Button>
                            </Upload>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageCategory;