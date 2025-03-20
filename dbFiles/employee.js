class Employee{
    constructor(UserID, Firstname, Lastname, UserRole, Password){
        this.UserID = UserID;
        this.Firstname = Firstname;
        this.Lastname = Lastname;
        this.UserRole = UserRole;
        this.Password = Password;
    }
}

module.exports = Employee;