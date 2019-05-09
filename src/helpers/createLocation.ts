import { API_HOST } from "../config";
import {LatLng, RunkLocation} from "../types";

export const createLocation = async (geoLocation: LatLng, stateId: string): Promise<any> => {

    const locationToCreate: RunkLocation = {
        latitude: ''+geoLocation.latitude,
        longitude: ''+geoLocation.longitude,
        state_id: stateId,
        image: '/path/to/image.jpg',
    };

    const result = await fetch(`${API_HOST}/locations/`, {
        method: "POST",
        body: JSON.stringify(locationToCreate),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return result.json()
};
