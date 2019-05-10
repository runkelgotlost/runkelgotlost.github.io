import React, {useEffect, useState} from 'react'

import { LocationDetection } from "../LocationDetection";
import { FileUploadComponent } from '../FileUpload';
import { LostItems } from "../LostItems";
import { SakeComponent } from "../Sake";


import { createLocation } from "../../helpers/createLocation";
import {LatLng} from "../../types";
import {states} from "../../states";
import {Item} from "../../other";

interface FormComponentProps {
    onSubmit: () => void
}

export const FormComponent = (props: FormComponentProps) => {

    const [allowedToSubmit, setAllowedToSubmit] = useState<boolean>(false);
    const [currentState, setCurrentState] = useState<string>("superDicht");
    const [picture, setPicture] = useState<any>();
    const [geoLocation, setGeoLocation] = useState<LatLng>({latitude: 0, longitude: 0});
    const [destination, setDestination] = useState("");
    const [lostItems, setLostItems] = useState<Item[]>([]);

    useEffect(() => {
       if(geoLocation.longitude !== 0 && geoLocation.longitude !== 0) {
           setAllowedToSubmit(true)
       } else {
           setAllowedToSubmit(false)
       }
    });

    const handleFormSubmit = () => {
        if(allowedToSubmit) {
            //@ts-ignore
            createLocation(geoLocation, states[currentState].title, lostItems, destination, picture).then(() => {
                props.onSubmit()
            })
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title h5">Runkel got Lost</div>
                <div className="card-subtitle text-gray">Hilf uns unseren Dichtwicht wieder zu finden</div>
            </div>
            <div className="card-image">
                <img className="img-responsive" src={
                    //@ts-ignore
                    states[currentState] && states[currentState].image ? states[currentState].image : states.superDicht.image
                } style={{width: '100%', height: 'auto'}}alt="OS X Yosemite" /></div>
            <div className="card-body">
                <div className="btn-group btn-group-block">
                    {Object.keys(states).map((stateKey, index) => {
                        return (
                            <button key={index} className={`btn ${stateKey == currentState ? 'active' : ''}`} onClick={() => {setCurrentState(stateKey)}}>{
                                //@ts-ignore
                                states[stateKey].title
                            }</button>
                        )
                    })}
                </div>
            </div>
            <div className="card-body">
                <LostItems onChange={setLostItems}/>
            </div>
            <div className="card-body">
                <SakeComponent onChange={setDestination} />
            </div>
            <div className="card-body">
                <FileUploadComponent onFileChange={setPicture} />
            </div>
            <div className="card-body">
                <LocationDetection onLocationChange={(location) => (setGeoLocation(location))}/>
                <small>Koordinaten werden einmalig gespeichert</small>
            </div>
            {allowedToSubmit ? <div className="card-footer">
                <button className="btn" style={{width: '100%'}} onClick={handleFormSubmit}>Absenden</button>
            </div> : null}
        </div>
    )
};
