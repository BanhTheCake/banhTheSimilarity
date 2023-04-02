export type ApiRequestT = {
    id: string;
    timestamp: Date;
    method: string;
    path: string;
    status: number;
    duration: number;
    usedApiKey: string;
    apiKeyId: string;
};
