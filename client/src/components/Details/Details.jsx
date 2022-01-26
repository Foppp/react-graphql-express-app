import React from 'react';
import ArtistProfile from '../Artists/ArtistProfile.jsx';
import ArtistsSummary from '../Artists/ArtistsSummary.jsx'
const components = {
  artistProfile: ArtistProfile,
}
const Details = ({currentId, handleDialogOpen}) => {
  return (
    <ArtistProfile id={currentId} handleDialogOpen={handleDialogOpen}  />
  );
};

export default Details;
