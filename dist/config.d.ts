export type Config = {
    baseUrl: string;
    user: string;
    token: string;
    jobTemplate: string;
    namePrefix: string;
};
export declare function loadConfig(onError?: (configFilename: string, error: any) => void): Partial<Config>;
//# sourceMappingURL=config.d.ts.map