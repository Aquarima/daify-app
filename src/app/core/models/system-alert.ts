export interface SystemAlert {
  type: AlertType | AlertType.ERROR,
  message: string | 'Ugh an error occurred...'
}

export enum AlertType {
  INFO = 'info', WARN = 'warn', SUCCESS = 'success', ERROR = 'error'
}
