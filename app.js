/*const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const PythonShell = require('python-shell').PythonShell;
const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const { exec } = require('child_process');
const port = 3000;
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sansh0702@",
    database: "signupDB",
    connectionLimit: 2
});
pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected');
    connection.release();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); 


app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); 

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/signup', (req, res) => {
    const userData = {
        child_name: req.body.child_name,
        parent_name: req.body.parent_name,
        date_of_birth: req.body.date_of_birth,
        contact_info: req.body.contact_info,
        password: req.body.password
    };

    const sql = 'INSERT INTO users SET ?'; 
    pool.query(sql, userData, (err, result) => {
        if (err) {
            console.error('MySQL insert error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Data inserted:', result);
        res.send('Signup successful');
    });
});
app.post('/index.html', (req, res) => {
    const { contact_info, password } = req.body;

    const sql = 'SELECT * FROM users WHERE contact_info = ? AND password = ?';
    pool.query(sql, [contact_info, password], (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length > 0) {
            res.redirect('/home.html');
        } else {
            res.status(401).send('Invalid credentials.');
        }
    });
});

if (typeof window !== 'undefined') { 
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('loginForm');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    window.location.href = '/home.html'; 
                } else {
                    const errorText = await response.text();
                    alert(errorText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
}
app.get('/runopencv', (req, res) => {
    exec('python3 virtual_paint', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running OpenCV script: ${error.message}`);
            return res.status(500).send('Error running OpenCV');
        }

        if (stderr) {
            console.error(`OpenCV stderr: ${stderr}`);
            return res.status(500).send('Error running OpenCV');
        }

        console.log(`OpenCV stdout: ${stdout}`);
        res.send('OpenCV executed successfully');
    });
});
app.post('/recommend', (req, res) => {
    const bookName = req.body.book_name;  
    console.log(`User entered book name: ${bookName}`); 

    exec(`python3 bookrecommender.py "${bookName}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running Python script: ${error.message}`);
            return res.status(500).send('Internal Server Error'); 
        }
        if (stderr) {
            console.error(`Python script error: ${stderr}`); 
            return res.status(500).send('Error running the Python script');
        }
        try {
            const recommendations = JSON.parse(stdout.trim()); 
            console.log('Recommendations received:', recommendations);
            return res.json(recommendations);
        } catch (e) {
            console.error('Error parsing JSON from Python script:', e);
            console.log('stdout content was:', stdout); 
            return res.status(500).send('Error parsing Python output');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});*/
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const port = 3000;
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sansh0702@",
    database: "signupDB",
    connectionLimit: 2
});
pool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('MySQL connected');
    connection.release();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});
app.post('/signup', (req, res) => {
    const userData = {
        child_name: req.body.child_name,
        parent_name: req.body.parent_name,
        date_of_birth: req.body.date_of_birth,
        contact_info: req.body.contact_info,
        password: req.body.password
    };
    const sql = 'INSERT INTO users SET ?'; 
    pool.query(sql, userData, (err, result) => {
        if (err) {
            console.error('MySQL insert error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Data inserted:', result);
        res.send('Signup successful');
    });
});
app.post('/index.html', (req, res) => {
    const { contact_info, password } = req.body;

    const sql = 'SELECT * FROM users WHERE contact_info = ? AND password = ?';
    pool.query(sql, [contact_info, password], (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length > 0) {
            res.redirect('/home.html');
        } else {
            res.status(401).send('Invalid credentials.');
        }
    });
});
app.get('/runopencv', (req, res) => {
    exec('python3 vp.py', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running OpenCV script: ${error.message}`);
            return res.status(500).send('Error running OpenCV');
        }

        if (stderr) {
            console.error(`OpenCV stderr: ${stderr}`);
            return res.status(500).send('Error running OpenCV');
        }

        console.log(`OpenCV stdout: ${stdout}`);
        res.send('OpenCV executed successfully');
    });
});

app.post('/recommend', (req, res) => {
    const bookName = req.body.book_name;  

    exec(`python3 bookrecommender.py "${bookName}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running Python script: ${error.message}`);
            return res.status(500).send('Internal Server Error'); 
        }
        if (stderr) {
            console.error(`Python script error: ${stderr}`); 
            return res.status(500).send('Error running the Python script');
        }
        try {
            const recommendations = JSON.parse(stdout.trim()); 
            return res.json(recommendations);
        } catch (e) {
            console.error('Error parsing JSON from Python script:', e);
            return res.status(500).send('Error parsing Python output');
        }
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
