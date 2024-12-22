import Modal from '../../common/Modal';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

interface props {
  isOpen: boolean;
  onClose: () => void;
  bannerData?: any;
}

const ViewBanner: React.FC<props> = ({ isOpen, onClose, bannerData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" bg-white ">
        <div className="flex items-center justify-between py-4 px-7 gap-2.5">
          <h3 className="font-medium text-black dark:text-white">
            Banner Details
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
              totalSlides={bannerData?.image_extra?.length || 0}
              step={1}
              naturalSlideWidth={350}
              naturalSlideHeight={350}
              infinite
            >
              <div className="relative max-w-2xl mx-auto">
                <Slider className="overflow-hidden min-w-[500px] min-h-[400px] w-[500px] h-[400px]">
                  {bannerData?.image_extra?.map((item: any, i: number) => (
                    <Slide index={i}>
                      <img
                        src={item?.image}
                        alt={`image-${i}`}
                        className="h-full w-full"
                      />
                    </Slide>
                  ))}
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
            <ul className="grid grid-cols-2 gap-3">
              <li className="flex flex-col gap-1">
                <span className="font-medium">Title:</span>
                <span className="text-sm"> {bannerData?.name}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Sub Title:</span>
                <span className="text-sm">
                  {' '}
                  {bannerData?.sub_title ? bannerData?.sub_title : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Brand:</span>
                <span className="text-sm">
                  {' '}
                  {bannerData?.brand ? bannerData?.brand : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Category:</span>
                <span className="text-sm">
                  {' '}
                  {bannerData?.category ? bannerData?.category : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Type:</span>
                <span className="text-sm">
                  {' '}
                  {bannerData?.type ? bannerData?.type : '-'}
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="font-medium">Status:</span>
                <span className="text-sm">
                  {' '}
                  {bannerData?.status ? bannerData?.status : '-'}
                </span>
              </li>
              {/* <li className="flex flex-col gap-1">
                <span className="font-medium">Wishlist:</span>
                <span className="text-sm">
                  {' '}
                  {bannerData?.wishlist ? bannerData?.wishlist : '-'}
                </span>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ViewBanner;
