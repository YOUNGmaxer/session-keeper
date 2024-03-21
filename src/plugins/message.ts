import { useMessage } from 'naive-ui'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

export let Message: MessageApiInjection | null = null

export const injectMessage = () => {
  Message = useMessage()
}
