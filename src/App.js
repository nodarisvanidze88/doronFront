import React, { useState } from 'react';

const DynamicModelForm = () => {
  const [model, setModel] = useState('');
  const [fields, setFields] = useState([{ name: '', default: '' }]);

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  const handleFieldChange = (index, fieldName, value) => {
    const newFields = [...fields];
    newFields[index] = { ...newFields[index], [fieldName]: value };
    setFields(newFields);
  };

  const addField = () => {
    setFields([...fields, { name: '', default: '' }]);
  };

  const handleSubmit = async () => {
    // Collect data from the form
    const formData = {
      model,
      fields,
    };
    console.log('Form Data:', formData);
    try {
      // Send POST request to Django backend
      const response = await fetch('http://127.0.0.1:8000/tables/dynamic/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Dynamic model created successfully!');
        // Reset the form after successful submission if needed
        setModel('');
        setFields([{ name: '', default: '' }]);
      } else {
        console.error('Failed to create dynamic model');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <label>
        Model Name:
        <input type="text" value={model} onChange={handleModelChange} />
      </label>

      {fields.map((field, index) => (
        <div key={index}>
          <label>
            Field Name:
            <input
              type="text"
              value={field.name}
              onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
            />
          </label>

          <label>
            Default Value:
            <input
              type="text"
              value={field.default}
              onChange={(e) => handleFieldChange(index, 'default', e.target.value)}
            />
          </label>
        </div>
      ))}

      <button type="button" onClick={addField}>
        Add Field
      </button>

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default DynamicModelForm;