import * as axios from 'axios'
import {merge} from 'lodash'

import {Xml} from './xml'
import {AxiosRequestConfig} from 'axios'

export type JobsAndViews = {
  jobs: string[]
  views: string[]
}

export class Jenkins {
  static of(baseUrl: string, authUser: string, authToken: string): Jenkins {
    return new Jenkins(baseUrl, authUser, authToken)
  }

  private baseAxiosRequestConfig: axios.AxiosRequestConfig

  private constructor(baseURL: string, authUser: string, authToken: string) {
    this.baseAxiosRequestConfig = {
      baseURL,
      headers: {
        Authorization: basicAuthorization(authUser, authToken),
      },
    }
  }

  private requestConfig(config: Partial<AxiosRequestConfig>): AxiosRequestConfig {
    return merge({}, this.baseAxiosRequestConfig, config)
  }

  async listJobsAndViews(): Promise<JobsAndViews> {
    return axios(
      this.requestConfig({
        method: 'post',
        url: 'api/json?pretty=true',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    ).then((response) => ({
      jobs: response.data.jobs.map(nameProperty),
      views: response.data.views.map(nameProperty),
    }))
  }

  async deleteViewByName(name: string): Promise<string> {
    return axios(
      this.requestConfig({
        method: 'post',
        url: `view/${name}/doDelete`,
      }),
    ).then(() => name)
  }

  async deleteJobByName(name: string): Promise<string> {
    return axios(
      this.requestConfig({
        method: 'delete',
        url: `job/${name}/`,
      }),
    ).then(() => name)
  }

  async createJobFromTemplate(template: string, name: string, script: Buffer): Promise<string> {
    return this.getJobConfig(template)
      .then((config) => Xml.of(config).withTextValueSet('script', script.toString()).get())
      .then((config) => this.createJob(name, config))
      .then(() => name)
  }

  async createView(name: string): Promise<string> {
    return axios(
      this.requestConfig({
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
      }),
    ).then(() => name)
  }

  async getViewConfig(name: string): Promise<Document> {
    return axios(
      this.requestConfig({
        method: 'get',
        url: `view/${name}/config.xml`,
        headers: {
          'Content-Type': 'text/xml',
        },
      }),
    ).then((response) => Xml.of(response.data).get())
  }

  async updateViewConfig(name: string, config: Document): Promise<string> {
    return axios(
      this.requestConfig({
        method: 'post',
        url: `view/${name}/config.xml`,
        data: Xml.of(config).getAsString(),
        headers: {
          'Content-Type': 'application/xml',
        },
      }),
    ).then(() => name)
  }

  async createRegexBasedListView(name: string, regex: string): Promise<string> {
    return this.createView(name)
      .then((name) => this.getViewConfig(name))
      .then((config) =>
        this.updateViewConfig(name, Xml.of(config).withTextElementAdded('hudson.model.ListView', 'includeRegex', regex).get()),
      )
  }

  //
  // async listJobs(): Promise<string[]> {
  //   return axios(
  //     this.requestConfig({
  //       method: 'post',
  //       url: 'api/json?pretty=true',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }),
  //   ).then((response) => response.data.jobs.map((job: any) => job.name))
  // }
  //
  // async deleteJob(name: string): Promise<string> {
  //   return axios(
  //     this.requestConfig({
  //       method: 'delete',
  //       url: `job/${name}/`,
  //     }),
  //   ).then(() => name)
  // }

  async createJob(name: string, config: Document): Promise<string> {
    return axios(
      this.requestConfig({
        method: 'post',
        url: `createItem?name=${name}`,
        data: Xml.of(config).getAsString(),
        headers: {
          'Content-Type': 'text/xml',
        },
      }),
    ).then(() => name)
  }

  async updateJobPipelineScript(name: string, script: Buffer): Promise<string> {
    return this.getJobConfig(name)
      .then((config) => Xml.of(config).withTextValueSet('script', script.toString()).get())
      .then((config) => this.updateJobConfig(name, config))
  }

  async updateJobConfig(name: string, config: Document): Promise<string> {
    return axios(
      this.requestConfig({
        method: 'post',
        url: `job/${name}/config.xml`,
        data: Xml.of(config).getAsString(),
        headers: {
          'Content-Type': 'text/xml',
        },
      }),
    ).then(() => name)
  }

  async getJobConfig(name: string): Promise<Document> {
    return axios(
      this.requestConfig({
        method: 'get',
        url: `job/${name}/config.xml`,
        headers: {
          'Content-Type': 'text/xml',
        },
      }),
    ).then((response) => Xml.of(response.data).get())
  }
}

function basicAuthorization(user: string, token: string): string {
  return `Basic ${Buffer.from(`${user}:${token}`, 'utf8').toString('base64')}`
}

function nameProperty(value: any): string | undefined {
  return value?.name
}
