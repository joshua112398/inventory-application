import { useState, useEffect } from 'react';

function DeletePopup({ visible, group, name, id }) {
  function renderDeletePopup(group) {
    if (group === 'characters') {
      return (
        <>
          <p>Are you sure you want to delete? </p>
          <button className="text-rose-600 p-4">Delete</button>
        </>
      );
    } else {
      return (
        <>
          <p>Are you sure you want to delete something else? </p>
          <button className="text-rose-600 p-4">Delete</button>
        </>
      );
    }
  }

  if (visible === true) {
    return (
      <div
        id="modal"
        className="z-20 fixed left-0 top-0 w-full h-screen bg-black/70 flex justify-center items-center"
      >
        <div className="relative w-4/5 max-w-lg max-h-full bg-sky-900 text-white p-8 rounded-md overflow-auto">
          {renderDeletePopup(group)}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default DeletePopup;
