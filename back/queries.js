const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'Fromni',
  password: 'user',
  port: 5432,
});

const getChannels = async (req, res) => {
    let channelsInfo = await getChannelsInfo(req)
                                .then(res => res.rows)
                                .catch(err => res.status(500).json(err));
    
    let buttonsValues = await getButtonsValues(req)
                                .then(res => res.rows)
                                .catch(err => res.status(500).json(err));

    let resArr = await channelsInfo.map(el => {return {...el, buttons: buttonsValues.filter(button => button.idChannel === el.id)}});
    await res.status(200).json(resArr);
}

const getChannelsInfo = async () => {
    const query = `SELECT channels.id, channels.name, channels.order_number AS "order",  
                          messages.text, messages.keyboard_type AS "keyboardType" 
                   FROM channels
                   FULL JOIN messages ON channels.id = messages.id_channel 
                   ORDER BY channels.order_number ASC NULLS LAST;`;

    return await pool.query(query); 
}

const getChannelParams = async (req, res) => {
    let textParams = await getTextParams(req)
                                .then(res => res.rows)
                                .catch(err => res.status(500).json(err));
    let keyboardParams = await getKeyboardParams(req)
                                .then(res => res.rows)
                                .catch(err => res.status(500).json(err));

    await res.status(200).json([...textParams, keyboardParams]);
}

const getKeyboardParams = async (req) => {
    const query = `SELECT type AS "keyboardType", 
                        max_amount AS "amountButtons",
                        max_length_text AS "buttonTextLength",
                        is_available_links AS "isAvailableLinks",
                        amount_available_links AS "amountLinks"
                    FROM keyboard_params 
                    WHERE id_channel = $1
                    ORDER BY type ASC;`;

    return await pool.query(query, [req.query.id]);
}

const getTextParams = async (req) => {
    const query = `SELECT max_length AS "messageLength"
                   FROM text_params 
                   WHERE id_channel = $1;`;
    
    return await pool.query(query, [req.query.id]);
}

const getButtonsValues = async () => {
    const query = `SELECT id, id_channel AS "idChannel", text, type AS "buttonType" 
                   FROM buttons 
                   ORDER BY id_channel ASC;`;
    
    return await pool.query(query);
}

const addButton = async (req, res) => {
    const {idChannel, type, text} = req.body.button;
    const query = `INSERT INTO buttons (id_channel, type, text)
                   VALUES ('${idChannel}', '${type}', '${text}');`;
    await pool.query(query)
                .then(() => res.status(200).json())
                .catch(err => res.status(500).json(err));

}

const deleteButton = async (req, res) => {
    const query = `DELETE FROM buttons 
                   WHERE id = $1;`;
    await pool.query(query, [req.query.id])
                .then(() => res.status(200).json())
                .catch(err => res.status(500).json(err));

}

const getButtons = async (req, res) => {
    const query = `SELECT id, id_channel AS "idChannel", text, type AS "buttonType" 
                   FROM buttons
                   WHERE id_channel = $1;`;
    await pool.query(query, [req.query.id])
                .then((result) => res.status(200).json(result.rows))
                .catch(err => res.status(500).json(err));

}

const saveChannels = async (req, res) => {
    await saveOrder(req)
            .then()
            .catch(err => res.status(500).json(err));
    await saveMessageProp(req)
            .then()
            .catch(err => res.status(500).json(err));
    
    await res.status(200).json();

}

const saveOrder = async (req) => {
    const values = req.body.channels.map(el => `(${el.id}, ${el.order})`).join(', ');
    const query = `UPDATE channels
                   SET order_number = obj.order_number
                   FROM (VALUES ${values}) AS obj(id, order_number) 
                   WHERE channels.id = obj.id;`;
    
    return await pool.query(query);
}

const saveMessageProp = async (req) => {
    const values = req.body.channels.map(el => '(' + el.id + ', ' + (el.text ? `'${el.text}'` : null) + ', ' + (el.keyboardType ? `'${el.keyboardType}'` : null) + ')').join(', ');
    const query = `UPDATE messages
                   SET text = obj.text,
                       keyboard_type = obj.keyboard_type
                   FROM (VALUES ${values}) AS obj(id, text, keyboard_type) 
                   WHERE messages.id_channel = obj.id;`;
    
    return await pool.query(query);
}

module.exports = {
    getChannels,
    getChannelParams,
    addButton,
    deleteButton,
    getButtons,
    saveChannels
};