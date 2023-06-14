export type Config = {
    baseUrl: string;
    user: string;
    token: string;
    jobTemplate: string;
    namePrefix: string;
};
export declare function configFromArgs(onError?: (configFilename: string, error: any) => void): (argv: any) => Config;
//# sourceMappingURL=config.d.ts.map