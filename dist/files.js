"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Files = void 0;
const glob_1 = require("glob");
const fs_1 = require("fs");
const path_1 = require("path");
const unique_1 = require("./unique");
class Files {
    static of(workingDir, namePrefix) {
        return new Files(workingDir, namePrefix);
    }
    constructor(workingDir, namePrefix) {
        this.workingDir = workingDir;
        this.namePrefix = namePrefix;
    }
    listJobsAndViews() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield (0, glob_1.glob)('**/Jenkinsfile', { cwd: this.workingDir })
                .then((files) => files.map((file) => file.split(path_1.sep)))
                .then((files) => files.filter((file) => file.length >= 2));
            const jobs = files.map((file) => jobByFilename(this.workingDir, this.namePrefix, file));
            const views = files
                .map((file) => viewByFilename(this.namePrefix, file))
                .filter((0, unique_1.unique)((el, it) => el.name === it.name));
            return { jobs, views };
        });
    }
}
exports.Files = Files;
function jobByFilename(workingDir, namePrefix, file) {
    return {
        name: jobNameByFilename(namePrefix, file),
        script: (0, fs_1.readFileSync)(`${workingDir}${path_1.sep}${file.join(path_1.sep)}`),
    };
}
function jobNameByFilename(namePrefix, file) {
    return [namePrefix, ...file.slice(0, -1).map(beautify)].join(' - ');
}
function viewByFilename(namePrefix, file) {
    return {
        name: viewNameByFilename(namePrefix, file),
        regex: viewRegexByFilename(namePrefix, file),
    };
}
function viewNameByFilename(namePrefix, file) {
    return [namePrefix, ...file.slice(0, -2).map(beautify)].join(' - ');
}
function viewRegexByFilename(namePrefix, file) {
    return `${[namePrefix, ...file.slice(0, -2).map(beautify)].join(' - ')} - (.*)`;
}
function beautify(value) {
    const tokens = value.split(/[_-]/);
    const result = tokens.map(capitalizeFirstLetter).join(' ');
    return result;
}
function capitalizeFirstLetter(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQXlCO0FBQ3pCLDJCQUErQjtBQUMvQiwrQkFBd0I7QUFFeEIscUNBQStCO0FBZS9CLE1BQWEsS0FBSztJQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDLFVBQWtCLEVBQUUsVUFBa0I7UUFDOUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDMUMsQ0FBQztJQUVELFlBQTRCLFVBQWtCLEVBQVUsVUFBa0I7UUFBOUMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVE7SUFBRyxDQUFDO0lBRXhFLGdCQUFnQjs7WUFFcEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLFdBQUksRUFBQyxnQkFBZ0IsRUFBRSxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFDLENBQUM7aUJBQy9ELElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUU1RCxNQUFNLElBQUksR0FBVSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDOUYsTUFBTSxLQUFLLEdBQVcsS0FBSztpQkFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDcEQsTUFBTSxDQUFDLElBQUEsZUFBTSxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUVsRCxPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFBO1FBQ3RCLENBQUM7S0FBQTtDQUNGO0FBcEJELHNCQW9CQztBQUVELFNBQVMsYUFBYSxDQUFDLFVBQWtCLEVBQUUsVUFBa0IsRUFBRSxJQUFjO0lBQzNFLE9BQU87UUFDTCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztRQUN6QyxNQUFNLEVBQUUsSUFBQSxpQkFBWSxFQUFDLEdBQUcsVUFBVSxHQUFHLFVBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUcsQ0FBQyxFQUFFLENBQUM7S0FDN0QsQ0FBQTtBQUNILENBQUM7QUFFRCxTQUFTLGlCQUFpQixDQUFDLFVBQWtCLEVBQUUsSUFBYztJQUMzRCxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDckUsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLFVBQWtCLEVBQUUsSUFBYztJQUN4RCxPQUFPO1FBQ0wsSUFBSSxFQUFFLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7UUFDMUMsS0FBSyxFQUFFLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7S0FDN0MsQ0FBQTtBQUNILENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLFVBQWtCLEVBQUUsSUFBYztJQUM1RCxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDckUsQ0FBQztBQUVELFNBQVMsbUJBQW1CLENBQUMsVUFBa0IsRUFBRSxJQUFjO0lBQzdELE9BQU8sR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUE7QUFDakYsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLEtBQWE7SUFDN0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUNsQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzFELE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQUMsQ0FBUztJQUN0QyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUMvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnbG9ifSBmcm9tICdnbG9iJ1xuaW1wb3J0IHtyZWFkRmlsZVN5bmN9IGZyb20gJ2ZzJ1xuaW1wb3J0IHtzZXB9IGZyb20gJ3BhdGgnXG5cbmltcG9ydCB7dW5pcXVlfSBmcm9tICcuL3VuaXF1ZSdcblxuZXhwb3J0IHR5cGUgSm9iID0ge1xuICBuYW1lOiBzdHJpbmdcbiAgc2NyaXB0OiBCdWZmZXJcbn1cbmV4cG9ydCB0eXBlIFZpZXcgPSB7XG4gIG5hbWU6IHN0cmluZ1xuICByZWdleDogc3RyaW5nXG59XG5leHBvcnQgdHlwZSBKb2JzQW5kVmlld3MgPSB7XG4gIGpvYnM6IEpvYltdXG4gIHZpZXdzOiBWaWV3W11cbn1cblxuZXhwb3J0IGNsYXNzIEZpbGVzIHtcbiAgc3RhdGljIG9mKHdvcmtpbmdEaXI6IHN0cmluZywgbmFtZVByZWZpeDogc3RyaW5nKTogRmlsZXMge1xuICAgIHJldHVybiBuZXcgRmlsZXMod29ya2luZ0RpciwgbmFtZVByZWZpeClcbiAgfVxuXG4gIHByaXZhdGUgY29uc3RydWN0b3IocHJpdmF0ZSB3b3JraW5nRGlyOiBzdHJpbmcsIHByaXZhdGUgbmFtZVByZWZpeDogc3RyaW5nKSB7fVxuXG4gIGFzeW5jIGxpc3RKb2JzQW5kVmlld3MoKTogUHJvbWlzZTxKb2JzQW5kVmlld3M+IHtcbiAgICAvLyBnZXQgbGlzdCBvZiBKZW5raW5zZmlsZXMgaW4gZ2l2ZW4gd29ya2luZyBkaXJlY3RvcnlcbiAgICBjb25zdCBmaWxlcyA9IGF3YWl0IGdsb2IoJyoqL0plbmtpbnNmaWxlJywge2N3ZDogdGhpcy53b3JraW5nRGlyfSlcbiAgICAgIC50aGVuKChmaWxlcykgPT4gZmlsZXMubWFwKChmaWxlKSA9PiBmaWxlLnNwbGl0KHNlcCkpKVxuICAgICAgLnRoZW4oKGZpbGVzKSA9PiBmaWxlcy5maWx0ZXIoKGZpbGUpID0+IGZpbGUubGVuZ3RoID49IDIpKVxuXG4gICAgY29uc3Qgam9iczogSm9iW10gPSBmaWxlcy5tYXAoKGZpbGUpID0+IGpvYkJ5RmlsZW5hbWUodGhpcy53b3JraW5nRGlyLCB0aGlzLm5hbWVQcmVmaXgsIGZpbGUpKVxuICAgIGNvbnN0IHZpZXdzOiBWaWV3W10gPSBmaWxlc1xuICAgICAgLm1hcCgoZmlsZSkgPT4gdmlld0J5RmlsZW5hbWUodGhpcy5uYW1lUHJlZml4LCBmaWxlKSlcbiAgICAgIC5maWx0ZXIodW5pcXVlKChlbCwgaXQpID0+IGVsLm5hbWUgPT09IGl0Lm5hbWUpKVxuXG4gICAgcmV0dXJuIHtqb2JzLCB2aWV3c31cbiAgfVxufVxuXG5mdW5jdGlvbiBqb2JCeUZpbGVuYW1lKHdvcmtpbmdEaXI6IHN0cmluZywgbmFtZVByZWZpeDogc3RyaW5nLCBmaWxlOiBzdHJpbmdbXSk6IEpvYiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogam9iTmFtZUJ5RmlsZW5hbWUobmFtZVByZWZpeCwgZmlsZSksXG4gICAgc2NyaXB0OiByZWFkRmlsZVN5bmMoYCR7d29ya2luZ0Rpcn0ke3NlcH0ke2ZpbGUuam9pbihzZXApfWApLFxuICB9XG59XG5cbmZ1bmN0aW9uIGpvYk5hbWVCeUZpbGVuYW1lKG5hbWVQcmVmaXg6IHN0cmluZywgZmlsZTogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gW25hbWVQcmVmaXgsIC4uLmZpbGUuc2xpY2UoMCwgLTEpLm1hcChiZWF1dGlmeSldLmpvaW4oJyAtICcpXG59XG5cbmZ1bmN0aW9uIHZpZXdCeUZpbGVuYW1lKG5hbWVQcmVmaXg6IHN0cmluZywgZmlsZTogc3RyaW5nW10pOiBWaWV3IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiB2aWV3TmFtZUJ5RmlsZW5hbWUobmFtZVByZWZpeCwgZmlsZSksXG4gICAgcmVnZXg6IHZpZXdSZWdleEJ5RmlsZW5hbWUobmFtZVByZWZpeCwgZmlsZSksXG4gIH1cbn1cblxuZnVuY3Rpb24gdmlld05hbWVCeUZpbGVuYW1lKG5hbWVQcmVmaXg6IHN0cmluZywgZmlsZTogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gW25hbWVQcmVmaXgsIC4uLmZpbGUuc2xpY2UoMCwgLTIpLm1hcChiZWF1dGlmeSldLmpvaW4oJyAtICcpXG59XG5cbmZ1bmN0aW9uIHZpZXdSZWdleEJ5RmlsZW5hbWUobmFtZVByZWZpeDogc3RyaW5nLCBmaWxlOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtbbmFtZVByZWZpeCwgLi4uZmlsZS5zbGljZSgwLCAtMikubWFwKGJlYXV0aWZ5KV0uam9pbignIC0gJyl9IC0gKC4qKWBcbn1cblxuZnVuY3Rpb24gYmVhdXRpZnkodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHRva2VucyA9IHZhbHVlLnNwbGl0KC9bXy1dLylcbiAgY29uc3QgcmVzdWx0ID0gdG9rZW5zLm1hcChjYXBpdGFsaXplRmlyc3RMZXR0ZXIpLmpvaW4oJyAnKVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdExldHRlcihzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSlcbn1cbiJdfQ==