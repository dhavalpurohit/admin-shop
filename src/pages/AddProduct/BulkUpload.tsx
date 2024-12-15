import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import ButtonLoader from '../../common/ButtonLoader';

// import DropDownCommon from '../../components/DropDownCommon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import {
  vendorFetchAllCategories,
  fetchProductSampleFile,
  createBulkProduct,
} from '../../redux/slices/ProductSlice';
import CategoryDropdown from '../../components/ProductCategoryDropdown/CategoryDropdown';
import SubCategoryDropdown from '../../components/ProductCategoryDropdown/SubCategoryDropdown';
import toast from 'react-hot-toast';

const BulkUpload = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | any>(null);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSampleFileLoading, setSampleFileLoading] = useState(false);
  const [presignedUrl, setPresignedUrl] = useState('');
  const [isUpload, setisUpload] = useState(false);

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setSelectedSubCategory(''); // Reset subcategory when category changes
  };

  const handleSubCategoryChange = (newSubCategory: string) => {
    setSelectedSubCategory(newSubCategory);
  };

  const categories = useSelector(
    (state: RootState) => state.product.categories?.categories,
  );

  useEffect(() => {
    if (!categories) {
      dispatch(
        vendorFetchAllCategories({
          id: '0',
        }),
      );
    }
  }, [categories]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null); // Reset error message
    setUploadedFile(null); // Reset uploaded file

    acceptedFiles.forEach((file) => {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (fileType === 'csv' || fileType === 'xlsx' || fileType === 'xls') {
        const reader = new FileReader();
        setUploadedFile(file); // Set the uploaded file in state

        reader.onload = (event) => {
          const data = event.target?.result;

          let workbook;
          if (fileType === 'csv') {
            // Read CSV data as binary
            workbook = XLSX.read(data, { type: 'binary' });
          } else {
            // Parse Excel file
            workbook = XLSX.read(data, { type: 'array' });
          }

          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
        };

        if (fileType === 'csv') {
          reader.readAsBinaryString(file); // For CSV
        } else {
          reader.readAsArrayBuffer(file); // For Excel
        }
      } else {
        setError('Unsupported file type. Please upload a CSV or Excel file.');
      }
    });
  }, []);

  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1, // Only allow one file at a time (optional)
  });

  const handleDownloadSampleFile = async () => {
    try {
      setSampleFileLoading(true);
      const response = await dispatch(fetchProductSampleFile()).unwrap();

      console.log(' response', response);
      if (response?.link_to_download_excel_file) {
        const a = document.createElement('a');
        a.href = response.link_to_download_excel_file; // Correctly set the URL
        a.download = 'product_sample_file.xlsx'; // Set the file name for download
        document.body.appendChild(a);
        a.click(); // Trigger the download
        document.body.removeChild(a); // Clean up
      } else {
        toast.error('No download link available');
      }
    } catch (error) {
      toast.error(`Error fetching product sample file: ${error}`);
    } finally {
      setSampleFileLoading(false); // Stop loading
    }
  };

  const handleUpload = async () => {
    if (uploadedFile) {
      try {
        setisUpload(true);
        // Prepare the URL with query parameters
        const presignedUrlRequest = `https://bt09kmb8yb.execute-api.us-east-1.amazonaws.com/shopnowee//get-presigned-url?bucket_name=shopnow-codes&field_labels=${uploadedFile.path}&object_keys=${uploadedFile.name}`;

        // Fetch the presigned URL from the backend
        const response = await fetch(presignedUrlRequest, {
          method: 'GET', // or 'POST' depending on your backend setup
        });

        const data = await response.json();

        setPresignedUrl(data[uploadedFile.name]);

        if (data) {
          // Upload the file to the presigned URL
          const uploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            body: uploadedFile,
            headers: {
              'Content-Type': uploadedFile.type,
            },
          });

          if (uploadResponse) {
            toast.success('File uploaded successfully!');
            setisUpload(false);
            // Optionally, dispatch an action to process the uploaded file here
          } else {
            toast.error('Error uploading file.');
          }
        } else {
          toast.error('Error generating presigned URL.');
        }
      } catch (error) {
        toast.error(`Error uploading file. ${error}`);
      } finally {
        setisUpload(false);
      }
    } else {
      toast.error(`Please upload a file.`);
    }
  };

  const handleSave = async () => {
    if (uploadedFile) {
      try {
        setIsLoading(true);
        await dispatch(
          createBulkProduct({
            filename: uploadedFile.name,
            vendor_id: localStorage.getItem('vendor_id'),
            bucket_name: 'shopnow-codes',
          }),
        );
      } catch (error) {
        toast.error(`Please upload a file. ${error}`);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error(`Please upload a file.`);
    }
  };

  const handleReset = () => {
    removeFile();
    setSelectedCategory('');
    setSelectedSubCategory('');
  };
  return (
    <div className="p-7 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between border-b border-stroke py-4 px-7 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">BULK UPLOAD</h3>
        <div className="flex justify-end gap-4.5">
          <button
            className={`flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 ${
              isUpload ? 'cursor-not-allowed opacity-75' : 'opacity-100'
            }`}
            type="submit"
            onClick={handleSave}
          >
            {isLoading ? <ButtonLoader /> : ' Save'}
          </button>
          <button
            type="submit"
            onClick={handleReset}
            className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="p-8 shadow border rounded">
        <h2 className="text-lg text-primary font-medium">
          Step 1 : Select the category to continue the bulk upload process
        </h2>
        <div className="grid grid-cols-2 py-2 gap-2.5 mt-3">
          <CategoryDropdown
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <SubCategoryDropdown
            selectedSubCategory={selectedSubCategory}
            onSubCategoryChange={handleSubCategoryChange}
            category={selectedCategory}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 mt-3">
        <div className="p-8 shadow border rounded">
          <h2 className="text-lg text-primary font-medium">
            Step 2 : Download Template
          </h2>
          <div className="max-w-md text-center mx-auto py-15">
            <button
              className="flex justify-center w-[188.45px] mx-auto rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              onClick={handleDownloadSampleFile}
            >
              {isSampleFileLoading ? <ButtonLoader /> : ' Download template'}
            </button>
            <p className="mt-2">
              File will be downloaded in excel format which needs to be filled
              and uploaded in step 3
            </p>
          </div>
        </div>
        <div className="p-8 shadow border rounded">
          <h2 className="text-lg text-primary font-medium">
            Step 3 : Upload Products
          </h2>
          <div className="max-w-md text-center mx-auto py-15">
            <div className="flex flex-col justify-center items-center">
              <div
                {...getRootProps()}
                className={`w-96 h-48 border-2 border-dashed border-gray-300 rounded-lg flex justify-center items-center p-4 cursor-pointer ${
                  uploadedFile ? 'border-meta-3' : ''
                }`}
              >
                <input {...getInputProps()} />
                <div className="text-center">
                  {!uploadedFile ? (
                    <>
                      <p className="text-lg">DRAG OR UPLOAD YOUR FILES</p>
                      <p className="text-sm text-gray-500">
                        Drag and drop or click to upload CSV or Excel files
                      </p>
                    </>
                  ) : (
                    <p className="text-lg text-meta-3">
                      File uploaded successfully!
                    </p>
                  )}
                </div>
              </div>

              {uploadedFile && (
                <div className="mt-4 flex items-center space-x-4">
                  <span className="text-gray-700">{uploadedFile.name}</span>
                  <button
                    onClick={removeFile}
                    className="text-red bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
                  >
                    Remove
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-4 text-red">
                  <p>{error}</p>
                </div>
              )}
              <button
                className="flex mt-4  justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
                onClick={handleUpload}
              >
                {isUpload ? <ButtonLoader /> : ' Upload'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BulkUpload;
