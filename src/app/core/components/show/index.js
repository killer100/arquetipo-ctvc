import React from "react";

const Show = ({ condition, children }) => {

    return (
        condition && <>
            {children}
        </>
    );
};

Show.defaultProps = {
    condition: false
}

export default Show;
