import { useEffect, useState } from 'react';
// import { Order } from '../../types/order';
import DropDownCommon from '../../components/DropDownCommon';

import search from '../../../src/images/common/search.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { orderList } from '../../redux/slices/orderSlice';

// const orderData: Order[] = [
//   {
//     order_date: '3/5/20204',
//     order_id: 'FCRN73FNH',
//     product_name: 'Dove shampoo',
//     address: 'samvaad flat navrangpura ahmeadbad',
//     status: 'Pending ',
//     schedule_pickup: 'Schedule',
//   },
// ];

const status = [
  {
    name: 'Pending',
    value: 'pending ',
  },
  {
    name: 'Unshipped ',
    value: 'unshipped ',
  },
  {
    name: 'Cancelled  ',
    value: 'cancelled  ',
  },
  {
    name: 'Sent',
    value: 'sent',
  },
];

const OrderTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orderData = useSelector((state: RootState) => {
    return state.order.orderList;
  });

  console.log('Full state:', orderData);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
    if (!orderData)
      dispatch(
        orderList({
          orderBy: '',
          page_number: '1',
          search: '',
          order_status: '',
          vendor_id: '4',
          order_to_date: '',
          order_from_date: '',
        }),
      );
  }, [orderData]);

  console.log('state.orderList', orderData);

  return (
    <div className="">
      <div className="flex items-center bg-white justify-between p-4 rounded-xl border border-stroke  shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center gap-2.5">
          <div className="rounded-xl border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-sm font-semibold text-black dark:text-white">
              PENDING
            </h4>
            <span>13</span>
          </div>
          <div className="rounded-xl border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-sm font-semibold text-black dark:text-white">
              ACCEPTED
            </h4>
            <span>13</span>
          </div>
          <div className="rounded-xl border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-sm font-semibold text-black dark:text-white">
              READY TO SHIP
            </h4>
            <span>13</span>
          </div>
          <div className="rounded-xl border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-sm font-semibold text-black dark:text-white">
              SHIPPED
            </h4>
            <span>13</span>
          </div>
          <div className="rounded-xl border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-sm font-semibold text-black dark:text-white">
              RETURN REQUESTED
            </h4>
            <span>13</span>
          </div>
          <div className="rounded-xl border border-stroke bg-white py-4 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <h4 className="text-sm font-semibold text-black dark:text-white">
              CANCELLED
            </h4>
            <span>13</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-full">
            <label
              className="mb-3 block text-sm font-medium text-black dark:text-white"
              htmlFor="category"
            >
              Status
            </label>
            <div className="relative">
              <DropDownCommon lists={status} labelKey="name" valueKey="value" />
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
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                  Order Date
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Order id
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Product name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Adddress
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Schedule pickup
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData?.orders?.map((item: any, key: number) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.Order_Date}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.Order_Id}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">-</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">-</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.Order_Status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">-</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
