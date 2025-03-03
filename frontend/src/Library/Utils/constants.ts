import { ToastPosition } from "@fluentui/react-components";
import * as icons from "@fluentui/react-icons";
import { ToastIntentValues } from "./ToastIntentValues";
import { IconAppearance } from "./types";

// OTP Page Titles & Messages
export const OTP_PAGE_TITLE: string = "OTP Banking System";
export const OTP_INPUT_PLACEHOLDER: string = "Enter OTP...";
export const OTP_VALIDITY_MESSAGE: string = "Valid for 1 minute";
export const OTP_ERROR_GENERATION: string =
  "Error generating OTP, please try again.";
export const OTP_ERROR_EMPTY_INPUT: string = "Please enter an OTP.";
export const OTP_ERROR_VERIFICATION: string = "OTP is incorrect or expired.";
export const SUCCESS_TITLE: string = "Success";
export const ERROR_TITLE: string = "Error";

// API Configuration
export const API_BASE_URL: string = "https://localhost:7100/api/otp";

// UI Styling
export const BORDER_FORMAT: string = "1px solid";
export const BORDER_COLOR: string = "#e1dfdd";

// Button Labels & Icons
export const GENERATE_BUTTON_LABEL: string = "Generate";
export const CHECK_BUTTON_LABEL: string = "Check";
export const GENERATE_BUTTON_ICON: keyof typeof icons = "AddRegular";
export const CHECK_BUTTON_ICON: keyof typeof icons = "CheckmarkCircleRegular";

// Button Appearance Styles
export const BUTTON_APPEARANCE_TRANSPARENT_STYLE: IconAppearance =
  "transparent";
export const BUTTON_APPEARANCE_SECONDARY_STYLE: IconAppearance = "secondary";

// Toast Notifications
export const OTP_PAGE_TOASTER_ID: string = "otpPageToasterId";
export const OTP_TOASTER_ID: string = "otp-toaster";
export const TOAST_POSITION: ToastPosition = "top-end";
export const TOAST_POSITION_ERR_SUCC: ToastPosition = "bottom-end";

// Toast Priority Constants
export const TOAST_PRIORITY_HIGH: string = "high";
export const TOAST_PRIORITY_NORMAL: string = "normal";

// OTP Configuration
export const OTP_TIMEOUT_MS: number = 60000;
export const TOAST_INTENT_ERROR: ToastIntentValues | undefined =
  ToastIntentValues.Error;
export const TOAST_INTENT_INFO: ToastIntentValues | undefined =
  ToastIntentValues.Info;
export const TOAST_INTENT_SUCCESS: ToastIntentValues | undefined =
  ToastIntentValues.Success;