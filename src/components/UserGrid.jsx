
function UserGrid({ users }) {
  return (
    <div className="user-grid">
      {users.map((user) => (
        <article className="user-card" key={user.id}>
          <div className="user-card-top">
            <div className="avatar avatar-large">
              {user.hoten?.charAt(0).toUpperCase() || "?"}
            </div>

            <span className="user-id">#{user.id}</span>
          </div>

          <h3>{user.hoten}</h3>

          <div className="user-detail">
            <span className="detail-icon">⌖</span>
            <span>{user.diachi}</span>
          </div>

          <div className="user-detail">
            <span className="detail-icon">◎</span>
            <span>{user.quocgia}</span>
          </div>

          <div className="user-detail">
            <span className="detail-icon">☎</span>
            <span>{user.phone}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

export default UserGrid;