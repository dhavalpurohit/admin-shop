import { useState } from 'react';

import BasicDetails from './stepperData/BasicDetails';
import Varianst from './stepperData/Variants';
import Additional from './stepperData/Additional';

const steps = ['Basic Details', 'Variants', 'Additional'];

const SingleProduct = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };
  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          ADD NEW PRODUCT
        </h3>
        <div className="flex justify-end gap-4.5">
          <button
            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            type="submit"
          >
            Save
          </button>
          <button className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
            Reset
          </button>
        </div>
      </div>
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center py-8 gap-20 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative w-full text-center">
              <div
                onClick={() => handleStepClick(index)}
                className={`cursor-pointer p-2 border rounded-full transition-all duration-300 
                                    ${
                                      activeStep === index
                                        ? 'bg-primary border-primary text-white'
                                        : activeStep > index
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-gray-200 border-gray-300 text-gray-500'
                                    }
                               `}
              >
                {step}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-1/2 left-full w-full h-1 transform -translate-y-1/2 
                                ${
                                  activeStep > index
                                    ? 'bg-green-500'
                                    : 'bg-gray-300'
                                }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <form className="p-7" action="#">
          {activeStep === 0 && <BasicDetails />}
          {activeStep === 1 && <Varianst />}
          {activeStep === 2 && <Additional />}
        </form>
        <div className="flex items-center gap-2.5 p-7 justify-end">
          {activeStep > 0 && (
            <button
              onClick={handlePrevious}
              className="flex justify-center rounded border border-primary py-1.5 px-6 font-medium hover:bg-opacity-90 text-primary"
            >
              Previous
            </button>
          )}
          {activeStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="flex justify-center rounded  bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
