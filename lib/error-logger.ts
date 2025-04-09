export interface LogErrorOptions {
    /** An error. */
    e: unknown;
  
    /** String to append to the error message. */
    post?: string;
  
    /** String to prepend to the error message. */
    pre?: string;
  }
  
  /**
   * Logs an error to the console.
   * @param e - An error.
   * @param args - Additional string arguments to prepend to the console log.
   */
  export const logError = (options: LogErrorOptions): void => {
    const { e, post, pre } = options;
  
    let errorMessage = '';
  
    if (pre) {
      errorMessage += pre;
    }
  
    if (typeof e === 'string') {
      errorMessage += e.toUpperCase();
    } else if (e instanceof SyntaxError) {
      errorMessage += e.name;
    } else if (e instanceof Error) {
      errorMessage += e.message;
    }
  
    if (post) {
      errorMessage += post;
    }
  
    console.warn(errorMessage);
  };
  