import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

// ConfirmationDialog component for delete confirmation
const ConfirmationDialog = ({ isOpen, onCancel, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>Are you sure you want to delete this record?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancel</button>
          <button onClick={onContinue} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default function ProductList() {
  const [formDataArray, setFormDataArray] = useState(JSON.parse(localStorage.getItem('formData')) || []);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const updatedData = location.state && location.state.updatedData;

  useEffect(() => {
    if (location.state && location.state.updatedData) {
      setFormDataArray(prevData => [
        ...(prevData || []),
        location.state.updatedData
      ]);
    }
  }, [location.state]);

  useEffect(() => {
    console.log(formDataArray);
  }, [formDataArray]);

  const handleDelete = (productIndex, vendorIndex, variantIndex) => {
    setDeleteIndex({ productIndex, vendorIndex, variantIndex });
    setConfirmationOpen(true);
  };

  const handleContinueDelete = () => {
    if (deleteIndex !== null) {
      const { productIndex, vendorIndex, variantIndex } = deleteIndex;
      const updatedFormDataArray = [...formDataArray];
      updatedFormDataArray[productIndex].vendors[vendorIndex].variants.splice(variantIndex, 1);
      localStorage.setItem('formData', JSON.stringify(updatedFormDataArray));
      setFormDataArray(updatedFormDataArray);
    }
    setDeleteIndex(null);
    setConfirmationOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
    setConfirmationOpen(false);
  };

  const handleEdit = (productIndex, vendorIndex, variantIndex) => {
    const editUrl = `/edit/${productIndex}/${vendorIndex}/${variantIndex}`;
    const rowData = {
      productName: formDataArray[productIndex].name,
      description: formDataArray[productIndex].description,
      vendor: formDataArray[productIndex].vendors[vendorIndex].nameV,
      size: formDataArray[productIndex].vendors[vendorIndex].variants[variantIndex].size
    };
    navigate(editUrl, { state: { rowData } });
  };

  if (!Array.isArray(formDataArray) || formDataArray.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
       <h2 className="text-2xl font-bold mb-4 text-center"> Your Product</h2>
      <ConfirmationDialog
        isOpen={confirmationOpen}
        onCancel={handleCancelDelete}
        onContinue={handleContinueDelete}
      />
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Vendor
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Size
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {formDataArray.map((formData, productIndex) => (
                  formData?.vendors?.map((vendor, vendorIndex) => (
                    vendor.variants.map((variant, variantIndex) => (
                      <tr key={`${productIndex}-${vendorIndex}-${variantIndex}`} className="even:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {formData.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formData.description}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{vendor.nameV}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{variant.size}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          <div className="flex">
                            <button onClick={() => handleEdit(productIndex, vendorIndex, variantIndex)} className="text-white bg-blue-500 hover:bg-blue-700 rounded py-1 px-3 mr-2">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(productIndex, vendorIndex, variantIndex)} className="text-white bg-red-500 hover:bg-red-700 rounded py-1 px-3">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
