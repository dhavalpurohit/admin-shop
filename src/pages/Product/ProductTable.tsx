import { useEffect, useState } from 'react';
import { Package } from '../../types/package';
import CategoryDropdown from '../../components/ProductCategoryDropdown/CategoryDropdown';
import SubCategoryDropdown from '../../components/ProductCategoryDropdown/SubCategoryDropdown';
import { Link, NavLink } from 'react-router-dom';
import {
  productSearchList,
  vendorFetchAllCategories,
  bulkProductXlsList,
} from '../../redux/slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { SingleProduct } from '../../types/product';
import ButtonLoader from '../../common/ButtonLoader';
import Pagination from '../../common/Pagination';
import DropDownCommon from '../../components/DropDownCommon';
import search from '../../../src/images/common/search.svg';
import toast from 'react-hot-toast';
import ViewSingleProduct from './ViewSingleProduct';
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsFillEyeFill,
} from 'react-icons/bs';

// import IconViewEye from '../../images/icon/icon-view-eye.svg';

const status = [
  { name: 'Active', value: '1' },
  { name: 'Inactive', value: '0' },
];

const ProductTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<'bulk' | 'single'>('single');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [totalProductList, setTotalProductList] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // const totalItems = 100;

  const categories = useSelector(
    (state: RootState) => state.product.categories?.categories,
  );
  const singleProductList = useSelector(
    (state: RootState) => state.product.productList,
  );

  useEffect(() => {
    setTotalProductList(singleProductList?.total);
  }, [singleProductList]);

  const bulkProductXlsData = useSelector(
    (state: RootState) => state.product.bulkProductXlsList,
  );

  const vendor_id = localStorage.getItem('vendor_id');

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setSelectedSubCategory(''); // Reset subcategory when category changes
  };

  const handleSubCategoryChange = (newSubCategory: string) => {
    setSelectedSubCategory(newSubCategory);
  };

  const handleTabClick = (tab: 'bulk' | 'single') => {
    setActiveTab(tab);
  };

  const handleStatusChange = (status: number) => {
    setSelectedStatus(status);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
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

  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(
  //     productSearchList({
  //       id: '2',
  //       page_number: '1',
  //       customer_id: '4',
  //       min_price: '',
  //       max_price: '',
  //       search: '',
  //       order: '',
  //       brand: '',
  //       exclude_vendor: '',
  //       attribute: '',
  //       vendor_id: '1',
  //       // vendor_id,
  //       page_size: '',
  //       trending: '',
  //       vendor_product_id: '',
  //     }),
  //   );
  //   setIsLoading(false);
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // await dispatch(
        //   productSearchList({
        //     id: '2',
        //     page_number: page,
        //     customer_id: vendor_id,
        //     min_price: '',
        //     max_price: '',
        //     search: '',
        //     order: '',
        //     brand: '',
        //     exclude_vendor: '',
        //     attribute: '',
        //     vendor_id: vendor_id,
        //     // vendor_id,
        //     page_size: pageSize,
        //     trending: '',
        //     vendor_product_id: 'RTDG22BDHS00AZTS4',
        //   }),
        // );
        await dispatch(
          productSearchList({
            id: selectedSubCategory,
            page_number: page,
            page_size: pageSize,
            customer_id: '',
            min_price: '',
            max_price: '',
            search: query,
            order: '',
            brand: '',
            attribute: '',
            status: selectedStatus,
            vendor_id: vendor_id,
          }),
        );
      } catch (error) {
        toast.error(`Error fetching product data: ${error}`);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedSubCategory, selectedStatus, pageSize, page, query, dispatch]);

  useEffect(() => {
    if (activeTab === 'bulk') {
      const fetchData = async () => {
        try {
          setIsBulkLoading(true);
          await dispatch(bulkProductXlsList());
        } catch (error) {
          toast.error(`Error fetching product data: ${error}`);
          setIsBulkLoading(false);
        } finally {
          setIsBulkLoading(false);
        }
      };

      fetchData();
    }
  }, [activeTab]);

  useEffect(() => {
    if (bulkProductXlsData?.uploads?.length) {
      const total = bulkProductXlsData?.uploads?.reduce(
        (sum: number, item: { Products: number }) => sum + (item.Products || 0),
        0,
      );
      setTotalProducts(total);
    } else {
      setTotalProducts(0);
    }
  }, [bulkProductXlsData]);

  const viewProduct = (data: any) => {
    setModalOpen(true);
    setSelectedProduct(data);
  };

  return (
    <>
      <div>
        <div className="flex items-center bg-white justify-between p-4 rounded-xl border border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <h4 className="text-sm font-semibold text-black dark:text-white">
                Total Uploads
              </h4>
              <span>
                {totalProducts && singleProductList?.products
                  ? totalProducts + singleProductList?.products?.length
                  : '-'}
              </span>
            </div>
            <div className="rounded-xl border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <h4 className="text-sm font-semibold text-black dark:text-white">
                Bulk Uploads
              </h4>
              <span>{totalProducts ? totalProducts : '-'}</span>
            </div>
            <div className="rounded-xl border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <h4 className="text-sm font-semibold text-black dark:text-white">
                Single Uploads
              </h4>
              <span>
                {singleProductList?.products
                  ? singleProductList?.products?.length
                  : '-'}
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-4.5">
            <NavLink
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              to={'/bulk-products'}
            >
              Bulk products
            </NavLink>
            <NavLink
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              to={'/single-product'}
            >
              Single product
            </NavLink>
          </div>
        </div>

        <div className="flex items-center bg-white justify-between p-4 rounded-t-xl mt-2">
          <ul className="flex items-center border rounded-lg">
            <li
              className={`flex justify-center py-2 px-6 font-medium cursor-pointer rounded-l-lg ${
                activeTab === 'bulk'
                  ? 'bg-primary text-gray'
                  : 'bg-white text-black'
              } border-r`}
              onClick={() => handleTabClick('bulk')}
            >
              Bulk Upload
            </li>
            <li
              className={`flex justify-center py-2 px-6 font-medium cursor-pointer rounded-r-lg ${
                activeTab === 'single'
                  ? 'bg-primary text-gray'
                  : 'bg-white text-black'
              }`}
              onClick={() => handleTabClick('single')}
            >
              Single Upload
            </li>
          </ul>
          <div className="flex items-center gap-2.5">
            <CategoryDropdown
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <SubCategoryDropdown
              selectedSubCategory={selectedSubCategory}
              onSubCategoryChange={handleSubCategoryChange}
              category={selectedCategory}
            />
            <div className="flex items-center gap-2.5">
              <div className="w-full">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="category"
                >
                  Status
                </label>
                <div className="relative">
                  <DropDownCommon
                    lists={status}
                    labelKey="name"
                    valueKey={'value'}
                    defaultOption="All Status"
                    onOptionChange={(value: number) =>
                      handleStatusChange(value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center bg-white justify-between p-4 rounded-t-xl mt-2">
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
        </div>
        <div className="bg-white">
          <div className="max-w-full overflow-x-auto">
            {activeTab === 'bulk' ? (
              <>
                {isBulkLoading ? (
                  <ButtonLoader
                    bgColor="bg-white"
                    borderColor="border-primary"
                  />
                ) : (
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                          No
                        </th>
                        {/* <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Category
                    </th> */}
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                          File Name
                        </th>
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                          Status
                        </th>
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                          Uploaded Date
                        </th>
                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                          Products
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bulkProductXlsData?.uploads?.map(
                        (packageItem: Package, key: number) => (
                          <tr key={key}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                              <p className="text-sm">{key + 1}</p>
                            </td>
                            {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                  <p className="text-black dark:text-white">
                                    {packageItem.category}
                                  </p>
                                </td> */}
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {packageItem.Filename}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p
                                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                                  packageItem.Status === 'Paid'
                                    ? 'bg-success text-success'
                                    : packageItem.Status === 'Unpaid'
                                    ? 'bg-danger text-danger'
                                    : 'bg-warning text-warning'
                                }`}
                              >
                                {packageItem.Status}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {packageItem.Uploaded_Date}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <p className="text-black dark:text-white">
                                {packageItem.Products}
                              </p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                              <div className="flex items-center space-x-3.5">
                                <button className="hover:text-primary">
                                  <svg
                                    className="fill-current"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                      fill=""
                                    />
                                    <path
                                      d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                      fill=""
                                    />
                                  </svg>
                                </button>
                                {/* <button className="hover:text-primary">
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
                            <button className="hover:text-primary">
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.8754 11.6719C16.5379 11.6719 16.2285 11.9531 16.2285 12.3187V14.8219C16.2285 15.075 16.0316 15.2719 15.7785 15.2719H2.22227C1.96914 15.2719 1.77227 15.075 1.77227 14.8219V12.3187C1.77227 11.9812 1.49102 11.6719 1.12539 11.6719C0.759766 11.6719 0.478516 11.9531 0.478516 12.3187V14.8219C0.478516 15.7781 1.23789 16.5375 2.19414 16.5375H15.7785C16.7348 16.5375 17.4941 15.7781 17.4941 14.8219V12.3187C17.5223 11.9531 17.2129 11.6719 16.8754 11.6719Z"
                                  fill=""
                                />
                                <path
                                  d="M8.55074 12.3469C8.66324 12.4594 8.83199 12.5156 9.00074 12.5156C9.16949 12.5156 9.31012 12.4594 9.45074 12.3469L13.4726 8.43752C13.7257 8.1844 13.7257 7.79065 13.5007 7.53752C13.2476 7.2844 12.8539 7.2844 12.6007 7.5094L9.64762 10.4063V2.1094C9.64762 1.7719 9.36637 1.46252 9.00074 1.46252C8.66324 1.46252 8.35387 1.74377 8.35387 2.1094V10.4063L5.40074 7.53752C5.14762 7.2844 4.75387 7.31252 4.50074 7.53752C4.24762 7.79065 4.27574 8.1844 4.50074 8.43752L8.55074 12.3469Z"
                                  fill=""
                                />
                              </svg>
                            </button> */}
                              </div>
                            </td>
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                )}
              </>
            ) : (
              <>
                {isLoading ? (
                  <ButtonLoader
                    bgColor="bg-white"
                    borderColor="border-primary"
                  />
                ) : (
                  <>
                    <table className="w-full table-auto">
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                            Product Name
                          </th>
                          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                            Product Id
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Brand
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Price
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Stock
                          </th>
                          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                            Uploaded Date
                          </th>
                          <th className="py-4 px-4 font-medium text-black dark:text-white">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleProductList?.products?.map(
                          (product: SingleProduct, key: number) => (
                            <tr key={key}>
                              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <p className="text-sm">{product?.name}</p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {product?.id}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {/* {product.} */}-
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {product.regular_price}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {product.stock}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">
                                  {product.created_date}
                                </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                  <button
                                    className="hover:text-primary"
                                    onClick={() => viewProduct(product)}
                                  >
                                    <BsFillEyeFill className="eye-btn cursor-pointer" />
                                  </button>
                                  <Link
                                    to="/product/updateProduct"
                                    state={{ product }}
                                    className="hover:text-primary"
                                  >
                                    <BsFillPencilFill className="edit-btn cursor-pointer" />
                                  </Link>
                                  <button className="hover:text-primary hidden">
                                    <BsFillTrashFill className="delete-btn cursor-pointer" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                    <div className="flex items-center justify-between p-6">
                      <div className="flex items-center w-full gap-2.5">
                        <span className="flex items-center">
                          Current Page: {page}
                        </span>
                        <span className="flex items-center">
                          Page Size: {pageSize}
                        </span>
                      </div>
                      <Pagination
                        totalItems={totalProductList}
                        initialPageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 50]}
                        onPageChange={(newPage) => setPage(newPage)}
                        onPageSizeChange={(newSize) => setPageSize(newSize)}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <ViewSingleProduct
        productData={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ProductTable;
