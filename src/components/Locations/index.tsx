import React, {useState, useEffect} from 'react'
import {fetchLocations} from "../../helpers/fetchLocations";
import {RunkLocation} from "../../types";

interface LocationProps {}

export const LocationsComponent: React.FC = (props: LocationProps) => {

    const [locations, setLocations] = useState<RunkLocation[]>([]);

    useEffect(() => {
        fetchLocations().then(setLocations)
    }, []);

    return (
        <div>
            Im the locations component
            {locations.map((location: RunkLocation, index: number) => {
                return (
                    <p key={index}>{JSON.stringify(location)}</p>
                )
            })}
        </div>
    )
};
