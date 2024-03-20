import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductList = () => {
  const location = useLocation();
  const { formData } = location.state;

  const [products, setProducts] = useState(formData.vendors);

  const handleEdit = (index) => {
    // Implement edit logic here, e.g., navigate to an edit page
    console.log("Edit clicked for index:", index);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Product Data</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Vendors</th>
            <th className="py-2 px-4 border">Variants</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((vendor, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border">{formData.name}</td>
              <td className="py-2 px-4 border">{vendor.nameV}</td>
              <td className="py-2 px-4 border">
                {vendor.variants.map((variant, vIndex) => (
                  <div key={vIndex}>
                    Size: {variant.size}
                  </div>
                ))}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
