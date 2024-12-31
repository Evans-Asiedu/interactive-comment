


const ActionButton = ({ type, icon, label, onClick }) => {
    return (
      <button className={`action-button action-button--${type}`} onClick={onClick}>
        {icon && <img src={icon} className="action-button__icon" alt="" />}
        <span className="action-button__label">{label}</span>
      </button>
    );
  };
  
  
export default ActionButton;