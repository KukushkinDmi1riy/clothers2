import React from 'react';

import {GroupContainer, FormInputContainer, FormInputLabel} from './form-input.styles';

import './form-input.style.scss';

const FormInput = ({handleChange, label, ...props}) => {
    return (
        <GroupContainer>
            <FormInputContainer onChange = {handleChange} {...props}/>
            {
                label ? 
                (
                    <FormInputLabel className={props.value.length ? 'shrink' : ''}>
                        {label}
                    </FormInputLabel>
                ): null
            }
        </GroupContainer>
    )

}

export default FormInput;