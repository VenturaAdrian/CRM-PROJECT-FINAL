const config                    = require('./dbConfig'),
      sql                       = require('mssql');


      
// get user via firsname
const getUser = async(Firstname) => {
    try{
        let pool = await sql.connect(config);
        let user = await pool.request().query(`SELECT * from UserComRel WHERE Firstname = @UserFirstname'` );
        console.log(user);
        return user;
    }
    catch(error){
        console.log(error);
    }
}

//create a user
const createUser = async(User) => {
    try{
        let pool = await sql.connect(config);
        let user = await pool.request().query(`INSERT INTO UserComRel VALUES
            (${User.UserID},
            '${User.Firstname}', 
            '${User.Lastname}', 
            '${User.UserRole}', 
            '${User.Password}')`)
        console.log(user);
        return user;
    }
    catch(error){
        console.log(error);
    }
}

const getUserById = async (UserID) => {
    try {
        let pool = await sql.connect(config);
        let user = await pool.request()
            .input('UserID', sql.Int, UserID)
            .query(`SELECT UserID, Firstname, Lastname, UserRole, Password FROM UserComRel WHERE UserID = @UserID`);
            console.log(user.recordset[0]);
        return user;
    } catch (error) {
        console.error('Databse Error (getuserbyId):', error);
    }
};

//Displya all requests
const getAllRequests = async () => {
    try {
        let pool = await sql.connect(config);
        let requests = await pool.request().query("SELECT * FROM RequestForm"); 
        console.log("Database Query Result:", requests.recordset);
        return requests.recordset;
    } catch (error) {
        console.error("Database Error (getAllRequests):", error);
        return { success: false, message: "Error fetching requests", error };
    }
};


const getRequest = async(RequestID) => {
    try{
        let pool = await sql.connect(config);
        let request = await pool.request().query(`SELECT * from RequestForm WHERE UserFirstname = '${RequestID}'` );
        console.log(request);
        return request;
    }
    catch(error){
        console.log(error);
    }
}

const createRequest = async (Request) => {
    console.log("Data received:", Request);

    try {
        let pool = await sql.connect(config);
        let request = await pool.request().query(`
            INSERT INTO RequestForm VALUES (
                ${Request.RequestID},
                '${Request.UserFirstname}', 
                '${Request.UserLastname}', 
                '${Request.CmntyBrngy}', 
                '${Request.Activity}', 
                '${Request.Venue}', 
                '${Request.Guests}', 
                '${Request.ComrelEmp}', 
                '${Request.Beneficiaries}', 
                '${Request.Status}', 
                '${Request.DateTime}',
                '${Request.Comment}'
            )
        `);

        console.log("SQL Query Executed Successfully:", request);
        return { success: true, message: "Request inserted successfully" };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, message: "Error inserting request", error };
    }
};
const getRequestEdit = async (RequestID) => {
    try {
        let pool = await sql.connect(config);
        let request = await pool.request()
            .input('RequestID', sql.Int, RequestID)
            .query(`SELECT * FROM RequestForm WHERE RequestID = @RequestID`);
        
        return request;
    } catch (error) {
        console.error("Database Error (getRequest):", error);
        return { success: false, message: "Error fetching request", error };
    }
};

const updateRequest = async (RequestID, Status, Comment) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('RequestID', sql.Int, RequestID)

            .input('Status', sql.NVarChar, Status)
            .input('Comment', sql.NVarChar, Comment)
            .query(`UPDATE RequestForm SET Status = @status, Comment = @Comment WHERE RequestID = @RequestID`);
        return { success: true };
    } catch (error) {
        console.error("Database Error (updateRequestStatus):", error);
        return { success: false, error };
    }
};

const updateRequestCE = async (RequestID, Firstname, Lastname, CmntyBrngy, Activity, Venue, Guests, ComrelEmp, Beneficiaries, Status, DateTime, Comment) => {
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('RequestID', sql.Int, RequestID)
            .input('Firstname', sql.NVarChar, Firstname)
            .input('Lastname', sql.NVarChar, Lastname)
            .input('CmntyBrngy', sql.NVarChar, CmntyBrngy)
            .input('Activity', sql.NVarChar, Activity)
            .input('Venue', sql.NVarChar, Venue)
            .input('Guests', sql.NVarChar, Guests)
            .input('ComrelEmp', sql.NVarChar, ComrelEmp)
            .input('Beneficiaries', sql.NVarChar, Beneficiaries)
            .input('Status', sql.NVarChar, Status)
            .input('DateTime', sql.NVarChar, DateTime)   
            .input('Comment', sql.NVarChar, Comment)    
            .query(`UPDATE RequestForm SET UserFirstname = @Firstname, UserLastname = @Lastname, CmntyBrngy = @CmntyBrngy, Activity = @Activity, Venue = @Venue, Guests = @Guests, ComrelEmp = @ComrelEmp, Beneficiaries = @Beneficiaries, Status = @Status, DateTime = @DateTime, Comment = @Comment  WHERE RequestID = @RequestID`);
        return { success: true };
    } catch (error) {
        console.error("Database Error (updateRequestStatus):", error);
        return { success: false, error };
    }
};




module.exports = {
    getUser,
    createUser,
    getUserById,
    getRequest,
    createRequest ,
    getAllRequests,
    getRequestEdit,
    updateRequest,
    updateRequestCE
}