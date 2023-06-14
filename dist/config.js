"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configFromArgs = void 0;
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
function configFromArgs(onError) {
    return (argv) => {
        const file = loadConfig(argv.configFile, onError);
        return {
            baseUrl: argv.baseUrl || file.baseUrl || 'localhost:8080',
            user: argv.user || file.user || '',
            token: argv.token || file.token || '',
            jobTemplate: argv.jobTemplate || file.jobTemplate || '',
            namePrefix: argv.namePrefix || file.namePrefix || '',
        };
    };
}
exports.configFromArgs = configFromArgs;
function loadConfig(configFile, onError) {
    try {
        return (0, js_yaml_1.load)((0, fs_1.readFileSync)(configFile, 'utf8'));
    }
    catch (err) {
        !onError || onError(configFile, err);
        return {};
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBK0I7QUFDL0IscUNBQXdDO0FBVXhDLFNBQWdCLGNBQWMsQ0FBQyxPQUFzRDtJQUNuRixPQUFPLENBQUMsSUFBUyxFQUFFLEVBQUU7UUFDbkIsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDakQsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksZ0JBQWdCO1lBQ3pELElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUNsQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDckMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFO1lBQ3ZELFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRTtTQUNyRCxDQUFBO0lBQ0gsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQVhELHdDQVdDO0FBRUQsU0FBUyxVQUFVLENBQUMsVUFBa0IsRUFBRSxPQUFzRDtJQUM1RixJQUFJO1FBQ0YsT0FBTyxJQUFBLGNBQVEsRUFBQyxJQUFBLGlCQUFZLEVBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFvQixDQUFBO0tBQ3JFO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3BDLE9BQU8sRUFBRSxDQUFBO0tBQ1Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZWFkRmlsZVN5bmN9IGZyb20gJ2ZzJ1xuaW1wb3J0IHtsb2FkIGFzIHlhbWxMb2FkfSBmcm9tICdqcy15YW1sJ1xuXG5leHBvcnQgdHlwZSBDb25maWcgPSB7XG4gIGJhc2VVcmw6IHN0cmluZ1xuICB1c2VyOiBzdHJpbmdcbiAgdG9rZW46IHN0cmluZ1xuICBqb2JUZW1wbGF0ZTogc3RyaW5nXG4gIG5hbWVQcmVmaXg6IHN0cmluZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnRnJvbUFyZ3Mob25FcnJvcj86IChjb25maWdGaWxlbmFtZTogc3RyaW5nLCBlcnJvcjogYW55KSA9PiB2b2lkKTogKGFyZ3Y6IGFueSkgPT4gQ29uZmlnIHtcbiAgcmV0dXJuIChhcmd2OiBhbnkpID0+IHtcbiAgICBjb25zdCBmaWxlID0gbG9hZENvbmZpZyhhcmd2LmNvbmZpZ0ZpbGUsIG9uRXJyb3IpXG4gICAgcmV0dXJuIHtcbiAgICAgIGJhc2VVcmw6IGFyZ3YuYmFzZVVybCB8fCBmaWxlLmJhc2VVcmwgfHwgJ2xvY2FsaG9zdDo4MDgwJyxcbiAgICAgIHVzZXI6IGFyZ3YudXNlciB8fCBmaWxlLnVzZXIgfHwgJycsXG4gICAgICB0b2tlbjogYXJndi50b2tlbiB8fCBmaWxlLnRva2VuIHx8ICcnLFxuICAgICAgam9iVGVtcGxhdGU6IGFyZ3Yuam9iVGVtcGxhdGUgfHwgZmlsZS5qb2JUZW1wbGF0ZSB8fCAnJyxcbiAgICAgIG5hbWVQcmVmaXg6IGFyZ3YubmFtZVByZWZpeCB8fCBmaWxlLm5hbWVQcmVmaXggfHwgJycsXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRDb25maWcoY29uZmlnRmlsZTogc3RyaW5nLCBvbkVycm9yPzogKGNvbmZpZ0ZpbGVuYW1lOiBzdHJpbmcsIGVycm9yOiBhbnkpID0+IHZvaWQpOiBQYXJ0aWFsPENvbmZpZz4ge1xuICB0cnkge1xuICAgIHJldHVybiB5YW1sTG9hZChyZWFkRmlsZVN5bmMoY29uZmlnRmlsZSwgJ3V0ZjgnKSkgYXMgUGFydGlhbDxDb25maWc+XG4gIH0gY2F0Y2ggKGVycikge1xuICAgICFvbkVycm9yIHx8IG9uRXJyb3IoY29uZmlnRmlsZSwgZXJyKVxuICAgIHJldHVybiB7fVxuICB9XG59XG4iXX0=