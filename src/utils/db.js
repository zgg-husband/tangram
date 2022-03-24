// import { from } from 'core-js/core/array'

const DRAWING_ITEMS = 'drawingItems'
const DRAWING_ITEMS_VERSION = '1.2'
const DRAWING_ITEMS_VERSION_KEY = 'DRAWING_ITEMS_VERSION'
const DRAWING_ID = 'idGlobal'
const TREE_NODE_ID = 'treeNodeId'
const FORM_CONF = 'formConf'

export function getDrawingList() {
  // 加入缓存版本的概念，保证缓存数据与程序匹配
  const version = localStorage.getItem(DRAWING_ITEMS_VERSION_KEY)
  if (version !== DRAWING_ITEMS_VERSION) {
    localStorage.setItem(DRAWING_ITEMS_VERSION_KEY, DRAWING_ITEMS_VERSION)
    saveDrawingList([])
    return null
  }

  const str = localStorage.getItem(DRAWING_ITEMS)
  if (str) return JSON.parse(str)
  return null
}

export function saveDrawingList(list) {
  localStorage.setItem(DRAWING_ITEMS, JSON.stringify(list))
}

export function getIdGlobal() {
  const str = localStorage.getItem(DRAWING_ID)
  if (str) return parseInt(str, 10)
  return 100
}

export function saveIdGlobal(id) {
  localStorage.setItem(DRAWING_ID, `${id}`)
}

export function getTreeNodeId() {
  const str = localStorage.getItem(TREE_NODE_ID)
  if (str) return parseInt(str, 10)
  return 100
}

export function saveTreeNodeId(id) {
  localStorage.setItem(TREE_NODE_ID, `${id}`)
}

export function getFormConf() {
  const str = localStorage.getItem(FORM_CONF)
  if (str) return JSON.parse(str)
  return null
}

export function saveFormConf(obj) {
  localStorage.setItem(FORM_CONF, JSON.stringify(obj))
}

export function saveActiveData(obj) {
  const activeData = JSON.parse(localStorage.getItem('drawingItems'))
  activeData.forEach((item, index, arr) => {
    if (item.__config__.renderkey === obj.__config__.renderkey) {
      arr[index] = obj
    }
  })
  localStorage.setItem('drawingItems', activeData)
}

function findfromData(list, id) {
  if (list !== undefined) {
    list.forEach((item, index, arr) => {
      // console.log(id, item.__config__.renderKey)
      if (item.__config__.renderKey === id) {
        arr.splice(index, 1)
      } else if (item.__config__.children && item.__config__.children.length) {
        findfromData(item.__config__.children, id)
      }
    })
  }
  return list
}

function updateListData(dataList, toId, data) {
  const copyDataList = JSON.parse(JSON.stringify(dataList))
  if (dataList !== undefined && dataList.length) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].__config__.renderKey === toId) {
        copyDataList.splice(i, 1, ...data)
      }
    }
  }
  return copyDataList
}

//

export function positionChange(dataList, fromData, to, position) {
  const copyFromData = JSON.parse(JSON.stringify(fromData.data.__data__))
  const copyTo = JSON.parse(JSON.stringify(to.data.__data__))
  const cacheArr = [copyTo]
  if (position === 'after') {
    cacheArr.push(copyFromData)
  } else if (position === 'before') {
    cacheArr.unshift(copyFromData)
  } else if (position === 'inner') {
    if (copyTo.__config__.layoutTree) {
      copyTo.__config__.children !== undefined ? cacheArr[0].__config__.children.push(copyFromData) : cacheArr[0].__config__.children = [copyFromData]
    } else {
      cacheArr.unshift(copyFromData)
    }
  }
  const updateData = findfromData(dataList, copyFromData.__config__.renderKey)
  return updateListData(updateData, copyTo.__config__.renderKey, cacheArr)
  // return updateData
}
