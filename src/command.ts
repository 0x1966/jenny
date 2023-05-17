import {Jenkins, JobsAndViews as JenkinsJobsAndViews} from './jenkins'
import {Files, JobsAndViews as FilesJobsAndViews} from './files'
import {Config} from './config'

import {println, printError} from './output'

export class Command {
  static of(config: Config): Command {
    return new Command(config)
  }

  private jenkins: Jenkins

  private constructor(private config: Config) {
    this.jenkins = Jenkins.of(config.baseUrl, config.user, config.token)
  }

  async deleteJobsAndViewsBasedOnPath(path: string) {
    // get list of jenkins jobs and views
    const jenkinsJobsAndViews = await this.jenkins.listJobsAndViews()

    // get a list of jobs and views based on the given directory
    const fileBasedJobsAndViews = await Files.of(path, this.config.namePrefix).listJobsAndViews()

    // lookup all jenkins jobs and views, which exists on the file system as well and delete them on jenkins
    const jenkinsJobsToDelete = jenkinsJobsAndViews.jobs.filter((name) =>
      fileBasedJobsAndViews.jobs.some((job) => job.name === name),
    )

    const jenkinsViewsToDelete = jenkinsJobsAndViews.views.filter((name) =>
      fileBasedJobsAndViews.views.some((view) => view.name === name),
    )

    // delete views
    jenkinsViewsToDelete.forEach((name) =>
      this.jenkins
        .deleteViewByName(name)
        .then((n) => println(`[X] view "${n}"`))
        .catch((e) => printError(`[!] error deleting view "${name}"`, e)),
    )

    // delete jobs
    jenkinsJobsToDelete.forEach((name) =>
      this.jenkins
        .deleteJobByName(name)
        .then((n) => println(`[X] job "${n}"`))
        .catch((e) => printError(`[!] error deleting job "${name}"`, e)),
    )
  }

  async syncJobsAndViewsBasedOnPath(path: string) {
    // get list of jenkins jobs and views
    const jenkinsJobsAndViews = await this.jenkins.listJobsAndViews()

    // get a list of jobs and views based on the given directory
    const fileBasedJobsAndViews = await Files.of(path, this.config.namePrefix).listJobsAndViews()

    await this.syncJobsBasedOnPath(jenkinsJobsAndViews, fileBasedJobsAndViews)
    await this.syncViewsBasedOnPath(jenkinsJobsAndViews, fileBasedJobsAndViews)
  }

  async syncJobsBasedOnPath(jenkinsJobsAndViews: JenkinsJobsAndViews, fileBasedJobsAndViews: FilesJobsAndViews) {
    // determine jenkins jobs, which DO NOT exist on file system anymore --> these jobs will be DELETED
    // (however, DO NOT delete jobs, which arent 'managed' by jenny)
    const jenkinsJobsToDelete = jenkinsJobsAndViews.jobs
      .filter((name) => name.startsWith(this.config.namePrefix))
      .filter((name) => !fileBasedJobsAndViews.jobs.some((job) => job.name === name))

    // determine jenkins jobs, which exist on file system BUT DO NOT exist on jenkins --> these jobs will be CREATED
    const fileBasedJobsToCreate = fileBasedJobsAndViews.jobs.filter(
      (job) => !jenkinsJobsAndViews.jobs.some((name) => job.name === name),
    )

    // determine jenkins jobs, which exist on file system AND on jenkins --> these jobs' script will be UPDATED
    const fileBasedJobsToUpdate = fileBasedJobsAndViews.jobs.filter((job) =>
      jenkinsJobsAndViews.jobs.some((name) => job.name === name),
    )

    // delete jobs
    jenkinsJobsToDelete.forEach((name) =>
      this.jenkins
        .deleteJobByName(name)
        .then((n) => println(`[X] job "${n}"`))
        .catch((e) => printError(`[!] error deleting job "${name}"`, e)),
    )

    // create jobs
    fileBasedJobsToCreate.forEach((job) =>
      this.jenkins
        .createJobFromTemplate(this.config.jobTemplate, job.name, job.script)
        .then((n) => println(`[C] job "${n}"`))
        .catch((e) => printError(`[!] error creating job "${job.name}"`, e)),
    )

    // update jobs
    fileBasedJobsToUpdate.forEach((job) =>
      this.jenkins
        .updateJobPipelineScript(job.name, job.script)
        .then((n) => println(`[U] job "${n}"`))
        .catch((e) => printError(`[!] error updating job "${job.name}"`, e)),
    )
  }

  async syncViewsBasedOnPath(jenkinsJobsAndViews: JenkinsJobsAndViews, fileBasedJobsAndViews: FilesJobsAndViews) {
    // determine jenkins views, which DO NOT exist on file system anymore --> these views will be DELETED
    // (however, DO NOT delete views, which arent 'managed' by jenny)
    const jenkinsViewsToDelete = jenkinsJobsAndViews.views
      .filter((name) => name.startsWith(this.config.namePrefix))
      .filter((name) => !fileBasedJobsAndViews.views.some((view) => view.name === name))

    // determine jenkins views, which exist on file system BUT DO NOT exist on jenkins --> these views will be CREATED
    const fileBasedViewsToCreate = fileBasedJobsAndViews.views.filter(
      (view) => !jenkinsJobsAndViews.views.some((name) => view.name === name),
    )

    // // determine jenkins views, which exist on file system AND on jenkins --> nothing has to be done with them !
    // const fileBasedViewsToUpdate = fileBasedJobsAndViews.views.filter((view) =>
    //   jenkinsJobsAndViews.views.some((name) => view.name === name),
    // )

    // delete views
    jenkinsViewsToDelete.forEach((name) =>
      this.jenkins
        .deleteViewByName(name)
        .then((n) => println(`[X] view "${n}"`))
        .catch((e) => printError(`[!] error deleting view "${name}"`, e)),
    )

    // create views
    fileBasedViewsToCreate.forEach((view) =>
      this.jenkins
        .createRegexBasedListView(view.name, view.regex)
        .then((n) => println(`[C] view "${n}"`))
        .catch((e) => printError(`[!] error creating view "${view.name}"`, e)),
    )
  }
}
