import * as fs from "fs"
import * as path from "path"

function readStringArrayFromFile(fileName:string) : string[] {
    let ret_lines:string[] = [];
    if (fs.existsSync(fileName)) {
        let buffer = fs.readFileSync(fileName, "utf-8")
        let lines = (buffer as string).split(/[\r\n]/)
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().length > 0) {
                ret_lines.push(lines[i])
            }
        }
    }
    return ret_lines;
}

function writeStringArrayToFile( fileName:string, dict:string[]) : void {
    fs.writeFileSync( fileName, dict.join('\n')+'\n' )
}

function searchLabelsFromFile( fileName:string, exclude: void|string[]) : string[] {
    let labels:string[] = []
    if (fs.existsSync(fileName)) {
        let buffer = fs.readFileSync(fileName, "utf-8")
        let pat = /(label):"(.*?)"/gms
        if (Array.isArray(exclude) && exclude.length > 0) {
            buffer.replace(pat, (match, key, value) => {
                if (exclude.indexOf(value) == -1) {
                    if (labels.indexOf(value) ==  -1){
                        labels.push(value)
                    }
                }
                return match
            })
        } else {
            buffer.replace(pat, (match, key, value) => {
                if (labels.indexOf(value) ==  -1){
                    labels.push(value)
                }
                return match
            })
        }
    }
    return labels;
}

function replaceLabelsFromFile( fileName:string, toDict: string[]) : string {
    let content:string = ""
    let toKeys:string[] = []
    let toVals:string[] = []
    for (let i = 0; i < toDict.length; i++) {
      if (toDict[i].trim().length > 0) {
        const tow_cell = toDict[i].split('|')
        if (tow_cell.length == 2 ){
          toKeys.push(tow_cell[0])
          toVals.push(tow_cell[1])
        }
      }
    }
    if (fs.existsSync(fileName)) {
        let buffer = fs.readFileSync(fileName, "utf-8")
        let pat = /(label):"(.*?)"/gms
        content = buffer.replace(pat, (match, key, value) => {
            const idx = toKeys.indexOf(value)
            if (idx != -1) {
                return key + ':"' + toVals[idx] + '"'
            }
            return match
        })
    }

    return content
}

function replaceMainLabelDict(fileName:string, langRootPath:string, toDict:string[], toLang:string, outFileName:string) : boolean {
    if (toDict.length == 0){
        return false
    }
    const main_content = replaceLabelsFromFile( fileName, toDict);
    if (main_content.length>0) {
        fs.writeFileSync( outFileName, main_content )
        return true
    }else{
        console.log("error in replaceMainLabelDict,  replaceLabelsFromFile failed.")
    }
    return false
}


function replaceMain(fileName:string, langRootPath:string, toLang:string, outFileName:string): boolean {
  const toDictFileName = path.join(langRootPath, "translate-resources/main_dict_" + toLang + ".txt")
  const toDict = readStringArrayFromFile(toDictFileName)
  if (toDict.length == 0){
    console.log("error in replaceMain, readStringArrayFromFile failed, not found "+ toDictFileName +".")
    return false
  }

  if (!fs.existsSync(fileName)) {
    console.log("error in replaceMain, not found "+ fileName +".")
    return false
  }

  let content = fs.readFileSync(fileName, "utf-8")

  for (let i = 0; i < toDict.length; i++) {
    if (toDict[i].trim().length > 0) {
      const tow_cell = toDict[i].split('|')
      if (tow_cell.length == 2 ){
        content = content.replace(tow_cell[0], tow_cell[1])
      }
    }
  }

  if (content.length>0) {
    fs.writeFileSync( outFileName, content )
    return true
  }else{
    console.log("error in replaceMain,  readFileSync or replace failed.")
  }

  return false
}

function replaceRenderer(fileName:string, langRootPath:string, toLang:string, outFileName:string): boolean {
    const toDictFileName = path.join(langRootPath, "translate-resources/renderer_dict_" + toLang + ".txt")
    const toDict = readStringArrayFromFile(toDictFileName)
    if (toDict.length == 0){
        console.log("error in replaceRenderer, readStringArrayFromFile failed, not found "+ toDictFileName +".")
        return false
    }

    if (!fs.existsSync(fileName)) {
        console.log("error in replaceRenderer, not found "+ fileName +".")
        return false
    }

    let content = fs.readFileSync(fileName, "utf-8")

    for (let i = 0; i < toDict.length; i++) {
        if (toDict[i].trim().length > 0) {
            const tow_cell = toDict[i].split('|')
            if (tow_cell.length == 2 ){
                content = content.replace(tow_cell[0], tow_cell[1])
            }
        }
    }

    if (content.length>0) {
        fs.writeFileSync( outFileName, content )
        return true
    }else{
        console.log("error in replaceRenderer,  readFileSync or replace failed.")
    }

    return false
}


function initMainLabelDict(fileName:string, langRootPath:string, toLang:string) : string[] {

    const toDictFileName = path.join(langRootPath, "translate-resources/main_label_dict_" + toLang + ".txt")
    let toDict = readStringArrayFromFile(toDictFileName)
    let toKeys:string[] = []
    for (let i = 0; i < toDict.length; i++) {
      if (toDict[i].trim().length > 0) {
        const tow_cell = toDict[i].split('|')
        if (tow_cell.length == 2 ){
          toKeys.push(tow_cell[0])
        }
      }
    }

    const excludeDict = readStringArrayFromFile( path.join(langRootPath, "translate-resources/exclude.txt"))
    let enDict = searchLabelsFromFile(fileName, excludeDict)
    if (enDict.length>0){
      let nAdd = 0
      for (let i=0; i<enDict.length; i++){
        if (toKeys.indexOf(enDict[i]) == -1){
          toDict.push(enDict[i]+'|'+enDict[i])
          toKeys.push(enDict[i])
          nAdd++
        }
      }
      if (nAdd!=0){
        //UI Label change, need to rewrite.
        writeStringArrayToFile(toDictFileName, toDict)
      }
    }

    if (toDict.length==0){
        console.log("warring in initMainLabelDict, toDict is Empty.")
    }
    return toDict
}

export function markTextAsarTranslate(langRootPath:string, toLang:string, mainJsFileName:string, outMainJsFileName:string, rendererJsFileName:string, outRendererJsFileName:string): boolean {
  
  // 添加日志输出,方便调试
  console.log(`开始翻译处理:
    语言根路径: ${langRootPath}
    目标语言: ${toLang}
    主进程文件: ${mainJsFileName}
    渲染进程文件: ${rendererJsFileName}
  `)

  // 初始化翻译字典
  const toDict = initMainLabelDict(mainJsFileName, langRootPath, toLang)
  if(toDict.length === 0) {
    console.log("警告: 翻译字典为空")
    return false
  }

  // 替换主进程菜单标签
  if (!replaceMainLabelDict(mainJsFileName, langRootPath, toDict, toLang, outMainJsFileName)) {
    console.log("错误: 替换主进程菜单标签失败")
    return false
  }
  console.log("成功: 主进程菜单标签替换完成")

  // 替换主进程其他文本
  if (!replaceMain(mainJsFileName, langRootPath, toLang, outMainJsFileName)) {
    console.log("错误: 替换主进程其他文本失败") 
    return false
  }
  console.log("成功: 主进程其他文本替换完成")

  // 替换渲染进程文本
  if (!replaceRenderer(rendererJsFileName, langRootPath, toLang, outRendererJsFileName)) {
    console.log("错误: 替换渲染进程文本失败")
    return false
  }
  console.log("成功: 渲染进程文本替换完成")

  console.log("翻译处理全部完成!")
  return true
}
