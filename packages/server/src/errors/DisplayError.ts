import { DISPLAY_ERROR_CODE } from "@codeponder/common";

interface Options {
  backgroundColor?: string;
  textColor?: string;
}

export class DisplayError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public extensions: Record<string, any>;
  backgroundColor?: string;
  textColor?: string;

  constructor(
    message: string,
    { backgroundColor, textColor }: Options = {
      backgroundColor: "#1890ff",
      textColor: "#fff",
    }
  ) {
    super(message);

    this.name = DISPLAY_ERROR_CODE;
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;
    this.extensions = { code: DISPLAY_ERROR_CODE };
  }
}
