import './table.css';
import { useParams } from 'react-router-dom'



const Table = (props) => {

    const { roomName } = useParams();

    const { gamers, counter, isViewLink, isShadowX, isShadowO } = props;

    let clazz = isViewLink ? 'link visible' : 'link';
    let clazzX = isShadowX ? "gamer__name name1" : "gamer__name";
    let clazzO = isShadowO ? "gamer__name name1" : "gamer__name";
    
    return (
        <div className="table">
            <h2 className="table__title">Счёт</h2>
            <div className="table__container">
                <div className="gamer__container">
                    <div className="gamer__row1">1 игрок</div>
                    <div className="gamer">
                        <b>{gamers[0].forWhat}</b>
                        <div className={clazzX}>{gamers[0].name}</div>
                    </div>
                </div>
                
                <div className="counter">
                    <div className="counter__col counter_1">{counter.count1}</div>
                    <div className="counter__col">:</div>
                    <div className="counter__col counter_2">{counter.count2}</div>
                </div>

                <div className="gamer__container">
                    <div className="gamer__row2">2 игрок</div>
                    <div className="gamer gamer_end">
                        <div className={clazzO}>{gamers[1].name}</div>
                        <b>{gamers[1].forWhat}</b>
                    </div>
                </div>
                
            </div>
            <div className="link__container">
                <p className={clazz}>По этой ссылке второй игрок может присоединиться к игре:<br/> <a href={`http://localhost:3000/${roomName}`}target='_blank'>http://localhost:3000/{roomName}</a></p>
            </div>
        </div>
        
    )
}

export default Table;