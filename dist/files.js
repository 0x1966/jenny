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
    getJobByFilename(path) {
        return jobByFilename(this.workingDir, this.namePrefix, path.split(path_1.sep));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQXlCO0FBQ3pCLDJCQUErQjtBQUMvQiwrQkFBd0I7QUFFeEIscUNBQStCO0FBZS9CLE1BQWEsS0FBSztJQUNoQixNQUFNLENBQUMsRUFBRSxDQUFDLFVBQWtCLEVBQUUsVUFBa0I7UUFDOUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDMUMsQ0FBQztJQUVELFlBQTRCLFVBQWtCLEVBQVUsVUFBa0I7UUFBOUMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVE7SUFBRyxDQUFDO0lBRXhFLGdCQUFnQjs7WUFFcEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLFdBQUksRUFBQyxnQkFBZ0IsRUFBRSxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFDLENBQUM7aUJBQy9ELElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyRCxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUU1RCxNQUFNLElBQUksR0FBVSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7WUFDOUYsTUFBTSxLQUFLLEdBQVcsS0FBSztpQkFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDcEQsTUFBTSxDQUFDLElBQUEsZUFBTSxFQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUVsRCxPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFBO1FBQ3RCLENBQUM7S0FBQTtJQUVELGdCQUFnQixDQUFDLElBQVk7UUFDM0IsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBRyxDQUFDLENBQUMsQ0FBQTtJQUN6RSxDQUFDO0NBQ0Y7QUF4QkQsc0JBd0JDO0FBRUQsU0FBUyxhQUFhLENBQUMsVUFBa0IsRUFBRSxVQUFrQixFQUFFLElBQWM7SUFDM0UsT0FBTztRQUNMLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO1FBQ3pDLE1BQU0sRUFBRSxJQUFBLGlCQUFZLEVBQUMsR0FBRyxVQUFVLEdBQUcsVUFBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBRyxDQUFDLEVBQUUsQ0FBQztLQUM3RCxDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsVUFBa0IsRUFBRSxJQUFjO0lBQzNELE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNyRSxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsVUFBa0IsRUFBRSxJQUFjO0lBQ3hELE9BQU87UUFDTCxJQUFJLEVBQUUsa0JBQWtCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztRQUMxQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztLQUM3QyxDQUFBO0FBQ0gsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsVUFBa0IsRUFBRSxJQUFjO0lBQzVELE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNyRSxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxVQUFrQixFQUFFLElBQWM7SUFDN0QsT0FBTyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQTtBQUNqRixDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsS0FBYTtJQUM3QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDMUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxDQUFTO0lBQ3RDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQy9DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2J9IGZyb20gJ2dsb2InXG5pbXBvcnQge3JlYWRGaWxlU3luY30gZnJvbSAnZnMnXG5pbXBvcnQge3NlcH0gZnJvbSAncGF0aCdcblxuaW1wb3J0IHt1bmlxdWV9IGZyb20gJy4vdW5pcXVlJ1xuXG5leHBvcnQgdHlwZSBKb2IgPSB7XG4gIG5hbWU6IHN0cmluZ1xuICBzY3JpcHQ6IEJ1ZmZlclxufVxuZXhwb3J0IHR5cGUgVmlldyA9IHtcbiAgbmFtZTogc3RyaW5nXG4gIHJlZ2V4OiBzdHJpbmdcbn1cbmV4cG9ydCB0eXBlIEpvYnNBbmRWaWV3cyA9IHtcbiAgam9iczogSm9iW11cbiAgdmlld3M6IFZpZXdbXVxufVxuXG5leHBvcnQgY2xhc3MgRmlsZXMge1xuICBzdGF0aWMgb2Yod29ya2luZ0Rpcjogc3RyaW5nLCBuYW1lUHJlZml4OiBzdHJpbmcpOiBGaWxlcyB7XG4gICAgcmV0dXJuIG5ldyBGaWxlcyh3b3JraW5nRGlyLCBuYW1lUHJlZml4KVxuICB9XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3Rvcihwcml2YXRlIHdvcmtpbmdEaXI6IHN0cmluZywgcHJpdmF0ZSBuYW1lUHJlZml4OiBzdHJpbmcpIHt9XG5cbiAgYXN5bmMgbGlzdEpvYnNBbmRWaWV3cygpOiBQcm9taXNlPEpvYnNBbmRWaWV3cz4ge1xuICAgIC8vIGdldCBsaXN0IG9mIEplbmtpbnNmaWxlcyBpbiBnaXZlbiB3b3JraW5nIGRpcmVjdG9yeVxuICAgIGNvbnN0IGZpbGVzID0gYXdhaXQgZ2xvYignKiovSmVua2luc2ZpbGUnLCB7Y3dkOiB0aGlzLndvcmtpbmdEaXJ9KVxuICAgICAgLnRoZW4oKGZpbGVzKSA9PiBmaWxlcy5tYXAoKGZpbGUpID0+IGZpbGUuc3BsaXQoc2VwKSkpXG4gICAgICAudGhlbigoZmlsZXMpID0+IGZpbGVzLmZpbHRlcigoZmlsZSkgPT4gZmlsZS5sZW5ndGggPj0gMikpXG5cbiAgICBjb25zdCBqb2JzOiBKb2JbXSA9IGZpbGVzLm1hcCgoZmlsZSkgPT4gam9iQnlGaWxlbmFtZSh0aGlzLndvcmtpbmdEaXIsIHRoaXMubmFtZVByZWZpeCwgZmlsZSkpXG4gICAgY29uc3Qgdmlld3M6IFZpZXdbXSA9IGZpbGVzXG4gICAgICAubWFwKChmaWxlKSA9PiB2aWV3QnlGaWxlbmFtZSh0aGlzLm5hbWVQcmVmaXgsIGZpbGUpKVxuICAgICAgLmZpbHRlcih1bmlxdWUoKGVsLCBpdCkgPT4gZWwubmFtZSA9PT0gaXQubmFtZSkpXG5cbiAgICByZXR1cm4ge2pvYnMsIHZpZXdzfVxuICB9XG5cbiAgZ2V0Sm9iQnlGaWxlbmFtZShwYXRoOiBzdHJpbmcpOiBKb2Ige1xuICAgIHJldHVybiBqb2JCeUZpbGVuYW1lKHRoaXMud29ya2luZ0RpciwgdGhpcy5uYW1lUHJlZml4LCBwYXRoLnNwbGl0KHNlcCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gam9iQnlGaWxlbmFtZSh3b3JraW5nRGlyOiBzdHJpbmcsIG5hbWVQcmVmaXg6IHN0cmluZywgZmlsZTogc3RyaW5nW10pOiBKb2Ige1xuICByZXR1cm4ge1xuICAgIG5hbWU6IGpvYk5hbWVCeUZpbGVuYW1lKG5hbWVQcmVmaXgsIGZpbGUpLFxuICAgIHNjcmlwdDogcmVhZEZpbGVTeW5jKGAke3dvcmtpbmdEaXJ9JHtzZXB9JHtmaWxlLmpvaW4oc2VwKX1gKSxcbiAgfVxufVxuXG5mdW5jdGlvbiBqb2JOYW1lQnlGaWxlbmFtZShuYW1lUHJlZml4OiBzdHJpbmcsIGZpbGU6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgcmV0dXJuIFtuYW1lUHJlZml4LCAuLi5maWxlLnNsaWNlKDAsIC0xKS5tYXAoYmVhdXRpZnkpXS5qb2luKCcgLSAnKVxufVxuXG5mdW5jdGlvbiB2aWV3QnlGaWxlbmFtZShuYW1lUHJlZml4OiBzdHJpbmcsIGZpbGU6IHN0cmluZ1tdKTogVmlldyB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogdmlld05hbWVCeUZpbGVuYW1lKG5hbWVQcmVmaXgsIGZpbGUpLFxuICAgIHJlZ2V4OiB2aWV3UmVnZXhCeUZpbGVuYW1lKG5hbWVQcmVmaXgsIGZpbGUpLFxuICB9XG59XG5cbmZ1bmN0aW9uIHZpZXdOYW1lQnlGaWxlbmFtZShuYW1lUHJlZml4OiBzdHJpbmcsIGZpbGU6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgcmV0dXJuIFtuYW1lUHJlZml4LCAuLi5maWxlLnNsaWNlKDAsIC0yKS5tYXAoYmVhdXRpZnkpXS5qb2luKCcgLSAnKVxufVxuXG5mdW5jdGlvbiB2aWV3UmVnZXhCeUZpbGVuYW1lKG5hbWVQcmVmaXg6IHN0cmluZywgZmlsZTogc3RyaW5nW10pOiBzdHJpbmcge1xuICByZXR1cm4gYCR7W25hbWVQcmVmaXgsIC4uLmZpbGUuc2xpY2UoMCwgLTIpLm1hcChiZWF1dGlmeSldLmpvaW4oJyAtICcpfSAtICguKilgXG59XG5cbmZ1bmN0aW9uIGJlYXV0aWZ5KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCB0b2tlbnMgPSB2YWx1ZS5zcGxpdCgvW18tXS8pXG4gIGNvbnN0IHJlc3VsdCA9IHRva2Vucy5tYXAoY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKS5qb2luKCcgJylcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHMuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzLnNsaWNlKDEpXG59XG4iXX0=