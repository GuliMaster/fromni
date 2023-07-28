import s from './Settings.module.css';
import Channels from "./Channels/Channels";
import Message from "./Message/Message";
import { Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { errorSelector } from '../../Redux/selectors/errorSelector';
import { saveChannels, setError } from '../../Redux/reducers/channelsReducer';
import { useEffect, useState } from 'react';
import { selectChannels } from '../../Redux/selectors/channelsSelector';

const Settings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const error = useSelector(errorSelector);

    useEffect(() => {
        if (error) showModal();
    }, [error]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        dispatch(setError(null));
        setIsModalOpen(false);
    };

    return (
        <div className={s.settings}>
            <div className={s.container}>
                <Channels />
                <SaveButton />
            </div>
            <Message />
            {
                error &&
                <Modal title="Упс...Ошибка... :(" open={isModalOpen} onOk={handleOk} onCancel={handleOk} okText='ОК' cancelButtonProps={{ style: { display: 'none' } }}>
                    <p>{error}</p>
                </Modal>
            }
        </div>
    )
}

const SaveButton = () => {
    const channels = useSelector(selectChannels);
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(saveChannels(channels));
    }

    return (
        <Button className={s.button} type="primary" onClick={handleSave}>Сохранить</Button>
    )
}
export default Settings;