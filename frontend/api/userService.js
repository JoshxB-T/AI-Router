import { apiRequest } from "./apiClient";
import { ENDPOINTS } from "./endpoints";

export function getRoot() {
    return apiRequest(ENDPOINTS.ROOT);
}

export function getGames() {
    return apiRequest(ENDPOINTS.GAMES);
}

export function getAnalyticsDashboard() {
    return apiRequest(ENDPOINTS.ANALYTICS);
}

export function getFeatuedGame() {
    return apiRequest(ENDPOINTS.FEATURED);
}

export function searchGame() {
    return apiRequest(ENDPOINTS.SEARCH_GAME);
}
