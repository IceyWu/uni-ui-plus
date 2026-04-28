let queue: any[] = []

export function pushToQueue(comp: any) {
  queue.push(comp)
}

export function removeFromQueue(comp: any) {
  queue = queue.filter((item) => item.$.uid !== comp.$.uid)
}

export function closeOther(comp: any) {
  queue.forEach((item) => {
    if (item.$.uid !== comp.$.uid) {
      item.$.exposed.close()
    }
  })
}

export function closeOutside() {
  queue.forEach((item) => {
    item.$.exposed.close()
  })
}
