type Handlers = {
    add: (path: string) => void;
    change: (workingDir: string, path: string) => void;
    unlink: (path: string) => void;
};
export declare function watch(workingDir: string, glob: string, handlers: Partial<Handlers>): void;
export {};
//# sourceMappingURL=watch.d.ts.map