
import './StartPage.css';
import { useState, useEffect } from 'react';
import Playground from "../components/playground/playground";
import Modal from "../components/modal/modal";
import { socket } from '../services/ServiceIO';
import { useParams } from 'react-router-dom'


const MainPage = () => {

    const [gamers, setGamers] = useState(
        [
            { name: '', forWhat: '' },
            { name: '', forWhat: '' }
        ]
    );
    const [counter, setCounter] = useState({ count1: 0, count2: 0 });
    const [isViewLink, setIsViewLink] = useState(false);
    const [word, setWord] = useState();

    const { roomName } = useParams();
    useEffect(() => {
        socket.emit('join', roomName);
        return () => {
            socket.off('join');
        };
    }, []);

    useEffect(() => {
        socket.on('forWhat', (word) => {
            setWord(word);
        });
        return () => {
            socket.off('forWhat');
        };
    }, []);

    useEffect(() => {
        socket.on('gamerDetails', (gamerDetails) => {
            setGamers(gamerDetails);
            if (gamerDetails[1].name) {
                setIsViewLink(true);
            };
        });

        socket.on('newScore', (score) => {
            setCounter({ count1: score[0], count2: score[1] });
        });

        return () => {
            socket.off('gamerDetails');
            socket.off('newScore');
            socket.off('join');
        };
    }, []);

    const clearCounter = () => {
        setCounter({ count1: 0, count2: 0 });
    }

    const clearGamer = (forWhat) => {
        setGamers((prevGamers) => {
            return prevGamers.map(obj => {
                if (forWhat !== obj.forWhat) {
                    return Object.assign({}, obj);
                } else {
                    return Object.assign(obj, { name: 'Незнакомец' });
                }
            })
        })
    };
   
    
    return (
        <> 
            <Playground clearCounter={clearCounter} word={word} isViewLink={isViewLink} clearGamer={clearGamer}
                gamers={gamers} counter={counter}/>
            <Modal />
        </>
    )
}

export default MainPage;
