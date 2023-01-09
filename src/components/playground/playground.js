import { useState, useEffect } from 'react';
import './playground.css';
import { socket } from '../../services/ServiceIO';
import Timer from "../../components/timer/timer";
import ModalEnd from '../../components/modal/modalEnd';
import Exit from '../../components/exit/exit';
import Table from "../../components/table/table";

const Playground = (props) => {
    console.log('RENDER');
    const [table, setTable] = useState(
        [
            ['1,1', null],
            ['1,2', null],
            ['1,3', null],
            ['2,1', null],
            ['2,2', null],
            ['2,3', null],
            ['3,1', null],
            ['3,2', null],
            ['3,3', null]
        ]
    );
    const [disable, setDisable] = useState(true);
    const [step, setStep] = useState(0);
    const [time, setTime] = useState(-2);
    const [isTime, setIsTime] = useState(false);
    const [message, setMessage] = useState({ mesg: '', visible: true });
    const [isTimerPrev, setIsTimerPrev] = useState(false);
    const [disableFinaly, setDisableFinaly] = useState(false);
    const [isFirstTimer, setIsFirstTimer] = useState(false);
    const [repeatMessg, setRepeatMessg] = useState(false);
    const [isShadowX, setIsShadowX] = useState(false);
    const [isShadowO, setIsShadowO] = useState(false);
    const [noYourStep, setNoYourStep] = useState(true);
   
    let onTimer;

    const { word, clearCounter, isViewLink, clearGamer, gamers, counter } = props;

    useEffect(() => {
        if (word === 'x' && isViewLink) {
            setIsFirstTimer(true);
            setDisable(false);
        }
    }, [word, isViewLink]);

    useEffect(() => {
        if (isViewLink) {
            setIsShadowX(true);
        }
    }, [isViewLink]);


    const doStep = (numberCel, valueCel) => {
        if (valueCel || disable || disableFinaly) return;
        setStep(step + 1);
        const stepString = '' + (step + 1);
        const dataCell = JSON.stringify({ [numberCel]: word, 'step': stepString });
        socket.emit('step', dataCell);
        setTable((prevState) => {
            return prevState.map(cel => {
                if (cel[0] === numberCel) {
                    cel[1] = word;
                    return cel;
                } else return cel;
            })
        });
        setDisable(true);
        stopTimer();
        setIsTimerPrev(false);
        setIsFirstTimer(false);
        setIsShadowX(isShadowX => !isShadowX);
        setIsShadowO(isShadowO => !isShadowO);
    } 


    useEffect(() => {
        socket.on('stepback', (data) => {
            let ndata = JSON.parse(data); 
            setTable(
                (prevState) => {
                    return prevState.map(cel => {
                        if (cel[0] === Object.keys(ndata)[0]) {
                            cel[1] = Object.values(ndata)[0];
                            return cel;
                        } else return cel;
                    })
                }
            );
            setDisable(false);
            setIsTime(true);
            setTime(15);
            setIsShadowX(isShadowX => !isShadowX);
            setIsShadowO(isShadowO => !isShadowO);
            setNoYourStep(true);
        });
        return () => {
            socket.off('stepback');
        };
    }, []);

    const stopTimer = () => {
        clearInterval(onTimer);
        setIsTime(false);
        setTime(-2);
    }


    useEffect(() => {
        if (time === -2) return;
        onTimer = setInterval(() => {
            setTime(time - 1);
        }, 1000);
        if (time <= 0) {
            stopTimer();
            socket.emit('timeOut');
        };
        return () => (clearInterval(onTimer));
    }, [time]);


    const close = () => {
        setMessage({ mesg: '', visible: true });
    }

    const clearPlayground = () => {
        setTable(
            (prevState) => {
                return prevState.map(cel => {
                    cel[1] = null;
                    return cel;
                })
            }
        );
        setStep(0);
    };

    useEffect(() => {
        let stop;
        socket.on('winMessage', (message) => {
            setMessage({ mesg: message[0], visible: false });
            stopTimer();
            if (word !== message[1]) {
                setDisableFinaly(true);
            }
            stop = setTimeout(() => {
                clearPlayground();
                if (word !== message[1] && noYourStep) {
                    setIsTimerPrev(true);
                    setDisableFinaly(false);
                }
            }, 5000);
        });

        socket.on('noWin', (message) => {
            setMessage({ mesg: message[0], visible: false });
            stopTimer();
            if (word !== message[1] && noYourStep) {
                setDisableFinaly(true);
            }
            stop = setTimeout(() => {
                clearPlayground();
                if (word !== message[1]) {
                    setIsTimerPrev(true);
                    setDisableFinaly(false);
                }
            }, 5000);
        });

        socket.on('finalWinMessage', (message) => {
            setMessage({ mesg: message, visible: false });
            stopTimer();
            setDisableFinaly(true);
            stop = setTimeout(() => {
                clearPlayground();
                setRepeatMessg(true);
            }, 5000);
        });

        return () => {
            socket.off('winMessage');
            socket.off('noWin');
            socket.off('finalWinMessage');
            clearTimeout(stop);
        };
    }, [word, noYourStep]);

    const reset = () => {
        if (isViewLink) {
            socket.emit('reset');
        } 
    }

    useEffect(() => {
        socket.on('resetBack', () => {
                setDisableFinaly(false);
                clearCounter();
                setRepeatMessg(false);
                stopTimer();
                clearPlayground();
                setIsTimerPrev(false);
                setIsShadowX(true);
                setIsShadowO(false);
                setNoYourStep(false);
                if (word === 'x') {
                    setIsFirstTimer(true);
                    setDisable(false);
                }
                if (word === 'o') {
                    setDisable(true);
                }
            })
    }, [word]);


    const exit = () => {
        socket.emit('exit');

    }

    useEffect(() => {
        socket.on('exitBack', (message) => {
            setMessage({ mesg: message[0], visible: false });
            stopTimer();
            clearGamer(message[1]);
        })
    }, []);



    let clazz1 = isTimerPrev ? "timer__prev" : "timer__prev visible";
    let clazz2 = isFirstTimer ? "timer__prev" : "timer__prev visible";
    let clazz3 = repeatMessg ? "timer__prev" : "timer__prev visible";
  
    return (
        <>
            <Table gamers={gamers} counter={counter} isViewLink={isViewLink} isShadowX={isShadowX} isShadowO={isShadowO} />
            <div className="timer__block">
                <div className={clazz1}>Сейчас Ваш ход</div>
                <div className={clazz2}>Сейчас Ваш ход</div>
                <div className={clazz3}>Если Вы хотите повторить игру с начала, нажмите кнопку "повторить" </div>
                <Timer time={time} isTime={isTime} />
            </div>
            <ul className="table__table">
                {
                    table.map(cel => {
                        return (
                            <li className='table__cel'
                                key={cel[0]}
                                id={cel[0]}
                                onClick={() => doStep(cel[0], cel[1])} >
                                {cel[1]}</li>
                        )
                    })
                }
            </ul>
            <Exit reset={reset} exit={exit} />
            <ModalEnd message={message} close={close} />
        </> 
    )
}

export default Playground;