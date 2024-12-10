const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// Api for Auth service
export const AUTH_API = {
	LOGIN: `${API_BASE_URL}/v1/auth/login`,
};

export const PARTNER_API = {
	GET_ALL: `${API_BASE_URL}/partners`,
};

export const WAREHOUSE_API = {
	GET_ALL: `${API_BASE_URL}/warehouses`,
	CREATE: `${API_BASE_URL}/warehouses`,
};

export const PRODUCT_CATEGORY_API = {
	BASE: `${API_BASE_URL}/product-categories`,
};

export const PRODUCT_API = {
	BASE: `${API_BASE_URL}/products`,
};
