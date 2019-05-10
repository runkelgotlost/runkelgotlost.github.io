import React, { useState } from 'react'

import './button.css'

interface FileUploadProps {
    onFileChange: (file: File) => void
}

export const FileUploadComponent = (props: FileUploadProps) => {

    const [filename, setFilename] = useState("");

    const handleButtonClick = () => {
        const fileButton = document.getElementById("file-upload");
        if(fileButton) {
            fileButton.click()
        }
    };

    return (
        <div>
            <button className={`btn ${filename ? 'btn-primary' : ''}`} style={{width: '100%'}} onClick={handleButtonClick}>
                <i className={`icon icon-${filename ? 'check' : 'photo'}`} style={{marginRight: '5px'}}/>
                {
                filename ? "Foto ausgewählt" : "Foto machen"
            }</button>
            <input type="file" id="file-upload" style={{display: 'none'}} onChange={(event) => {
                //@ts-ignore
                const file = event.target.files[0];
                if(file) {
                    props.onFileChange(file);
                    setFilename(file.name);
                }
            }} />
        </div>
    )

};
