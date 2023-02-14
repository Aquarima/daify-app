export interface SystemAlert {
  type: AlertType | AlertType.ERROR;
  title: string | 'Oops...';
  message: string | 'Ugh an error occurred...';
}

export enum AlertType {
  NONE = 0,
  INFO = 1,
  WARN = 2,
  SUCCESS = 3,
  ERROR = 4
}
