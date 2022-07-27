export interface VaultFarmDetailsItemProps {
  title: string;
  content: string;
  fontSize?: string;
  color?: string;
  version?: ReadonlyArray<string>;
}

export interface IVaultFarmForm {
  value: string;
}

export interface VersionProps {
  version: string;
}

export interface VaultFarmProps {
  farm: string;
}

export interface VaultFarmDetailsProps extends VersionProps {
  version: string;
  items: ReadonlyArray<VaultFarmDetailsItemProps>;
}
