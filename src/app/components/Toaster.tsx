import React, { useState, useEffect } from "react";

interface ToasterProps {
  message: string;
  type: string;
}

const Toaster: React.FC<Readonly<ToasterProps>> = ({ message, type }) => {
  return (
    <div className="toast toast-top toast-end z-100">
      <div className={`alert alert-success`}>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toaster;
