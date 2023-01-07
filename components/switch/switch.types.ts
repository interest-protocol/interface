export interface ISwitchOption {
  value: string | number;
  onSelect?: () => void;
  displayValue?: string;
}

export interface SwitchProps {
  bg?: string;
  thin?: boolean;
  bgSelected?: string;
  defaultValue: string | number;
  options: ReadonlyArray<ISwitchOption>;
}
