import { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./CreateAccount.css"




const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];




export default function CreateAcccount(){

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  
    
    return(
        <div className="Login">
                <h2>Create you account</h2>
            <div style={{ marginTop:"30px",display:"flex", flexDirection:"column", gap:"20px"}}>
                 
        <Select
            className="loginInputs"
            multiple
            displayEmpty
            value={personName}
            onChange={handleChange} 
            renderValue={(selected) => {
                if (selected.length === 0) {
                return <em>USER TYPE</em>;
                }

                return selected.join(', ');
            }}
            inputProps={{ 'aria-label': 'Without label' }}
          
        >
          <MenuItem  disabled value="">
            <em >USER TYPE</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        
        <TextField 
            fullWidth
            variant="outlined"
            label="Email or Username"
            className="loginInputs"
            sx={{width:"400px", height:"50px"}}
        />

         <br />
        <TextField 
            className="loginInputs"
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            sx={{width:"400px", height:"50px"}}
        />
<br />
        <Button 
        className="loginbutton"
        fullWidth
        variant="contained"
        sx={{width:"400px", height:"50px"}}
        >
        Next
        </Button>
            </div>
            <p>Already Have an Account? <a href="">Login</a></p>

        </div>
    )
}