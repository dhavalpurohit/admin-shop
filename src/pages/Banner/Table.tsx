import { useEffect, useState } from 'react';
import { Banner } from '../../types/banner';
import DropDownCommon from '../../components/DropDownCommon';
import { Link, NavLink } from 'react-router-dom';
import search from '../../../src/images/common/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { allBannerList } from '../../redux/slices/bannerSlice';
import ButtonLoader from '../../common/ButtonLoader';
import { vendorFetchAllCategories } from '../../redux/slices/ProductSlice';
import Pagination from '../../common/Pagination';
import {
  BsFillEyeFill,
  BsFillPencilFill,
  BsFillTrashFill,
} from 'react-icons/bs';
import ViewBanner from './ViewBanner';

const status = [
  {
    name: 'Active',
    value: '1',
  },
  {
    name: 'Pending',
    value: '0',
  },
];
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

const BannerTable: React.FC = () => {
  const totalItems = 100;

  const dispatch = useDispatch<AppDispatch>();
  const bannerList = useSelector(
    (state: RootState) => state.banner.allBannerList,
  );
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  // const [totalProducts, setTotalProducts] = useState(0);
  const vendor_id = localStorage.getItem('vendor_id');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  // useEffect(() => {
  //   if (!bannerList) {
  //     dispatch(
  //       allBannerList({
  //         status: '1',
  //       }),
  //     );
  //   }
  // }, [allBannerList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await dispatch(
          allBannerList({
            status: selectedStatus || '', // Default to empty string if no status
            category: selectedCategory || '', // Default to empty string if no category
            page_number: page,
            page_size: pageSize,
            search: query,
            vendor_id: vendor_id,
          }),
        );
      } catch (error) {
        console.error('Error fetching order data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedStatus, selectedCategory, pageSize, page, query, dispatch]);

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const categories = useSelector(
    (state: RootState) => state.product.categories?.categories,
  );

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

  const viewBanner = (data: any) => {
    setModalOpen(true);
    setSelectedBanner(data);
  };

  return (
    <>
      <div className="">
        <div className="flex items-center bg-white justify-between p-4 rounded-xl border border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center gap-2.5">
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
                htmlFor="category"
              >
                Status
              </label>
              <div className="relative">
                <DropDownCommon
                  lists={status}
                  labelKey="name"
                  valueKey="value"
                  defaultOption="All Status"
                  onOptionChange={(value: string) => handleStatusChange(value)}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                className="mb-3 block text-sm font-medium text-black dark:text-white"
                htmlFor="category"
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
          </div>
          <div className="flex justify-end gap-4.5">
            <NavLink
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              to={'/add-banner'}
            >
              Add Banner
            </NavLink>
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
            {isLoading ? (
              <ButtonLoader bgColor="bg-white" borderColor="border-primary" />
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                      Title
                    </th>
                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                      Sub Title
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Brand
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Category
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      Type
                    </th>
                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                      maximum and Minimum price
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
                  {bannerList?.banner_list?.map((item: Banner, key: number) => (
                    <tr key={key}>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.name ? item.name : '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.sub_title ? item.sub_title : '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.brand ? item.brand : '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.category ? item.category : '-'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.type}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p className="text-black dark:text-white">
                          {item.max_min_price
                            ? `min: ${item.max_min_price[0]}, max: ${item.max_min_price[1]}`
                            : 'Price not available'}
                        </p>
                      </td>
                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <p
                          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                            item.status === 'Paid'
                              ? 'bg-success text-success'
                              : item.status === 'Unpaid'
                              ? 'bg-danger text-danger'
                              : 'bg-warning text-warning'
                          }`}
                        >
                          {item.status ? item.status : '-'}
                        </p>
                      </td>

                      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                          <button
                            className="hover:text-primary"
                            onClick={() => viewBanner(item)}
                          >
                            <BsFillEyeFill className="eye-btn cursor-pointer" />
                          </button>
                          <Link
                            to="/banner/updateBanner"
                            state={{ item }}
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
                  ))}
                </tbody>
              </table>
            )}
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center w-full gap-2.5">
                <span className="flex items-center">Current Page: {page}</span>
                <span className="flex items-center">Page Size: {pageSize}</span>
              </div>
              <Pagination
                totalItems={totalItems}
                initialPageSize={pageSize}
                pageSizeOptions={[5, 10, 20, 50]}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
              />
            </div>
          </div>
        </div>
      </div>
      <ViewBanner
        bannerData={selectedBanner}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default BannerTable;
