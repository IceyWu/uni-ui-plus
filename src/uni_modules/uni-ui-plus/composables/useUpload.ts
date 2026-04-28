import { isArray, isFunction } from '../common/util'

// Re-export types that were previously in wd-upload/types
// These will need to be defined here or imported from the component
export type UploadStatusType = 'pending' | 'loading' | 'success' | 'fail'

export interface UploadFileItem {
  error?: string
  percent?: number
  status?: UploadStatusType
  url: string
  [key: string]: any
}

export interface ChooseFile {
  duration?: number
  name?: string
  path?: string
  size?: number
  thumb?: string
  type?: string
  [key: string]: any
}

export interface ChooseFileOption {
  accept?: string
  camera?: string
  compressed?: boolean
  extension?: string[]
  maxCount?: number
  maxDuration?: number
  multiple?: boolean
  sizeType?: string[]
  sourceType?: string[]
}

export type UploadMethod = (file: UploadFileItem, formData: Record<string, any>, options: any) => UniApp.UploadTask | void | Promise<void>

export const UPLOAD_STATUS: Record<string, UploadStatusType> = {
  PENDING: 'pending',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAIL: 'fail'
}

export interface UseUploadReturn {
  abort: (task?: UniApp.UploadTask) => void
  chooseFile: (options: ChooseFileOption) => Promise<ChooseFile[]>
  startUpload: (file: UploadFileItem, options: UseUploadOptions) => UniApp.UploadTask | void | Promise<void>
  UPLOAD_STATUS: Record<string, UploadStatusType>
}

export interface UseUploadOptions {
  abortPrevious?: boolean
  action: string
  extension?: string[]
  fileType?: 'image' | 'video' | 'audio'
  formData?: Record<string, any>
  header?: Record<string, any>
  name?: string
  onError?: (res: UniApp.GeneralCallbackResult, file: UploadFileItem, formData: Record<string, any>) => void
  onProgress?: (res: UniApp.OnProgressUpdateResult, file: UploadFileItem) => void
  onSuccess?: (res: UniApp.UploadFileSuccessCallbackResult, file: UploadFileItem, formData: Record<string, any>) => void
  statusCode?: number
  statusKey?: string
  uploadMethod?: UploadMethod
}

export function useUpload(): UseUploadReturn {
  let currentTask: UniApp.UploadTask | null = null

  const abort = (task?: UniApp.UploadTask) => {
    if (task) {
      task.abort()
    } else if (currentTask) {
      currentTask.abort()
      currentTask = null
    }
  }

  const defaultUpload: UploadMethod = (file, formData, options) => {
    if (options.abortPrevious) {
      abort()
    }

    const uploadTask = uni.uploadFile({
      url: options.action,
      header: options.header,
      name: options.name,
      fileName: options.name,
      fileType: options.fileType,
      formData,
      filePath: file.url,
      success(res) {
        if (res.statusCode === options.statusCode) {
          options.onSuccess(res, file, formData)
        } else {
          options.onError({ ...res, errMsg: res.errMsg || '' }, file, formData)
        }
      },
      fail(err) {
        options.onError(err, file, formData)
      }
    })

    currentTask = uploadTask
    uploadTask.onProgressUpdate((res) => options.onProgress(res, file))
    return uploadTask
  }

  const startUpload = (file: UploadFileItem, options: UseUploadOptions) => {
    const {
      uploadMethod,
      formData = {},
      action,
      name = 'file',
      header = {},
      fileType = 'image',
      statusCode = 200,
      statusKey = 'status',
      abortPrevious = false
    } = options

    file[statusKey] = UPLOAD_STATUS.LOADING

    const uploadOptions = {
      action,
      header,
      name,
      fileName: name,
      fileType,
      statusCode,
      abortPrevious,
      onSuccess: (res: UniApp.UploadFileSuccessCallbackResult, file: UploadFileItem, formData: Record<string, any>) => {
        file[statusKey] = UPLOAD_STATUS.SUCCESS
        currentTask = null
        options.onSuccess?.(res, file, formData)
      },
      onError: (error: UniApp.GeneralCallbackResult, file: UploadFileItem, formData: Record<string, any>) => {
        file[statusKey] = UPLOAD_STATUS.FAIL
        file.error = error.errMsg
        currentTask = null
        options.onError?.(error, file, formData)
      },
      onProgress: (res: UniApp.OnProgressUpdateResult, file: UploadFileItem) => {
        file.percent = res.progress
        options.onProgress?.(res, file)
      }
    }

    if (isFunction(uploadMethod)) {
      return uploadMethod(file, formData, uploadOptions)
    }
    return defaultUpload(file, formData, uploadOptions)
  }

  function formatImage(res: UniApp.ChooseImageSuccessCallbackResult): ChooseFile[] {
    if (isArray(res.tempFiles)) {
      return res.tempFiles.map((item: any) => ({
        path: item.path || '',
        name: item.name || '',
        size: item.size,
        type: 'image',
        thumb: item.path || ''
      }))
    }
    return [
      {
        path: (res.tempFiles as any).path || '',
        name: (res.tempFiles as any).name || '',
        size: (res.tempFiles as any).size,
        type: 'image',
        thumb: (res.tempFiles as any).path || ''
      }
    ]
  }

  function formatVideo(res: UniApp.ChooseVideoSuccess): ChooseFile[] {
    return [
      {
        path: res.tempFilePath || (res as any).filePath || '',
        name: res.name || '',
        size: res.size,
        type: 'video',
        thumb: (res as any).thumbTempFilePath || '',
        duration: res.duration
      }
    ]
  }

  function formatMedia(res: UniApp.ChooseMediaSuccessCallbackResult): ChooseFile[] {
    return res.tempFiles.map((item) => ({
      type: item.fileType,
      path: item.tempFilePath,
      thumb: item.fileType === 'video' ? item.thumbTempFilePath : item.tempFilePath,
      size: item.size,
      duration: item.duration
    }))
  }

  function chooseFile({
    multiple,
    sizeType,
    sourceType,
    maxCount,
    accept,
    compressed,
    maxDuration,
    camera,
    extension
  }: ChooseFileOption): Promise<ChooseFile[]> {
    return new Promise((resolve, reject) => {
      switch (accept) {
        case 'image':
          uni.chooseImage({
            count: multiple ? Math.min(maxCount || 9, 9) : 1,
            sizeType,
            sourceType,
            success: (res) => resolve(formatImage(res)),
            fail: reject
          })
          break
        case 'video':
          uni.chooseVideo({ sourceType, compressed, maxDuration, camera, success: (res) => resolve(formatVideo(res)), fail: reject })
          break
        default:
          uni.chooseImage({
            count: multiple ? Math.min(maxCount || 9, 9) : 1,
            sizeType,
            sourceType,
            success: (res) => resolve(formatImage(res)),
            fail: reject
          })
          break
      }
    })
  }

  return { startUpload, abort, UPLOAD_STATUS, chooseFile }
}
