const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    
    const getPageNumbers = () => {
      if (totalPages <= 7) {
        return pageNumbers;
      }
      
      if (currentPage <= 3) {
        return [...pageNumbers.slice(0, 5), '...', totalPages];
      }
      
      if (currentPage >= totalPages - 2) {
        return [1, '...', ...pageNumbers.slice(totalPages - 5)];
      }
      
      return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
      ];
    };
  
    const handlePageChange = (pageNumber) => {
      onPageChange(pageNumber);
      
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    };
  
    return (
      <div className="flex justify-center items-center pb-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 text-sm mx-1 rounded-md ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'dark:bg-blue-600 bg-rose-600 text-white hover:opacity-90'
          }`}
        >
          Previous
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            className={`px-2 py-1 text-sm mx-1 rounded-md ${
              page === currentPage
                ? 'dark:bg-blue-600 bg-rose-600 text-white'
                : page === '...'
                ? 'bg-transparent cursor-default'
                : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 text-sm mx-1 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'dark:bg-blue-600 bg-rose-600 text-white hover:opacity-90'
          }`}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;