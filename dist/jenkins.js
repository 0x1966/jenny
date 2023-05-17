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
exports.Jenkins = void 0;
const axios = require("axios");
const lodash_1 = require("lodash");
const xml_1 = require("./xml");
class Jenkins {
    static of(baseUrl, authUser, authToken) {
        return new Jenkins(baseUrl, authUser, authToken);
    }
    constructor(baseURL, authUser, authToken) {
        this.baseAxiosRequestConfig = {
            baseURL,
            headers: {
                Authorization: basicAuthorization(authUser, authToken),
            },
        };
    }
    requestConfig(config) {
        return (0, lodash_1.merge)({}, this.baseAxiosRequestConfig, config);
    }
    listJobsAndViews() {
        return __awaiter(this, void 0, void 0, function* () {
            return axios(this.requestConfig({
                method: 'post',
                url: 'api/json?pretty=true',
                headers: {
                    'Content-Type': 'application/json',
                },
            })).then((response) => ({
                jobs: response.data.jobs.map(nameProperty),
                views: response.data.views.map(nameProperty),
            }));
        });
    }
    deleteViewByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios(this.requestConfig({
                method: 'post',
                url: `view/${name}/doDelete`,
            })).then(() => name);
        });
    }
    deleteJobByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios(this.requestConfig({
                method: 'delete',
                url: `job/${name}/`,
            })).then(() => name);
        });
    }
    createJobFromTemplate(template, name, script) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getJobConfig(template)
                .then((config) => xml_1.Xml.of(config).withTextValueSet('script', script.toString()).get())
                .then((config) => this.createJob(name, config))
                .then(() => name);
        });
    }
    createView(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios(this.requestConfig({
                method: 'post',
                url: 'createView',
                data: {
                    name,
                    mode: 'hudson.model.ListView',
                    json: `{"name": "${name}", "mode": "hudson.model.ListView"}`,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })).then(() => name);
        });
    }
    getViewConfig(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios(this.requestConfig({
                method: 'get',
                url: `view/${name}/config.xml`,
                headers: {
                    'Content-Type': 'text/xml',
                },
            })).then((response) => xml_1.Xml.of(response.data).get());
        });
    }
    updateViewConfig(name, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios(this.requestConfig({
                method: 'post',
                url: `view/${name}/config.xml`,
                data: xml_1.Xml.of(config).getAsString(),
                headers: {
                    'Content-Type': 'application/xml',
                },
            })).then(() => name);
        });
    }
    createRegexBasedListView(name, regex) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createView(name)
                .then((name) => this.getViewConfig(name))
                .then((config) => this.updateViewConfig(name, xml_1.Xml.of(config).withTextElementAdded('hudson.model.ListView', 'includeRegex', regex).get()));
        });
    }
    createJob(name, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios(this.requestConfig({
                method: 'post',
                url: `createItem?name=${name}`,
                data: xml_1.Xml.of(config).getAsString(),
                headers: {
                    'Content-Type': 'text/xml',
                },
            })).then(() => name);
        });
    }
    updateJobPipelineScript(name, script) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getJobConfig(name)
                .then((config) => xml_1.Xml.of(config).withTextValueSet('script', script.toString()).get())
                .then((config) => this.updateJobConfig(name, config));
        });
    }
    updateJobConfig(name, config) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios(this.requestConfig({
                method: 'post',
                url: `job/${name}/config.xml`,
                data: xml_1.Xml.of(config).getAsString(),
                headers: {
                    'Content-Type': 'text/xml',
                },
            })).then(() => name);
        });
    }
    getJobConfig(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios(this.requestConfig({
                method: 'get',
                url: `job/${name}/config.xml`,
                headers: {
                    'Content-Type': 'text/xml',
                },
            })).then((response) => xml_1.Xml.of(response.data).get());
        });
    }
}
exports.Jenkins = Jenkins;
function basicAuthorization(user, token) {
    return `Basic ${Buffer.from(`${user}:${token}`, 'utf8').toString('base64')}`;
}
function nameProperty(value) {
    return value === null || value === void 0 ? void 0 : value.name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamVua2lucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9qZW5raW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtCQUE4QjtBQUM5QixtQ0FBNEI7QUFFNUIsK0JBQXlCO0FBUXpCLE1BQWEsT0FBTztJQUNsQixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQWUsRUFBRSxRQUFnQixFQUFFLFNBQWlCO1FBQzVELE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUNsRCxDQUFDO0lBSUQsWUFBb0IsT0FBZSxFQUFFLFFBQWdCLEVBQUUsU0FBaUI7UUFDdEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHO1lBQzVCLE9BQU87WUFDUCxPQUFPLEVBQUU7Z0JBQ1AsYUFBYSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDdkQ7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUVPLGFBQWEsQ0FBQyxNQUFtQztRQUN2RCxPQUFPLElBQUEsY0FBSyxFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDdkQsQ0FBQztJQUVLLGdCQUFnQjs7WUFDcEIsT0FBTyxLQUFLLENBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDakIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLHNCQUFzQjtnQkFDM0IsT0FBTyxFQUFFO29CQUNQLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ25DO2FBQ0YsQ0FBQyxDQUNILENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQztnQkFDMUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZ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Y2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBheGlvcyBmcm9tICdheGlvcydcbmltcG9ydCB7bWVyZ2V9IGZyb20gJ2xvZGFzaCdcblxuaW1wb3J0IHtYbWx9IGZyb20gJy4veG1sJ1xuaW1wb3J0IHtBeGlvc1JlcXVlc3RDb25maWd9IGZyb20gJ2F4aW9zJ1xuXG5leHBvcnQgdHlwZSBKb2JzQW5kVmlld3MgPSB7XG4gIGpvYnM6IHN0cmluZ1tdXG4gIHZpZXdzOiBzdHJpbmdbXVxufVxuXG5leHBvcnQgY2xhc3MgSmVua2lucyB7XG4gIHN0YXRpYyBvZihiYXNlVXJsOiBzdHJpbmcsIGF1dGhVc2VyOiBzdHJpbmcsIGF1dGhUb2tlbjogc3RyaW5nKTogSmVua2lucyB7XG4gICAgcmV0dXJuIG5ldyBKZW5raW5zKGJhc2VVcmwsIGF1dGhVc2VyLCBhdXRoVG9rZW4pXG4gIH1cblxuICBwcml2YXRlIGJhc2VBeGlvc1JlcXVlc3RDb25maWc6IGF4aW9zLkF4aW9zUmVxdWVzdENvbmZpZ1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoYmFzZVVSTDogc3RyaW5nLCBhdXRoVXNlcjogc3RyaW5nLCBhdXRoVG9rZW46IHN0cmluZykge1xuICAgIHRoaXMuYmFzZUF4aW9zUmVxdWVzdENvbmZpZyA9IHtcbiAgICAgIGJhc2VVUkwsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGJhc2ljQXV0aG9yaXphdGlvbihhdXRoVXNlciwgYXV0aFRva2VuKSxcbiAgICAgIH0sXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0Q29uZmlnKGNvbmZpZzogUGFydGlhbDxBeGlvc1JlcXVlc3RDb25maWc+KTogQXhpb3NSZXF1ZXN0Q29uZmlnIHtcbiAgICByZXR1cm4gbWVyZ2Uoe30sIHRoaXMuYmFzZUF4aW9zUmVxdWVzdENvbmZpZywgY29uZmlnKVxuICB9XG5cbiAgYXN5bmMgbGlzdEpvYnNBbmRWaWV3cygpOiBQcm9taXNlPEpvYnNBbmRWaWV3cz4ge1xuICAgIHJldHVybiBheGlvcyhcbiAgICAgIHRoaXMucmVxdWVzdENvbmZpZyh7XG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICB1cmw6ICdhcGkvanNvbj9wcmV0dHk9dHJ1ZScsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKS50aGVuKChyZXNwb25zZSkgPT4gKHtcbiAgICAgIGpvYnM6IHJlc3BvbnNlLmRhdGEuam9icy5tYXAobmFtZVByb3BlcnR5KSxcbiAgICAgIHZpZXdzOiByZXNwb25zZS5kYXRhLnZpZXdzLm1hcChuYW1lUHJvcGVydHkpLFxuICAgIH0pKVxuICB9XG5cbiAgYXN5bmMgZGVsZXRlVmlld0J5TmFtZShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBheGlvcyhcbiAgICAgIHRoaXMucmVxdWVzdENvbmZpZyh7XG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICB1cmw6IGB2aWV3LyR7bmFtZX0vZG9EZWxldGVgLFxuICAgICAgfSksXG4gICAgKS50aGVuKCgpID0+IG5hbWUpXG4gIH1cblxuICBhc3luYyBkZWxldGVKb2JCeU5hbWUobmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gYXhpb3MoXG4gICAgICB0aGlzLnJlcXVlc3RDb25maWcoe1xuICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICB1cmw6IGBqb2IvJHtuYW1lfS9gLFxuICAgICAgfSksXG4gICAgKS50aGVuKCgpID0+IG5hbWUpXG4gIH1cblxuICBhc3luYyBjcmVhdGVKb2JGcm9tVGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZywgbmFtZTogc3RyaW5nLCBzY3JpcHQ6IEJ1ZmZlcik6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Sm9iQ29uZmlnKHRlbXBsYXRlKVxuICAgICAgLnRoZW4oKGNvbmZpZykgPT4gWG1sLm9mKGNvbmZpZykud2l0aFRleHRWYWx1ZVNldCgnc2NyaXB0Jywgc2NyaXB0LnRvU3RyaW5nKCkpLmdldCgpKVxuICAgICAgLnRoZW4oKGNvbmZpZykgPT4gdGhpcy5jcmVhdGVKb2IobmFtZSwgY29uZmlnKSlcbiAgICAgIC50aGVuKCgpID0+IG5hbWUpXG4gIH1cblxuICBhc3luYyBjcmVhdGVWaWV3KG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuIGF4aW9zKFxuICAgICAgdGhpcy5yZXF1ZXN0Q29uZmlnKHtcbiAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgIHVybDogJ2NyZWF0ZVZpZXcnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBtb2RlOiAnaHVkc29uLm1vZGVsLkxpc3RWaWV3JyxcbiAgICAgICAgICBqc29uOiBge1wibmFtZVwiOiBcIiR7bmFtZX1cIiwgXCJtb2RlXCI6IFwiaHVkc29uLm1vZGVsLkxpc3RWaWV3XCJ9YCxcbiAgICAgICAgfSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICApLnRoZW4oKCkgPT4gbmFtZSlcbiAgfVxuXG4gIGFzeW5jIGdldFZpZXdDb25maWcobmFtZTogc3RyaW5nKTogUHJvbWlzZTxEb2N1bWVudD4ge1xuICAgIHJldHVybiBheGlvcyhcbiAgICAgIHRoaXMucmVxdWVzdENvbmZpZyh7XG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHVybDogYHZpZXcvJHtuYW1lfS9jb25maWcueG1sYCxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC94bWwnLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKS50aGVuKChyZXNwb25zZSkgPT4gWG1sLm9mKHJlc3BvbnNlLmRhdGEpLmdldCgpKVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlVmlld0NvbmZpZyhuYW1lOiBzdHJpbmcsIGNvbmZpZzogRG9jdW1lbnQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBheGlvcyhcbiAgICAgIHRoaXMucmVxdWVzdENvbmZpZyh7XG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICB1cmw6IGB2aWV3LyR7bmFtZX0vY29uZmlnLnhtbGAsXG4gICAgICAgIGRhdGE6IFhtbC5vZihjb25maWcpLmdldEFzU3RyaW5nKCksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3htbCcsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICApLnRoZW4oKCkgPT4gbmFtZSlcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVJlZ2V4QmFzZWRMaXN0VmlldyhuYW1lOiBzdHJpbmcsIHJlZ2V4OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZVZpZXcobmFtZSlcbiAgICAgIC50aGVuKChuYW1lKSA9PiB0aGlzLmdldFZpZXdDb25maWcobmFtZSkpXG4gICAgICAudGhlbigoY29uZmlnKSA9PlxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXdDb25maWcobmFtZSwgWG1sLm9mKGNvbmZpZykud2l0aFRleHRFbGVtZW50QWRkZWQoJ2h1ZHNvbi5tb2RlbC5MaXN0VmlldycsICdpbmNsdWRlUmVnZXgnLCByZWdleCkuZ2V0KCkpLFxuICAgICAgKVxuICB9XG5cbiAgLy9cbiAgLy8gYXN5bmMgbGlzdEpvYnMoKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICAvLyAgIHJldHVybiBheGlvcyhcbiAgLy8gICAgIHRoaXMucmVxdWVzdENvbmZpZyh7XG4gIC8vICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAvLyAgICAgICB1cmw6ICdhcGkvanNvbj9wcmV0dHk9dHJ1ZScsXG4gIC8vICAgICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAvLyAgICAgICB9LFxuICAvLyAgICAgfSksXG4gIC8vICAgKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuZGF0YS5qb2JzLm1hcCgoam9iOiBhbnkpID0+IGpvYi5uYW1lKSlcbiAgLy8gfVxuICAvL1xuICAvLyBhc3luYyBkZWxldGVKb2IobmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgLy8gICByZXR1cm4gYXhpb3MoXG4gIC8vICAgICB0aGlzLnJlcXVlc3RDb25maWcoe1xuICAvLyAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAvLyAgICAgICB1cmw6IGBqb2IvJHtuYW1lfS9gLFxuICAvLyAgICAgfSksXG4gIC8vICAgKS50aGVuKCgpID0+IG5hbWUpXG4gIC8vIH1cblxuICBhc3luYyBjcmVhdGVKb2IobmFtZTogc3RyaW5nLCBjb25maWc6IERvY3VtZW50KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gYXhpb3MoXG4gICAgICB0aGlzLnJlcXVlc3RDb25maWcoe1xuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgdXJsOiBgY3JlYXRlSXRlbT9uYW1lPSR7bmFtZX1gLFxuICAgICAgICBkYXRhOiBYbWwub2YoY29uZmlnKS5nZXRBc1N0cmluZygpLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3htbCcsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICApLnRoZW4oKCkgPT4gbmFtZSlcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZUpvYlBpcGVsaW5lU2NyaXB0KG5hbWU6IHN0cmluZywgc2NyaXB0OiBCdWZmZXIpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmdldEpvYkNvbmZpZyhuYW1lKVxuICAgICAgLnRoZW4oKGNvbmZpZykgPT4gWG1sLm9mKGNvbmZpZykud2l0aFRleHRWYWx1ZVNldCgnc2NyaXB0Jywgc2NyaXB0LnRvU3RyaW5nKCkpLmdldCgpKVxuICAgICAgLnRoZW4oKGNvbmZpZykgPT4gdGhpcy51cGRhdGVKb2JDb25maWcobmFtZSwgY29uZmlnKSlcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZUpvYkNvbmZpZyhuYW1lOiBzdHJpbmcsIGNvbmZpZzogRG9jdW1lbnQpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBheGlvcyhcbiAgICAgIHRoaXMucmVxdWVzdENvbmZpZyh7XG4gICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICB1cmw6IGBqb2IvJHtuYW1lfS9jb25maWcueG1sYCxcbiAgICAgICAgZGF0YTogWG1sLm9mKGNvbmZpZykuZ2V0QXNTdHJpbmcoKSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAndGV4dC94bWwnLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKS50aGVuKCgpID0+IG5hbWUpXG4gIH1cblxuICBhc3luYyBnZXRKb2JDb25maWcobmFtZTogc3RyaW5nKTogUHJvbWlzZTxEb2N1bWVudD4ge1xuICAgIHJldHVybiBheGlvcyhcbiAgICAgIHRoaXMucmVxdWVzdENvbmZpZyh7XG4gICAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICAgIHVybDogYGpvYi8ke25hbWV9L2NvbmZpZy54bWxgLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3htbCcsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICApLnRoZW4oKHJlc3BvbnNlKSA9PiBYbWwub2YocmVzcG9uc2UuZGF0YSkuZ2V0KCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzaWNBdXRob3JpemF0aW9uKHVzZXI6IHN0cmluZywgdG9rZW46IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBgQmFzaWMgJHtCdWZmZXIuZnJvbShgJHt1c2VyfToke3Rva2VufWAsICd1dGY4JykudG9TdHJpbmcoJ2Jhc2U2NCcpfWBcbn1cblxuZnVuY3Rpb24gbmFtZVByb3BlcnR5KHZhbHVlOiBhbnkpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICByZXR1cm4gdmFsdWU/Lm5hbWVcbn1cbiJdfQ==