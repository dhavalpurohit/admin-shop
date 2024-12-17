import { useEffect, useState } from 'react';
import BasicDetails from './stepperData/BasicDetails';
import Variants from './stepperData/Variants';
import Additional from './stepperData/Additional';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

import {
  createSingleProduct,
  fetchColorCodeMain,
  fetchProductBrands,
  productAddMultipleImages,
  productAttributeAddUpdate,
  productOptionAddUpdate,
  vendorFetchAllCategories,
} from '../../../redux/slices/ProductSlice';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const steps = ['Basic Details', 'Variants', 'Additional'];
export interface Option {
  id: number;
  value: string;
}
export interface ImageDetails {
  base64: string; // Base64-encoded string or image URL
  caption: string; // File name or caption
  size: string; // Image dimensions in the format "width x height"
}

export interface BasicDetails {
  category: string;
  subCategory: string;
  productId: string;
  productName: string;
  brand: string;
  keywords: string;
  productDescription: string;
  regularPrice: string;
  salePrice: string;
  quantity: string;
  taxCodeType: string;
  taxValue: string;
  manufactureInfo: string;
  importerDetails: string;
  options: Option[];
  selectedImages: ImageDetails[]; // or string[] if images are URLs
  stockChecked: boolean;
  statusChecked: boolean;
  doNotDisplay: boolean;
}

export interface Variant {
  color?: string;
  size?: string;
  colormap?: string;
  name?: string;
  stock?: string;
  lengthSize?: string;
  waistSize?: string;
  hipSize?: string;
  bustSize?: string;
  variantImages: string[];
}

export interface AdditionalDetails {
  offerName?: string;
  offerDescription?: string;
  dangerousGoodsRegulations?: string;
  complianceCertification?: string;
}

// Type for updateBasicDetails function
export type UpdateBasicDetails = (
  field: keyof BasicDetails,
  value: any,
) => void;

export type UpdateAdditionalDetails = (
  field: keyof AdditionalDetails,
  value: any,
) => void;

export type UpdateVariantsFunction = (
  index: number,
  field: keyof Variant,
  value: Variant[keyof Variant],
) => void;

// export type UpdateVariantDetails = (field: keyof Variant, value: any) => void;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  console.log('UpdateProduct', product);
  const dispatch = useDispatch<AppDispatch>();
  const vendor_id = localStorage.getItem('vendor_id');

  const categories = useSelector(
    (state: RootState) => state.product.categories,
  );
  const colourCodes = useSelector(
    (state: RootState) => state.product.ColorCodeMain,
  );
  const productBrands = useSelector(
    (state: RootState) => state.product.productBrands,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeStep, setActiveStep] = useState(0);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const initialBasicDetails: BasicDetails = {
    category: product?.category || '',
    subCategory: product?.subCategory || '',
    productId: product?.id || '',
    productName: product?.name || '',
    brand: product?.brand || '',
    keywords: product?.keywords || '',
    productDescription: product?.description || '',
    regularPrice: product?.regular_price || '',
    salePrice: product?.sale_price || '',
    quantity: product?.quantity || '',
    taxCodeType: product?.tax_code || '',
    taxValue: product?.tax_value || '',
    manufactureInfo: product?.manufacture_info || '',
    importerDetails: product?.importer_details || '',
    options: product?.options || [{ id: 1, value: '' }],
    selectedImages: product?.image_extra || [],
    stockChecked: product?.stock || false,
    statusChecked: product?.status === '1',
    doNotDisplay: product?.do_not_display || false,
  };
  const [basicDetails, setBasicDetails] =
    useState<BasicDetails>(initialBasicDetails);

  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails>(
    {
      offerName: product?.offer_name || '',
      offerDescription: product?.offer_description || '',
      dangerousGoodsRegulations: product?.dangerous_goods_regulations || '',
      complianceCertification: product?.compliance_certification || '',
    },
  );

  const [variants, setVariants] = useState<Variant[]>(
    product?.variants || [
      {
        color: '',
        size: '',
        colormap: '',
        name: '',
        stock: '',
        lengthSize: '',
        waistSize: '',
        hipSize: '',
        bustSize: '',
        variantImages: [],
      },
    ],
  );
  const updateAdditionalDetails: UpdateAdditionalDetails = (field, value) => {
    setAdditionalDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const updateVariants: UpdateVariantsFunction = (index, field, value) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = { ...updatedVariants[index], [field]: value };
      return updatedVariants;
    });
  };

  const deleteVariant = (index: number) => {
    setVariants((prevVariants) => prevVariants.filter((_, i) => i !== index));
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };
  const updateBasicDetails: UpdateBasicDetails = (field, value) => {
    setBasicDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  useEffect(() => {
    !categories?.length && dispatch(vendorFetchAllCategories({ id: '0' }));
  }, []);
  useEffect(() => {
    if (!colourCodes) dispatch(fetchColorCodeMain());
  }, [colourCodes]);

  useEffect(() => {
    if (!productBrands) {
      dispatch(fetchProductBrands());
    }
  }, [productBrands]);

  const handleSave = async () => {
    const validation = validateBasicDetails(basicDetails);
    if (validation.isValid) {
      setIsSavingProduct(true); // Set loading to true when starting the API call
      const productDetails: any = {
        user_id: '-1',
        id: product?.id,
        name: basicDetails.productName,
        sale_price: basicDetails.salePrice,
        regular_price: basicDetails.regularPrice,
        category_id: basicDetails.subCategory,
        product_url: 'http',
        vendor_product_id: 'RTDG22BDHS00AZTS4',
        vendor_id: vendor_id,
        brand_id: basicDetails.brand,
        status: basicDetails.statusChecked ? '1' : '0',
        quantity: basicDetails.quantity,
        description: basicDetails.productDescription,
        do_not_display: basicDetails.doNotDisplay ? '1' : '0',
        stock: basicDetails.stockChecked ? 'true' : 'false',
        keywords: basicDetails.keywords,
        weight: '',
        skuid: '',
        GST: basicDetails.taxValue,
        HSNCode: basicDetails.taxCodeType,
        CountryOfOrigin: 'India',
        StyleID: '',
        user_allowed: '1',
      };

      try {
        // First API call to save the product
        const response = await dispatch(createSingleProduct(productDetails));

        // Extract the 'id' from the response
        const productId = response.payload?.id;
        if (!productId) throw new Error('Failed to get product ID');

        // Image upload payload
        if (basicDetails.selectedImages.length > 0) {
          const imagePayload = {
            user_id: '-1',
            product_id: productId.toString(),
            images: basicDetails.selectedImages.map((image) => ({
              image: image.base64.replace(/^data:image\/\w+;base64,/, ''),
              caption: image.caption,
              size: image.size,
            })),
          };
          const uploadResponse = await dispatch(
            productAddMultipleImages(imagePayload),
          );
          if (!uploadResponse.payload)
            throw new Error('Failed to upload images');
        }

        // Additional attribute payload
        const attributePayload = {
          id: '',
          att_group_id: '2',
          att_group_value: '975781559891967283',
          product_id: productId.toString(),
          original_product_id: productId.toString(),
          product_url: 'https',
          price: basicDetails.salePrice || '',
          status: basicDetails.statusChecked ? '1' : '0',
          stock: basicDetails.stockChecked ? 'true' : 'false',
          user_id: '-1',
        };
        const attributeResponse = await dispatch(
          productAttributeAddUpdate(attributePayload),
        );
        if (!attributeResponse.payload) {
          throw new Error('Failed to update product attributes');
        }

        // New: Product Option Update API Call
        const productOptionPayload = {
          user_id: '-1', // Static value
          id: '', // ID to be passed dynamically if needed
          option_group_id: '8', // Static option group ID
          option_group_value: '26', // Static option group value
          product_id: productId.toString(),
        };

        const optionResponse = await dispatch(
          productOptionAddUpdate(productOptionPayload),
        );
        if (!optionResponse.payload) {
          throw new Error('Failed to update product options');
        }

        // Success toast after all API calls
        toast.success(
          'Product, images, attributes, and options saved successfully!',
        );
        setBasicDetails(initialBasicDetails);
        setAdditionalDetails({
          offerName: '',
          offerDescription: '',
          dangerousGoodsRegulations: '',
          complianceCertification: '',
        });
        setVariants([
          {
            color: '',
            size: '',
            colormap: '',
            name: '',
            stock: '',
            lengthSize: '',
            waistSize: '',
            hipSize: '',
            bustSize: '',
            variantImages: [],
          },
        ]);
        navigate('/products');
      } catch (error) {
        console.error(error);
        toast.error(
          (error as Error).message ||
            'An error occurred while saving the product',
        );
      } finally {
        setIsSavingProduct(false);
      }
    } else {
      setErrors(validation.errors);
      toast.error(
        validation.firstError || 'Please fill all the required fields',
      );
    }
  };

  const validateBasicDetails = (details: BasicDetails) => {
    const errors: Record<string, string> = {};
    let firstError: string | null = null;

    // Required fields
    if (!details.category) {
      errors.category = 'Category is required';
      if (!firstError) firstError = errors.category; // Capture first error
    }
    if (!details.subCategory) {
      errors.subCategory = 'Subcategory is required';
      if (!firstError) firstError = errors.subCategory; // Capture first error
    }
    if (!details.productName) {
      errors.productName = 'Product name is required';
      if (!firstError) firstError = errors.productName; // Capture first error
    }
    if (!details.productDescription) {
      errors.productDescription = 'Description is required';
      if (!firstError) firstError = errors.productDescription; // Capture first error
    }
    if (!details.regularPrice) {
      errors.regularPrice = 'Regular price is required';
      if (!firstError) firstError = errors.regularPrice; // Capture first error
    } else if (!/^\d+(\.\d{1,2})?$/.test(details.regularPrice)) {
      errors.regularPrice =
        'Regular price must be a number with up to two decimal places';
      if (!firstError) firstError = errors.regularPrice; // Capture first error
    }

    // Sale price validation
    if (details.salePrice) {
      if (!/^\d+(\.\d{1,2})?$/.test(details.salePrice)) {
        errors.salePrice =
          'Sale price must be a number with up to two decimal places';
        if (!firstError) firstError = errors.salePrice; // Capture first error
      } else if (
        parseFloat(details.salePrice) >= parseFloat(details.regularPrice)
      ) {
        errors.salePrice = 'Sale price must be less than regular price';
        if (!firstError) firstError = errors.salePrice; // Capture first error
      }
    }

    return { isValid: Object.keys(errors).length === 0, errors, firstError };
  };

  const handleReset = () => {
    setBasicDetails(initialBasicDetails); // Reset basicDetails to initial values
    setErrors({}); // Clear any existing errors
    toast.success('Form reset to default values.'); // Optional success message
  };

  useEffect(() => {
    if (!product) {
      // If no product data is passed, redirect back or show an error
      toast.error('No product data found!');
      navigate('/products');
    }
  }, [product, navigate]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          UPDATE PRODUCT
        </h3>
        <div className="flex justify-end gap-4.5">
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="button" // Use type="button" to prevent form submission if not needed
            onClick={handleSave}
            disabled={isSavingProduct}
          >
            {isSavingProduct ? 'Saving ... ' : 'Save'}
          </button>
          <button
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            type="button"
            onClick={handleReset}
            disabled={isSavingProduct}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center py-8 gap-20 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative w-full text-center">
              <div
                onClick={() => handleStepClick(index)}
                className={`cursor-pointer p-2 border rounded-full transition-all duration-300 
                                    ${
                                      activeStep === index
                                        ? 'bg-primary border-primary text-white'
                                        : activeStep > index
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-gray-200 border-gray-300 text-gray-500'
                                    }
                               `}
              >
                {step}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/2 left-full w-full h-1 transform -translate-y-1/2 
                                ${
                                  activeStep > index
                                    ? 'bg-green-500'
                                    : 'bg-gray-300'
                                }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <form className="p-7" action="#">
          {activeStep === 0 && (
            <BasicDetails
              basicDetails={basicDetails}
              updateBasicDetails={updateBasicDetails}
              errors={errors}
            />
          )}
          {activeStep === 1 && (
            <Variants
              variants={variants}
              updateVariants={updateVariants}
              deleteVariant={deleteVariant}
            />
          )}
          {activeStep === 2 && (
            <Additional
              additionalDetails={additionalDetails}
              updateAdditionalDetails={updateAdditionalDetails}
            />
          )}
        </form>
        <div className="flex items-center gap-2.5 p-7 justify-end">
          {activeStep > 0 && (
            <button
              onClick={handlePrevious}
              className="flex justify-center rounded border border-primary py-1.5 px-6 font-medium hover:bg-opacity-90 text-primary"
            >
              Previous
            </button>
          )}
          {activeStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="flex justify-center rounded  bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
