import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet } from 'react-router';

function App() {
  

  return (
    <>
      <Container maxWidth="xl">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>PersonalTrainer</Typography>
          </Toolbar>
        </AppBar>

        <nav  style={{ marginTop: "16px", marginBottom: "16px" }}>
          <Link to={"/"}>Home </Link>
          <Link to={"/customerlist"}>Customer List </Link>
          <Link to={"/trainingslist"}>Trainings List </Link>
          <Link to={"/eventcalendar"}>Event Calendar</Link>
        </nav>
        <Outlet />

        <CssBaseline />
      </Container>
      
    </>
  )
}

export default App
