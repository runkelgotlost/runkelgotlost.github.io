import React, {useState} from 'react'
import {LatLng} from "../../types";



interface LocationDetectionProps {
    onLocationChange: (location: LatLng) => void
}

export const LocationDetection = (props: LocationDetectionProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [locationDetected, setLocationDetected] = useState<boolean>(false);

    const detectUserLocation = () => {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition((res) => {
            setIsLoading(false);
            const {latitude, longitude} = res.coords;
            setLocationDetected(true);
            console.log(latitude, longitude);
            props.onLocationChange({latitude, longitude})
        }, console.log)
    };

    const renderButton = () => {
        if(locationDetected) {
            return (
                <button className="btn btn-primary" onClick={detectUserLocation} style={{width: '100%'}}>
                    <i className="icon icon-check" style={{marginRight: '5px'}} />Lokalisiert</button>
            )
        } else
        if(isLoading) {
            return (
                <button className="btn loading" style={{width: '100%'}} />
            )
        } else {
            return (
                <button className="btn" onClick={detectUserLocation} style={{width: '100%'}}>
                    <i className="icon icon-location" style={{marginRight: '5px'}} />
                     Lokalisieren
                </button>
            )
        }
    };

    return renderButton()

};
