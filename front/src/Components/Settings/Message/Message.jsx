import { useEffect, useState } from 'react';
import s from './Message.module.css';
import { Card, Input, Radio, Divider, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectButtons, selectInlineParams, selectKeyboardType, selectSelectedChannel, selectSelectedChannelData, selectStandartParams, selectText, selectTextLength, } from '../../../Redux/selectors/channelsSelector';
import { addButton, deleteButton, setSettings } from '../../../Redux/reducers/channelsReducer';

const { TextArea } = Input;

const Message = () => {
    const selectedChannel = useSelector(selectSelectedChannelData);

    if (selectedChannel) return (
        <Card className={s.card} title={`Настройте сообщение для ${selectedChannel.name}:`}>
            <TextMessage />
            <Divider />
            <Keyboard />
        </Card>
    )
}

const TextMessage = () => {
    const [value, setValue] = useState('');
    
    const dispatch = useDispatch();
    const textLength = useSelector(selectTextLength);
    const text = useSelector(selectText);
    const selectedId = useSelector(selectSelectedChannel);

    useEffect(() => {
        setValue(text);
    }, [text]);

    const handleChange = ({ target: { value } }) => {
        dispatch(setSettings(selectedId, 'text', value));
    }

    return (
        <div className={s.textMessage}>
            <p>Текст сообщения:</p>
            <TextArea className={s.textArea} value={value} rows={4} placeholder={`Максимальная длина - ${textLength}`} maxLength={textLength} onChange={e => handleChange(e)} />
        </div>
    )
}

const Keyboard = () => {
    const [value, setValue] = useState('standart');
    const [params, setParams] = useState();

    const dispatch = useDispatch();
    const standartParams = useSelector(selectStandartParams);
    const inlineParams = useSelector(selectInlineParams);
    const type = useSelector(selectKeyboardType);
    const selectedId = useSelector(selectSelectedChannel);

    useEffect(() => {
        if (type) setValue(type);
    }, [type]);

    useEffect(() => {
        if (value === 'standart') setParams(standartParams);
        if (value === 'inline') setParams(inlineParams);
    }, [value, standartParams, inlineParams]);

    const onChange = ({ target: { value } }) => {
        dispatch(setSettings(selectedId, 'keyboardType', value));
    };

    if (params && params.amountButtons !== 0) return (
        <div className={s.keyboard}>
            <p>Настройки клавиатуры:</p>
            <div className={s.keyboardSettings}>
                <div className={`${s.settingBlock} ${s.displayKeyboard}`}>
                    <p>Отображение:</p>
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio.Button value="standart">Стандартное</Radio.Button>
                        <Radio.Button value="inline">Inline</Radio.Button>
                    </Radio.Group>
                </div>
                <Buttons params={params} />
            </div>
        </div>
    )
}

const Buttons = ({ params }) => {
    const [buttons, setButtons] = useState([]);
    const [value, setValue] = useState('');
    const [type, setType] = useState('quick');

    const dispatch = useDispatch();
    const buttonsValues = useSelector(selectButtons);
    const selectedId = useSelector(selectSelectedChannel);

    useEffect(() => {
        setButtons(buttonsValues);
    }, [buttonsValues]);

    const onChangeValue = ({ target: { value } }) => {
        setValue(value);
    };

    const onChangeType = ({ target: { value } }) => {
        setType(value);
    };

    const handleAddNewButton = () => {
        dispatch(addButton({idChannel: selectedId, text: value, type: type}));
    }
    const handleDeleteButton = (id) => {
        dispatch(deleteButton(id, selectedId));
    }
    return (
        <div className={s.settingBlock}>
            <p>Кнопки (максимальное количество - {params.amountButtons || 'не ограничено'}{params.amountLinks ? `, ссылок - ${params.amountLinks}` : ''}):</p>
            <div className={s.buttonsContainer}>
                <div className={s.addForm}>
                    <Input className={s.input} placeholder={`Максимальная длина - ${params.buttonTextLength || 'не ограничено'}`} value={value} onChange={onChangeValue} maxLength={params.buttonTextLength}/>
                    <Radio.Group onChange={onChangeType} value={type}>
                        <Radio.Button value="quick">Быстрый ответ</Radio.Button>
                        <Radio.Button value="link" disabled={!params.isAvailableLinks || (params.amountLinks && buttons.filter(el => el.buttonType === 'link').length >= params.amountLinks)}>Ссылка</Radio.Button>
                    </Radio.Group>
                    <Button className={s.addButton} type="primary" onClick={handleAddNewButton} disabled={!value || params.amountButtons === buttons.length}>Добавить</Button>
                </div>
                <div className={s.buttons}>
                    <Row gutter={[16, 16]}>
                        {
                            buttons && buttons.map((el, i) =>
                                <Col key={i} span={6}>
                                    <div className={`${s.button} ${el.buttonType === 'link' && s.link}`} onDoubleClick={()=>handleDeleteButton(el.id)}>
                                        <p>{el.text}</p>
                                    </div>
                                </Col>
                            )
                        }
                    </Row>
                </div>
            </div>
        </div>
    )
}
export default Message;

