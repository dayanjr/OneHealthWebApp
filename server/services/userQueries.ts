import pool from "../model/db.js";

export const selectAllUsers = () => {
  const allUsers = pool.query("SELECT * FROM users ORDER BY id ASC");
  return allUsers;
};

export const CheckDuplicate = (name:string, location:string) => {
  const user = pool.query("SELECT * FROM users WHERE LOWER(name) = $1 AND LOWER(location) = $2", [name, location]);
  return user;
}

export const selectUser = (id: number) => {
  const user = pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return user;
};

export const createUser = (name: string, location: string, points: number) => {
  pool.query(
    "INSERT INTO users (name, location, points,created_at,updated_at) VALUES($1, $2, $3,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
    [name, location, points]
  );
};

export const changeUser = (
  id: number,
  name: string,
  location: string,
  points: number
) => {
    pool.query(
      "UPDATE users SET name = $1, location = $2, points = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4",
      [name, location, points, id]
    );
};

export const removeUser = (id: number) => {
  pool.query("DELETE FROM redeemed_prizes WHERE user_id = $1", [id]);
  pool.query("DELETE FROM users WHERE id = $1", [id]);
};

export const selectLocations = () => {
  const locations = pool.query("SELECT DISTINCT location FROM users");
  return locations;
}
