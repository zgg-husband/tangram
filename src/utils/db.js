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
      if (item.__config__.renderKey === id) {
        arr.splice(index, 1)
      } else {
        findfromData(item.__config__.children, id)
      }
    })
  }
  return list
}

function updateListData(dataList, toId, data) {
  if (dataList !== undefined) {
    dataList.forEach((item, index, arr) => {
      if (item.__config__.renderKey === toId) {
        arr.splice(index, 1, ...data)
      } else {
        updateListData(item.__config__.children, toId, data)
      }
    })
  }
  return dataList
}
export function positionChange(dataList, fromData, to, position) {
  let cacheArr = [to]
  if (position === 'after') {
    cacheArr.push(fromData)
  } else if (position === 'before') {
    cacheArr.unshift(fromData)
  } else if (position === 'inner') {
    console.log(to)
    if (to.layoutTree) {
      to.children !== undefined ? to.children.push(fromData) : to.children = [fromData]
    } else {
      cacheArr.unshift(fromData)
    }
  }
  const updateData = findfromData(dataList, fromData.__config__.renderKey)
  cacheArr = []
  return updateListData(updateData, to.__config__.renderKey, cacheArr)
}
