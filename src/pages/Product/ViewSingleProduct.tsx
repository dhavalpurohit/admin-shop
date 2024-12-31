import Modal from '../../common/Modal';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { productDetailsView } from '../../redux/slices/ProductSlice';

interface props {
  isOpen: boolean;
  onClose: () => void;
  productData: any;
}

const ViewSingleProduct: React.FC<props> = ({
  isOpen,
  onClose,
  productData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const vendor_id = localStorage.getItem('vendor_id');

  const productDetails = useSelector(
    (state: RootState) => state.product.productDetails,
  );

  useEffect(() => {
    if (productData) {
      dispatch(
        productDetailsView({
          id: productData?.id || '',
          customer_id: productData?.customer_id || '',
          vendor_id: vendor_id,
        }),
      );
    }
  }, [productData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" bg-white ">
        <div className="flex items-center justify-between py-4 px-7 gap-2.5">
          <h3 className="font-medium text-black dark:text-white">
            Product Details
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
        <div className="flex gap-5 p-7 pt-2.5">
          <div className="min-w-[500px] min-h-[400px] w-[500px] h-[400px] max-h-[400px]  overflow-hidden  rounded-md shadow-md">
            <CarouselProvider
              visibleSlides={1}
              totalSlides={
                productDetails?.product_detail[0]?.Image?.length || 0
              }
              step={1}
              naturalSlideWidth={350}
              naturalSlideHeight={350}
              infinite
            >
              <div className="relative max-w-2xl mx-auto">
                <Slider className="overflow-hidden min-w-[500px] min-h-[400px] w-[500px] h-[400px]">
                  {productDetails?.product_detail[0]?.Image?.map(
                    (item: any, i: number) => (
                      <Slide index={i}>
                        <img
                          src={item?.image}
                          alt={`image-${i}`}
                          className="h-full w-full"
                        />
                      </Slide>
                    ),
                  )}
                </Slider>
                <ButtonBack className="absolute top-1/2 left-0 -translate-y-1/2">
                  <span className="h-8 w-8 rounded-full flex items-center justify-center bg-primary text-white  shadow-2xl cursor-pointer rotate-90">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                  </span>
                </ButtonBack>
                <ButtonNext className="absolute top-1/2 right-0 -translate-y-1/2">
                  <span className="h-8 w-8 rounded-full flex items-center justify-center bg-primary text-white  shadow-2xl cursor-pointer -rotate-90">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                  </span>
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>
          <div className="w-full">
            <h2 className="text-lg text-primary font-medium">
              General Information
            </h2>
            <ul className="grid grid-cols-2 gap-3">
              <li className="flex flex-col gap-1">
                <span className="font-medium">Name:</span>
                <span className="text-sm">
                  {' '}
                  {productDetails?.product_detail[0]?.name}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Description:</span>
                <span className="text-sm">
                  {' '}
                  {productDetails?.product_detail[0]?.description
                    ? productDetails?.product_detail[0]?.description
                    : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Currency:</span>
                <span className="text-sm">
                  {' '}
                  {productDetails?.Currency ? productDetails?.Currency : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Regular Price:</span>
                <span className="text-sm">
                  {' '}
                  {productDetails?.product_detail[0]?.regular_price
                    ? productDetails?.product_detail[0]?.regular_price
                    : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Sale Price:</span>
                <span className="text-sm">
                  {' '}
                  {productDetails?.product_detail[0]?.sale_price
                    ? productDetails?.product_detail[0]?.sale_price
                    : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Stock:</span>
                <span className="text-sm">
                  {' '}
                  {productDetails?.product_detail[0]?.stock
                    ? productDetails?.product_detail[0]?.stock
                    : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Quantity:</span>
                <span className="text-sm">
                  {' '}
                  {productDetails?.product_detail[0]?.quantity
                    ? productDetails?.product_detail[0]?.quantity
                    : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Wishlist:</span>
                <span className="text-sm">
                  {' '}
                  {productDetails?.product_detail[0]?.wishlist
                    ? productDetails?.product_detail[0]?.wishlist
                    : '-'}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full p-7 pt-2.5">
          <h2 className="text-lg text-primary font-medium">Other Details</h2>
          <ul className="grid grid-cols-3 gap-3">
            <li className="flex flex-col gap-1">
              <span className="font-medium">Category</span>
              <span className="text-sm">
                {' '}
                {productDetails?.product_detail[0]?.main_category
                  ? productDetails?.product_detail[0]?.main_category
                  : '-'}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-medium">Sub Category</span>
              <span className="text-sm">
                {' '}
                {productDetails?.product_detail[0]?.category
                  ? productDetails?.product_detail[0]?.category
                  : '-'}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-medium">Brand</span>
              <span className="text-sm">
                {' '}
                {productDetails?.product_detail[0]?.brand
                  ? productDetails?.product_detail[0]?.brand
                  : '-'}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-medium">GST</span>
              <span className="text-sm">
                {' '}
                {productDetails?.product_detail[0]?.GST
                  ? productDetails?.product_detail[0]?.GST
                  : '-'}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-medium">Do Not Display</span>
              <span className="text-sm">
                {' '}
                {productDetails?.product_detail[0]?.do_not_display
                  ? productDetails?.product_detail[0]?.do_not_display
                  : '-'}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-medium">Expected Date of Delivery</span>
              <span className="text-sm">
                {' '}
                {productDetails?.product_detail[0]?.expected_date_of_delivery
                  ? productDetails?.product_detail[0]?.expected_date_of_delivery
                  : '-'}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-medium">HSN Code</span>
              <span className="text-sm">
                {' '}
                {productDetails?.product_detail[0]?.hsn_code
                  ? productDetails?.product_detail[0]?.hsn_code
                  : '-'}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-medium">Keywords</span>
              <span className="text-sm">
                {' '}
                {productDetails?.product_detail[0]?.keywords
                  ? productDetails?.product_detail[0]?.keywords
                  : '-'}
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-medium">Country of origin:</span>
              <span className="text-sm">
                {' '}
                {productDetails?.product_detail[0]?.country_of_origin
                  ? productDetails?.product_detail[0]?.country_of_origin
                  : '-'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
export default ViewSingleProduct;
