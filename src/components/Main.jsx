import React, { useState } from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    vendors: Yup.array().of(
        Yup.object().shape({
            nameV: Yup.string().required('Vendor Name is required'),
            is_main: Yup.boolean(),
            variants: Yup.array().of(
                Yup.object().shape({
                    size: Yup.number().min(0).required('Size is required'),
                })
            ),
        })
    ),
});

const initialValues = {
    name: '',
    description: '',
    vendors: [
        {
            nameV: '',
            is_main: false,
            variants: [{ size: '' }],
        },
    ],
};

const Main = () => {
    const navigate = useNavigate();

    const [formDataArray, setFormDataArray] = useState([]); // Add this line to initialize formDataArray state

    const handleSubmit = (values) => {
        // Add the form data to the formDataArray
        setFormDataArray([...formDataArray, values]);

        // You can handle the form submission here, e.g., sending data to an API
        // For demo, we'll just navigate to '/products' with form data
        navigate('/products', { state: { formData: values } });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors }) => (
                <Form className="max-w-lg mx-auto mt-8">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600" id="name-error">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <Field
                            as="textarea"
                            id="description"
                            name="description"
                            className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.description && (
                            <p className="mt-2 text-sm text-red-600" id="description-error">
                                {errors.description}
                            </p>
                        )}
                    </div>
                    <FieldArray name="vendors">
                        {({ push, remove }) => (
                            <div>
                                {values.vendors.map((vendor, index) => (
                                    <div key={index} className="border rounded p-4 mb-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-medium">Vendor {index + 1}</h3>
                                            {values.vendors.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                    className="text-red-500"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="mb-4">
                                            <label
                                                htmlFor={`vendors.${index}.nameV`}
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Name
                                            </label>
                                            <Field
                                                type="text"
                                                id={`vendors.${index}.nameV`}
                                                name={`vendors.${index}.nameV`}
                                                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.vendors && errors.vendors[index] && errors.vendors[index].nameV && (
                                                <p className="mt-2 text-sm text-red-600" id={`vendors.${index}.nameV-error`}>
                                                    {errors.vendors[index].nameV}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <FieldArray name={`vendors.${index}.variants`}>
                                                {({ push: pushVariant, remove: removeVariant }) => (
                                                    <div>
                                                        {vendor.variants.map((variant, vIndex) => (
                                                            <div key={vIndex} className="flex items-center mb-2">
                                                                <div className="w-1/2">
                                                                    <label
                                                                        htmlFor={`vendors.${index}.variants.${vIndex}.size`}
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Variant Size
                                                                    </label>
                                                                    <Field
                                                                        type="number"
                                                                        id={`vendors.${index}.variants.${vIndex}.size`}
                                                                        name={`vendors.${index}.variants.${vIndex}.size`}
                                                                        className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                    {errors.vendors && errors.vendors[index] && errors.vendors[index].variants && errors.vendors[index].variants[vIndex] && errors.vendors[index].variants[vIndex].size && (
                                                                        <p className="mt-2 text-sm text-red-600" id={`vendors.${index}.variants.${vIndex}.size-error`}>
                                                                            {errors.vendors[index].variants[vIndex].size}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                {vendor.variants.length > 1 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeVariant(vIndex)}
                                                                        className="ml-2 text-red-500"
                                                                    >
                                                                        Remove Variant
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            onClick={() => pushVariant({ size: '' })}
                                                            className="text-indigo-600"
                                                        >
                                                            Add Variant
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() =>
                                        push({
                                            nameV: '',
                                            is_main: false,
                                            variants: [{ size: '' }],
                                        })
                                    }
                                    className="text-indigo-600"
                                >
                                    Add Vendor
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    <button
                        type="submit"
                        className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
        
    );
};

export default Main;
