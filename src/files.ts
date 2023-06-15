import {glob} from 'glob'
import {readFileSync} from 'fs'
import {sep} from 'path'

import {unique} from './unique'

export type Job = {
  name: string
  script: Buffer
}
export type View = {
  name: string
  regex: string
}
export type JobsAndViews = {
  jobs: Job[]
  views: View[]
}

export class Files {
  static of(workingDir: string, namePrefix: string): Files {
    return new Files(workingDir, namePrefix)
  }

  private constructor(private workingDir: string, private namePrefix: string) {}

  async listJobsAndViews(): Promise<JobsAndViews> {
    // get list of Jenkinsfiles in given working directory
    const files = await glob('**/Jenkinsfile', {cwd: this.workingDir})
      .then((files) => files.map((file) => file.split(sep)))
      .then((files) => files.filter((file) => file.length >= 2))

    const jobs: Job[] = files.map((file) => jobByFilename(this.workingDir, this.namePrefix, file))
    const views: View[] = files
      .map((file) => viewByFilename(this.namePrefix, file))
      .filter(unique((el, it) => el.name === it.name))

    return {jobs, views}
  }

  getJobByFilename(path: string): Job {
    return jobByFilename(this.workingDir, this.namePrefix, path.split(sep))
  }
}

function jobByFilename(workingDir: string, namePrefix: string, file: string[]): Job {
  return {
    name: jobNameByFilename(namePrefix, file),
    script: readFileSync(`${workingDir}${sep}${file.join(sep)}`),
  }
}

function jobNameByFilename(namePrefix: string, file: string[]): string {
  return [namePrefix, ...file.slice(0, -1).map(beautify)].join(' - ')
}

function viewByFilename(namePrefix: string, file: string[]): View {
  return {
    name: viewNameByFilename(namePrefix, file),
    regex: viewRegexByFilename(namePrefix, file),
  }
}

function viewNameByFilename(namePrefix: string, file: string[]): string {
  return [namePrefix, ...file.slice(0, -2).map(beautify)].join(' - ')
}

function viewRegexByFilename(namePrefix: string, file: string[]): string {
  return `${[namePrefix, ...file.slice(0, -2).map(beautify)].join(' - ')} - (.*)`
}

function beautify(value: string): string {
  const tokens = value.split(/[_-]/)
  const result = tokens.map(capitalizeFirstLetter).join(' ')
  return result
}

function capitalizeFirstLetter(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
