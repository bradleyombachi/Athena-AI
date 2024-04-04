import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    // Here you can handle the file upload process (e.g., sending it to a backend server)
    console.log(selectedFile);
    alert('File uploaded successfully');
  };

  return (
    <div className="container mx-auto p-4 flex">
      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm p-2"
            onChange={handleFileChange}
          />
        </label>
        {selectedFile && (
          <span className="text-sm text-gray-500">
            File selected: {selectedFile.name}
          </span>
        )}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
