export const cfghttp = {
  BASE_URL:
    process.env.NODE_ENV === "production" ? "api" : "http://localhost:8081/api/v1",
  // BASE_URL: 'http://92.51.38.123:8081/api/v1',
  BASE_TIMEOUT: 10 * 60 * 1000,
  UPLOAD_TIMEOUT: 2 * 60 * 1000,
  EXCEL_TIMEOUT: 10 * 60 * 1000,
};

export const urls = {
  LOGIN: "/home/login",
  USER:"/admin/user",
  ROLES:"/admin/roles",
  ELEMENTS:"/admin/elements",
  CHEMICAL_FAMILIES:"/admin/chemical-families",
  UPLOAD_RESOURCE:"/admin/resources/upload",
  RESOURCES:"/admin/resources",
  RESOURCE_TYPES:"/admin/resource-types",
  STAFFS:"/admin/staffs",
};

export const configs = {
  cookie_expire_period: "1h",
};
