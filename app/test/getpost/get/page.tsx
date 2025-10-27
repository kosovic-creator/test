/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Greeting from '@/components/Greeting';
import React, { useEffect } from 'react'


const OdgovorPage = () => {

  const [data, setData] = React.useState<{ odgovor?: any }>({});
  useEffect(() => {
    const odgovor = async () => {
      try {
        await fetch('/api/getpost/get', {
          method: 'GET',
        }).then(res => res.json())
          .then(data => {
            console.log('API odgovor data:', data)
            setData({ odgovor: data })
          })
      } catch (error) {
        console.error('Error fetching odgovor:', error)
      }
    }

    odgovor()
  }, [])

  return (
    <div>
      <p>Odgovor stranica</p>
      <a >Pozovi API odgovor</a>
      {data.odgovor && <p>{data.odgovor.message}</p>}
      <Greeting name="Marko" />
    </div>
  )
}

export default OdgovorPage
