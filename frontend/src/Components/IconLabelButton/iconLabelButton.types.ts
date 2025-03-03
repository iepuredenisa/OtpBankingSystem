import * as icons from "@fluentui/react-icons";

export interface IIconLabelButtonProps {
  label: string;
  iconName: keyof typeof icons;
  onClick?: () => void;
  isDisabled?: boolean;
  iconPosition?: IconPosition;
  hasBackground?: boolean;
}

enum IconPosition {
  BEFORE = "before",
  AFTER = "after",
}
