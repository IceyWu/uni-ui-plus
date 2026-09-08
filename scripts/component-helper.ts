import type { Config, InstallOptions, NormalizeData, Options, ParseData, ParseTable } from 'components-helper'
import { isString, parse, read, vetur, webTypes, write } from 'components-helper'
import fg from 'fast-glob'

const config: Config = {
  attributes: 'attributes.json',
  directives: 'directives',
  directivesDescription: 'Description',
  directivesName: 'Name',
  directivesType: 'Type',
  events: 'events',
  eventsDescription: 'Description',
  eventsName: 'Name',
  fileNameRegExp: /\/((\w|-)+)\.\w+$/,
  props: 'props',
  propsDefault: 'Default',
  propsDescription: 'Description',
  propsName: 'Name',
  propsOptions: 'Options',
  propsType: 'Type',
  separator: '/',
  slots: 'slots',
  slotsDescription: 'Description',
  slotsName: 'Name',
  slotsSubtags: 'Subtags',
  slotsType: 'Type',
  tableRegExp: /#+\s+(.*)\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g,
  tags: 'tags.json',
  titleRegExp: /#+\s+(.*)\n+([^(#|\n)]*)/g,
  webTypes: 'web-types.json'
}

function normalize(options: Options, data: ParseData, path: string): NormalizeData {
  const { fileNameRegExp, props, events, slots, directives } = options
  const _fileNameRegExp = isString(fileNameRegExp) ? new RegExp(fileNameRegExp) : fileNameRegExp
  const _path = path.match(_fileNameRegExp)
  const fileName = _path ? _path[1] : ''
  const _data: NormalizeData = Object.assign(data, { fileName, path })
  const _props = new RegExp(props, 'i')
  const _events = new RegExp(events, 'i')
  const _slots = new RegExp(slots, 'i')
  const _directives = new RegExp(directives, 'i')

  if (!_data.table || !_data.table.length) {
    return _data
  }

  for (let i = 0; i < _data.table.length; i += 1) {
    const item = _data.table[i]
    const { title } = item
    if (!title) {
      continue
    }

    if (_props.test(title)) {
      setData({
        data: _data,
        fileName,
        item,
        key: 'props',
        path,
        regExp: _props,
        title
      })
    } else if (_events.test(title)) {
      setData({
        data: _data,
        fileName,
        item,
        key: 'events',
        path,
        regExp: _events,
        title
      })
    } else if (_slots.test(title)) {
      setData({
        data: _data,
        fileName,
        item,
        key: 'slots',
        path,
        regExp: _slots,
        title
      })
    } else if (_directives.test(title)) {
      setData({
        data: _data,
        fileName,
        item,
        key: 'directives',
        path,
        regExp: _directives,
        title
      })
    }
  }
  return _data
}

function setData({
  data,
  key,
  item,
  title,
  path,
  fileName,
  regExp
}: {
  data: NormalizeData
  key: 'props' | 'events' | 'slots' | 'directives'
  item: ParseTable
  title: string
  path: string
  fileName: string
  regExp: RegExp
}) {
  const childTitle = title.replace(regExp, '').trim()

  if (childTitle) {
    const childHeader = data.headers?.find((header) => header.title === childTitle)
    const childItem = {
      description: childHeader?.description || data.description,
      fileName,
      path,
      title: childTitle,
      [key]: item
    }

    if (!data.children) {
      data.children = [childItem]
    } else {
      const child = data.children.find((header) => header.title === childTitle)

      if (child) {
        child[key] = item
      } else {
        data.children.push(childItem)
      }
    }
  } else {
    data[key] = item
  }
}

export function generateWebTypes(options = {} as InstallOptions) {
  if (!options.entry) {
    throw new Error('entry must be a string (non empty) or an array of strings')
  }
  if (!options.outDir) {
    throw new Error('outDir must be a string (non empty)')
  }
  if (!options.name) {
    console.warn('missing property "name"')
  }
  if (!options.version) {
    console.warn('missing property "version"')
  }

  const _options: Options = Object.assign(config, options)
  const files: string[] = fg.sync(_options.entry, _options.fastGlobConfig)
  const data = files.map((path) => {
    const fileContent = read(path)
    const parseContent = parse(_options, fileContent)
    const content = normalize(_options, parseContent, path)
    return content
  })
  const { tags, attributes } = vetur(_options, data)
  const webTypesData = webTypes(_options, data)

  write(_options, 'tags', tags)
  write(_options, 'attributes', attributes)
  write(_options, 'webTypes', webTypesData)
}
