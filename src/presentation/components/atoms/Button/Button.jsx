import './Button.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false
}) => {
  const className = `btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full-width' : ''}`;

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
