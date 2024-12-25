import Modal from '../../common/Modal';

interface props {
  isOpen: boolean;
  onClose: () => void;
  bannerData?: any;
}

const ViewBanner: React.FC<props> = ({ isOpen, onClose, bannerData }) => {
  console.log('bannerData', bannerData);
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
            <img
              src={bannerData?.image}
              alt={`image-banner`}
              className="h-full w-full rounded-md object-cover"
            />
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
