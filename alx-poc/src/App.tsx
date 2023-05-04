import './App.css';
import Setting from './components/setting/setting';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import logo from './logo.png';

function App() {
  // Or Create your Own theme:
  const theme = createTheme({
    palette: {
      primary: {
        main: '#008026'
      },
      secondary: {
        main: '#008026'
      }
    }
  });
  return (
    <MuiThemeProvider theme={theme}>
      <div className='header'>
        <div className='container'>
          <img src={logo} alt="Logo" className='App-logo' />
        </div>
      </div>
      <div className="App">
        <Setting />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
