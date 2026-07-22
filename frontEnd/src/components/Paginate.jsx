import React from 'react';

const Paginate = ({ currentPage, totalPage, pageHandler }) => {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center gap-1 bg-white p-2 rounded-lg shadow">

        {/* First */}
        <button
          onClick={() => pageHandler(1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 text-sm rounded border disabled:opacity-40"
        >
          First
        </button>

        {/* Prev */}
        <button
          onClick={() => pageHandler(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 text-sm rounded border disabled:opacity-40"
        >
          Prev
        </button>

        {/* Pages */}
        <div className="flex gap-1">
          {[...Array(totalPage)].map((_, i) => (
            <button
              key={i}
              onClick={() => pageHandler(i + 1)}
              className={`px-3 py-1 text-sm rounded border ${
                i + 1 === currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => pageHandler(currentPage + 1)}
          disabled={currentPage >= totalPage}
          className="px-3 py-1 text-sm rounded border disabled:opacity-40"
        >
          Next
        </button>

        {/* Last */}
        <button
          onClick={() => pageHandler(totalPage)}
          disabled={currentPage >= totalPage}
          className="px-3 py-1 text-sm rounded border disabled:opacity-40"
        >
          Last
        </button>

      </div>
    </div>
  );
};

export default Paginate;