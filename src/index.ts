#!/usr/bin/env node
import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

import {loadConfig, Config} from './config'
import {printWarning} from './output'
import {Command} from './command'

const config = loadConfig((configFilename, error) => printWarning(`error loading "${configFilename}"`, error))

function configFromArgs(argv: any): Config {
  return {
    baseUrl: argv.baseUrl,
    user: argv.user,
    token: argv.token,
    jobTemplate: argv.jobTemplate,
    namePrefix: argv.namePrefix,
  }
}

yargs(hideBin(process.argv))
  .command(
    'delete [path]',
    'delete jenkins jobs and views according to given path',
    (yargs) =>
      yargs.positional('path', {
        describe: 'select jobs in view',
        type: 'string',
      }),
    (argv) => Command.of(configFromArgs(argv)).deleteJobsAndViewsBasedOnPath(argv.path as string),
  )
  .command(
    'sync [path]',
    'one-time sync jenkins jobs and views according to given path',
    (yargs) =>
      yargs.positional('path', {
        describe: 'select jobs in view',
        type: 'string',
      }),
    (argv) => Command.of(configFromArgs(argv)).syncJobsAndViewsBasedOnPath(argv.path as string),
  )
  // .command(
  //   'list-jobs [view]',
  //   'list jobs',
  //   (yargs) => {
  //     return yargs.positional('view', {
  //       describe: 'select jobs in view',
  //       type: 'string',
  //     })
  //   },
  //   (argv) => {
  //     const fetch = argv.view ? fetchJobsInView(argv.view) : fetchAllJobs()
  //     fetch(hostAndCredentials(argv))
  //       .then((jobs) => jobs.forEach((job) => println(`${job.name}`)))
  //       .catch((reason) => printError(reason))
  //   },
  // )
  // .command(
  //   'create-list-view [viewname] [viewregex]',
  //   'create a regex-based list view',
  //   (yargs) => {
  //     return yargs
  //       .positional('viewname', {
  //         describe: `"the·view's·name"`,
  //         type: 'string',
  //       })
  //       .positional('viewregex', {
  //         describe: `"the view's regular expression to select jobs"`,
  //         type: 'string',
  //       })
  //   },
  //   (argv) => {
  //     const baseURL = argv.baseUrl as string
  //     const user = argv.user as string
  //     const token = argv.token as string
  //     JenkinsHighlevel.of(baseURL, user, token)
  //       .createListViewWithRegEx(argv.viewname as string, argv.viewregex as string)
  //       .then((name) => console.log(`created view ${name}`))
  //   },
  // )
  // .command(
  //   'list-views',
  //   'list views',
  //   (yargs) => yargs,
  //   (argv) => {
  //     const baseURL = argv.baseUrl as string
  //     const user = argv.user as string
  //     const token = argv.token as string
  //     Jenkins.of(baseURL, user, token)
  //       .listViews()
  //       .then((views) => views.forEach(println))
  //   },
  // )
  // .command(
  //   'delete-view [viewname]',
  //   'delete view by name',
  //   (yargs) => {
  //     return yargs.positional('viewname', {
  //       describe: `"the·view's·name"`,
  //       type: 'string',
  //     })
  //   },
  //   (argv) => {
  //     const baseURL = argv.baseUrl as string
  //     const user = argv.user as string
  //     const token = argv.token as string
  //     Jenkins.of(baseURL, user, token)
  //       .deleteView(argv.viewname as string)
  //       .then((name) => println(`deleted view with name "${name}"`))
  //   },
  // )
  // .command(
  //   'delete-all-views',
  //   'delete all views',
  //   (yargs) => yargs,
  //   (argv) => {
  //     const baseURL = argv.baseUrl as string
  //     const user = argv.user as string
  //     const token = argv.token as string
  //     JenkinsHighlevel.of(baseURL, user, token)
  //       .deleteAllViews()
  //       .then((count) => println(`deleted ${count} views`))
  //   },
  // )
  // .command(
  //   'list-jobs',
  //   'list jobs',
  //   (yargs) => yargs,
  //   (argv) => {
  //     const baseURL = argv.baseUrl as string
  //     const user = argv.user as string
  //     const token = argv.token as string
  //     Jenkins.of(baseURL, user, token)
  //       .listJobs()
  //       .then((jobs) => jobs.forEach(println))
  //   },
  // )
  // .command(
  //   'delete-job [jobname]',
  //   'delete job by name',
  //   (yargs) => {
  //     return yargs.positional('jobname', {
  //       describe: `"the·job's·name"`,
  //       type: 'string',
  //     })
  //   },
  //   (argv) => {
  //     const baseURL = argv.baseUrl as string
  //     const user = argv.user as string
  //     const token = argv.token as string
  //     Jenkins.of(baseURL, user, token)
  //       .deleteJob(argv.jobname as string)
  //       .then((name) => println(`deleted job with name "${name}"`))
  //   },
  // )
  // .command(
  //   'create-job [jobname] [script]',
  //   'create pipeline job',
  //   (yargs) => {
  //     return yargs
  //       .positional('jobname', {
  //         describe: `"the·job's·name"`,
  //         type: 'string',
  //       })
  //       .positional('script', {
  //         describe: `"the job's script"`,
  //         type: 'string',
  //       })
  //   },
  //   (argv) => {
  //     const baseURL = argv.baseUrl as string
  //     const user = argv.user as string
  //     const token = argv.token as string
  //     JenkinsHighlevel.of(baseURL, user, token)
  //       .createJob(argv.jobTemplate as string, argv.jobname as string, argv.script as string)
  //       .then((name) => console.log(`created job "${name}"`))
  //   },
  // )
  // .command(
  //   'sync-jobs [path]',
  //   'create/update jobs for all [[Jenkinsfile]]s in path',
  //   (yargs) => {
  //     return yargs.positional('path', {
  //       describe: `"the·path"`,
  //       type: 'string',
  //     })
  //   },
  //   (argv) => {
  //     const baseURL = argv.baseUrl as string
  //     const user = argv.user as string
  //     const token = argv.token as string
  //     JenkinsHighlevel.of(baseURL, user, token).syncJobs(
  //       argv.namePrefix as string,
  //       argv.jobTemplate as string,
  //       argv.path as string,
  //     )
  //     // .then((name) => console.log(`synced jobs "${name}"`))
  //   },
  // )
  // .command(
  //   'sync-views [path]',
  //   'create/update views for all [[Jenkinsfile]]s in path',
  //   (yargs) => {
  //     return yargs.positional('path', {
  //       describe: `"the·path"`,
  //       type: 'string',
  //     })
  //   },
  //   (argv) => {
  //     const baseURL = argv.baseUrl as string
  //     const user = argv.user as string
  //     const token = argv.token as string
  //     JenkinsHighlevel.of(baseURL, user, token).syncViews(argv.namePrefix as string, argv.path as string)
  //     // .then((name) => console.log(`synced jobs "${name}"`))
  //   },
  // )
  // .option('verbose', {
  //   alias: 'v',
  //   type: 'boolean',
  //   default: false,
  //   description: 'Run with verbose logging',
  // })
  .option('baseUrl', {
    type: 'string',
    default: config.baseUrl || 'http://localhost:8080',
    description: 'Jenkins Base URL',
  })
  .option('user', {
    type: 'string',
    default: config.user || undefined,
    description: 'Jenkins username',
  })
  .option('token', {
    type: 'string',
    default: config.token || undefined,
    description: 'Jenkins authentication token',
  })
  .option('jobTemplate', {
    type: 'string',
    default: config.jobTemplate || undefined,
    description: 'the pipeline job template to clone, when creating new jobs',
  })
  .option('namePrefix', {
    type: 'string',
    default: config.namePrefix || undefined,
    description: 'the name prefix to use when naming jobs and views based on directories',
  })
  .parse()
