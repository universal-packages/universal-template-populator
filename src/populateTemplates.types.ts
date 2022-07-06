export interface PopulateTemplatesOptions {
  override?: boolean
  replacementVariables?: Record<string, any>
  templateExtension?: string
}

export interface TemplatePopulationInfo {
  from: string
  to: string
  name: string
  action: 'COPIED' | 'OVERRIDDEN' | 'IGNORED'
}
