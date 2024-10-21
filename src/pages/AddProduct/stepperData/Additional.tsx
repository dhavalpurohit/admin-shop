// import React from 'react';
// import { AdditionalDetails, UpdateAdditionalDetails } from '../SingleProduct';

// interface AdditionalProps {
//   additionalDetails: AdditionalDetails;
//   updateAdditionalDetails: UpdateAdditionalDetails;
// }

// const Additional: React.FC<AdditionalProps> = ({
//   additionalDetails,
//   updateAdditionalDetails,
// }) => {
//   <div className="p-8 shadow border rounded">
//     <h2 className="text-lg text-primary font-medium">Additional Information</h2>
//     <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
//       <div className="w-full">
//         <label
//           className="mb-3 block text-sm font-medium text-black dark:text-white"
//           htmlFor="offer-name"
//         >
//           Offer Name
//         </label>
//         <div className="relative">
//           <input
//             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//             type="text"
//             name="offer-name"
//             id="offer-name"
//             placeholder="offer-name"
//             defaultValue="offer-name"
//           />
//         </div>
//       </div>
//       <div className="w-full">
//         <label
//           className="mb-3 block text-sm font-medium text-black dark:text-white"
//           htmlFor="offer-disc"
//         >
//           Offer Description
//         </label>
//         <div className="relative">
//           <input
//             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//             type="text"
//             name="offer-disc"
//             id="offer-disc"
//             placeholder="offer-disc"
//             defaultValue="offer-disc"
//           />
//         </div>
//       </div>
//       <div className="w-full">
//         <label
//           className="mb-3 block text-sm font-medium text-black dark:text-white"
//           htmlFor="regulations"
//         >
//           Any Dangeroud or Dangerous Goods Regulations
//         </label>
//         <div className="relative">
//           <input
//             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//             type="text"
//             name="regulations"
//             id="regulations"
//             placeholder="regulations"
//             defaultValue="regulations"
//           />
//         </div>
//       </div>
//       <div className="w-full">
//         <label
//           className="mb-3 block text-sm font-medium text-black dark:text-white"
//           htmlFor="certi"
//         >
//           Regulatory Compliance Certification
//         </label>
//         <div className="relative">
//           <input
//             className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//             type="text"
//             name="certi"
//             id="certi"
//             placeholder="certi"
//             defaultValue="certi"
//           />
//         </div>
//       </div>
//     </div>
//   </div>;
// };

// export default Additional;



import React from 'react';
import { AdditionalDetails, UpdateAdditionalDetails } from '../SingleProduct';

interface AdditionalProps {
  additionalDetails: AdditionalDetails;
  updateAdditionalDetails: UpdateAdditionalDetails;
}

const Additional: React.FC<AdditionalProps> = ({
  additionalDetails,
  updateAdditionalDetails,
}) => {
  return (
    <div className="p-8 shadow border rounded">
      <h2 className="text-lg text-primary font-medium">Additional Information</h2>
      <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
        {/* Offer Name */}
        <div className="w-full">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="offer-name"
          >
            Offer Name
          </label>
          <div className="relative">
            <input
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              type="text"
              id="offer-name"
              placeholder="Enter Offer Name"
              value={additionalDetails.offerName || ''}
              onChange={(e) => updateAdditionalDetails('offerName', e.target.value)}
            />
          </div>
        </div>

        {/* Offer Description */}
        <div className="w-full">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="offer-description"
          >
            Offer Description
          </label>
          <div className="relative">
            <input
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              type="text"
              id="offer-description"
              placeholder="Enter Offer Description"
              value={additionalDetails.offerDescription || ''}
              onChange={(e) => updateAdditionalDetails('offerDescription', e.target.value)}
            />
          </div>
        </div>

        {/* Dangerous Goods Regulations */}
        <div className="w-full">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="dangerous-goods"
          >
            Dangerous Goods Regulations
          </label>
          <div className="relative">
            <input
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              type="text"
              id="dangerous-goods"
              placeholder="Enter Dangerous Goods Regulations"
              value={additionalDetails.dangerousGoodsRegulations || ''}
              onChange={(e) => updateAdditionalDetails('dangerousGoodsRegulations', e.target.value)}
            />
          </div>
        </div>

        {/* Regulatory Compliance Certification */}
        <div className="w-full">
          <label
            className="mb-3 block text-sm font-medium text-black dark:text-white"
            htmlFor="compliance-certification"
          >
            Regulatory Compliance Certification
          </label>
          <div className="relative">
            <input
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              type="text"
              id="compliance-certification"
              placeholder="Enter Compliance Certification"
              value={additionalDetails.complianceCertification || ''}
              onChange={(e) => updateAdditionalDetails('complianceCertification', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Additional;