import { Children } from "react";
import style from "../styles/modules/button.module.scss";
import { getClasses } from "../utils/getClass";

const buttonTypes = {
  primary: "primary",
  secondary: "secondary",
};
const Button = ({ children, variant = "primary", type, ...rest }) => {
  return (
    <button
      className={getClasses([
        style.button,
        style[`button--${buttonTypes[variant]}`],
      ])}
      type={type === "submit" ? "submit" : "button"}
      {...rest}>
      {children}
    </button>
  );
};
const SeletecButton = ({ children, ...rest }) => {
  return (
    <select
      className={getClasses([style.button, style.button__select])}
      {...rest}>
      {children}
    </select>
  );
};
export { SeletecButton };
export default Button;
