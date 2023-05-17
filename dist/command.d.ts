import { JobsAndViews as JenkinsJobsAndViews } from './jenkins';
import { JobsAndViews as FilesJobsAndViews } from './files';
import { Config } from './config';
export declare class Command {
    private config;
    static of(config: Config): Command;
    private jenkins;
    private constructor();
    deleteJobsAndViewsBasedOnPath(path: string): Promise<void>;
    syncJobsAndViewsBasedOnPath(path: string): Promise<void>;
    syncJobsBasedOnPath(jenkinsJobsAndViews: JenkinsJobsAndViews, fileBasedJobsAndViews: FilesJobsAndViews): Promise<void>;
    syncViewsBasedOnPath(jenkinsJobsAndViews: JenkinsJobsAndViews, fileBasedJobsAndViews: FilesJobsAndViews): Promise<void>;
}
//# sourceMappingURL=command.d.ts.map