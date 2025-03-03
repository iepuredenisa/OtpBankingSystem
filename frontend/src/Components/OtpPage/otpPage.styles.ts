import { mergeStyles } from "@fluentui/merge-styles";

export const pageContentContainerClassName: string = mergeStyles({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "1.5rem",
  margin: "2rem 2vw 2rem 2vw",
  height: "100vh",
  overflow: "hidden",
});

export const underTitleContainerClassName: string = mergeStyles({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "1rem",
  marginTop: "20px",
});

export const inputClassName: string = mergeStyles({
  width: "200px",
  textAlign: "center",
});

export const progressBarClassName: string = mergeStyles({
  width: "250px",
  height: "8px",
  borderRadius: "4px",
  position: "absolute",
  top: "10px",
  right: "30px",
});

export const titleClassName: string = mergeStyles({
  marginLeft: "20px",
  marginBottom: "15px",
});

export const otpToasterClass = () =>
  mergeStyles({
    position: "absolute",
    top: "30px",
    right: "30px",
    zIndex: 3000,
    width: "250px",
  });

export const errorSuccessToasterClass = () =>
  mergeStyles({
    position: "absolute",
    bottom: "20px",
    right: "20px",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "flex-end",
    gap: "12px",
    zIndex: 2000,
  });
