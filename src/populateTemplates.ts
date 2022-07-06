import path from 'path'
import { traverse, DirectoryMap } from '@universal-packages/directory-traversal'
import { checkDirectory, ensureDirectory } from '@universal-packages/fs-utils'
import { PopulateTemplatesOptions, TemplatePopulationInfo } from './populateTemplates.types'
import { transferTemplateFile } from './transferTemplateFile'

/** Reads deeply into a template directory structure and reconstructs it in another location processing the template files */
export async function populateTemplates(fromLocation: string, toLocation: string, options?: PopulateTemplatesOptions): Promise<TemplatePopulationInfo[]> {
  const finalOptions: PopulateTemplatesOptions = { templateExtension: 'template', override: false, replacementVariables: {}, ...options }
  const finalFromLocation = checkDirectory(fromLocation)
  const finalToLocation = ensureDirectory(toLocation)
  const output: TemplatePopulationInfo[] = []

  await traverse(finalFromLocation, {
    fileFilter: [finalOptions.templateExtension],
    callback: (directoryMap: DirectoryMap): boolean => {
      // from/location/content/directory --> content/directory
      const directoryToSection = directoryMap.path.replace(finalFromLocation, '')
      // to/location + content/directory
      const targetLocation = path.join(finalToLocation, directoryToSection)
      // to/location/content/directory
      ensureDirectory(targetLocation)

      for (let i = 0; i < directoryMap.files.length; i++) {
        const currentFile = directoryMap.files[i]
        const fileName = path.basename(currentFile)
        const targetFile = path.join(targetLocation, fileName).replace(new RegExp(`\.${finalOptions.templateExtension}$`), '')

        output.push(transferTemplateFile(currentFile, targetFile, finalOptions))
      }

      return true
    }
  })

  return output
}
