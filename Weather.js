import LoopIcon from '@mui/icons-material/Loop';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React from 'react';

export default function Weather() {
  const [city, setCity] =React.useState('');
  const [weatherData, setWeatherData] =React. useState(null);
  const [isloading,setisloading]=React.useState(false);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = () => {
    let apiKey = 'bcf71a78f2714a1c84e85029242402';
    setisloading(true)
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`)
      .then((res) => {
        console.log(res.data);
        setWeatherData(res.data);
        setisloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <center>
              WEATHER APP BY MAULI
            </center>
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <TextField id="standard-basic" label="SEARCH CITY" variant="standard" onChange={handleChange} />
        <Button variant="contained" onClick={handleClick}>
          CLICK HERE
        </Button>
      </div>
      {isloading?(<div><LoopIcon/></div>):(weatherData && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell align="right">Region</TableCell>
                <TableCell align="right">Humidity</TableCell>
                <TableCell align="right">Temperature C</TableCell>
                <TableCell align="right">Temperature F</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{weatherData.location.name}</TableCell>
                <TableCell align="right">{weatherData.location.region}</TableCell>
                <TableCell align="right">{weatherData.current.humidity}</TableCell>
                <TableCell align="right">{weatherData.current.temp_c}</TableCell>
                <TableCell align="right">{weatherData.current.temp_f}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Box>
  );
}
