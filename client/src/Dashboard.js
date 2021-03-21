import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
    clientId: '4f41ca55a526466b85d9386617bbb1e8'
})

function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (!accessToken) {
            return
        }
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    return (
        <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
            <Form.Control type="search" placeholder="Search Songs/Artists" value={search} onChange={e => setSearch(e.target.value)} />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>Songs</div>
            <div>Bottom</div>
        </Container>
    )
}

export default Dashboard
