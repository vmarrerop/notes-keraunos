import './Textarea.css';

export const Textarea = ({
  value,
  onChange,
  placeholder,
  label,
  name,
  required = false,
  disabled = false,
  rows = 4,
  error
}) => {
  return (
    <div className="textarea-wrapper">
      {label && (
        <label htmlFor={name} className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={`textarea ${error ? 'textarea--error' : ''}`}
      />
      {error && <span className="textarea-error-message">{error}</span>}
    </div>
  );
};
