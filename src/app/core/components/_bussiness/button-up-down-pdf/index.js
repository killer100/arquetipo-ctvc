import React, { useState } from 'react';
import { AppConfig } from "app/core/config/app.config";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { UploadTempFile } from "app/core/api/file-upload.api";
import toast from "app/core/components/toast";
import ButtonUploadPdf from "app/core/components/_bussiness/button-upload-pdf";
import { makeStyles } from "@material-ui/core/styles";

// =======================================
// STYLES
// =======================================

const useStyles = makeStyles(theme => ({
    buttonDownload: {
        padding: 0,
        margin: 0
    }
}));

// =======================================
// HELPER FUNCTIONS
// =======================================

const HandleDownloadFile = name => {
    window.location.href = `${AppConfig.urlFileServer}${name}`;
};

// =======================================
// COMPONENT
// =======================================

const ButtonUpDownPdf = ({ filename, onRemove, onUpload, inputId, showRemove }) => {

    const [loadingFile, setLoadingFile] = useState(false);

    const classes = useStyles();

    const handleUploadFile = e => {
        setLoadingFile(true);
        UploadTempFile([e.target.files[0]])
            .then(resp => {
                toast("Archivo subido correctamente!", "success");
                onUpload(resp.data.files[0].tempName);
                setLoadingFile(false);
            })
            .catch(err => {
                console.error(err);
                toast("Hubo un error al subir los archivos", "error");
                setLoadingFile(false);
            });
    };

    return (<>
        {filename && (
            <IconButton
                className={classes.buttonDownload}
                onClick={() => {
                    HandleDownloadFile(filename);
                }}
            >
                <Icon>cloud_download</Icon>
            </IconButton>
        )}
        {showRemove && <ButtonUploadPdf
            loadingFile={loadingFile}
            onUploadFile={handleUploadFile}
            onRemoveFile={onRemove}
            hasFile={filename}
            inputId={inputId}
        />}
    </>);
}

ButtonUpDownPdf.defaultProps = {
    inputId: null,
    showRemove: true
};

export default ButtonUpDownPdf;