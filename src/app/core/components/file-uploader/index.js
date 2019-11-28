import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";

const FileUploader = ({ acceptedFiles }) => {
    const [files, setFiles] = useState([]);

    console.log(files);

    return (
        <>
            <DropzoneArea
                onChange={_files => setFiles(_files)}
                showAlerts={false}
                showPreviewsInDropzone={false}
                showPreviews={true}
                acceptedFiles={acceptedFiles}
            />
        </>
    );
};

FileUploader.defaultProps = {
    acceptedFiles: null;
};

export default FileUploader;
