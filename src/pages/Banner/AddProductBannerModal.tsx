import Modal from '../../common/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '../../redux/store';
import search from '../../images/common/search.svg';

import DropDownCommon from '../../components/DropDownCommon';

import {
  fetchProductBrands,
  productSearchList,
  vendorFetchAllCategories,
} from '../../redux/slices/ProductSlice';
import { addToSelectedProducts } from '../../redux/slices/selectedProductSlice';
import ButtonLoader from '../../common/ButtonLoader';
import SubCategoryDropdown from '../../components/ProductCategoryDropdown/SubCategoryDropdown';
import CategoryDropdown from '../../components/ProductCategoryDropdown/CategoryDropdown';

interface props {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductBannerModal: React.FC<props> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setselectedBrand] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const vendor_id = localStorage.getItem('vendor_id');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [isMinPrice, setIsMinPrice] = useState('');
  const [isMaxPrice, setIsMaxPrice] = useState('');

  const categories = useSelector(
    (state: RootState) => state.product.categories?.categories,
  );
  const productBrands = useSelector(
    (state: RootState) => state.product.productBrands?.brands,
  );

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
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
    setSelectedSubCategory('');
  };

  const handleSubCategoryChange = (newSubCategory: string) => {
    setSelectedSubCategory(newSubCategory);
  };

  const handleBrand = (brand: string) => {
    setselectedBrand(brand);
  };

  const singleProductList = useSelector(
    (state: RootState) => state.product.productList,
  );

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMinPrice(e.target.value);
  };
  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsMaxPrice(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const data = {
          id: selectedSubCategory ? selectedSubCategory : selectedCategory,
          page_number: '',
          customer_id: '',
          min_price: isMinPrice,
          max_price: isMaxPrice,
          search: query,
          order: '',
          brand: '',
          attribute: '',
          status: '',
          vendor_id: vendor_id,
        };

        await dispatch(
          productSearchList({
            id: selectedSubCategory ? selectedSubCategory : selectedCategory,
            page_number: '',
            customer_id: '',
            min_price: isMinPrice,
            max_price: isMaxPrice,
            search: query,
            order: '',
            brand: '',
            attribute: '',
            status: '',
            vendor_id: vendor_id,
          }),
        );
      } catch (error) {
        toast.error(`Error fetching product data: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, selectedSubCategory, selectedCategory, isMinPrice, isMaxPrice]);

  const handleAddProduct = async (item: any) => {
    try {
      await dispatch(addToSelectedProducts(item));
      toast.success(`Add Product successfully! ${item.id}`);
    } catch (error) {
      toast.error('Failed to add product. Please try again.');
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        productSearchList({
          id: selectedSubCategory ? selectedSubCategory : selectedCategory,
          page_number: '',
          customer_id: '',
          min_price: isMinPrice,
          max_price: isMaxPrice,
          search: query, // Use the current value of query
          order: '',
          brand: '',
          attribute: '',
          status: '',
          vendor_id: vendor_id,
        }),
      );
      toast.success('Search completed!');
    } catch (error) {
      toast.error(`Error during search: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" bg-white ">
        <div className="flex items-center justify-between py-4 px-7 gap-2.5">
          <h3 className="font-medium text-black dark:text-white">
            ADD PRODUCTS IN YOUR BANNERS
          </h3>
          <svg
            onClick={onClose}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="grid grid-cols-4 gap-2.5 p-7">
          <CategoryDropdown
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <SubCategoryDropdown
            selectedSubCategory={selectedSubCategory}
            onSubCategoryChange={handleSubCategoryChange}
            category={selectedCategory}
          />
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
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="price"
            >
              Price
            </label>
            <div className="relative flex items-center gap-2.5">
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="number"
                name="minimum"
                id="minimum"
                value={isMinPrice}
                placeholder="Minimum"
                onChange={handleMinPrice}
              />
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="price"
              >
                To
              </label>
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="number"
                name="maximum"
                id="maximum"
                value={isMaxPrice}
                placeholder="Maximum"
                onChange={handleMaxPrice}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center bg-white justify-between p-4 rounded-t-xl mt-1 pt-0 gap-2.5">
          <div className="relative w-72 ml-auto">
            {/* Search Icon */}
            <div
              className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                isFocused || query
                  ? '-translate-x-6 opacity-0'
                  : 'translate-x-0 opacity-100'
              }`}
            >
              <img src={search} alt={`image`} />
            </div>

            {/* Search Input */}
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search..."
              className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
          >
            Search
          </button>
        </div>
        <div className="bg-white">
          <div className="max-w-full overflow-x-auto max-h-[calc(100vh-440px)]">
            {isLoading ? (
              <ButtonLoader bgColor="bg-white" borderColor="border-primary" />
            ) : (
              <table className="w-full table-auto">
                <thead className="sticky top-0">
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                      Product ID
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Product Name
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Brand
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Category
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Price
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {singleProductList?.products?.map(
                    (item: any, key: number) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {item.id ? item.id : '-'}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {item.name ? item.name : '-'}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {item.brand ? item.brand : '-'}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {item.category_name ? item.category_name : '-'}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            Regular Price : {item.regular_price}
                            <br />
                            Sale Price : {item.sale_price}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          {item.status ? item.status : '-'}
                        </td>

                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <div
                            className="flex items-center space-x-3.5"
                            onClick={() => handleAddProduct(item)}
                          >
                            <button
                              type="button"
                              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                            >
                              Add
                            </button>
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default AddProductBannerModal;
