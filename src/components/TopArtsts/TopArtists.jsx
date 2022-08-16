import styled from "styled-components";

import React from "react";
import ArtistUi from "../ArtistUi/ArtistUi";

function TopArtists({ artists }) {
  const artistsUi =
    artists.length > 0 ? (
      artists.map((item, index) => {
        const id = item.id;
        const name = item.name;
        const followers = item.followers.total;
        const imageUrl = item.images[2].url;

        return (
          <ArtistUi
            key={index}
            name={name}
            id={id}
            followers={followers}
            imageUrl={imageUrl}
          />
        );
      })
    ) : (
      <div>Vous n'avez encore rien écouté</div>
    );
  return <Container>{artistsUi}</Container>;
}

export default TopArtists;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
`;
