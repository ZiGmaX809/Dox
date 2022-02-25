interface Options {
  duration: number;
  textChange: (text: string, beforeText: string) => void;
}

class ClipboardObserver {
  timer!: NodeJS.Timeout;
  beforeText!: string;

  duration = 500;
  textChange: (text: string, beforeText: string) => void;

  constructor(options: Options) {
    const { duration, textChange } = options;

    this.duration = duration;
    this.textChange = textChange;

    // if (this.textChange) {
    this.start();
    // }
  }

  /**
   * 设置定时器
   */
  setTimer(): void {
    this.timer = setInterval(() => {
      if (this.textChange) {
        const text = window.clipboard.readText();
        if (this.isDiffText(this.beforeText, text)) {
          this.textChange(text, this.beforeText);
          this.beforeText = text;
        }
      }
    }, this.duration);
  }

  /**
   * 清除定时器
   */
  clearTimer(): void {
    clearInterval(this.timer);
  }

  /**
   * 设置剪贴板默认内容
   */
  setClipboardDefaultValue(): void {
    // if (this.textChange) {
    this.beforeText = window.clipboard.readText();
    // }
  }

  /**
   * 判断内容是否不一致
   * @param beforeText
   * @param afterText
   * @returns
   */
  isDiffText(beforeText: string, afterText: string): any {
    return afterText && beforeText !== afterText;
  }

  /**
   * 开始
   */
  start(): void {
    this.setClipboardDefaultValue();
    this.setTimer();
  }

  /**
   * 暂停
   */
  stop(): void {
    this.clearTimer();
  }
}

export default ClipboardObserver;
