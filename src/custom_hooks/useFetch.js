import { useCallback, useEffect, useState } from "react";

/**
 * Custom React hook for making HTTP requests using the Fetch API.
 * @param {string} url - The URL to which the request is sent.
 * @param {object} config - The configuration object for the request (e.g., method, headers, body).
 * @param {any} initialData - Initial data to be used before fetching data.
 * @returns {{
 *   data: any, // The fetched data from the server.
 *   error: string | undefined, // Any error that occurred during the fetch process.
 *   loading: boolean, // Indicates whether the request is currently loading.
 *   sendRequest: () => Promise<void> // Function to manually send the request.
 * }}
 */
export default function useFetch(url, config, initialData) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [data, setData] = useState(initialData);

	const sendRequest = useCallback(
		async function sendRequest(data) {
			setLoading(true);
			try {
				const responseData = await sendHttpRequest(url, { ...config, body: data });
				setData(responseData);
			} catch (error) {
				setError(error.message || "Something went wrong");
			}
			setLoading(false);
		},
		[url, config]
	);

	useEffect(() => {
		// Check if the provided configuration object specifies a GET request or if no method is provided
		// Also, check if no method is provided or if no configuration object is provided
		if ((config && config.method === "GET") || (config && !config.method) || !config) {
			// If the conditions are met, send the request
			sendRequest();
		}
	}, [sendRequest, config]);

	return {
		data,
		error,
		loading,
		sendRequest,
	};
}

/**
 * Sends an HTTP request to the specified URL with the provided configuration.
 * @param {string} url - The URL to which the request will be sent.
 * @param {object} config - The configuration object for the request (e.g., method, headers, body).
 * @returns {Promise} A Promise that resolves with the response data if the request is successful,
 *                    otherwise rejects with an error message.
 * @throws {Error} If the response indicates an unsuccessful request or if an error occurs during the process.
 */
async function sendHttpRequest(url, config) {
	const response = await fetch(url, config);

	const responseData = await response.json();
	if (!responseData) {
		throw new Error(responseData.message || "Something went wrong, failed to send request");
	}

	return responseData;
}
