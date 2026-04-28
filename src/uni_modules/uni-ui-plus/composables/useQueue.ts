import { provide, type Ref, ref } from 'vue'

export const queueKey = '__QUEUE_KEY__'

export interface Queue {
  closeOther: (comp: any) => void
  closeOutside: () => void
  pushToQueue: (comp: any) => void
  queue: Ref<any[]>
  removeFromQueue: (comp: any) => void
}

export function useQueue() {
  const queue = ref<any[]>([])

  function pushToQueue(comp: any) {
    queue.value.push(comp)
  }

  function removeFromQueue(comp: any) {
    queue.value = queue.value.filter((item) => item.$.uid !== comp.$.uid)
  }

  function closeOther(comp: any) {
    queue.value.forEach((item) => {
      if (item.$.uid !== comp.$.uid) {
        item.$.exposed.close()
      }
    })
  }

  function closeOutside() {
    queue.value.forEach((item) => item.$.exposed.close())
  }

  provide(queueKey, { queue, pushToQueue, removeFromQueue, closeOther, closeOutside })

  return { closeOther, closeOutside }
}
