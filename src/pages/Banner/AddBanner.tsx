import { useState } from 'react';
import DropDownCommon from '../../components/DropDownCommon';

const type = [
  {
    name: 'type 1',
    value: 'type 1',
  },
  {
    name: 'type 2',
    value: 'type 2',
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

const category = [
  {
    name: 'category 1',
    value: 'category 1',
  },
  {
    name: 'category 2',
    value: 'category 2',
  },
];

const brand = [
  {
    name: 'brand 1',
    value: 'brand 1',
  },
  {
    name: 'brand 2',
    value: 'brand 2',
  },
];

const AddBanner = () => {
  const [isSavingBanner, setIsSavingBanner] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const maxImages = 2;

  const handleSave = async () => {
    setIsSavingBanner(true);
  };
  const handleReset = async () => {};

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
                        value={''}
                        placeholder="Banner Title"
                        onChange={() => {}}
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
                        value={''}
                        placeholder="Banner Sub Title"
                        onChange={() => {}}
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
                      value={''}
                      onChange={() => {}}
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
                        lists={category}
                        labelKey="name"
                        valueKey="value"
                        defaultOption="Select Category"
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
                        lists={brand}
                        labelKey="name"
                        valueKey="value"
                        defaultOption="Select Category"
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
