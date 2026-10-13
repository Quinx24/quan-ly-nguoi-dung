
const API_URL =
  "https://6a830a1ecb486d2434033464.mockapi.io/nguoidung";

export async function getUsers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Không thể tải danh sách người dùng.");
  }

  return response.json();
}