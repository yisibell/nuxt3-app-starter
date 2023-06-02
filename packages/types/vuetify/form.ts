/**
 * v-form 组件实例
 */
export interface IVFormInstance {
  validate: () => Promise<{
    valid: boolean
    errors: { id: string | number; errorMessages: string[] }[]
  }>
  reset: () => void
  resetValidation: () => void
}
