import style from "../styles/modules/title.module.scss";
const PageTitle = ({ ...rest }) => {
  return (
    <p className={style.title} {...rest}>
      Todo List
    </p>
  );
};
export default PageTitle;
