const SingleProduct = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    ADD NEW PRODUCT
                </h3>
            </div>
            <div className="p-7">
                <form action="#">
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="fullName"
                            >
                                Product Name
                            </label>
                            <div className="relative">
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Product Name"
                                    defaultValue="Product Name"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4.5">
                        <button
                            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"

                        >
                            Cancel
                        </button>
                        <button
                            className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SingleProduct;
