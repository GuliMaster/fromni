import { useState } from 'react';
import s from './Message.module.css';
import { Card, Input, Radio, Divider, Row, Col, Button } from 'antd';

const { TextArea } = Input;

const displayOptions = [
    { label: 'Стандартное', value: 'Standart' },
    { label: 'Inline', value: 'Inline' },
];

const buttonOptions = [
    { label: 'Быстрый ответ', value: 'QuickAnswer' },
    { label: 'Ссылка', value: 'Link' },
];

const Message = () => {
    return (
        <Card className={s.card} title="Настройте сообщение для Вконтакте:">
            <TextMessage />
            <Divider />
            <Keyboard />
        </Card>
    )
}

const TextMessage = () => {
    return (
        <div className={s.textMessage}>
            <p>Текст сообщения:</p>
            <TextArea className={s.textArea} rows={4} placeholder="Максимальная длина - 6" maxLength={232323} />    
        </div>
    )
} 

const Keyboard = () => {
    const [value3, setValue3] = useState('Standart');

    const onChange3 = ({ target: { value } }) => {
        setValue3(value);
    };

    return (
        <div className={s.keyboard}>
            <p>Настройки клавиатуры:</p>
            <div className={s.keyboardSettings}>
                <div className={`${s.settingBlock} ${s.displayKeyboard}`}>
                    <p>Отображение:</p>
                    <Radio.Group options={displayOptions} onChange={onChange3} value={value3} optionType="button" />
                </div>
                <div className={s.settingBlock}>
                    <p>Кнопки:</p>
                    <div className={s.buttonsContainer}>
                        <div className={s.addForm}>
                            <Input className={s.input} placeholder="Введите текст кнопки..." />
                            <Radio.Group options={buttonOptions} onChange={onChange3} value={value3} optionType="button" />
                            <Button className={s.addButton} type="primary">Добавить</Button>
                        </div>
                        <div className={s.buttons}>
                            <Row gutter={[16, 16]}>
                                <Col span={6}>
                                    <div className={s.button}>
                                        1
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className={s.button}>
                                        2
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className={s.button}>
                                        3
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className={s.button}>
                                        4
                                    </div>
                                </Col>
                                <Col span={6}>
                                    <div className={s.button}>
                                        5
                                    </div>
                                </Col>
                            </Row>
                        </div>       
                    </div>
                </div>
            </div>
        </div>
    )
} 
export default Message;

