const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "", 
  database: "eventplanning", 
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("connected to MySQL Database");
});



// Route for save event data to the datanase
app.post("/events", (req, res) => {
  const { event_name, description, event_date, event_time, venue, ticketprice } = req.body;

  // Validate incoming data
  if (!event_name || !description || !event_date || !event_time || !venue || !ticketprice) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = "INSERT INTO event (event_name, description, event_date, event_time, venue, ticketprice) VALUES (?, ?, ?, ?, ?, ?)";
  
  db.query(query, [event_name, description, event_date, event_time, venue, ticketprice], (error, results) => {
    if (error) {
      console.error("Error saving event:", error);
      return res.status(400).json({ message: "Failed to save event", error: error.message });
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Route for show event data in the table of the frontend
app.get("/event", (req, res) => {
    const query = "SELECT * FROM event";
    
    db.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching events:", error);
        return res.status(500).json({ message: "Failed to fetch events", error: error.message });
      }
      res.json(results);
    });
  });


  
// Route to Register a customer
app.post('/register', async (req, res) => {
  const { nic, name, contactNo, email, password } = req.body;

  // Check if the NIC or Email already exists
  const query = 'SELECT * FROM customer WHERE nic = ? OR email = ?';
  db.query(query, [nic, email], async (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.length > 0) {
      // NIC or Email already exists
      const existingUser = result[0];
      if (existingUser.nic === nic) {
        return res.status(400).json({ error: 'NIC already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    } else {
      // Hash the password and insert into the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = 'INSERT INTO customer (nic, name, contact_number, email, password) VALUES (?, ?, ?, ?, ?)';
      db.query(insertQuery, [nic, name, contactNo, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        
        // Respond with user details upon successful registration
        res.status(201).json({ 
          message: 'User registered successfully', 
          user: { nic, name, email } // Include NIC and name in the response
        });
      });
    }
  });
});

// Route to Login a user
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists with the given email
  const query = 'SELECT * FROM customer WHERE email = ?';
  db.query(query, [email], async (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (result.length === 0) {
      // No user with this email
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

    const user = result[0];

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Email or password is incorrect' });
    }

    // If the email and password match, respond with user details
    res.status(200).json({ 
      message: 'Login successful', 
      user: { nic: user.nic, name: user.name, email: user.email } // Include NIC and name in the response
    });
  });
});


app.post("/addcustomer", (req, res) => {
  const { name, nic, contactNo, email } = req.body;

  // Validate incoming data
  if (!name || !nic || !contactNo || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = "INSERT INTO user (name, nic, contact_number, email) VALUES (?, ?, ?, ?)";
  
  db.query(query, [name, nic, contactNo, email], (error, results) => {
    if (error) {
      console.error("Error saving event:", error);
      return res.status(400).json({ message: "Failed to save event", error: error.message });
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});


// Endpoint to get user names and NICs
app.get("/api/user", (req, res) => {
  const query = "SELECT name, nic FROM user";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});



app.get("/getcustomer", (req, res) => {
  const query = "SELECT * FROM user";
  
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({ message: "Failed to fetch events", error: error.message });
    }
    res.json(results);
  });
});



// Route to delete a customer by NIC
app.delete('/deletecustomer/:nic', (req, res) => {
  const { nic } = req.params;
  const query = "DELETE FROM user WHERE nic = ?";
  
  db.query(query, [nic], (error, results) => {
    if (error) {
      console.error("Error deleting customer:", error);
      return res.status(500).json({ message: "Failed to delete customer", error: error.message });
    }
    if (results.affectedRows === 0) {
      console.warn("Customer not found with NIC:", nic);
      return res.status(404).json({ message: "Customer not found" });
    }
    console.log("Customer deleted successfully with NIC:", nic);
    res.status(200).json({ message: "Customer deleted successfully" });
  });
});

// Route to Update Customer by NIC
app.put("/updatecustomer/:nic", (req, res) => {
  const { nic } = req.params;  // Get old NIC from URL parameters
  const { new_nic, name, contact_number, email } = req.body;  // Get updated data from request body

  console.log("Update Request Received for NIC:", nic);
  console.log("New Data:", { new_nic, name, contact_number, email });

  // Validate incoming data
  if (!new_nic || !name || !contact_number || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const query = "UPDATE user SET nic = ?, name = ?, contact_number = ?, email = ? WHERE nic = ?";

  db.query(query, [new_nic, name, contact_number, email, nic], (error, results) => {
    if (error) {
      console.error("Error updating customer:", error);
      return res.status(500).json({ message: "Failed to update customer", error: error.message });
    }

    console.log("Database Update Results:", results);

    // Check if any rows were affected
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer: { nic: new_nic, name, contact_number, email }
    });
  });
});


app.get("/api/user", (req, res) => {
  const query = "SELECT name, nic FROM user";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ error: "Database query error" });
    } else {
      res.json(results);
    }
  });
});





// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
