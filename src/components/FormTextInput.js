import React from "react";

const FormTextInput = ({value, setValue, name}) => {
  return (
    <div>
      <label htmlFor={name} >
        {name.slice(0, 1).toUpperCase() + name.slice(1) + ': '}
      </label>
      <input 
        type='text'
        name={name}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </div>
  )
}

export default FormTextInput;