/// <reference types="node" />
export type JobsAndViews = {
    jobs: string[];
    views: string[];
};
export declare class Jenkins {
    static of(baseUrl: string, authUser: string, authToken: string): Jenkins;
    private baseAxiosRequestConfig;
    private constructor();
    private requestConfig;
    listJobsAndViews(): Promise<JobsAndViews>;
    deleteViewByName(name: string): Promise<string>;
    deleteJobByName(name: string): Promise<string>;
    createJobFromTemplate(template: string, name: string, script: Buffer): Promise<string>;
    createView(name: string): Promise<string>;
    getViewConfig(name: string): Promise<Document>;
    updateViewConfig(name: string, config: Document): Promise<string>;
    createRegexBasedListView(name: string, regex: string): Promise<string>;
    createJob(name: string, config: Document): Promise<string>;
    updateJobPipelineScript(name: string, script: Buffer): Promise<string>;
    updateJobConfig(name: string, config: Document): Promise<string>;
    getJobConfig(name: string): Promise<Document>;
}
//# sourceMappingURL=jenkins.d.ts.map