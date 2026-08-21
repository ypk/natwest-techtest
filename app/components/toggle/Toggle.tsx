import "./Toggle.css";

export type ToggleOption = {
  value: string;
  label: string;
};

type ToggleProps = {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
};

export function Toggle({
  options,
  value,
  onChange,
  ariaLabel = "Selection toggle",
}: ToggleProps) {
  return (
    <div className="toggle-group" role="tablist" aria-label={ariaLabel}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`toggle-btn ${value === option.value ? "active" : ""}`}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
