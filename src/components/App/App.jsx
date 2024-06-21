import { Route, Routes } from "react-router-dom";
import APIForm from "../APIForm/APIForm";
import People from "../People/People";
import Planet from "../Planet/Planet";
import "./App.css";

function App() {
    return (
        <div className="App">
            <h1>Luke API Walker</h1>
            <APIForm />
            <Routes>
                <Route path="/people" element={<People />} />
                <Route path="/people/:id" element={<People />} />
                <Route path="/planets" element={<Planet />} />
                <Route path="/planets/:id" element={<Planet />} />
            </Routes>
        </div>
    );
}

export default App;
