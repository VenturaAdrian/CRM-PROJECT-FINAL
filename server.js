const express = require('express'),
      dbOperation = require('./dbFiles/dbOperation'),
      cors = require('cors'),
      Employee = require('./dbFiles/employee');

const API_PORT = process.env.PORT || 5000;
const app = express();


let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


//display user based on firstname
app.post('/allusers', async(req,res) =>  {
    console.log('called');
     const result = await dbOperation.getUserById(req.body.name);
     res.send(result.recordset)

});
//register a user
app.post('/createUser', async(req,res)=> {
    await  dbOperation.createUser(req.body);
    const result = await dbOperation.getUser(req.body.Firstname);
    console.log('called');
    res.send(result.recordset) 
});

//loog in 
app.post('/loginUser', async (req, res) => {
    const { UserID, Password } = req.body;

    if (!UserID || !Password) {
        return res.json({ success: false, message: 'UserID and Password are required' });
    }
   
    const result = await dbOperation.getUserById(UserID);

    if (result.recordset.length === 0) {
        return res.json({ success: false, message: 'Invalid UseriD or Password' });
    }
        
    const user = result.recordset[0];

    if (user.Password !== Password) {
        return res.json({ success: false, message: 'Invalid UserID or Password' });
    }

    res.json({ success: true, message: 'Login successfull' });

    
});




//display all REQ
app.get('/allgetRequests', async (req,res) => {
    try{
       console.log('called');
    const result = await dbOperation.getAllRequests();
     res.send(result) 

    }catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Error retrieving requests' });
    }
    
});

// Create request
app.post('/createRequest', async(req,res)=> { 
    await  dbOperation.createRequest(req.body);
    const result = await dbOperation.getRequest(req.body.RequestID);
    console.log('called');
    res.send(result.recordset) 
})

// Get Request by slected ID
app.get('/getRequest/:id', async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Fetch rrequestID: ${id}`);
        const result = await dbOperation.getRequestEdit(id);

        if (result.recordset.length === 0) {
            return res.json({ message: "no req found" });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error("Error fetch request:", error);
        res.json({ message: "Error Retrieving Request" });
    }
});

// Get Request by slected ID
app.get('/getRequest/:id', async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Fetch rrequestID: ${id}`);
        const result = await dbOperation.getRequestEdit(id);

        if (result.recordset.length === 0) {
            return res.json({ message: "no req found" });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        console.error("Error fetch request:", error);
        res.json({ message: "Error Retrieving Request" });
    }
});

//Update request 
app.put('/updateRequest/:id', async (req, res) => {
    const { id } = req.params;
    const { status, comment} = req.body;

    try {
        await dbOperation.updateRequest(id, status, comment);
        res.json({ success: true, message: 'Request updated successfullyy' });
    } catch (error) {
        console.error("Error Updating Request:", error);
        res.json({ success: false, message: "Error Updating Request" });
    }
})

//Update request 
app.put('/updateRequestCE/:id', async (req, res) => {
    const { id } = req.params;
    const { Firstname, Lastname, CmntyBrngy, Activity, Venue, Guests, ComrelEmp, Beneficiaries, Status, DateTime } = req.body;

    try {
        await dbOperation.updateRequestCE(id, Firstname, Lastname, CmntyBrngy, Activity, Venue, Guests, ComrelEmp, Beneficiaries, Status, DateTime);
        res.json({ success: true, message: 'Request updated successfullyy' });
    } catch (error) {
        console.error("Error Updating Request:", error);
        res.json({ success: false, message: "Error Updating Request" });
    }
})





app.listen(API_PORT, () => console.log(`listening on port ${API_PORT} ` ));