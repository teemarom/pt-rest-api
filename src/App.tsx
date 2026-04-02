import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';

function App() {
  

  return (
    <>
      <Container maxWidth="lg">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>PersonalTrainer</Typography>
          </Toolbar>
        </AppBar>

        <CustomerList />
        <TrainingsList />

        <CssBaseline />
      </Container>
      
    </>
  )
}

export default App
