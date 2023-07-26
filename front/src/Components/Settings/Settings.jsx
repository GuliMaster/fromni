import s from './Settings.module.css';
import Channels from "./Channels/Channels";
import Message from "./Message/Message";
import { Button } from 'antd';

const Settings = () => {
    return (
        <div className={s.settings}>
            <div className={s.container}>
                <Channels />
                <Button className={s.button} type="primary">Сохранить</Button>
            </div>
            <Message />
        </div>
    )
}

export default Settings;