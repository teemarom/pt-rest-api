import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';
import { Link, Outlet } from 'react-router';

function App() {
  

  return (
    <>
      <Container maxWidth="lg">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>PersonalTrainer</Typography>
          </Toolbar>
        </AppBar>

        <nav>
          <Link to={"/"}>Home </Link><br/>
          <Link to={"/customerlist"}>Customer List </Link><br/>
          <Link to={"/trainingslist"}>Trainings List </Link>
        </nav>
        <Outlet />

        <CssBaseline />
      </Container>
      
    </>
  )
}

export default App
