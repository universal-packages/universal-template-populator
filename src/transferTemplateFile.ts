import { checkFile, expandPath } from '@universal-packages/fs-utils'
import { replaceEnv, replaceVars } from '@universal-packages/variable-replacer'
import fs from 'fs'
import path from 'path'

import { TemplatePopulationInfo } from './populateTemplates.types'
import { TransferTemplateFileOptions } from './transferTemplateFile.types'

/** Reads the specified template file replace any variables in it and save it to the destination location */
export function transferTemplateFile(fromLocation: string, toLocation: string, options?: TransferTemplateFileOptions): TemplatePopulationInfo {
  const finalOptions: TransferTemplateFileOptions = { override: false, replacementVariables: {}, ...options }
  const finalFromLocation = checkFile(fromLocation)
  const finalToLocation = expandPath(toLocation)
  const output: TemplatePopulationInfo = {
    from: finalFromLocation,
    to: finalToLocation,
    name: path.basename(finalToLocation),
    action: 'COPIED'
  }

  if (fs.existsSync(finalToLocation)) {
    checkFile(finalToLocation)

    if (finalOptions.override) {
      loadReplaceAndSave(finalFromLocation, finalToLocation, options.replacementVariables)
      output.action = 'OVERRIDDEN'
    } else {
      output.action = 'IGNORED'
    }
  } else {
    loadReplaceAndSave(finalFromLocation, finalToLocation, options.replacementVariables)
  }

  return output
}

function loadReplaceAndSave(fromLocation: string, toLocation: string, variables: Record<string, any>): void {
  const templateContents = fs.readFileSync(fromLocation).toString()
  const finalContents = replaceVars(replaceEnv(templateContents), variables)

  fs.writeFileSync(toLocation, finalContents)
}
