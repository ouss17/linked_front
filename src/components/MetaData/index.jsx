import React from "react";
import { Helmet } from "react-helmet";

const MetaData = ({ title, desc, index }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            {index == false ?
                <>
                    <meta name="robots" content="noindex" />
                    <meta name="googlebot" content="noindex" />
                </>
                : null}
        </Helmet>
    )
};

export default MetaData;