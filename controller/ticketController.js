exports.tambolaTicketGenerator = async (req, res) => {
    try {
        const numSets = req.body.numSets;

        // Function to generate Tambola tickets
        const generateTickets = () => {
            const generatedTickets = {};
            for (let set = 11; set <= numSets + 10; set++) {
                const tickets = [];
                for (let i = 0; i < 6; i++) {
                    const ticket = [];
                    for (let j = 1; j <= 3; j++) {
                        const row = [];
                        for (let k = 0; k < 9; k++) {
                            const min = k * 10 + 1;
                            const max = k * 10 + 10;
                            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                            row.push(randomNumber);
                        }
                        ticket.push(row);
                    }
                    tickets.push(ticket);
                }
                generatedTickets[set] = tickets;
            }
            return generatedTickets;
        };
        // Save generated tickets to the database
        const saveTicketsToDB = tickets => {
            const savedTickets = {};
            for (const set in tickets) {
                // Assuming there is a 'tickets' table with columns (id, set_number, ticket_data)
                const query = `INSERT INTO tickets (set_number, ticket_data) VALUES (?, ?)`;
                const values = [set, JSON.stringify(tickets[set])];

                db.query(query, values, (err, result) => {
                    if (err) {
                        console.error('Error saving tickets to the database:', err);
                        savedTickets[set] = { error: 'Failed to save ticket' };
                    } else {
                        savedTickets[set] = { success: 'Ticket saved successfully' };
                    }
                });
            }
            return savedTickets;
        };
        const generatedTickets = generateTickets();
        const savedTickets = saveTicketsToDB(generatedTickets);

        res.send({status: 200, mssg: savedTickets });

    } catch (error) {
        res.send({status: 500, mssg:"Please try again."  });

    }
}