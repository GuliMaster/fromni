import { Card, Switch } from 'antd';
import s from './Channels.module.css';

const Channels = () => {
    return (
        <Card className={s.card} title="Выберите каналы и их порядок:">
            <div className={s.channel}>
                <Switch checkedChildren="1" />
                <p>ВКонтакте</p>
            </div>
            <div className={s.channel}>
                <Switch checkedChildren="1" />
                <p>ВКонтакте</p>
            </div>
            <div className={s.channel}>
                <Switch checkedChildren="1" />
                <p>ВКонтакте</p>
            </div>
            <div className={s.channel}>
                <Switch checkedChildren="1" />
                <p>ВКонтакте</p>
            </div>
        </Card>
    )
}

export default Channels;