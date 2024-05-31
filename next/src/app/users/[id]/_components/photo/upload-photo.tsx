import React, { useRef } from 'react';

type Props = 
{
    handleFile: (file: File) => void;
    children: React.ReactNode;
    className?: string;
};

const PhotoUploader: React.FC<Props> = ({ handleFile, children, className }) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileUploaded = event.target.files ? event.target.files[0] : null;
        if (fileUploaded) {
            handleFile(fileUploaded);
        }
    };

    return (
        <div className={className}>
            <div>
                <div onClick={handleClick}>
                    {children}
                </div>

                <input
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                    accept="image/jpeg"
                    onChange={handleChange}
                    type='file'
                />
            </div>
        </div>
    );
};

export default PhotoUploader;
