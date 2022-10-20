export interface Notification {
    id: number,
    sourceType: number,
    sourceId: number,
    body: string,
    isRead: boolean,
    sentAt: Date
}
