import React from 'react';
import InputField from 'Components/InputField/InputField';

const LoginField = () => {
  return (
    <InputField
      icon="/icons/password/passwordBlack.svg"
      placeholder="Password"
      required
    />
  );
}

export default LoginField;