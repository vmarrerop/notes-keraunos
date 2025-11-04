import './Select.css';

export const Select = ({
  value,
  onChange,
  options,
  label,
  name,
  required = false,
  disabled = false,
  placeholder = 'Selecciona una opción',
  error
}) => {
  return (
    <div className="select-wrapper">
      {label && (
        <label htmlFor={name} className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`select ${error ? 'select--error' : ''}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select-error-message">{error}</span>}
    </div>
  );
};
