exports.fetchTambolaTickets = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const pageSize = req.query.pageSize || 10;

        // Fetch tickets from the database with pagination
        const fetchTickets = (page, pageSize) => {
            const offset = (page - 1) * pageSize;
            const query = `SELECT * FROM tickets LIMIT ?, ?`;
            const values = [offset, pageSize];
            const fetchedTickets = [];
            db.query(query, values, (err, results) => {
                if (err) {
                    console.error('Error fetching tickets from the database:', err);
                } else {
                    results.forEach(row => {
                        fetchedTickets.push({ id: row.id, set_number: row.set_number, ticket_data: JSON.parse(row.ticket_data) });
                    });
                }
            });
            return fetchedTickets;
        };
        const fetchedTickets = fetchTickets(page, pageSize);
        res.send({ status:200, mssg: fetchedTickets });
    } catch (error) {
        res.send({ status:500, mssg: "Something went wrong, please try again." });
    }

}