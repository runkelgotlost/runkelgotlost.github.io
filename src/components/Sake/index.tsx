import React from 'react';

import { Sakes } from "../../other";

interface SakeComponentProps {
    onChange: (sake: string) => void
}

export const SakeComponent = (props: SakeComponentProps) => {
    return (<div className="form-group">
        <select onChange={(event) => {
            props.onChange(event.target.value)
        }} className="form-select">
            {Sakes.map((sake, index) => {
                return (
                    <option key={index} value={sake}>{sake}</option>
                )
            })}
        </select>
    </div>)
};
