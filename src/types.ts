export type NotifyParams = {
    timeout?: number,
    message: string,
    type?: "success" | "error" | "warn" | "info",
    onPress?: () => void,
    other?: any
}