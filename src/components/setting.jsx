import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DarkModeContext } from "../DarkModeProvider";

const Settings = () => {

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
          color: '#A0AAB4',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#B2BAC2',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#E0E3E7',
          },
          '&:hover fieldset': {
            borderColor: '#B2BAC2',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#6F7E8C',
          },
        },
    });

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(grey[500]),
        backgroundColor: grey[50],
        '&:hover': {
          backgroundColor: grey[400],
        },
        marginTop : 10
      }));
      
    const [token, setToken] = useState(Cookies.get('token'));
    const [updateSection, setupdateSection] = useState(false);
    const [updateTok, setUpdateTok] = useState("");
    const [theme, setTheme] = useState(Cookies.get('mode'));
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);

    let updateToken = (e) => {
        e.preventDefault();
        if(updateTok === ""){
            Swal.fire({
                icon : 'warning',                
                text: `Token should not be empty`,
            })
            return;
        }
        Swal.fire({
            icon : 'question',
            title: 'Are you sure?',
            text: `You are going to update the token and the previous token cannot be recovered`,
            showCancelButton : true,
            confirmButtonText : "Confirm",   
            cancelButtonText: "Cancel",
        }).then(function(value){
            if(value.isConfirmed === true){
                setToken(updateTok);
                Cookies.set('token', updateTok);
                setupdateSection(false);
                setUpdateTok("");
            }
            else if(value.isDismissed === true){
                setupdateSection(false);
                setUpdateTok("");
            }
        })
    }

    let handleInput = ((e) => {    
        console.log(e.target.value);    
        setUpdateTok(e.target.value);
    })

    let handleChange = ((e) => {
        if(theme !== e.target.value){
            setTheme(e.target.value);
        //     console.log(e.target.value);  
        //     // Cookies.set('mode', e.target.value);      
        //     Cookies.set('mode', e.target.value); 
        //     if(e.target.value == 'dark'){     
        //         debugger 
        //         Cookies.set('darkMode', true);  
        //     }else{
        //         Cookies.set('darkMode', false); 
        //     }       
        //     toggleDarkMode();
        }       
    })

    return ( 
        <>
        {/* <div className={darkMode ? `Container-dark` : `Container-light`}> */}
            <div className="settingHead mb-3">
                <h1>Settings</h1>                
            </div> 
            <hr />
            <section>
                <div className="mb-1"><b>TOKEN</b></div>
                <div className="settingbody input-group mb-3 mt-4">          
                    <div className="tokencontainer w-100 ">
                        <CssTextField fullWidth label="Current token" id="custom-css-outlined-input" value={token}/> 
                    </div>  
                    { !updateSection && 
                        <div className="updatebutton input-group-append">
                            <ColorButton variant="text" onClick={() => setupdateSection(true)}>Update Token</ColorButton>
                        </div> 
                    }
                </div>
                { updateSection && 
                    <div id="updtToken">
                        <CssTextField fullWidth label="Paste new token here" autoFocus id="custom-css-outlined-input1" value={updateTok} onChange={handleInput}/>
                        <ColorButton variant="text" onClick={updateToken} >Update</ColorButton>
                        <ColorButton variant="text" onClick={() => setUpdateTok("")} >Cancel</ColorButton>
                    </div>
                }
            </section>
            <hr />
            <section>
                <div className="mt-4 mb-4"><b>THEME</b></div>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Theme</InputLabel>
                <Select labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Theme" 
                    value={theme} onChange={handleChange}>
                    <MenuItem value={'light'}>Light Mode (Default)</MenuItem>
                    <MenuItem value={'dark'}>Dark Mode</MenuItem>
                </Select>
                </FormControl>
            </section>
        {/* </div> */}
        </>
    );
}
 
export default Settings;