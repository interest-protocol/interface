export interface ISwitchOption {
  value: string;
  onSelect?: () => void;
  displayValue?: string;
}

export interface SwitchProps {
  thin?: boolean;
  defaultValue: string;
  options: ReadonlyArray<ISwitchOption>;
}
