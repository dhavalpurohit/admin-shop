// import { useState } from 'react';
import CategoryDropdown from '../../../components/ProductCategoryDropdown/CategoryDropdown';
import SubCategoryDropdown from '../../../components/ProductCategoryDropdown/SubCategoryDropdown';
import DropDownCommon from '../../../components/DropDownCommon';
import { BasicDetails, UpdateBasicDetails } from '../SingleProduct';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const codeType = [
  {
    name: 'type 1',
    value: 1,
  },
  {
    name: 'type 2',
    value: 2,
  },
];

interface BasicDetailsProps {
  basicDetails: BasicDetails;
  updateBasicDetails: UpdateBasicDetails;
}

const BasicDetailsComponent: React.FC<BasicDetailsProps> = ({
  basicDetails,
  updateBasicDetails,
}) => {
  const maxImages = 6;
  const categories = useSelector(
    (state: RootState) => state.product.categories,
  );

  const productBrands = useSelector(
    (state: RootState) => state.product.productBrands?.brands,
  );

  const handleCategoryChange = (category: string) => {
    updateBasicDetails('category', category);
  };

  // Handler for sub-category change
  const handleSubCategoryChange = (subCategory: string) => {
    updateBasicDetails('subCategory', subCategory);
  };

  const handleInputChange = (id: number, newValue: string) => {
    const updatedOptions = basicDetails.options.map((option) =>
      option.id === id ? { ...option, value: newValue } : option,
    );
    updateBasicDetails('options', updatedOptions);
  };

  const removeOption = (id: number) => {
    const updatedOptions = basicDetails.options.filter(
      (option) => option.id !== id,
    );
    updateBasicDetails('options', updatedOptions);
  };

  const addOption = () => {
    // Generate a unique ID
    const generateUniqueId = () => {
      return Date.now() + Math.random();
    };

    const newOption = { id: generateUniqueId(), value: '' };
    updateBasicDetails('options', [...basicDetails.options, newOption]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxImages = 6;

    if (basicDetails.selectedImages.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    const base64Promises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    });

    Promise.all(base64Promises)
      .then((base64Images) => {
        updateBasicDetails('selectedImages', [
          ...basicDetails.selectedImages,
          ...base64Images,
        ]);
      })
      .catch((error) => {
        console.error('Error converting images to base64', error);
        alert('Error converting images. Please try again.');
      });
  };

  const removeImage = (index: number) => {
    const newImages = [...basicDetails.selectedImages];
    newImages.splice(index, 1);
    updateBasicDetails('selectedImages', newImages);
  };

  console.log('productBrands ::::::', productBrands);

  console.log('categories :::', categories);
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="flex flex-col gap-5">
        <div className="p-8 shadow border rounded">
          <h2 className="text-lg text-primary font-medium">Category</h2>
          <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
            <CategoryDropdown
              selectedCategory={basicDetails.category}
              onCategoryChange={handleCategoryChange}
            />
            <SubCategoryDropdown
              selectedSubCategory={basicDetails.subCategory}
              onSubCategoryChange={handleSubCategoryChange}
              category={basicDetails.category}
            />
          </div>
        </div>
        <div className="p-8 shadow border rounded">
          <h2 className="text-lg text-primary font-medium">
            General Information
          </h2>
          <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="productId"
              >
                External Product ID
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="productId"
                  id="productId"
                  placeholder="productId"
                  value={basicDetails.productId}
                  onChange={(e) =>
                    updateBasicDetails('productId', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="productName"
              >
                Product Name
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="productName"
                  id="productName"
                  value={basicDetails.productName}
                  placeholder="Product Name"
                  onChange={(e) =>
                    updateBasicDetails('productName', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="brand"
              >
                Brands
              </label>
              <div className="relative">
                <DropDownCommon
                  lists={productBrands}
                  labelKey="brand_name"
                  valueKey="id"
                  selectedOption={basicDetails.brand}
                  onOptionChange={(value) => updateBasicDetails('brand', value)}
                  defaultOption='brands'
                />
              </div>
            </div>
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="keywords"
              >
                Keywords
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="keywords"
                  id="keywords"
                  placeholder="keywords"
                  value={basicDetails.keywords}
                  onChange={(e) =>
                    updateBasicDetails('keywords', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="full col-start-1 col-end-3">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Product Description
              </label>
              <textarea
                rows={6}
                value={basicDetails.productDescription}
                onChange={(e) =>
                  updateBasicDetails('productDescription', e.target.value)
                }
                placeholder="Default textarea"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="rp"
              >
                Regular Price
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="rp"
                  id="rp"
                  placeholder="Regular Price"
                  value={basicDetails.regularPrice}
                  onChange={(e) =>
                    updateBasicDetails('regularPrice', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="sp"
              >
                Sale Price
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="sp"
                  id="sp"
                  placeholder="Sale Price"
                  value={basicDetails.salePrice}
                  onChange={(e) =>
                    updateBasicDetails('salePrice', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 shadow border rounded">
          <h2 className="text-lg text-primary font-medium">Inventory</h2>
          <div className="grid grid-cols-3 py-2 gap-2.5 mt-3">
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="Qty"
              >
                Qty
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="quantity"
                  id="quantity"
                  placeholder="quantity"
                  value={basicDetails.quantity}
                  onChange={(e) =>
                    updateBasicDetails('quantity', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="taxcode"
              >
                Tax Code Type
              </label>
              <div className="relative">
                <DropDownCommon
                  lists={codeType}
                  labelKey="name"
                  valueKey="value"
                  selectedOption={basicDetails.taxCodeType} // Pass the selected value
                  onOptionChange={(value) =>
                    updateBasicDetails('taxCodeType', value)
                  } // Pass the handler
                />
              </div>
            </div>
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="taxValue"
              >
                Tax Code Value
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="taxValue"
                  id="taxValue"
                  placeholder="taxValue"
                  value={basicDetails.taxValue}
                  onChange={(e) =>
                    updateBasicDetails('taxValue', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-full col-start-1 col-end-4">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="Manufacture"
              >
                Manufacture Info
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="Manufacture"
                  id="Manufacture"
                  placeholder="Manufacture"
                  value={basicDetails.manufactureInfo}
                  onChange={(e) =>
                    updateBasicDetails('manufactureInfo', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-full col-start-1 col-end-4">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="Importer"
              >
                Importer Details
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="Importer"
                  id="Importer"
                  placeholder="Importer"
                  value={basicDetails.importerDetails}
                  onChange={(e) =>
                    updateBasicDetails('importerDetails', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="p-8 shadow border rounded">
          <h2 className="text-lg text-primary font-medium">Upload Image</h2>
          <div className="mt-3">
            {/* Image Upload */}
            <label
              className={`w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 ${
                basicDetails.selectedImages.length >= maxImages &&
                'cursor-not-allowed'
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={basicDetails.selectedImages.length >= maxImages}
              />
              <span className="text-gray-500">
                {basicDetails.selectedImages.length >= maxImages
                  ? 'Maximum 6 images reached'
                  : 'Add images'}
              </span>
            </label>

            {/* Image Preview */}
            <div className="mt-4 grid grid-cols-3 gap-4 justify-items-center">
              {basicDetails.selectedImages.map((image, index) => (
                <div key={index} className="relative border w-25 h-25">
                  <img
                    src={image} // Use base64 string as the image source
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
            <h2 className="text-lg text-primary font-medium">Options</h2>
            {/* Button to add a new option */}
            <button
              onClick={addOption}
              type="button"
              className="text-primary p-2 border border-primary rounded transition duration-200"
            >
              Add Option
            </button>
          </div>
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {basicDetails.options.map((option, index) => (
                <div key={option.id} className="flex flex-col relative">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {`Option ${index + 1}`}
                  </label>
                  <input
                    type="text"
                    value={option.value}
                    onChange={(e) =>
                      handleInputChange(option.id, e.target.value)
                    }
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder={`Enter option ${index + 1}`}
                  />
                  {/* Remove icon (button) */}
                  <button
                    onClick={() => removeOption(option.id)}
                    className="absolute top-8 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
                    title="Remove option"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BasicDetailsComponent;
