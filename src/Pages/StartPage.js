import './StartPage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../services/ServiceIO';



const StartPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        socket.on('roomName', (roomName) => {
            navigate(`/${roomName}`);
        });
        return () => {
            socket.off('roomName');
        };
    }, []);


    return (
        <div className="startpage__container">
            <h2>Правили игры</h2>
            <p className="startpage__rules">
                1. Играют два игрока.<br />
                2. После регистрации первый игрок отправляет полученную ссылку другу.<br />
                3. Второй игрок переходит по полученной ссылке и регистрируется.<br /> 
                4. Право хода принадлежит игроку, имя которого подсвечено красным цветом.<br />
                5. 15 секунд на ход. Если ход, не совершен в течение 15 секунд - засчитывается победа сопернику.<br />
                6. Условие окончательной победы: если один игрок победил 3 раза подряд (ничья не прерывает серию выигрышей) или в сумме у одного вышло 10 побед.<br />
                7. Игру можно в любой момент обнулить и начать заново, нажав кнопку "повторить" любым игроком.<br />
                8. Нажав кнопку "выйти", игра прерывается полностью.<br />
                9. Во время игры обновлять страницу в браузере "ЗАПРЕЩЕНО".
            </p>
            <button onClick={() => {
                socket.emit('start');
            }}
                className=' btn start__button'>Начать</button>
        </div>
    );
}

export default StartPage;