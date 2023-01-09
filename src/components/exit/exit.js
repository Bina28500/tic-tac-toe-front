import './exit.css';
import { Link } from 'react-router-dom';

const Exit = (props) => {

    return (
        <div className="exit__container">
            <Link to='/' className="btn exit__exit" onClick={props.exit}>Выйти</Link>
            <a className="btn exit__reset" onClick={props.reset}>Повторить</a>
        </div>
    )
}

export default Exit;