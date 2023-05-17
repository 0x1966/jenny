"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = require("chokidar");
const watcher = (0, chokidar_1.watch)('**/Jenkinsfile', {
    ignored: /(^|[\/\\])\../,
    persistent: true,
});
const log = console.log.bind(console);
watcher
    .on('add', (path) => log(`File ${path} has been added`))
    .on('change', (path) => log(`File ${path} has been changed`))
    .on('unlink', (path) => log(`File ${path} has been removed`));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBOEI7QUFHOUIsTUFBTSxPQUFPLEdBQUcsSUFBQSxnQkFBSyxFQUFDLGdCQUFnQixFQUFFO0lBQ3RDLE9BQU8sRUFBRSxlQUFlO0lBQ3hCLFVBQVUsRUFBRSxJQUFJO0NBQ2pCLENBQUMsQ0FBQTtBQUdGLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRXJDLE9BQU87S0FDSixFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGlCQUFpQixDQUFDLENBQUM7S0FDdkQsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxtQkFBbUIsQ0FBQyxDQUFDO0tBQzVELEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksbUJBQW1CLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt3YXRjaH0gZnJvbSAnY2hva2lkYXInXG5cbi8vIEluaXRpYWxpemUgd2F0Y2hlci5cbmNvbnN0IHdhdGNoZXIgPSB3YXRjaCgnKiovSmVua2luc2ZpbGUnLCB7XG4gIGlnbm9yZWQ6IC8oXnxbXFwvXFxcXF0pXFwuLi8sIC8vIGlnbm9yZSBkb3RmaWxlc1xuICBwZXJzaXN0ZW50OiB0cnVlLFxufSlcblxuLy8gU29tZXRoaW5nIHRvIHVzZSB3aGVuIGV2ZW50cyBhcmUgcmVjZWl2ZWQuXG5jb25zdCBsb2cgPSBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpXG4vLyBBZGQgZXZlbnQgbGlzdGVuZXJzLlxud2F0Y2hlclxuICAub24oJ2FkZCcsIChwYXRoKSA9PiBsb2coYEZpbGUgJHtwYXRofSBoYXMgYmVlbiBhZGRlZGApKVxuICAub24oJ2NoYW5nZScsIChwYXRoKSA9PiBsb2coYEZpbGUgJHtwYXRofSBoYXMgYmVlbiBjaGFuZ2VkYCkpXG4gIC5vbigndW5saW5rJywgKHBhdGgpID0+IGxvZyhgRmlsZSAke3BhdGh9IGhhcyBiZWVuIHJlbW92ZWRgKSlcbiJdfQ==