import React from 'react';
import {isEmpty} from 'lodash';

interface MovieListProps {
    data: Record<string, any>;
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {
    if(isEmpty(data)){
        return null;
    }

    return (
        <div>
            <h1>Movie List</h1>
        </div>
    )
}

export default MovieList;