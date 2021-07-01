
// DATE
export function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

// MYSQL
export function toMysqlFormat(date){
    return date.getFullYear() + "-" + twoDigits(1 + date.getMonth()) + "-" + twoDigits(date.getDate()) + " " + twoDigits(date.getHours()) + ":" + twoDigits(date.getMinutes()) + ":" + twoDigits(date.getSeconds());
}

// MATH
export function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0)
}

// FETCH

// Menu
export function resolveMenuHref(href){
    return href
}

// Tree data
export function recursiveMapTreeData(treeData, cb){

    return treeData.map(treeDataItem => {

        const item = cb(treeDataItem)

        if(item.children && item.children.length){
            item.children = recursiveMapTreeData(item.children)
        }

        return item

    })

}

// HTML

// form
export function onSubmitPreventForm(event){
    event.preventDefault();
    event.stopPropagation();
}


// Misc
export function filterObj(obj, filter){
  
    let output = {}

    Object.keys(obj).map(key => {
      
      let val = obj[key]
      
      if(filter(key, val)){
         output[key] = val
      }
    })
    
    return output

}

export function capitalize(s){
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}


export function voidFunction(){}