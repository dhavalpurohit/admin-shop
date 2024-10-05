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
const colors = [
    {
        color: "Dark Black",
        value: "dark_black"
    },
    {
        color: "Gray",
        value: "gray",
    }
]
const sizes = [
    {
        size: "xl",
        value: "xl"
    },
    {
        size: "2xl",
        value: "2xl",
    }
]

const variationsArray = [
    {
        'color': "Dark Black",
        "size": "2xl",
        "price": 200,
        "stock": 20,

    }
]
const SingleProduct = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [options, setOptions] = useState([{ id: 1, value: '' }]);
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

    // Handle input change
    const handleInputChange = (id: number, newValue: string) => {
        const updatedOptions = options.map((option) =>
            option.id === id ? { ...option, value: newValue } : option
        );
        setOptions(updatedOptions);
    };

    // Add new option
    const addOption = () => {
        const newOption = { id: options.length + 1, value: '' };
        setOptions([...options, newOption]);
    };

    // Remove option
    const removeOption = (id: number) => {
        const updatedOptions = options.filter((option) => option.id !== id);
        setOptions(updatedOptions);
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
                    <button
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"

                    >
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
                                    <div className="p-8 shadow border rounded">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg text-primary font-medium">Options</h2>
                                            {/* Button to add a new option */}
                                            <button
                                                onClick={addOption}
                                                className="text-primary p-2 border border-primary rounded transition duration-200"
                                            >
                                                Add Option
                                            </button>
                                        </div>
                                        <div className="mt-3">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                {options.map((option, index) => (
                                                    <div key={option.id} className="flex flex-col relative">
                                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                            {`Option ${index + 1}`}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={option.value}
                                                            onChange={(e) => handleInputChange(option.id, e.target.value)}
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            placeholder={`Enter option ${index + 1}`}
                                                        />
                                                        {/* Remove icon (button) */}
                                                        <button
                                                            onClick={() => removeOption(option.id)}
                                                            className="absolute top-8 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
                                                            title="Remove option"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    }
                    {activeStep === 1 &&
                        <div className="flex flex-col gap-5">
                            <div className="p-8 shadow border rounded">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg text-primary font-medium">Variations</h2>
                                    <button
                                        onClick={addOption}
                                        className="flex justify-center rounded border border-primary py-1.5 px-6 font-medium hover:bg-opacity-90 text-primary"
                                    >
                                        Add Variation
                                    </button>
                                </div>
                                <div className="flex items-start w-full gap-2.5">
                                    <div className="w-2/3">
                                        <div className="grid grid-cols-3 py-2 gap-2.5 mt-3">
                                            <div className="w-full">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="color"
                                                >
                                                    Color
                                                </label>
                                                <div className="relative">
                                                    <DropDownCommon lists={colors} labelKey="color" valueKey="value" />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="size"
                                                >
                                                    Size
                                                </label>
                                                <div className="relative">
                                                    <DropDownCommon lists={sizes} labelKey="size" valueKey="value" />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="colormap"
                                                >
                                                    Color Map
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        type="text"
                                                        name="colormap"
                                                        id="colormap"
                                                        placeholder="colormap"
                                                        defaultValue="colormap"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="name"
                                                >
                                                    Name
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        placeholder="name"
                                                        defaultValue="name"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="stock"
                                                >
                                                    Stock
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        type="text"
                                                        name="stock"
                                                        id="stock"
                                                        placeholder="stock"
                                                        defaultValue="stock"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full">
                                                <label
                                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                    htmlFor="bust"
                                                >
                                                    Bust Size
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        type="text"
                                                        name="bust"
                                                        id="bust"
                                                        placeholder="bust"
                                                        defaultValue="bust"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <h2 className="text-lg text-primary font-medium">Additional</h2>
                                            <div className="grid grid-cols-3 py-2 gap-2.5">
                                                <div className="w-full">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor="length-size"
                                                    >
                                                        Length Size
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            name="length-size"
                                                            id="length-size"
                                                            placeholder="length-size"
                                                            defaultValue="length-size"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor="waist-size"
                                                    >
                                                        Waist Size
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            name="waist-size"
                                                            id="waist-size"
                                                            placeholder="waist-size"
                                                            defaultValue="waist-size"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor="hip-size"
                                                    >
                                                        Hip Size
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            name="hip-size"
                                                            id="hip-size"
                                                            placeholder="hip-size"
                                                            defaultValue="hip-size"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full">
                                                    <label
                                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                                        htmlFor="bust-size"
                                                    >
                                                        Bust Size
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                            type="text"
                                                            name="bust-size"
                                                            id="bust-size"
                                                            placeholder="bust-size"
                                                            defaultValue="bust-size"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/3 p-8 border rounded mt-3">
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

                            <div className="p-8 shadow border rounded">
                                <h2 className="text-lg text-primary font-medium">Variations List</h2>
                                <div className="max-w-full overflow-x-auto mt-3">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                <th className="p-4 font-medium text-black dark:text-white">
                                                    Color
                                                </th>
                                                <th className="p-4 font-medium text-black dark:text-white">
                                                    Size
                                                </th>
                                                <th className="p-4 font-medium text-black dark:text-white">
                                                    Price
                                                </th>
                                                <th className="p-4 font-medium text-black dark:text-white">
                                                    Stock
                                                </th>
                                                <th className="p-4 font-medium text-black dark:text-white">
                                                    Action
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {variationsArray.map((item, key) => (
                                                <tr key={key}>
                                                    <td className="border-b border-[#eee] p-4 dark:border-strokedark">
                                                        <p className="text-sm">{item.color}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-4 dark:border-strokedark">
                                                        <p className="text-sm">{item.size}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-4 dark:border-strokedark">
                                                        <p className="text-sm">{item.price}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-4 dark:border-strokedark">
                                                        <p className="text-sm">{item.stock}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-4 dark:border-strokedark">
                                                        <div className="flex items-center gap-2.5">
                                                            <button className="hover:text-primary">
                                                                <svg
                                                                    className="fill-current w-[18px] h-[18px]"
                                                                    viewBox="0 0 20 20"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                                                            fill=""
                                                                        />
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            clipRule="evenodd"
                                                                            d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                                                            fill=""
                                                                        />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_88_10224">
                                                                            <rect width="20" height="20" fill="white" />
                                                                        </clipPath>
                                                                    </defs>
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
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    }
                    {activeStep === 2 &&
                        <div className="p-8 shadow border rounded">
                            <h2 className="text-lg text-primary font-medium">Additional Information</h2>
                            <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
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
                                            name="offer-name"
                                            id="offer-name"
                                            placeholder="offer-name"
                                            defaultValue="offer-name"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="offer-disc"
                                    >
                                        Offer Description
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="offer-disc"
                                            id="offer-disc"
                                            placeholder="offer-disc"
                                            defaultValue="offer-disc"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="regulations"
                                    >
                                        Any Dangeroud or Dangerous Goods Regulations
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="regulations"
                                            id="regulations"
                                            placeholder="regulations"
                                            defaultValue="regulations"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="certi"
                                    >
                                        Regulatory Compliance Certification
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="certi"
                                            id="certi"
                                            placeholder="certi"
                                            defaultValue="certi"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
                <div className="flex items-center gap-2.5 p-7 justify-end">
                    {activeStep > 0 && (
                        <button onClick={handlePrevious} className="flex justify-center rounded border border-primary py-1.5 px-6 font-medium hover:bg-opacity-90 text-primary">
                            Previous
                        </button>
                    )}
                    {activeStep < steps.length - 1 && (
                        <button onClick={handleNext} className="flex justify-center rounded  bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90">
                            Next
                        </button>
                    )}
                </div>
            </div>

        </div>
    )
}

export default SingleProduct;