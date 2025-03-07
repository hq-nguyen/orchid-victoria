import './App.css';
import ScrollTop from './component/ScrollTop/ScrollTop';
import Routes from './routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <>
            <ScrollTop />
            <Routes />
            <Toaster />
        </>
    );
}

export default App;
