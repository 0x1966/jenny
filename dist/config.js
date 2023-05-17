"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const fs_1 = require("fs");
const js_yaml_1 = require("js-yaml");
const CONFIG_FILE = '.jennyconf.yaml';
function loadConfig(onError) {
    try {
        return (0, js_yaml_1.load)((0, fs_1.readFileSync)(`./${CONFIG_FILE}`, 'utf8'));
    }
    catch (err) {
        !onError || onError(CONFIG_FILE, err);
        return {};
    }
}
exports.loadConfig = loadConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBK0I7QUFDL0IscUNBQXdDO0FBVXhDLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixDQUFBO0FBRXJDLFNBQWdCLFVBQVUsQ0FBQyxPQUFzRDtJQUMvRSxJQUFJO1FBQ0YsT0FBTyxJQUFBLGNBQVEsRUFBQyxJQUFBLGlCQUFZLEVBQUMsS0FBSyxXQUFXLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBb0IsQ0FBQTtLQUM3RTtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNyQyxPQUFPLEVBQUUsQ0FBQTtLQUNWO0FBQ0gsQ0FBQztBQVBELGdDQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtyZWFkRmlsZVN5bmN9IGZyb20gJ2ZzJ1xuaW1wb3J0IHtsb2FkIGFzIHlhbWxMb2FkfSBmcm9tICdqcy15YW1sJ1xuXG5leHBvcnQgdHlwZSBDb25maWcgPSB7XG4gIGJhc2VVcmw6IHN0cmluZ1xuICB1c2VyOiBzdHJpbmdcbiAgdG9rZW46IHN0cmluZ1xuICBqb2JUZW1wbGF0ZTogc3RyaW5nXG4gIG5hbWVQcmVmaXg6IHN0cmluZ1xufVxuXG5jb25zdCBDT05GSUdfRklMRSA9ICcuamVubnljb25mLnlhbWwnXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29uZmlnKG9uRXJyb3I/OiAoY29uZmlnRmlsZW5hbWU6IHN0cmluZywgZXJyb3I6IGFueSkgPT4gdm9pZCk6IFBhcnRpYWw8Q29uZmlnPiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHlhbWxMb2FkKHJlYWRGaWxlU3luYyhgLi8ke0NPTkZJR19GSUxFfWAsICd1dGY4JykpIGFzIFBhcnRpYWw8Q29uZmlnPlxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAhb25FcnJvciB8fCBvbkVycm9yKENPTkZJR19GSUxFLCBlcnIpXG4gICAgcmV0dXJuIHt9XG4gIH1cbn1cbiJdfQ==