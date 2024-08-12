import PlayerTable from "./PlayerTable";
import PlayersForm from "./add/PlayersForm";
import './Players.css';
import config from "../config";
import { Navigate, Link, useLocation } from "react-router-dom";
import React, {useState, useEffect} from 'react';

const Players = () => {
    let navite = useNavigate();
    let location = useLocation();

    const [loading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [userLogged, setUserLogged] = useState(true);

    const onClickShowForm = () => {
        setShowForm(!showForm);
    };
    const onClickLogout = () => {
        fetch('/auth/logout', {
            headers: {'Accept': 'application/json'}
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.logout) {
                setUserLogged(false);
            }
        })
        .catch(() => {
            setUserLogged(false);
        })
    }
    useEffect(() => {
        fetch('/team/players', {
            headers: {'Accept': 'application/json', 'x-access-token': config.token},
        })
        .then((response) => response.json())
        .then((response) => {
            const {auth, players = []} = response;
            setUserLogged(response.auth);

            if(auth) {
                setLoading(false);
                setPlayers(players);
            }
        })
        .catch(() => {
            setUserLogged(false);
        })
    }, [])

    const showFormMessage = showForm ? 'Hide Form': 'Show Form';

    if(!userLogged) {
        navigate('/');
    }
    if(!config.token) {
        navite('/');
    }
    if (loading) {
        return <h1> LOADING... </h1>;
    }
    return(
        <div className='players'>
            <div className='links'>
                <Link to='/'> HomePage </Link>
                <button className="buttons" onClick={onClickShowForm}>
                    {
                        showFormMessage
                    }
                </button>
                <button className="buttons" onClick={onClickLogout}>
                    Logout
                </button>
            </div>
            <label> PLAYERS: </label>
            <div className='player-container'>
                <PlayerTable />
            </div>
            {showForm && <PlayersForm />}
        </div>
    )
}