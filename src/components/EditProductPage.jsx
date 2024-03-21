import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

export default function EditProductPage() {
  const { productIndex, vendorIndex, variantIndex } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    vendor: '',
    size: ''
  });

  // Check if location.state exists
  if (!location.state || !location.state.rowData) {
    // Handle the case where location.state or rowData is null
    console.error("Row data not found in location state.");
    return null; // or handle the error in a different way
  }

  // Destructure rowData
  const { rowData } = location.state;

  // Set form data with rowData
  useState(() => {
    setFormData(rowData);
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder function to handle form submission
    console.log("Updated Form Data:", formData);
    // Here, you can perform any update logic

    // Pass the updated data back to the products page using state
    navigate('/products', { state: { updatedData: formData } });
  };

  // Your edit page JSX code
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700">Product Name:</label>
          <input 
            type="text" 
            name="productName" 
            value={formData.productName} 
            onChange={handleChange} 
            className="form-input mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Description:</label>
          <input 
            type="text" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            className="form-input mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Vendor:</label>
          <input 
            type="text" 
            name="vendor" 
            value={formData.vendor} 
            onChange={handleChange} 
            className="form-input mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Size:</label>
          <input 
            type="text" 
            name="size" 
            value={formData.size} 
            onChange={handleChange} 
            className="form-input mt-1"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
