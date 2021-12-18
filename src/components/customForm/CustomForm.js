import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react/cjs/react.development';
import * as yup from 'yup';

import useMarvelService from '../../services/MarvelService';
import './CustomForm.scss';

const CustomForm = () => {

    const [showButton, setShowButton] = useState(false);
    const [idChar, setIdChar] = useState(null);
    const [nameChar, setNameChar] = useState('');
    const [invalidName, setInvalidName] = useState(false);

    const {getCharacterByName} = useMarvelService();

    const invalid = !invalidName ? null : <div className="customform__invalid">The character was not found. Check the name and try again</div>;
    const name = nameChar ? <div className="customform__success">{`There is! Visit ${nameChar} page?`}</div> : null;
    const button = showButton ? <Link to={`/characters/${idChar}`} className="button button_grey customform__button-second">TO PAGE</Link> : null;

    return (
        <Formik
            initialValues={{ name: ''}}
            validationSchema={yup.object({
                name: yup.string()
                    .min(2, 'Введите имя не менее двух символов.')
                    .matches(/\D/g, "В поле должны быть только буквы.")
                    .required('Обязательное поле!')
            })}
            onSubmit={(values) => {
                getCharacterByName(values.name)
                    .then(({id, name}) =>{
                        setInvalidName(false)
                        setShowButton(true)
                        setIdChar(id)
                        setNameChar(name)
                    })
                    .catch(setInvalidName)
            }}>
            <Form className="customform">
                <h3 className="customform__title">Or find a character by name:</h3>
                <div className="customform__wrapper">
                    <Field  
                        name="name" 
                        type="text" 
                        className="customform__input" 
                        placeholder="Enter name"
                    />
                    <button className="button customform__button">FIND</button>
                </div>
                <div style={invalidName ? {display: 'grid', gap: '10px'} : null} className="customform__footer">
                    <ErrorMessage className="customform__error" name="name" component="span"/>
                    {invalid}
                    {name}
                    {button}
                </div>
            </Form>
        </Formik>
    )
}

export default CustomForm;