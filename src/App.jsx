import './App.css';
import ScrollTop from './components/ScrollTop/ScrollTop';
import { AuthContextProvider } from './context/AuthContext';
import Routes from './routes/Routes';
import { Toaster } from 'react-hot-toast';
import 'aos/dist/aos.css';

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
