import './Input.css';

export const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  name,
  required = false,
  disabled = false,
  error
}) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input ${error ? 'input--error' : ''}`}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};
