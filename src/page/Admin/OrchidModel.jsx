import { Modal, Form, Input, Select, Switch, InputNumber, Button } from 'antd';
import { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const { TextArea } = Input;
const { Option } = Select;

// Validation schema using Yup
const OrchidSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .max(100, 'Name must be less than 100 characters'),
  category: Yup.string()
    .required('Category is required'),
  rating: Yup.number()
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  numberOfLike: Yup.number()
    .min(0, 'Number of likes must be at least 0'),
  review: Yup.number()
    .min(0, 'Review count must be at least 0'),
  special: Yup.boolean(),
  natural: Yup.boolean(),
  color: Yup.string(),
  description: Yup.string(),
  origin: Yup.string(),
  video: Yup.string().url('Must be a valid URL'),
  // For now, we'll handle image URLs as a comma-separated string
  imageUrls: Yup.string()
});

const OrchidModel = ({ visible, onCancel, onSubmit, initialValues = null, isEdit = false }) => {
  const [imageUrls, setImageUrls] = useState('');

  // Set initial values when component mounts or props change
  useEffect(() => {
    if (initialValues && initialValues.image && Array.isArray(initialValues.image)) {
      setImageUrls(initialValues.image.join(','));
    }
  }, [initialValues]);

  const handleFormSubmit = (values, { setSubmitting }) => {
    try {
      // Process image URLs from the comma-separated string
      const imageArray = values.imageUrls
        ? values.imageUrls.split(',').map(url => url.trim()).filter(url => url)
        : [];
      
      // Create the final data object
      const orchidData = {
        ...values,
        image: imageArray,
      };
      
      // Remove the temporary imageUrls field
      delete orchidData.imageUrls;
      
      // Submit the data
      onSubmit(orchidData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Prepare initial form values
  const getInitialValues = () => {
    if (initialValues) {
      return {
        ...initialValues,
        imageUrls: initialValues.image && Array.isArray(initialValues.image) 
          ? initialValues.image.join(',') 
          : '',
        special: initialValues.special || false,
        natural: initialValues.natural || false,
        rating: initialValues.rating || 0,
        numberOfLike: initialValues.numberOfLike || 0,
        review: initialValues.review || 0,
      };
    }

    return {
      name: '',
      category: '',
      special: false,
      natural: false,
      color: '',
      rating: 0,
      numberOfLike: 0,
      review: 0,
      description: '',
      origin: '',
      video: '',
      imageUrls: '',
    };
  };

  return (
    <Modal
      title={isEdit ? "Edit Orchid" : "Add New Orchid"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
    >
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

            <div className="mb-4">
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
            
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Special</label>
                <Switch
                  checked={values.special}
                  onChange={(checked) => setFieldValue('special', checked)}
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Natural</label>
                <Switch
                  checked={values.natural}
                  onChange={(checked) => setFieldValue('natural', checked)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Color</label>
              <Input
                name="color"
                placeholder="Enter orchid color"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
                <label className="block text-sm font-medium mb-1">Number of Likes</label>
                <InputNumber
                  name="numberOfLike"
                  min={0}
                  value={values.numberOfLike}
                  onChange={(value) => setFieldValue('numberOfLike', value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Reviews</label>
                <InputNumber
                  name="review"
                  min={0}
                  value={values.review}
                  onChange={(value) => setFieldValue('review', value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Origin</label>
              <Input
                name="origin"
                placeholder="Enter orchid origin"
                value={values.origin}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
              <label className="block text-sm font-medium mb-1">Image URLs (comma-separated)</label>
              <TextArea
                name="imageUrls"
                rows={3}
                placeholder="Enter image URLs separated by commas"
                value={values.imageUrls}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="text-xs text-gray-500 mt-1">
                Example: http://example.com/image1.jpg, http://example.com/image2.jpg
              </div>
            </div>

            {/* Preview images if URLs are provided */}
            {values.imageUrls && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Image Previews</label>
                <div className="flex flex-wrap gap-2">
                  {values.imageUrls.split(',').map((url, index) => {
                    const trimmedUrl = url.trim();
                    if (!trimmedUrl) return null;
                    
                    return (
                      <div key={index} className="relative w-16 h-16 border rounded overflow-hidden">
                        <img
                          src={trimmedUrl}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-image.png";
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={onCancel}>
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={isSubmitting}
                className="bg-blue-500"
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default OrchidModel;