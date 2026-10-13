
function SearchBar({
  search,
  onSearchChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder="Tìm theo tên người dùng..."
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
        />

        {search && (
          <button
            className="clear-search"
            onClick={() => onSearchChange("")}
            aria-label="Xóa tìm kiếm"
          >
            ×
          </button>
        )}
      </div>

      <div className="sort-box">
        <label htmlFor="sortOrder">Sắp xếp:</label>

        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(event) =>
            onSortChange(event.target.value)
          }
        >
          <option value="asc">Tên A – Z</option>
          <option value="desc">Tên Z – A</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;