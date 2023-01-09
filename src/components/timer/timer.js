import './timer.css';


const Timer = (props) => {

    let clazz = props.isTime ? 'timer' : 'timer visible';

    return (
        <div className={clazz}>
            <div className="timer__window">Ваш ход закончится через {props.time} сек</div>
        </div>
    )
}

export default Timer;
