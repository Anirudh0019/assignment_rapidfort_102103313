import React, { useState } from 'react';
import { FileText, Calendar, HardDrive } from 'lucide-react';

export default function FileInfo({ file, darkMode }) {
  const [showRaw, setShowRaw] = useState(false);

  const fileProperties = {
    path: file.path,
    relativePath: file.relativePath,
    name: file.name,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    size: file.size,
    type: file.type,
    webkitRelativePath: file.webkitRelativePath
  };

  return (
    <div className={`rounded-lg shadow-md p-6 space-y-4 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">File Information</h3>
        <div className="flex items-center">
          <input
            id="raw-checkbox"
            type="checkbox"
            checked={showRaw}
            onChange={(e) => setShowRaw(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          {/* <label
          htmlFor="raw-checkbox"
          className={`ms-2 text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-900'}`}
        >
          raw
        </label> */}
        </div>
      </div>

      {showRaw ? (
        <pre className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-4 rounded-lg overflow-auto`}>
          {JSON.stringify(fileProperties, null, 2)}
        </pre>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">File Name</p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{file.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Last Modified</p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {new Date(file.lastModified).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <HardDrive className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Size</p>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}