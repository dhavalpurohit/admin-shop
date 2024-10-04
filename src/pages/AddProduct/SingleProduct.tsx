import { useState } from "react";
import CategoryDropdown from "../../components/ProductCategoryDropdown/CategoryDropdown";
import SubCategoryDropdown from "../../components/ProductCategoryDropdown/SubCategoryDropdown";
import DropDownCommon from "../../components/DropDownCommon";

const steps = ['Basic Details', 'Variants', 'Additional'];
const codeType = [
    {
        name: "type 1",
        value: 1
    },
    {
        name: "type 2",
        value: 2
    }
]

const brands = [
    {
        brand: "abc",
        value: "abc"
    },
    {
        brand: "xyz",
        value: "xyz",
    }
]
const SingleProduct = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const maxImages = 6;

    const handleStepClick = (index: number) => {
        setActiveStep(index);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (selectedImages.length + files.length > maxImages) {
            alert(`You can only upload a maximum of ${maxImages} images.`);
            return;
        }
        setSelectedImages((prevImages) => [...prevImages, ...files]);
    };

    const removeImage = (index: number) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
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
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"

                    >
                        Cancel
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
                                    ${activeStep === index
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
                                ${activeStep > index ? 'bg-green-500' : 'bg-gray-300'}`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="p-7">
                    {activeStep === 0 &&
                        <form action="#">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-5">
                                    <div className="p-8 shadow border rounded">
                                        <h2 className="text-lg text-primary font-medium">Category</h2>
                                        <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
                                            <CategoryDropdown />
                                            <SubCategoryDropdown />
                                        </div>
                                    </div>
                                    <div className="p-8 shadow border rounded">
                                        <h2 className="text-lg text-primary font-medium">General Information</h2>
                                        <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
                                            <div className="w-full">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="productId"
                                                >
                                                    External Product ID
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        type="text"
                                                        name="productId"
                                                        id="productId"
                                                        placeholder="productId"
                                                        defaultValue="productId"
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
                                                        placeholder="Product Name"
                                                        defaultValue="Product Name"
                                                    />
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
                                                    <DropDownCommon lists={brands} labelKey="brand" valueKey="value" />
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
                                                        defaultValue="keywords"
                                                    />
                                                </div>
                                            </div>
                                            <div className="full col-start-1 col-end-3">
                                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                    Product Description
                                                </label>
                                                <textarea
                                                    rows={6}
                                                    placeholder="Default textarea"
                                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                ></textarea>
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
                                                        defaultValue="Regular Price"
                                                    />
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
                                                        defaultValue="Sale Price"
                                                    />
                                                </div>
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
                                                        name="Qty"
                                                        id="Qty"
                                                        placeholder="Qty"
                                                        defaultValue="Qty"
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
                                                    <DropDownCommon lists={codeType} labelKey="name" valueKey="value" />
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
                                                        defaultValue="taxValue"
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
                                                        defaultValue="Manufacture"
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
                                                        defaultValue="Importer"
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
                                                className={`w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 ${selectedImages.length >= maxImages && 'cursor-not-allowed'
                                                    }`}>
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    disabled={selectedImages.length >= maxImages}
                                                />
                                                <span className="text-gray-500">
                                                    {selectedImages.length >= maxImages
                                                        ? 'Maximum 6 images reached'
                                                        : 'Add images'}
                                                </span>
                                            </label>

                                            {/* Image Preview */}
                                            <div className="mt-4 grid grid-cols-3 gap-4 justify-items-center">
                                                {selectedImages.map((image, index) => (
                                                    <div key={index} className="relative border w-25 h-25">
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt={`Preview ${index}`}
                                                            className="w-full h-full object-cover rounded"
                                                        />
                                                        <button
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
                                </div>
                            </div>
                            {/* <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                <div className="w-full sm:w-1/2">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="fullName"
                                    >
                                        Product Name
                                    </label>
                                    <div className="relative">
                                        <input                                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            placeholder="Product Name"
                                            defaultValue="Product Name"
                                        />
                                    </div>
                                </div>
                            </div> */}
                        </form>
                    }
                    {activeStep === 1 && <div>Content for Variants</div>}
                    {activeStep === 2 && <div>Content for Additional</div>}

                </div>

            </div>

        </div>
    )
}

export default SingleProduct;
