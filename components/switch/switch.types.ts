export interface ISwitchOption {
  value: string;
  onSelect?: () => void;
  displayValue?: string;
}

export interface SwitchProps {
  defaultValue: string;
  options: [ISwitchOption, ISwitchOption];
}
