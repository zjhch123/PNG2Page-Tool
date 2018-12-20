import storage from './storage'
import Rect from '@models/Rect';

const hasHistory = () => {
  return storage.get('hasHistory') == 1 // eslint-disable-line
}

const getData = () => {
  return storage.get("data", true).map(json => Rect.parse(json))
}

const getImage = () => {
  return storage.get("imageInfo", true)
}

const saveData = (data = []) => {
  storage.set("data", JSON.stringify(data.map(r => r.toJSON())))
  storage.set('hasHistory', 1)
}

const saveImage = ({image, width, height}) => {
  storage.set("imageInfo", JSON.stringify({ image, width, height }))
  storage.set('hasHistory', 1)
}

const clearHistory = () => {
  storage.set("imageInfo", JSON.stringify({}))
  storage.set("data", JSON.stringify([]))
  storage.set('hasHistory', 0)
}

if (!hasHistory()) { // 如果没有历史记录, 则刷新记录
  clearHistory()
}

export default {
  hasHistory,
  getData,
  getImage,
  saveData,
  saveImage,
  clearHistory
}