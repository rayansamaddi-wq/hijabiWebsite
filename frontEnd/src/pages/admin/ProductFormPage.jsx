import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  useCreateProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation
} from '../../slices/productsApiSlice';

import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Meta from '../../components/Meta';

const ProductFormPage = () => {
  const { id: productId } = useParams();
  const isUpdateMode = !!productId;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const { data: product, isLoading, error } =
    useGetProductDetailsQuery(productId, { skip: !isUpdateMode });

  const [createProduct, { isLoading: isCreateLoading }] =
    useCreateProductMutation();

  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: isUploadLoading }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  // Load product for update
  useEffect(() => {
    if (isUpdateMode && product) {
      setName(product.name || '');
      setImage(product.image || '');
      setDescription(product.description || '');
      setBrand(product.brand || '');
      setCategory(product.category || '');
      setPrice(product.price || 0);
      setCountInStock(product.countInStock || 0);
    }
  }, [isUpdateMode, product]);

  // Upload image
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();  
    formData.append('image', file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImage(res.image || res.imageUrl || '');
      toast.success(res.message || 'Image uploaded');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // Submit handler
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("🔥 SUBMIT CLICKED");

    // ✅ VALIDATION (THIS FIXES YOUR 400 ERROR)
    if (
      !name.trim() ||
      !image.trim() ||
      !description.trim() ||
      !brand.trim() ||
      !category.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    const productData = {
      name,
      image,
      description,
      brand,
      category,
      price: Number(price),
      countInStock: Number(countInStock)
    };

    try {
      let res;

      if (isUpdateMode) {
        res = await updateProduct({
          productId,
          ...productData
        }).unwrap();

        toast.success(res.message || "Product updated");
      } else {
        res = await createProduct(productData).unwrap();

        toast.success(res.message || "Product created");
      }

      console.log("✅ RESPONSE:", res);

      navigate('/admin/product-list');

    } catch (error) {
      console.log("❌ ERROR:", error);
      toast.error(error?.data?.message || "Request failed");
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-8'>
      <Meta title={'Product Form'} />

      <Link
        to='/admin/product-list'
        className='inline-block rounded-lg bg-white px-4 py-2 text-sm shadow hover:bg-gray-100 transition'
      >
        ← Go Back
      </Link>

      {(isCreateLoading || isUpdateLoading || isUploadLoading) && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <FormContainer>
          <div className='mx-auto mt-6 w-full max-w-2xl rounded-2xl bg-white p-6 md:p-10 shadow-xl'>

            <h1 className='mb-8 text-2xl font-bold text-gray-800'>
              {isUpdateMode ? 'Update Product' : 'Create Product'}
            </h1>

            <form onSubmit={submitHandler} className='space-y-5'>

              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Name'
                className='w-full rounded-lg border px-4 py-3'
              />

              <input
                type='number'
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder='Price'
                className='w-full rounded-lg border px-4 py-3'
              />

              <input
                type='file'
                onChange={uploadFileHandler}
                className='w-full rounded-lg border px-4 py-3'
              />

              {image && (
                <img src={image} alt='product' className='w-32 rounded' />
              )}

              <input
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder='Brand'
                className='w-full rounded-lg border px-4 py-3'
              />

              <input
                type='number'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
                placeholder='Stock'
                className='w-full rounded-lg border px-4 py-3'
              />

              <input
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder='Category'
                className='w-full rounded-lg border px-4 py-3'
              />

              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder='Description'
                className='w-full rounded-lg border px-4 py-3'
              />

              <button
                type='submit'
                className='w-full rounded-lg  bg-[#ead6ce] py-3 font-semibold text-white hover:bg-pink-600'
              >
                {isUpdateMode ? 'Update Product' : 'Create Product'}
              </button>

            </form>
          </div>
        </FormContainer>
      )}
    </div>
  );
};

export default ProductFormPage;