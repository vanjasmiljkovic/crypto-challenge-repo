import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container} from "react-bootstrap";
import {Latest} from "./components/Latest";
import {Historical} from "./components/Historical";

function App() {
    return (
        <Container>
            <Latest />
            <Historical />
        </Container>
    );
}

export default App;
