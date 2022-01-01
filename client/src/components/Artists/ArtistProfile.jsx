import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_ALL_ARTISTS } from '../../query/query';

const ArtistProfile = ({ id }) => {
    const { data, loading, error, refetch } = useQuery(GET_ALL_ARTISTS);
    
    const artist = data.getArtists.find((artist) => artist._id === id);
    
    return (
        <div>
            Artist Profile {artist.name}
        </div>
    )
}

export default ArtistProfile
