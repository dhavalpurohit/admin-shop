// import { useState } from 'react';
import CategoryDropdown from '../../../components/ProductCategoryDropdown/CategoryDropdown';
import SubCategoryDropdown from '../../../components/ProductCategoryDropdown/SubCategoryDropdown';
import DropDownCommon from '../../../components/DropDownCommon';
import { BasicDetails, UpdateBasicDetails } from '../SingleProduct';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
// import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { productFilterData } from '../../../redux/slices/ProductSlice';

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

// interface BasicDetailsProps {
//   basicDetails: BasicDetails;
//   updateBasicDetails: UpdateBasicDetails;
//   errors: Record<string, string>; // Add errors prop to BasicDetails
// }
interface BasicDetailsProps {
  basicDetails: BasicDetails;
  updateBasicDetails: UpdateBasicDetails;
  errors: Record<string, string>;

  // Props for managing option table
  optTable: {
    parentId: number;
    parentName: string;
    subId: number;
    subName: string;
  }[];
  addOptionRow: (
    parentId: number,
    parentName: string,
    subId: number,
    subName: string,
  ) => void;
  removeOptionRow: (index: number) => void;
  updateOptionRow: (
    index: number,
    updatedRow: {
      parentId: number;
      parentName: string;
      subId: number;
      subName: string;
    },
  ) => void;
}

interface OptionGroup {
  optgrpname: string; // Parent option name
  optgrpid: string; // Parent option ID
}

// interface SubOption {
//   optvalname: string; // Sub-option name
//   optvalid: string; // Sub-option ID
// }

const BasicDetailsComponent: React.FC<BasicDetailsProps> = ({
  basicDetails,
  updateBasicDetails,
  // errors,
  optTable,
  addOptionRow,
  removeOptionRow,
  // updateOptionRow,
}) => {
  const maxImages = 6;
  const categories = useSelector(
    (state: RootState) => state.product.categories,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [selectOpt, setSelectOpt] = useState(null);
  const [selectSubOpt, setSelectSubOpt] = useState(null);
  const [filteredSubOptions, setFilteredSubOptions] = useState<any[]>([]);
  // const [optTable, setOptTable] = useState<
  //   { parentId: number; parentName: string; subId: number; subName: string }[]
  // >([]);

  const [apiPayload, setApiPayload] = useState({
    option_group_id: '',
    option_group_value: '',
  });

  // const productBrands = useSelector(
  //   (state: RootState) => state.product.productBrands?.brands,
  // );

  const productFilteredData = useSelector(
    (state: RootState) => state.product.productFilteredData,
  );

  const productBrands = productFilteredData?.brand?.map?.(
    (brand: { name: string; id: number }) => ({
      brand_name: brand.name, // Map `name` to `brand_name`
      id: brand.id, // Keep `id` as is
    }),
  );

  const optionData = productFilteredData?.option?.map?.(
    (opt: { optgrpname: string; optgrpid: number }) => ({
      optgrpname: opt.optgrpname,
      optgrpid: opt.optgrpid,
    }),
  );

  const updateApiPayload = (newTable: typeof optTable) => {
    const optionGroupIds = newTable.map((option) => option.parentId).join(',');
    const optionGroupValues = newTable.map((option) => option.subId).join(',');
    setApiPayload((prev) => ({
      ...prev,
      option_group_id: optionGroupIds,
      option_group_value: optionGroupValues,
    }));
  };

  const handleGroupOptChange = (grpopt: any) => {
    setSelectOpt(grpopt); // Update selected parent option
    // Find and update sub-options based on the selected parent option
    const selectedGroup = productFilteredData?.option?.find?.(
      (item: any) => item.optgrpid === grpopt,
    );

    setFilteredSubOptions(selectedGroup?.optionval || []);
  };

  const handleSubValOptChange = (subOpt: any) => {
    setSelectSubOpt(subOpt);
  };

  const handleCategoryChange = (category: string) => {
    updateBasicDetails('category', category);
  };

  // Handler for sub-category change
  const handleSubCategoryChange = (subCategory: string) => {
    updateBasicDetails('subCategory', subCategory);
  };

  // const handleRemoveOption = (id: number) => {
  //   const newTable = optTable.filter((_, i) => i !== id);
  //   setOptTable(newTable);
  //   updateApiPayload(newTable);
  //   updateBasicDetails('options', apiPayload);
  // };

  // const addOption = () => {
  //   if (!selectOpt || !selectSubOpt) {
  //     alert('Please select both options.');
  //     return;
  //   }
  //   const parentOption = optionData.find(
  //     (item: any) => item.optgrpid === selectOpt,
  //   );
  //   const subOption = filteredSubOptions.find(
  //     (item) => item.optvalid === selectSubOpt,
  //   );

  //   if (parentOption && subOption) {
  //     const newTable: any = [
  //       ...optTable,
  //       {
  //         parentId: parentOption.optgrpid,
  //         parentName: parentOption.optgrpname,
  //         subId: subOption.optvalid,
  //         subName: subOption.optvalname,
  //       },
  //     ];
  //     setOptTable(newTable);
  //     updateApiPayload(newTable);
  //     updateBasicDetails('options', apiPayload);
  //   }
  // };

  // const addOption = () => {
  //   if (!selectOpt || !selectSubOpt) {
  //     alert('Please select both options.');
  //     return;
  //   }

  //   // Find the selected parent and sub options
  //   const parentOption = optionData.find(
  //     (item: any) => item.optgrpid === selectOpt,
  //   );
  //   const subOption = filteredSubOptions.find(
  //     (item) => item.optvalid === selectSubOpt,
  //   );

  //   // If both options are found, add the row to the table
  //   if (parentOption && subOption) {
  //     const newOptionRow = {
  //       parentId: parentOption.optgrpid,
  //       parentName: parentOption.optgrpname,
  //       subId: subOption.optvalid,
  //       subName: subOption.optvalname,
  //     };

  //     // Call addOptionRow to update the optTable in the parent component
  //     addOptionRow(
  //       newOptionRow.parentId,
  //       newOptionRow.parentName,
  //       newOptionRow.subId,
  //       newOptionRow.subName,
  //     );

  //     // Optionally, update the API payload if necessary
  //     updateApiPayload([...optTable, newOptionRow]);
  //     updateBasicDetails('options', apiPayload);
  //   }
  // };

  const addOption = () => {
    if (!selectOpt || !selectSubOpt) {
      alert('Please select both options.');
      return;
    }

    // Find the selected parent and sub options
    const parentOption = optionData.find(
      (item: any) => item.optgrpid === selectOpt,
    );
    const subOption = filteredSubOptions.find(
      (item) => item.optvalid === selectSubOpt,
    );

    // If both options are found, proceed with validation and adding the row
    if (parentOption && subOption) {
      // Check if the selected option already exists in the optTable
      const isDuplicate = optTable.some(
        (row) =>
          row.parentId === parentOption.optgrpid &&
          row.subId === subOption.optvalid,
      );

      if (isDuplicate) {
        // Show an error if the combination already exists
        alert('This option already exists.');
        return;
      }

      // If no duplicates, add the new row to the table
      const newOptionRow = {
        parentId: parentOption.optgrpid,
        parentName: parentOption.optgrpname,
        subId: subOption.optvalid,
        subName: subOption.optvalname,
      };

      // Call addOptionRow to update the optTable in the parent component
      addOptionRow(
        newOptionRow.parentId,
        newOptionRow.parentName,
        newOptionRow.subId,
        newOptionRow.subName,
      );

      // Optionally, update the API payload if necessary
      updateApiPayload([...optTable, newOptionRow]);
      updateBasicDetails('options', apiPayload);

      // Clear the selected option and sub-option values after successful addition
      setSelectOpt(null); // Reset selectOpt
      setSelectSubOpt(null); // Reset selectSubOpt
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    const maxImages = 6;

    if (basicDetails.selectedImages.length + files.length > maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    const base64Promises = files.map((file) => {
      return new Promise<{ base64: string; name: string; size: string }>(
        (resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onloadend = () => {
            const base64 = reader.result as string;

            // To get the image size (dimensions)
            const img = new Image();
            img.src = base64;

            img.onload = () => {
              const dimensions = `${img.width}x${img.height}`; // e.g., "1024x1080"
              resolve({
                base64,
                name: file.name, // file name as caption
                size: dimensions, // image dimensions
              });
            };

            img.onerror = (error) => {
              reject('Error getting image dimensions');
            };
          };

          reader.onerror = (error) => {
            reject(error);
          };
        },
      );
    });

    Promise.all(base64Promises)
      .then((images) => {
        // Combine existing images with the new images
        const newImageDetails = images.map((img) => ({
          base64: img.base64,
          caption: img.name,
          size: img.size,
        }));

        updateBasicDetails('selectedImages', [
          ...basicDetails.selectedImages,
          ...newImageDetails,
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

  useEffect(() => {
    if (categories) {
      dispatch(
        productFilterData({
          category_id: basicDetails.subCategory
            ? basicDetails.subCategory
            : basicDetails.category,
        }),
      );
    }
  }, [basicDetails.subCategory, basicDetails.category]);

  useEffect(() => {
    if (apiPayload.option_group_id && apiPayload.option_group_value) {
      updateBasicDetails('options', apiPayload);
    }
  }, [apiPayload]);

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
            {/* {errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )} */}

            <SubCategoryDropdown
              selectedSubCategory={basicDetails.subCategory}
              onSubCategoryChange={handleSubCategoryChange}
              category={basicDetails.category}
            />
            {/* {errors.subCategory && (
              <p className="text-red-500">{errors.subCategory}</p>
            )} */}
          </div>
        </div>
        <div className="p-8 shadow border rounded">
          <h2 className="text-lg text-primary font-medium">
            General Information
          </h2>
          <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
            <div className="w-full ">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="vendorProductId"
              >
                Vendor Product ID
              </label>
              <div className="relative">
                <input
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  name="vendorProductId"
                  id="vendorProductId"
                  placeholder="vendorProductId"
                  value={basicDetails.vendorProductId}
                  onChange={(e) =>
                    updateBasicDetails('vendorProductId', e.target.value)
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
                {/* {errors.productName && (
                  <p className="text-red-500">{errors.productName}</p>
                )} */}
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
                  lists={productBrands} // Pass the mapped brands
                  labelKey="brand_name" // The key for the label in the dropdown
                  valueKey="id" // The key for the value in the dropdown
                  selectedOption={basicDetails.brand} // Bind the selected value from `basicDetails`
                  onOptionChange={(value) => updateBasicDetails('brand', value)} // Update the state when an option is selected
                  defaultOption="brands" // Default label when no option is selected
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
              {/* {errors.productDescription && (
                <p className="text-red-500">{errors.productDescription}</p>
              )} */}
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
                {/* {errors.regularPrice && (
                  <p className="text-red-500">{errors.regularPrice}</p>
                )} */}
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
            <div className="w-full">
              <label
                htmlFor="stock"
                className="flex cursor-pointer select-none items-center pt-2.5"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="stock"
                    className="sr-only"
                    checked={basicDetails.stockChecked}
                    onChange={() => {
                      updateBasicDetails(
                        'stockChecked',
                        !basicDetails.stockChecked,
                      );
                    }}
                  />
                  <div
                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                      basicDetails.stockChecked &&
                      'border-primary bg-gray dark:bg-transparent'
                    }`}
                  >
                    <span
                      className={`opacity-0 ${
                        basicDetails.stockChecked && '!opacity-100'
                      }`}
                    >
                      <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                          fill="#3056D3"
                          stroke="#3056D3"
                          strokeWidth="0.4"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                In stock
              </label>
            </div>
            <div className="w-full">
              <label
                htmlFor="status"
                className="flex cursor-pointer select-none items-center pt-2.5"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="status"
                    className="sr-only"
                    checked={basicDetails.statusChecked}
                    onChange={() => {
                      updateBasicDetails(
                        'statusChecked',
                        !basicDetails.statusChecked,
                      );
                    }}
                  />
                  <div
                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                      basicDetails.statusChecked &&
                      'border-primary bg-gray dark:bg-transparent'
                    }`}
                  >
                    <span
                      className={`opacity-0 ${
                        basicDetails.statusChecked && '!opacity-100'
                      }`}
                    >
                      <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                          fill="#3056D3"
                          stroke="#3056D3"
                          strokeWidth="0.4"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                Status
              </label>
            </div>
            <div className="w-full">
              <label
                htmlFor="donotdisplay"
                className="flex cursor-pointer select-none items-center pt-2.5"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="donotdisplay"
                    className="sr-only"
                    checked={basicDetails.doNotDisplay}
                    onChange={() => {
                      updateBasicDetails(
                        'doNotDisplay',
                        !basicDetails.doNotDisplay,
                      );
                    }}
                  />
                  <div
                    className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                      basicDetails.doNotDisplay &&
                      'border-primary bg-gray dark:bg-transparent'
                    }`}
                  >
                    <span
                      className={`opacity-0 ${
                        basicDetails.doNotDisplay && '!opacity-100'
                      }`}
                    >
                      <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                          fill="#3056D3"
                          stroke="#3056D3"
                          strokeWidth="0.4"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
                Do Not Display
              </label>
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
                    src={image.base64} // Use base64 string as the image source
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
              <DropDownCommon
                lists={optionData}
                labelKey="optgrpname"
                valueKey="optgrpid"
                selectedOption={selectOpt}
                onOptionChange={handleGroupOptChange}
                defaultOption="Select Name"
              />
              <DropDownCommon
                lists={filteredSubOptions}
                labelKey="optvalname"
                valueKey="optvalid"
                selectedOption={selectSubOpt}
                onOptionChange={handleSubValOptChange}
                defaultOption="Select Value"
              />
            </div>
            <div className="w-full py-2 mt-3">
              <table className="w-full table-auto text-left text-xs p-2">
                <thead>
                  <tr className="bg-gray-2 p-2">
                    <th className=" p-2">Option Name</th>
                    <th className=" p-2">Option Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {optTable.map((option, index) => (
                    <tr key={index}>
                      <td className="border-b border-[#eee] p-2">
                        {option.parentName}
                      </td>
                      <td className="border-b border-[#eee] p-2">
                        {option.subName}
                      </td>
                      <td className="border-b border-[#eee] p-2">
                        <button
                          onClick={() => removeOptionRow(index)}
                          className="fill-gray"
                          type="button"
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BasicDetailsComponent;
