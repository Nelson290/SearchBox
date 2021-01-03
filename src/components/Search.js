import React from 'react';

const search = (props) =>
{
    return (
        <div onClick = {props.clicked}>
                {props.name}
            </div>
    )
}

export default search;