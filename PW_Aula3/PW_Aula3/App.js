import './App.css';
import Header from './header/Header';
import Players from './players/Players';
import LoginForm from './login/LoginForm';
import {Route, Routes } from "react-router-dom";
import HomePage from './homePage/HomePage';

function App(){
    return (
        <div className="App">
            <Header />
            <main>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/login' element={<LoginForm />} />
                    <Route path='/players' element={<Players />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;