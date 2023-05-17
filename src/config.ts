import {readFileSync} from 'fs'
import {load as yamlLoad} from 'js-yaml'

export type Config = {
  baseUrl: string
  user: string
  token: string
  jobTemplate: string
  namePrefix: string
}

const CONFIG_FILE = '.jennyconf.yaml'

export function loadConfig(onError?: (configFilename: string, error: any) => void): Partial<Config> {
  try {
    return yamlLoad(readFileSync(`./${CONFIG_FILE}`, 'utf8')) as Partial<Config>
  } catch (err) {
    !onError || onError(CONFIG_FILE, err)
    return {}
  }
}
