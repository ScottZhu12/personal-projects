import React from 'react';

interface SelectButtonProps {
  name: string;
  id: string;
  selectBtnClass: string;
  children: React.ReactNode;
}

export const SelectButton: React.FC<SelectButtonProps> = ({
  name,
  id,
  children,
  selectBtnClass,
}) => {
  return (
    <select name={name} id={id} className={selectBtnClass}>
      {children}
    </select>
  );
};

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
