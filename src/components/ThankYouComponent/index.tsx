import React from 'react'

interface ThankYouComponentProps {
    onBack: () => void
}

export const ThankYouComponent = (props: ThankYouComponentProps) => {
    return (<div className="card">
        <div className="card-body">
            <b>Vielen dank für die Hilfe!</b>
        </div>
        <div className="card-image"><img className="img-responsive" src="/images/normal.jpeg" style={{width: '100%', height: 'auto'}}/></div>
        <div className="card-footer"><a className="btn btn-primary" onClick={props.onBack}>Zurück</a>
        </div>
    </div>)
};
