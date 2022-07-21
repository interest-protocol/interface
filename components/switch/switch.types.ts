export interface ISwitchOption {
  value: string | number;
  onSelect?: () => void;
  displayValue?: string;
}

export interface SwitchProps {
  thin?: boolean;
  defaultValue: string | number;
  options: ReadonlyArray<ISwitchOption>;
}
