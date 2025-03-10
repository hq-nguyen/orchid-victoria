import './App.css';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { AuthContextProvider } from './context/AuthContext';
import Routes from './routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <AuthContextProvider>
                <ScrollTop />
                <Routes />
                <Toaster />
            </AuthContextProvider>
        </>
    );
}

export default App;
