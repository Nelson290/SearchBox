import React from 'react';
import Search from './Search';

const searchResults = (props) =>
{
    return (
        <div>
        { props.names.map(name => 
        {
          return <Search name = {name} clicked = {() => props.search(name)}/>
        })}
       </div>
    )
}

export default searchResults;