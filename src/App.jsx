
import { useEffect, useMemo, useState } from "react";

import SearchBar from "./components/SearchBar";
import UserTable from "./components/UserTable";
import UserGrid from "./components/UserGrid";
import { getUsers } from "./services/userService";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("table");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(
          err.message || "Đã xảy ra lỗi khi tải dữ liệu."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase("vi");

    return [...users]
      .filter((user) =>
        (user.hoten || "")
          .toLocaleLowerCase("vi")
          .includes(keyword)
      )
      .sort((a, b) => {
        const comparison = (a.hoten || "").localeCompare(
          b.hoten || "",
          "vi",
          { sensitivity: "base" }
        );

        return sortOrder === "asc"
          ? comparison
          : -comparison;
      });
  }, [users, search, sortOrder]);

  return (
    <div className="app">
      <header className="topbar">
        <a href="/" className="brand">
          <span className="brand-icon">U</span>
          <span>User<span className="brand-accent">Space</span></span>
        </a>

        <div className="topbar-label">
          <span className="status-dot" />
          Hệ thống quản lý
        </div>
      </header>

      <main className="main-content">
        {/* Thông tin nhóm */}
        <section className="team-section">
          <div className="team-heading">
            <div className="team-icon">✦</div>

            <div>
              <p className="team-eyebrow">TEAM INFORMATION</p>
              <h2>Thông tin nhóm 15</h2>
              <p className="team-description">
                Danh sách thành viên thực hiện bài tập.
              </p>
            </div>
          </div>

          <div className="table-wrapper team-table-wrapper">
            <table className="user-table team-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ và tên thành viên</th>
                  <th>Nhóm</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>01</td>
                  <td>
                    <div className="table-user-name">
                      <div className="avatar">U</div>
                      Nguyễn Thị Hoàng Uyên
                    </div>
                  </td>
                  <td>
                    <span className="country-tag">Nhóm 15</span>
                  </td>
                </tr>

                <tr>
                  <td>02</td>
                  <td>
                    <div className="table-user-name">
                      <div className="avatar member-avatar-pink">T</div>
                      Võ Thị Kiều Thơ
                    </div>
                  </td>
                  <td>
                    <span className="country-tag">Nhóm 15</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Nút xem hình ảnh */}
        <section className="image-gallery-section">
          <button
            type="button"
            className="gallery-toggle-button"
            onClick={() => setShowImages((prev) => !prev)}
            aria-expanded={showImages}
          >
            <span>{showImages ? "▴" : "▾"}</span>
            {showImages ? "Thu gọn hình ảnh" : "Xem hình ảnh minh họa"}
          </button>

          {showImages && (
            <div className="image-gallery">
              <div className="gallery-heading">
                <h3>Hình ảnh thực hiện bài tập</h3>
                <p>Ảnh chụp màn hình mã nguồn trong VS Code.</p>
              </div>

              <div className="gallery-grid">
                {[1, 2, 3, 4].map((number) => (
                  <figure className="gallery-card" key={number}>
                    <a
                      href={`/images/code-${number}.png`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`/images/code-${number}.png`}
                        alt={`Ảnh chụp mã nguồn ${number}`}
                        loading="lazy"
                      />
                    </a>
                    <figcaption>
                      Hình {number} — Mã nguồn bài tập
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Tiêu đề quản lý người dùng */}
        <section className="page-heading"></section>
        <section className="page-heading">
          <div>
            <p className="eyebrow">DASHBOARD / USERS</p>
            <h1>Quản lý người dùng</h1>
            <p className="page-description">
              Theo dõi và quản lý thông tin người dùng của bạn.
            </p>
          </div>

          <div className="total-card">
            <span className="total-label">
              TỔNG NGƯỜI DÙNG
            </span>
            <strong>{users.length}</strong>
            <span className="total-caption">
              Hồ sơ trong hệ thống
            </span>
          </div>
        </section>

        <section className="content-panel">
          <div className="panel-heading">
            <div>
              <h2>Danh sách người dùng</h2>
              <p>
                Tìm kiếm, sắp xếp và tùy chỉnh cách hiển thị.
              </p>
            </div>

            <span className="result-count">
              {filteredUsers.length} kết quả
            </span>
          </div>

          <SearchBar
            search={search}
            onSearchChange={setSearch}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
          />

          <div className="view-toolbar">
            <span className="view-label">
              KIỂU HIỂN THỊ
            </span>

            <div className="view-switch">
              <button
                className={
                  viewMode === "table"
                    ? "view-button active"
                    : "view-button"
                }
                onClick={() => setViewMode("table")}
              >
                <span>▤</span> Bảng
              </button>

              <button
                className={
                  viewMode === "grid"
                    ? "view-button active"
                    : "view-button"
                }
                onClick={() => setViewMode("grid")}
              >
                <span>▦</span> Lưới
              </button>
            </div>
          </div>

          {loading ? (
            <div className="message-state">
              <div className="spinner" />
              <p>Đang tải danh sách người dùng...</p>
            </div>
          ) : error ? (
            <div className="message-state error-state">
              <div className="state-icon">!</div>
              <h3>Không tải được dữ liệu</h3>
              <p>{error}</p>
              <button
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Thử lại
              </button>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="message-state">
              <div className="state-icon">⌕</div>
              <h3>Không tìm thấy người dùng</h3>
              <p>
                Hãy thử nhập tên khác hoặc xóa từ khóa tìm kiếm.
              </p>
              <button
                className="retry-button"
                onClick={() => setSearch("")}
              >
                Xóa tìm kiếm
              </button>
            </div>
          ) : viewMode === "table" ? (
            <UserTable users={filteredUsers} />
          ) : (
            <UserGrid users={filteredUsers} />
          )}

          {!loading && !error && filteredUsers.length > 0 && (
            <div className="panel-footer">
              Hiển thị{" "}
              <strong>{filteredUsers.length}</strong> trên{" "}
              <strong>{users.length}</strong> người dùng
            </div>
          )}
        </section>

        <footer className="page-footer">
          <span>© 2026 UserSpace</span>
          <span>Đồ án thực hành React</span>
        </footer>
      </main>
    </div>
  );
}

export default App;