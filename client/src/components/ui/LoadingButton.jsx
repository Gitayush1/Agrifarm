import React from 'react';
import { Spinner } from './Spinner';
import './loadingButton.css'; // Include a CSS file for specific button styling if needed

export const LoadingButton = ({ loading, title }) => {
  return (
    <div className="loading_button">
      {loading ? (
        <div className="loading_content">
          <span>Please wait...</span>
          <Spinner />
        </div>
      ) : (
        <span>{title}</span>
      )}
    </div>
  );
};
