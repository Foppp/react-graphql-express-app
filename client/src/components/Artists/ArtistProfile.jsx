import React from 'react'
import { artists } from '../../mocks/artistList.js';

const ArtistProfile = ({ id }) => {
    const artist = artists.find((artist) => artist.id === id);
    
    return (
        <div>
            Artist Profile {artist.name}
        </div>
    )
}

export default ArtistProfile
