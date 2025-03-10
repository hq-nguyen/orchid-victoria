import { Modal, Input, Select, Switch, InputNumber, Button, Upload, message } from 'antd';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from '../../utils/upload'
import LoadingComponent from '../../components/Loading/Loading';
const { TextArea } = Input;
const { Option } = Select;

const OrchidSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .max(100, 'Name must be less than 100 characters'),
  category: Yup.string()
    .required('Category is required'),
  rating: Yup.number()
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must be at most 5'),
  special: Yup.boolean(),
  nature: Yup.boolean(),
  color: Yup.string(),
  description: Yup.string(),
  origin: Yup.string(),
  video: Yup.string().url('Must be a valid URL'),
});

const OrchidModel = ({ visible, onCancel, onSubmit, initialValues = null, isEdit = false }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues && initialValues.image && Array.isArray(initialValues.image)) {
      const initialFileList = initialValues.image.map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: 'done',
        url: url,
      }));
      setFileList(initialFileList);
    } else {
      setFileList([]);
    }
  }, [initialValues]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      setUploading(true);
      setLoading(true);

      const newFiles = fileList.filter(file => file.originFileObj);
      let uploadedUrls = [];

      if (newFiles.length > 0) {
        const uploadPromises = newFiles.map(file => uploadFile(file.originFileObj));
        const results = await Promise.all(uploadPromises);
        uploadedUrls = results.filter(url => typeof url === 'string');
      }

      const existingUrls = fileList
        .filter(file => !file.originFileObj && file.url)
        .map(file => file.url);

      const allImageUrls = [...existingUrls, ...uploadedUrls];

      const orchidData = {
        ...values,
        image: allImageUrls,
      };

      onSubmit(orchidData);
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Failed to upload images');
    } finally {
      setUploading(false);
      setSubmitting(false);
      setLoading(false);
    }
  };

  const getInitialValues = () => {
    if (initialValues) {
      return {
        ...initialValues,
        special: initialValues.special || false,
        nature: initialValues.nature || false,
        rating: initialValues.rating || 0,
      };
    }

    return {
      name: '',
      category: '',
      special: false,
      nature: false,
      color: '',
      rating: 0,
      description: '',
      origin: '',
      video: '',
    };
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }

    return false; // Prevent automatic upload
  };

  const removeFile = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  return (
    <Modal
      title={isEdit ? "Edit Orchid" : "Add New Orchid"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
      {(loading) ? (
        <LoadingComponent text={isEdit ? "Updating orchid..." : "Creating new orchid"} />
      ) : (
        <Formik
          initialValues={getInitialValues()}
          validationSchema={OrchidSchema}
          onSubmit={handleFormSubmit}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name *</label>
                <Input
                  name="name"
                  placeholder="Enter orchid name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  status={touched.name && errors.name ? 'error' : ''}
                />
                {touched.name && errors.name && (
                  <div className="text-red-500 text-xs mt-1">{errors.name}</div>
                )}
              </div>

              <div className="flex gap-8 mb-4 items-center">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <Select
                    name="category"
                    placeholder="Select a category"
                    value={values.category}
                    onChange={(value) => setFieldValue('category', value)}
                    onBlur={handleBlur}
                    status={touched.category && errors.category ? 'error' : ''}
                    style={{ width: '100%' }}
                  >
                    <Option value="Phalaenopsis">Phalaenopsis</Option>
                    <Option value="Cattleya">Cattleya</Option>
                    <Option value="Dendrobium">Dendrobium</Option>
                    <Option value="Vanda">Vanda</Option>
                    <Option value="Oncidium">Oncidium</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                  {touched.category && errors.category && (
                    <div className="text-red-500 text-xs mt-1">{errors.category}</div>
                  )}
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Special</label>
                  <Switch
                    checked={values.special}
                    onChange={(checked) => setFieldValue('special', checked)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Nature</label>
                  <Switch
                    checked={values.nature}
                    onChange={(checked) => setFieldValue('nature', checked)}
                  />
                </div>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Rating</label>
                  <InputNumber
                    name="rating"
                    min={0}
                    max={100}
                    value={values.rating}
                    onChange={(value) => setFieldValue('rating', value)}
                    className="w-full"
                  />
                  {touched.rating && errors.rating && (
                    <div className="text-red-500 text-xs mt-1">{errors.rating}</div>
                  )}
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Color</label>
                  <Input
                    name="color"
                    placeholder="Enter orchid color"
                    value={values.color}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Origin</label>
                  <Input
                    name="origin"
                    placeholder="Enter orchid origin"
                    value={values.origin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <TextArea
                  name="description"
                  rows={4}
                  placeholder="Enter orchid description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">YouTube Video URL</label>
                <Input
                  name="video"
                  placeholder="Enter YouTube video URL"
                  value={values.video}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  status={touched.video && errors.video ? 'error' : ''}
                />
                {touched.video && errors.video && (
                  <div className="text-red-500 text-xs mt-1">{errors.video}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Images</label>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={beforeUpload}
                  onRemove={removeFile}
                  multiple
                >
                  {fileList.length >= 8 ? null : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
                <div className="text-xs text-gray-500 mt-1">
                  Upload up to 8 images. Each image must be less than 2MB.
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting || uploading}
                  className="bg-blue-500"
                >
                  {isEdit ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default OrchidModel;