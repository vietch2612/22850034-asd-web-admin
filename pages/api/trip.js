export default async function getAllTrips(req, res) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'testing this one'
        };
        const response = await fetch('http://localhost:3000/api/trips', {
            method: 'GET',
            headers: headers,
            // You can include additional options here, such as credentials, mode, etc.
        });
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}