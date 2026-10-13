
function UserTable({ users }) {
  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Họ và tên</th>
            <th>Địa chỉ</th>
            <th>Quốc gia</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <span className="user-id">#{user.id}</span>
              </td>
              <td>
                <div className="table-user-name">
                  <div className="avatar">
                    {user.hoten?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <span>{user.hoten}</span>
                </div>
              </td>
              <td>{user.diachi}</td>
              <td>
                <span className="country-tag">
                  {user.quocgia}
                </span>
              </td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;