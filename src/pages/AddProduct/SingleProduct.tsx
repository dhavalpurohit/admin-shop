import { useEffect, useState } from 'react';

import BasicDetails from './stepperData/BasicDetails';
import Variants from './stepperData/Variants';
import Additional from './stepperData/Additional';
import { useDispatch, useSelector } from 'react-redux';
// import { createSingleProduct } from '../../redux/slices/ProductSlice';
import { AppDispatch, RootState } from '../../redux/store';
// import { Product } from '../../types/product';
import {
  createSingleProduct,
  fetchColorCodeMain,
  fetchProductBrands,
  vendorFetchAllCategories,
} from '../../redux/slices/ProductSlice';
import toast from 'react-hot-toast';

const steps = ['Basic Details', 'Variants', 'Additional'];
export interface Option {
  id: number;
  value: string;
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
  selectedImages: string[]; // or string[] if images are URLs
  stockChecked: boolean;
  statusChecked: boolean;
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

const SingleProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vendor_id = localStorage.getItem('vendor_id');
  // const user_id = localStorage.getItem('user_id');

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
    category: '',
    subCategory: '',
    productId: '',
    productName: '',
    brand: '',
    keywords: '',
    productDescription: '',
    regularPrice: '',
    salePrice: '',
    quantity: '',
    taxCodeType: '',
    taxValue: '',
    manufactureInfo: '',
    importerDetails: '',
    options: [{ id: 1, value: '' }],
    selectedImages: [],
    stockChecked: true, // Default true
    statusChecked: true,
  };
  const [basicDetails, setBasicDetails] =
    useState<BasicDetails>(initialBasicDetails);

  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails>(
    {
      offerName: '',
      offerDescription: '',
      dangerousGoodsRegulations: '',
      complianceCertification: '',
    },
  );
  const [variants, setVariants] = useState<Variant[]>([
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
      const productDetails = {
        user_id: '-1',
        id: basicDetails.productId || '',
        name: basicDetails.productName || '',
        sale_price: basicDetails.salePrice || '',
        regular_price: basicDetails.regularPrice || '0',
        category_id: basicDetails.subCategory || '',
        product_url: 'http', // Static value as needed
        vendor_product_id: 'RTDG22BDHS00AZTS4', // Static or derived as needed
        vendor_id: vendor_id || '', // Static value
        brand_id: basicDetails.brand || '1',
        status: basicDetails.statusChecked ? '1' : '0', // Static value
        quantity: basicDetails.quantity || '0',
        image: basicDetails.selectedImages[0] || '', // Assumes first image as main image
        description: basicDetails.productDescription || '',
        do_not_display: '1', // Static value
        stock: basicDetails.stockChecked ? 'true' : 'false',
        keywords: basicDetails.keywords || '',
        weight: '', // Static or calculated if available
        skuid: '', // Static or generated
        GST: basicDetails.taxValue || '',
        HSNCode: basicDetails.taxCodeType || '',
        CountryOfOrigin: 'India', // Static or derived if necessary
        StyleID: '', // Static or generated
        user_allowed: '1', // Static value
      };

      try {
        await dispatch(createSingleProduct(productDetails)); // Await the dispatch to ensure it's finished
        toast.success('Product saved successfully!'); // Show success message
        setBasicDetails(initialBasicDetails);
      } catch (error) {
        toast.error('Failed to save product. Please try again.'); // Handle API error
      } finally {
        setIsSavingProduct(false); // Reset loading state after API call
      }
    } else {
      setErrors(validation.errors);
      if (validation.firstError) {
        toast.error(validation.firstError); // Show the first error message
      } else {
        toast.error('Please fill all the required fields');
      }
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

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          ADD NEW PRODUCT
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

export default SingleProduct;
