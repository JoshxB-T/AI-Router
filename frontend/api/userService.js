import { apiRequest } from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export function getRoot() {
    return apiRequest(ENDPOINTS.ROOT);
}

export function getGames() {
    return apiRequest(ENDPOINTS.GAMES);
}
