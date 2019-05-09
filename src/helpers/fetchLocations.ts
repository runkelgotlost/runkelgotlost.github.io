import { API_HOST } from "../config";
import {RunkLocation} from "../types";

/**
 * Fetches all Locations
 */
export const fetchLocations = async (): Promise<RunkLocation[]> => {
    const results = await fetch(`${API_HOST}/locations/`);
    return results.json()
};
