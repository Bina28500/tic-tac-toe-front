import { useState } from 'react';
import './modal.css';
import { socket } from '../../services/ServiceIO';




const Modal = () => {

    const [gamerName, setGamerName] = useState('');
    const [isModal, setIsModal] = useState(false);
    

    const changeValue = (e) => {
        setGamerName(e.target.value);
    }

    const signUp = () => {
        if (gamerName.trim().length < 3 ) return;
        socket.emit('name', gamerName);
        setIsModal(true);
    }


    let clazz = isModal ? 'fixed_overlay visible' : 'fixed_overlay';

    return (
        <div className={clazz}>
            <div className="modal">
                <div className="top_row">
                    <span>Введите своё имя</span>
                </div>
                <div className="modal__input">
                    <p>Ввести не менее 3-х символов</p>
                    <input type="text" name='gamerName' className='modal__name' required
                        onChange={changeValue}
                        value={gamerName} />
                    <button className=' btn modal__button'
                        onClick={ signUp }>
                        Зарегистрироваться</button>
                </div>
            </div>
        </div>

    )
}

export default Modal;