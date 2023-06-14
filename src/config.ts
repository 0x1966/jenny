import {readFileSync} from 'fs'
import {load as yamlLoad} from 'js-yaml'

export type Config = {
  baseUrl: string
  user: string
  token: string
  jobTemplate: string
  namePrefix: string
}

export function configFromArgs(onError?: (configFilename: string, error: any) => void): (argv: any) => Config {
  return (argv: any) => {
    const file = loadConfig(argv.configFile, onError)
    return {
      baseUrl: argv.baseUrl || file.baseUrl || 'localhost:8080',
      user: argv.user || file.user || '',
      token: argv.token || file.token || '',
      jobTemplate: argv.jobTemplate || file.jobTemplate || '',
      namePrefix: argv.namePrefix || file.namePrefix || '',
    }
  }
}

function loadConfig(configFile: string, onError?: (configFilename: string, error: any) => void): Partial<Config> {
  try {
    return yamlLoad(readFileSync(configFile, 'utf8')) as Partial<Config>
  } catch (err) {
    !onError || onError(configFile, err)
    return {}
  }
}
