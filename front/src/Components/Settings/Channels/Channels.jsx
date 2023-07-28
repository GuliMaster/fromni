import { Card, Switch } from 'antd';
import s from './Channels.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchChannels, setSelectedChannel, switchChannel, fetchChannelParams } from '../../../Redux/reducers/channelsReducer';
import { selectChannels, selectSelectedChannelData } from '../../../Redux/selectors/channelsSelector';

const Channels = () => {
    const dispatch = useDispatch();
    const channels = useSelector(selectChannels);

    useEffect(() => {
        dispatch(fetchChannels());
    }, [dispatch]);

    return (
        <Card className={s.card} title="Выберите каналы и их порядок:">
            {
                channels && channels.map(el =>
                    <Channel key={el.id} data={el}/>
                )
            }
        </Card>
    )
}

const Channel = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState();

    const dispatch = useDispatch();
    const selectedChannel = useSelector(selectSelectedChannelData);

    useEffect(() => {
        if(props.data) setData(props.data);
    }, [props.data]);

    useEffect(() => {
        (selectedChannel && data && data.id === selectedChannel.id) ? setIsActive(true) : setIsActive(false);
    }, [selectedChannel, data]);

    const handleSwitch = (channel, checked) => {
        dispatch(switchChannel(channel, checked));
    };

    const handleSelectChannel = (id) => {
        dispatch(setSelectedChannel(id));
        dispatch(fetchChannelParams(id));
    };


    if (data) return (
        <div className={`${s.channel} ${isActive && s.activeChannel}`} onClick={!isActive ? ()=>handleSelectChannel(data.id) : ()=>{}}>
            <Switch checkedChildren={data.order || ''} checked={data.order && true} onClick={(checked) => handleSwitch(data, checked)} />
            <p>{data.name}</p>
        </div>
    )
}

export default Channels;