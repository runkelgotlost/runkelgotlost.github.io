import React, {useEffect, useState} from 'react'

import { LocationDetection } from "../LocationDetection";
import { createLocation } from "../../helpers/createLocation";
import {LatLng} from "../../types";
import {states} from "../../states";

interface FormComponentProps {
    onSubmit: () => void
}

export const FormComponent = (props: FormComponentProps) => {

    const [allowedToSubmit, setAllowedToSubmit] = useState<boolean>(false);
    const [currentState, setCurrentState] = useState<string>("superDicht");
    const [geoLocation, setGeoLocation] = useState<LatLng>({latitude: 0, longitude: 0});

    useEffect(() => {
       if(geoLocation.longitude !== 0 && geoLocation.longitude !== 0) {
           setAllowedToSubmit(true)
       } else {
           setAllowedToSubmit(false)
       }
    });

    const handleFormSubmit = () => {
        if(allowedToSubmit) {
            createLocation(geoLocation, currentState).then(() => {
                props.onSubmit()
            })
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title h5">Runkel gone Lost</div>
                <div className="card-subtitle text-gray">Hilf uns unseren Dichtwicht wieder zu finden</div>
            </div>
            <div className="card-image">
                <img className="img-responsive" src={
                    //@ts-ignore
                    states[currentState] && states[currentState].image ? states[currentState].image : states.superDicht.image
                } style={{width: '100%', maxHeight: '800px', objectFit: 'contain'}}alt="OS X Yosemite" /></div>
            <div className="card-body">
                <div className="btn-group btn-group-block">
                    {Object.keys(states).map((stateKey) => {
                        return (
                            <button className={`btn ${stateKey == currentState ? 'active' : ''}`} onClick={() => {setCurrentState(stateKey)}}>{
                                //@ts-ignore
                                states[stateKey].title
                            }</button>
                        )
                    })}
                </div>
            </div>
            <div className="card-body">
                <LocationDetection onLocationChange={(location) => (setGeoLocation(location))}/>
            </div>
            {allowedToSubmit ? <div className="card-footer">
                <button className="btn" style={{width: '100%'}} onClick={handleFormSubmit}>Absenden</button>
            </div> : null}
        </div>
    )
};
