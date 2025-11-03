/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import {Artikli} from '@/actions/page'
const ArtikliSvi = async () => {
  const response = await Artikli();
  const artikli = await response.json();
return(
    <p>{artikli.map((artikal: { naziv: any; }) => artikal.naziv).join(", ")}</p>
)

}

export default ArtikliSvi
