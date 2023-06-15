/// <reference types="node" />
export type Job = {
    name: string;
    script: Buffer;
};
export type View = {
    name: string;
    regex: string;
};
export type JobsAndViews = {
    jobs: Job[];
    views: View[];
};
export declare class Files {
    private workingDir;
    private namePrefix;
    static of(workingDir: string, namePrefix: string): Files;
    private constructor();
    listJobsAndViews(): Promise<JobsAndViews>;
    getJobByFilename(path: string): Job;
}
//# sourceMappingURL=files.d.ts.map