import { API_HOST } from "../config";
import {LatLng, RunkLocation} from "../types";
import {Item} from "../other";

export const createLocation = async (geoLocation: LatLng, state: string, lostItems: Item[], destination: string, image: File): Promise<any> => {

    let lostItemString = "";
    for(const lostItem of lostItems) {
        if(lostItem.lost) {
           lostItemString+=lostItem.title+", "
        }
    }
    if(lostItemString.length > 0) {
        lostItemString = lostItemString.substr(0, lostItemString.length -2)
    }


    const locationToCreate: RunkLocation = {
        latitude: ''+geoLocation.latitude,
        longitude: ''+geoLocation.longitude,
        state: state,
        lost_items: lostItemString,
        destination: destination,
        image: '/path/to/image.jpg',
    };

    const data = new FormData();
    data.append('latitude', locationToCreate.latitude);
    data.append('longitude', locationToCreate.longitude);
    data.append('state', state);
    data.append('lost_items', lostItemString);
    data.append('destination', locationToCreate.destination);
    if(image && image.name) {
        data.append('image_bin', image, image.name);
    }


    const result = await fetch(`${API_HOST}/locations/`, {
        method: "POST",
        body: data
    });

    return result.json()
};
