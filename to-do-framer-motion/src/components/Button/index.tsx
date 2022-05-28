import React from 'react';

interface ButtonProps {
  btnType: 'submit' | 'reset' | 'button' | undefined;
  btnText: string;
  btnClass: string;
}

const Button: React.FC<ButtonProps> = ({ btnType, btnText, btnClass }) => {
  return (
    <button type={btnType} className={btnClass}>
      {btnText}
    </button>
  );
};

export default Button;
