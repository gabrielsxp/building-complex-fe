export const TOKEN_KEY = "token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const setBuilding = building => {
  localStorage.setItem("current_building", building);
} 
export const getBuilding = () => {
  return localStorage.getItem("current_building");
}
export const getOutOfBuilding = () => {
  return localStorage.removeItem("current_building");
}
export const compareBuildings = (building) => {
  return localStorage.getItem("current_building") === building;
}
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token, role) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem("role", role);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("role");
};
export const setRole = (role) => {
  localStorage.setItem("role", role)
};
export const compareRoles = (role) => {
  return role === localStorage.getItem("role");
}
export const getRole = () => {
  return localStorage.getItem("role");
}