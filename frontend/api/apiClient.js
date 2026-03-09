import { API_URL } from "./config"

export async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        const text = await response.text();
        console.log("Raw response: ", text);
        const json = await response.json();

        if (!json.success) {
            throw new Error(json.error || "API error");
        }

        return json.data;
    } catch (err) {
        console.error("API request failed: ", err);
        throw err;
    }
}
