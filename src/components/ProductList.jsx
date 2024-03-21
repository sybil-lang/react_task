import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
export default function ProductList() {
  // const formDataArray = JSON.parse(localStorage.getItem('formData')) || [];
  const [formDataArray, setFormDataArray] = useState(JSON.parse(localStorage.getItem('formData')) || []);
  const navigate = useNavigate()
 
  // Get the location object
  const location = useLocation();
  
  // Access the state object from location
  const updatedData = location.state && location.state.updatedData;
  console.log(updatedData);
  // useEffect(() => {
  //   if (updatedData) {
  //     // Find the index of the product, vendor, and variant to be updated
  //     const { productIndex, vendorIndex, variantIndex, updatedFormData } = updatedData;
  //     // Update the corresponding values in the formDataArray
  //     const updatedArray = [...formDataArray];
  //     updatedArray[productIndex].vendors[vendorIndex].variants[variantIndex] = updatedFormData;
  //     // Update the state and localStorage with the updated data
  //     setFormDataArray(updatedArray);
  //     localStorage.setItem('formData', JSON.stringify(updatedArray));
  //   }
  // }, [updatedData, formDataArray]);
  
  const handleDelete = (productIndex, vendorIndex, variantIndex) => {
    // Create a copy of the formDataArray
    const updatedFormDataArray = [...formDataArray];
    // Remove the specified variant from the vendors array
    updatedFormDataArray[productIndex].vendors[vendorIndex].variants.splice(variantIndex, 1);
    // Update localStorage with the updated data
    localStorage.setItem('formData', JSON.stringify(updatedFormDataArray));
    // Update the component state with the updated data
    setFormDataArray(updatedFormDataArray);
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


  return (
    <div className="px-4 sm:px-6 lg:px-8">
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
                  formData?.vendors.map((vendor, vendorIndex) => (
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
