import { cloneElement } from "react";
import { toolBarClassName } from "./toolBar.styles";
import { IToolBarProps } from "./toolBar.types";

export const ToolBar = (props: IToolBarProps): JSX.Element => {
    const updatedItems: JSX.Element[] = props.items.map((item: JSX.Element, index: number): JSX.Element => {
        return cloneElement(item, { key: index });
    });

    return (
        <div className={toolBarClassName}>
            {updatedItems}
        </div>
    );
};