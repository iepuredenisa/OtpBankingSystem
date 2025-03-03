import { Input, ProgressBar, Title2, Toast, ToastBody, Toaster, ToastTitle, useId, useToastController } from "@fluentui/react-components";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { CHECK_BUTTON_ICON, CHECK_BUTTON_LABEL, ERROR_TITLE, GENERATE_BUTTON_ICON, GENERATE_BUTTON_LABEL, OTP_ERROR_EMPTY_INPUT, OTP_ERROR_GENERATION, OTP_ERROR_VERIFICATION, OTP_INPUT_PLACEHOLDER, OTP_PAGE_TITLE, OTP_PAGE_TOASTER_ID, OTP_TIMEOUT_MS, OTP_TOASTER_ID, SUCCESS_TITLE, TOAST_INTENT_INFO, TOAST_POSITION, TOAST_POSITION_ERR_SUCC } from "../../Library/Utils/constants";
import { ToastIntentValues } from "../../Library/Utils/ToastIntentValues";
import { notifyMessage } from "../../Library/Utils/toastMessageUtils";
import { otpServiceInstance } from "../../Service/otpService";
import { OtpResponse, VerifyOtpRequest, VerifyOtpResponse } from "../../Service/otpService.types";
import { IconLabelButton } from "../IconLabelButton/iconLabelButton";
import { ToolBar } from "../ToolBarButton/toolBar";
import { errorSuccessToasterClass, inputClassName, otpToasterClass, pageContentContainerClassName, progressBarClassName, titleClassName, underTitleContainerClassName } from "./otpPage.styles";

export const OtpPage = (): JSX.Element => {

    const errorSuccessToasterId = useId(OTP_PAGE_TOASTER_ID);
    const errorSuccessToastController = useToastController(errorSuccessToasterId);

    const otpToasterId = useId(OTP_TOASTER_ID);
    const otpToastController = useToastController(otpToasterId);

    const [otp, setOtp] = useState<string | null>(null);
    const [otpInput, setOtpInput] = useState<string>("");
    const [progress, setProgress] = useState<number>(1);
    const hasActiveOtpToast = useRef<boolean>(false);
    const otpTimer = useRef<NodeJS.Timeout | null>(null);
    const progressTimer = useRef<NodeJS.Timeout | null>(null);

    const notifyError = (errorMessage: string): void => {
        notifyMessage({
            intent: ToastIntentValues.Error,
            title: ERROR_TITLE,
            messages: [errorMessage],
            dispatchToast: errorSuccessToastController.dispatchToast
        });
    };

    const notifySuccess = (message: string): void => {
        notifyMessage({
            intent: ToastIntentValues.Success,
            title: SUCCESS_TITLE,
            messages: [message],
            dispatchToast: errorSuccessToastController.dispatchToast
        });
    };

    const generateOtpMutation = useMutation<OtpResponse, AxiosError>({
        mutationFn: otpServiceInstance.generateOtp
    });

    const verifyOtpMutation = useMutation<VerifyOtpResponse, AxiosError, VerifyOtpRequest>({
        mutationFn: otpServiceInstance.verifyOtp
    });

    useEffect(() => {
        return () => {
            if (otpTimer.current) clearTimeout(otpTimer.current);
            if (progressTimer.current) clearInterval(progressTimer.current);
        };
    }, []);

    const handleGenerateOtp = async (): Promise<void> => {
        try {
            const data = await generateOtpMutation.mutateAsync();
            setOtp(data.otp);
            setProgress(1);

            hasActiveOtpToast.current = true;
            otpToastController.dispatchToast(
                <Toast>
                    <ToastTitle>Your OTP</ToastTitle>
                    <ToastBody>
                        <div>{data.otp}</div>
                        <div>Valid for 1 minute</div>
                    </ToastBody>
                </Toast>,
                {
                    intent: TOAST_INTENT_INFO,
                    timeout: -1,
                }
            );

            if (otpTimer.current) clearTimeout(otpTimer.current);
            otpTimer.current = setTimeout(() => {
                if (hasActiveOtpToast.current) {
                    setOtp(null);
                    hasActiveOtpToast.current = false;
                    otpToastController.dismissAllToasts();
                }
            }, OTP_TIMEOUT_MS);

            let elapsedTime = 0;
            if (progressTimer.current) clearInterval(progressTimer.current);
            progressTimer.current = setInterval(() => {
                elapsedTime += 1000;
                setProgress(1 - elapsedTime / OTP_TIMEOUT_MS);
                if (elapsedTime >= OTP_TIMEOUT_MS) {
                    clearInterval(progressTimer.current!);
                    setProgress(0);
                }
            }, 1000);
        } catch {
            notifyError(OTP_ERROR_GENERATION);
        }
    };

    const handleVerifyOtp = async (): Promise<void> => {
        if (!otpInput.trim()) {
            notifyError(OTP_ERROR_EMPTY_INPUT);
            return;
        }

        try {
            const response = await verifyOtpMutation.mutateAsync({ otp: otpInput });

            setOtp(null);
            setOtpInput("");
            setProgress(0);

            if (otpTimer.current) clearTimeout(otpTimer.current);
            if (progressTimer.current) clearInterval(progressTimer.current);

            if (hasActiveOtpToast.current) {
                hasActiveOtpToast.current = false;
                otpToastController.dismissAllToasts();
            }

            notifySuccess(response.message);
        } catch {
            notifyError(OTP_ERROR_VERIFICATION);
        }
    };

    const toolBarButtons = [
        <IconLabelButton label={GENERATE_BUTTON_LABEL} iconName={GENERATE_BUTTON_ICON} onClick={handleGenerateOtp} />,
        <IconLabelButton label={CHECK_BUTTON_LABEL} iconName={CHECK_BUTTON_ICON} onClick={handleVerifyOtp} />
    ];

    return (
        <div className={pageContentContainerClassName}>
            <Title2 className={titleClassName}>{OTP_PAGE_TITLE}</Title2>

            <div className={underTitleContainerClassName}>
                <ToolBar items={toolBarButtons} />
                <Input
                    placeholder={OTP_INPUT_PLACEHOLDER}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className={inputClassName}
                />
            </div>
            {otp && (
                <div className={progressBarClassName}>
                    <ProgressBar value={progress} style={{ height: "100%" }} />
                </div>
            )}
            <Toaster
                toasterId={errorSuccessToasterId}
                position={TOAST_POSITION_ERR_SUCC}
                className={errorSuccessToasterClass()}
                limit={5}
            />
            <Toaster
                toasterId={otpToasterId}
                position={TOAST_POSITION}
                className={otpToasterClass()}
                limit={1}
            />
        </div>
    );
};