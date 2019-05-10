import { API_HOST } from "../config";
import {LatLng, RunkLocation} from "../types";

export const createLocation = async (geoLocation: LatLng, stateId: string, image: File): Promise<any> => {

    const locationToCreate: RunkLocation = {
        latitude: ''+geoLocation.latitude,
        longitude: ''+geoLocation.longitude,
        state_id: stateId,
        image: '/path/to/image.jpg',
    };

    const data = new FormData();
    data.append('latitude', locationToCreate.latitude);
    data.append('longitude', locationToCreate.longitude);
    data.append('state_id', stateId);
    data.append('image_bin', image, image.name);

    const result = await fetch(`${API_HOST}/locations/`, {
        method: "POST",
        body: data
    });

    return result.json()
};
