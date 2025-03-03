import { mergeStyles } from "@fluentui/merge-styles";
import { BORDER_COLOR, BORDER_FORMAT } from "../../Library/Utils/constants";

export const toolBarClassName: string = mergeStyles({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  border: `${BORDER_FORMAT} ${BORDER_COLOR}`,
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  height: "fit-content",
  width: "fit-content",
});