import './modal.css';




const ModalEnd = (props) => {

    const { message, close } = props;

    let clazz = message.visible ? 'fixed_overlay visible' : 'fixed_overlay';

    return (
        <div className={clazz}>
            <div className="modal">
                <div className="top_row">
                    <span className='modal__end_span'>{ message.mesg }</span>
                    <div className="close" onClick={close}>
                        <div className="line close__one"></div>
                        <div className="line close__two"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default ModalEnd;