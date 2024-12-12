import { useEffect, useState } from 'react';
import DropDownCommon from '../../components/DropDownCommon';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductBrands,
  vendorFetchAllCategories,
} from '../../redux/slices/ProductSlice';
import { createBanner } from '../../redux/slices/bannerSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { removeFromSelectedProducts } from '../../redux/slices/selectedProductSlice';
import AddProductBannerModal from './AddProductBannerModal';
import toast from 'react-hot-toast';

const type = [
  {
    name: 'Banner',
    value: 'banner',
  },
  {
    name: 'Offer Banner',
    value: 'offer_banner',
  },
  {
    name: 'Home Category',
    value: 'home_category',
  },
  {
    name: 'Mood',
    value: 'mood',
  },
  {
    name: 'Sub Category Men',
    value: 'sub_category_men',
  },
  {
    name: 'Sub Category Women',
    value: 'sub_category_women',
  },
  {
    name: 'Sub Category Boys',
    value: 'sub_category_boys',
  },
  {
    name: 'Banners',
    value: 'banners',
  },
  {
    name: 'Spotlight',
    value: 'spotlight',
  },
  {
    name: 'Sub Category Girls',
    value: 'sub_category_girls',
  },
];

const parents = [
  {
    name: 'parent 1',
    value: 'parent 1',
  },
  {
    name: 'parent 2',
    value: 'parent 2',
  },
];

interface bannerDetails {
  banner_id: string | null;
  banner_name: string | null;
  image: string | null;
  status: string | null;
  show_homepage: string | null;
  product_ids: string | null;
  products: string | null;
  deal: string | null;
  type: string | null;
  parent_id: string | null;
  sub_title: string | null;
  user_id: string | null;
  sorting: string | null;
}
const AddBanner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isSavingBanner, setIsSavingBanner] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedBrand, setselectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const maxImages = 2;

  const selectedProducts = useSelector(
    (state: RootState) => state.selectedProducts?.items,
  );

  console.log('selectedProducts', selectedProducts);

  const initialBasicDetails: bannerDetails = {
    banner_id: '',
    banner_name: '',
    image: '',
    status: '1',
    show_homepage: '1',
    product_ids: '23566',
    products: 'category:70',
    deal: '',
    type: selectedType,
    parent_id: '0',
    sub_title: '',
    user_id: '-1',
    sorting: '',
  };
  const [basicDetails, setBasicDetails] =
    useState<bannerDetails>(initialBasicDetails);

  const handleSave = async () => {
    try {
      setIsSavingBanner(true);
      await dispatch(createBanner(basicDetails));
      toast.success(`Add Banner successfully!`);
      setIsSavingBanner(false);
      navigate('/banners');
    } catch (error) {
      toast.error('Failed to add Banner. Please try again.');
    }
  };

  const handleInputChange = (key: keyof bannerDetails, value: string) => {
    setBasicDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleReset = async () => {
    setBasicDetails(initialBasicDetails);
    toast.success('Form reset to default values.');
  };

  const productBrands = useSelector(
    (state: RootState) => state.product.productBrands?.brands,
  );

  const categories = useSelector(
    (state: RootState) => state.product.categories?.categories,
  );

  const handleBrand = (brand: string) => {
    setselectedBrand(brand);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (selectedImages.length + files.length > maxImages) {
      toast.error(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index: number) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  useEffect(() => {
    if (!categories) {
      dispatch(
        vendorFetchAllCategories({
          id: '0',
        }),
      );
    }
  }, [categories]);

  useEffect(() => {
    if (!productBrands) {
      dispatch(fetchProductBrands());
    }
  }, [productBrands]);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleRemoveProduct = async (itemId: string) => {
    try {
      dispatch(removeFromSelectedProducts(itemId));
      toast.success(`Remove Product successfully! ${itemId}`);
    } catch (error) {
      toast.error('Failed to remove product. Please try again.');
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            ADD NEW BANNER
          </h3>
          <div className="flex justify-end gap-4.5">
            <button
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type="button" // Use type="button" to prevent form submission if not needed
              onClick={handleSave}
              disabled={isSavingBanner}
            >
              {isSavingBanner ? 'Saving ... ' : 'Save'}
            </button>
            <button
              className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
              type="button"
              onClick={handleReset}
              disabled={isSavingBanner}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="w-full mx-auto">
          <form className="p-7" action="#">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-5">
                <div className="p-8 shadow border rounded">
                  <h2 className="text-lg text-primary font-medium">
                    General Information
                  </h2>
                  <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="title"
                      >
                        Title
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="text"
                          name="title"
                          id="title"
                          value={basicDetails.banner_name || ''}
                          placeholder="Banner Title"
                          onChange={(e) =>
                            handleInputChange('banner_name', e.target.value)
                          }
                        />
                        {/* {errors.title && (
                  <p className="text-red-500">{errors.title}</p>
                )} */}
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="subtitle"
                      >
                        Sub Title
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="text"
                          name="subtitle"
                          id="subtitle"
                          value={basicDetails.sub_title || ''}
                          placeholder="Banner Sub Title"
                          onChange={(e) =>
                            handleInputChange('sub_title', e.target.value)
                          }
                        />
                        {/* {errors.subtitle && (
                  <p className="text-red-500">{errors.subtitle}</p>
                )} */}
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="type"
                      >
                        Type
                      </label>
                      <div className="relative">
                        <DropDownCommon
                          lists={type}
                          labelKey="name"
                          valueKey="value"
                          defaultOption="Select Type"
                          onOptionChange={handleTypeChange}
                          selectedOption={selectedType}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="parent"
                      >
                        Parent
                      </label>
                      <div className="relative">
                        <DropDownCommon
                          lists={parents}
                          labelKey="name"
                          valueKey="value"
                          defaultOption="Select Parent"
                        />
                      </div>
                    </div>
                    <div className="full col-start-1 col-end-3">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Deals Details
                      </label>
                      <textarea
                        rows={6}
                        value={basicDetails.deal || ''}
                        onChange={(e) =>
                          handleInputChange('deal', e.target.value)
                        }
                        placeholder="Default textarea"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      ></textarea>
                      {/* {errors.productDescription && (
                <p className="text-red-500">{errors.productDescription}</p>
              )} */}
                    </div>
                  </div>
                </div>
                <div className="p-8 shadow border rounded">
                  <h2 className="text-lg text-primary font-medium">
                    Banner Criteria
                  </h2>
                  <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="category"
                      >
                        Category
                      </label>
                      <div className="relative">
                        <DropDownCommon
                          lists={categories}
                          labelKey="name"
                          valueKey="value"
                          defaultOption="Select Category"
                          onOptionChange={handleCategoryChange}
                          selectedOption={selectedCategory}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="brand"
                      >
                        Brand
                      </label>
                      <div className="relative">
                        <DropDownCommon
                          lists={productBrands}
                          labelKey="brand_name"
                          valueKey="id"
                          selectedOption={selectedBrand}
                          onOptionChange={(value: string) => handleBrand(value)}
                          defaultOption="Select Brand"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="p-8 shadow border rounded">
                  <h2 className="text-lg text-primary font-medium">
                    Upload Image
                  </h2>
                  <div className="mt-3">
                    {/* Image Upload */}
                    <label
                      className={`w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 ${
                        selectedImages.length >= maxImages &&
                        'cursor-not-allowed'
                      }`}
                    >
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={selectedImages.length >= maxImages}
                      />
                      <span className="text-gray-500">
                        {selectedImages.length >= maxImages
                          ? `Maximum ${maxImages} images reached`
                          : 'Add images'}
                      </span>
                    </label>

                    {/* Image Preview */}
                    <div className="mt-4 grid grid-cols-2 gap-4 justify-items-center">
                      {selectedImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative border w-32 h-auto"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover rounded"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-1.5 -right-2.5 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <svg
                              className="h-4 w-4 stroke-current"
                              fill="none"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-8 shadow border rounded">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg text-primary font-medium">
                      Price Range
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="minprice"
                      >
                        Minimum Price
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="text"
                          name="minprice"
                          id="minprice"
                          value={''}
                          placeholder="Banner Title"
                          onChange={() => {}}
                        />
                        {/* {errors.minprice && (
                  <p className="text-red-500">{errors.minprice}</p>
                )} */}
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="maxprice"
                      >
                        Maximum Price
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          type="text"
                          name="maxprice"
                          id="maxprice"
                          value={''}
                          placeholder="Banner Title"
                          onChange={() => {}}
                        />
                        {/* {errors.maxprice && (
                  <p className="text-red-500">{errors.maxprice}</p>
                )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-5">
              <div className="p-8 shadow border rounded">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg text-primary font-medium">
                    Map Products
                  </h2>
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                    type="button"
                    onClick={() => setModalOpen(true)}
                    disabled={isSavingBanner}
                  >
                    Add Product
                  </button>
                </div>
                <div className="w-full py-2 mt-3">
                  <ul className="flex flex-col gap-2">
                    {selectedProducts?.map((product: any) => (
                      <li
                        className="flex items-center justify-between bg-gray p-2 rounded"
                        key={product.id}
                      >
                        <span>{product.name}</span>
                        <button
                          onClick={() => handleRemoveProduct(product.id)}
                          className="fill-gray"
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <AddProductBannerModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default AddBanner;
