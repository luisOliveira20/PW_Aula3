import './Players.css';
import { useLocalStorage } from 'react-use-storage';
import { getPreferencesUrlToStorage, preferencesToStorage } from '../utils/localStorage';

const Player = (props) => {
    const renderHobbies = (hobbies) => {
        return hobbies.map((hobbie) => {
            return (
                <label key={hobbie._id}> {hobbie.name}; </label>
            )
        })
    }
    const preferences = getPreferencesUrlToStorage('table');
    const [preferencesStorage, setPreferencesToStorage] = useLocalStorage(preferences, {
        current: preferences[preferencesToStorage.PAGE_TABLE] || 1
    });
    const [data, setData] = useState({
        players: [],
        pagination: {
            current: 1,
            pageSize: 2,
            total: 0,
            ...preferencesStorage
        }
    });
    setData({
        players,
        pagination:(
            current: currentPage,
            pageSize: pagination.pageSize || 10,
            total: pagination.total || 5
        )
    });
    setPreferencesToStorage({
        current: currentPage
    });
    return (
        <li className="player">
            <div className="player-cell player-name">
                <label className="player-label"> Name: {props.name} </label>
            </div>
            <div className="player-cell player-lastName">
                <label className="player-label"> LastName: {props.lastName} </label>
            </div>
            <div className="player-cell player-hobbies">
                <label className="player-label">Hobbies:
                    {
                        renderHobbies(props.hobbies)
                    }
                </label>
            </div>
        </li>
    )
}

export default Player;