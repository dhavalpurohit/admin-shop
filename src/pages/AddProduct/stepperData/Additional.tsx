const Additional = () => {
    return (
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
    )
}
export default Additional;