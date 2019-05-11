import React, {useEffect, useState} from 'react'

import './custom.css'

import Slider from '@material-ui/lab/Slider';

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
    const [currentState, setCurrentState] = useState<string>(Object.keys(states)[0]);
    const [picture, setPicture] = useState<any>();
    const [geoLocation, setGeoLocation] = useState<LatLng>({latitude: 0, longitude: 0});
    const [destination, setDestination] = useState("");
    const [lostItems, setLostItems] = useState<Item[]>([]);
    const [sliderValue, setSliderValue] = useState(30);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
       if(geoLocation.longitude !== 0 && geoLocation.longitude !== 0) {
           if(allowedToSubmit !== true) {
               setAllowedToSubmit(true);
               //@ts-ignore
               window.scrollTo(0,document.getElementById("submit").scrollHeight);
           }
       } else {
           setAllowedToSubmit(false)
       }

       const stateLength = Object.keys(states).length;
       const steps = 100/stateLength;
       let currentKeyIndex = Math.trunc(sliderValue/steps);
       if (currentKeyIndex > stateLength-1) {
           currentKeyIndex = stateLength-1;
       }
       const currentStateKey = Object.keys(states)[currentKeyIndex];
       if(currentStateKey !== currentState) {
           setCurrentState(currentStateKey)
       }
    }, [geoLocation, sliderValue]);

    const handleFormSubmit = () => {
        if(allowedToSubmit) {
            setIsSubmitting(true);
            //@ts-ignore
            createLocation(geoLocation, states[currentState].title, lostItems, destination, picture)
                .then(() => {
                    setIsSubmitting(false)
                }).then(() => {props.onSubmit()})
        }
    };

    const getCurrentState = ():any => {
        //@ts-ignore
        return states[currentState];
    };

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-title h5">Runkel Got Lost</div>
                <div className="card-subtitle">Hilf uns unseren Dichtwicht wieder zu finden</div>
            </div>
            <div className="card-image">
                <img className="img-responsive" src={
                    //@ts-ignore
                    states[currentState] && states[currentState].image ? states[currentState].image : states.superDicht.image
                } style={{width: '100%', height: 'auto'}} /></div>
            <div className="card-body">
                <div>
                    <b>Aktuellen zustand wählen</b>
                </div>
                <div style={{marginTop: '1em'}}>
                    <Slider
                        value={sliderValue}
                        onChange={(event, value) => {setSliderValue(value)}}
                    />
                </div>
                <div className="columns" style={{marginTop: '1.5em'}}>
                    <div className="column col-4" style={{textAlign: 'left'}}>
                        <p style={{fontSize: '2em', marginBottom: '0'}}>😎</p>
                    </div>
                    <div className="column col-4" style={{textAlign: 'center'}}>
                        <p style={{fontSize: '2em', marginBottom: '0'}}>🤤</p>
                    </div>
                    <div className="column col-4" style={{textAlign: 'right'}}>
                        <p style={{fontSize: '2em', marginBottom: '0'}}>🥴</p>
                    </div>
                </div>
                <div style={{marginTop: '.3em'}}>
                    <b>{getCurrentState().title}</b>
                    <p>{getCurrentState().description}</p>
                </div>
            </div>
            <div className="divider" />
            <div className="card-body">
                <b>Das hat er noch bei sich:</b>
                <div style={{marginTop: '.5em'}}>
                    <LostItems onChange={setLostItems}/>
                </div>
            </div>
            <div className="divider" />
            <div className="card-body">
                <b>Seine momentane Bestimmung:</b>
                <div style={{marginTop: '.5em'}}>
                    <SakeComponent onChange={setDestination} />
                </div>
            </div>
            <div className="divider" style={{marginTop: "1em"}} />
            <div className="card-body">
                <b>Hilf uns ihn wiederzufinden</b>
                <p style={{marginBottom: '0'}}>Du kannst ein Foto machen und ihn anschließend Orten. Wir sehen dann wo er ist.</p>
            </div>
            <div className="card-body">
                <FileUploadComponent onFileChange={setPicture} />
                <small>Optional aber hilfreich</small>
            </div>
            <div className="card-body">
                <LocationDetection onLocationChange={(location) => (setGeoLocation(location))}/>
                <small>Dieser wird nicht gespeichert</small>
            </div>
            <div className="card-footer">
                <button className={`btn btn-success ${isSubmitting ? 'loading' : ''}`} disabled={!allowedToSubmit} id="submit" style={{width: '100%'}} onClick={handleFormSubmit}>
                    <i className="icon icon-message" style={{marginRight: '5px'}} />Absenden
                </button>
                {!allowedToSubmit ? <small>Bitte führe die Ortung durch, sodass wir ihn finden können</small> : null}
            </div>
        </div>
    )
};
