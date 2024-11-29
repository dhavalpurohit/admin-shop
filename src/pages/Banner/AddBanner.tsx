import { useEffect, useState } from 'react';
import DropDownCommon from '../../components/DropDownCommon';
import { useDispatch, useSelector } from 'react-redux';
import { vendorFetchAllCategories } from '../../redux/slices/ProductSlice';
import { createBanner } from '../../redux/slices/bannerSlice';
import { AppDispatch, RootState } from '../../redux/store';

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
  const [isSavingBanner, setIsSavingBanner] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedBrand, setselectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const maxImages = 2;

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
    // user_id: localStorage.getItem('user_id'),
    sorting: '',
  };
  const [basicDetails, setBasicDetails] =
    useState<bannerDetails>(initialBasicDetails);

  const handleSave = async () => {
    setIsSavingBanner(true);
    dispatch(createBanner(basicDetails));
  };

  const handleInputChange = (key: keyof bannerDetails, value: string) => {
    setBasicDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleReset = async () => {};

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
      alert(`You can only upload a maximum of ${maxImages} images.`);
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

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
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
                      selectedImages.length >= maxImages && 'cursor-not-allowed'
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
                      <div key={index} className="relative border w-32 h-auto">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index}`}
                          className="w-full h-full object-cover rounded"
                        />
                        <button
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
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
