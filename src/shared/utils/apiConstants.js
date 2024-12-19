const API_BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// Api for Auth service
export const AUTH_API = {
	LOGIN: `${API_BASE_URL}/v1/auth/login`,
};

export const PARTNER_API = {
	BASE: `${API_BASE_URL}/partners`,
};

export const WAREHOUSE_API = {
	BASE: `${API_BASE_URL}/warehouses`,
};

export const PRODUCT_CATEGORY_API = {
	BASE: `${API_BASE_URL}/product-categories`,
};

export const PRODUCT_API = {
	BASE: `${API_BASE_URL}/products`,
};

export const PRODUCT_WAREHOUSE_API = {
	BASE: `${API_BASE_URL}/product-warehouses`,
};

export const PRODUCT_WAREHOUSE_HISTORY_API = {
	BASE: `${API_BASE_URL}/pw-histories`,
};

export const ORDER_API = {
	BASE: `${API_BASE_URL}/orders`,
};

export const APP_API = {
	BATCH: `${API_BASE_URL}/batches`,
	INVENTORY_ITEM: `${API_BASE_URL}/inventory-items`,
	ORDER_ITEM: `${API_BASE_URL}/order-items`,
	BATCH_ITEM: `${API_BASE_URL}/batch-items`,
};
