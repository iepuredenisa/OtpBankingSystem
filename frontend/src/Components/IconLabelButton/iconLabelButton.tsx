import { Button } from "@fluentui/react-components";
import * as icons from "@fluentui/react-icons";
import { FC } from "react";
import { BUTTON_APPEARANCE_SECONDARY_STYLE, BUTTON_APPEARANCE_TRANSPARENT_STYLE } from "../../Library/Utils/constants";
import { IIconLabelButtonProps } from "./iconLabelButton.types";

export const IconLabelButton = (props: IIconLabelButtonProps): JSX.Element => {
    const Icon: FC = icons[props.iconName] as FC;

    return (
        <Button icon={<Icon />} onClick={props.onClick} disabled={props.isDisabled} iconPosition={props.iconPosition} appearance={props.hasBackground ? BUTTON_APPEARANCE_TRANSPARENT_STYLE : BUTTON_APPEARANCE_SECONDARY_STYLE} >
            {props.label}
        </Button>
    );
};