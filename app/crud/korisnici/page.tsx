'use client'
import React, { useEffect, useState } from 'react'

type Korisnik = { id: string; ime: string; email: string }

const KorisniciPage: React.FC = () => {
    const [data, setData] = useState<Korisnik[] | null>(null)

    useEffect(() => {
        const fetchKorisnici = async () => {
            try {
                const response = await fetch('/api/test/korisnici')
                if (!response.ok) throw new Error('Failed to fetch korisnici')
                const data = await response.json()
                console.log('Fetched korisnici data:', data)
                setData(data)
            } catch (error) {
                console.error('Error fetching korisnici data:', error)
            }
        }
        fetchKorisnici()
        // Any necessary logic for KorisniciPage can be added here
    }, [])

    return (
        <div>

            <div>
                {data && data.length > 0 ? (
                    <ul>
                        {data.map((korisnik: Korisnik) => (
                            <li key={korisnik.id}>
                                <strong>{korisnik.ime}</strong> — {korisnik.email}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No korisnici found.</p>
                )}
            </div>
        </div>
    )
}

export default KorisniciPage

