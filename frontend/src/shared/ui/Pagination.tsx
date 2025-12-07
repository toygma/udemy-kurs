import ReactPaginate from "react-paginate";

interface Props {
  handlePageClick: (event: { selected: number }) => void;
  pageCount: number;
}

const Pagination = ({ handlePageClick, pageCount }: Props) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="İleri >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< Geri"
      renderOnZeroPageCount={null}
      containerClassName="flex items-center gap-2"
      pageClassName="px-3 py-1 rounded-lg border border-gray-300 hover:bg-blue-600 cursor-pointer"
      pageLinkClassName="block w-full h-full"
      previousClassName="px-3 py-1 rounded-lg border border-gray-300 hover:bg-blue-600 cursor-pointer"
      nextClassName="px-3 py-1 rounded-lg border border-gray-300 hover:bg-blue-600 cursor-pointer"
      activeClassName="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
      disabledClassName="opacity-50 cursor-not-allowed hover:bg-transparent"
      breakClassName="px-3 py-1"
    />
  );
};

export default Pagination;
