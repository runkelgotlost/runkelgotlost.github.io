import React from 'react';

import { Sakes } from "../../other";

interface SakeComponentProps {
    onChange: (sake: string) => void
}

export const SakeComponent = (props: SakeComponentProps) => {
    return (
        <div className="form-group">
            <textarea style={{width: '100%', resize: 'none'}} rows={2} className="form-input" onChange={(event) => {
                props.onChange(event.target.value)
            }} placeholder={"Auto umparken"}/>
        </div>
    )
    /*return (<div className="form-group">
        <select onChange={(event) => {
            props.onChange(event.target.value)
        }} className="form-select">
            {Sakes.map((sake, index) => {
                return (
                    <option key={index} value={sake}>{sake}</option>
                )
            })}
        </select>
    </div>)*/
};
