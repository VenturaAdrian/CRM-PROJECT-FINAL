import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const Homepage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {userID,userRole} = location.state || {};
    
    const role = ['CE' , 'CRO' , 'DHCR3', 'CDH']
  useEffect(() => {
    if(role.includes(userRole)){
      switch (userRole){
        case "CE":
          return navigate('/homeCE');
        case "CRO":
          return navigate('/reviewCRO'); 
        case "DHCR3":
          return navigate('/homeDHCR3');
        case "CDH":
          return navigate('/homeCDH');
        default:
          return <p>NO DASHBOARD</p>
      }
    }else{
      return ;
    }
  },[userRole, navigate]);

  return (
    <div>
        <h1>INVALID USER NO ROLE</h1>
       {/* <p>Welcome, User {userID}</p>
       <p>Role: {userRole}</p> */}
    </div>
    
  );

}

export default Homepage;
