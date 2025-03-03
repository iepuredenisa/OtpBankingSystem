// toastMessageUtils.ts
import { Toast, ToastBody, ToastTitle } from "@fluentui/react-components";
import { ToastIntentValues } from "./ToastIntentValues";
import { TOAST_PRIORITY_HIGH, TOAST_PRIORITY_NORMAL } from "./constants";

export interface INotifyMessageProps {
    intent: ToastIntentValues | undefined;
    title: string;
    messages: string[];
    dispatchToast: Function;
};

export const notifyMessage = (props: INotifyMessageProps, timeout: number = 5000): void => {
    props.dispatchToast(
        <Toast>
            <ToastTitle>{props.title}</ToastTitle>
            <ToastBody>
                {props.messages.map((message: string) => (
                    <div key={message}>{message}</div>
                ))}
            </ToastBody>
        </Toast>,
        {
            intent: props.intent,
            timeout,
            priority: props.intent === ToastIntentValues.Error ? TOAST_PRIORITY_HIGH : TOAST_PRIORITY_NORMAL,
        }
    );
};