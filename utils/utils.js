
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

export function isHome(){
    switch(window.location.pathname){
        case "/":
        case "/fr":
        case "/en":
        case "/ru":
            return true
        default:
            return false
    }
}

export function separateBy(array, fn){

    let indexes = {}

    array.forEach((item, index) => {

        let value = fn(item, index)

        // all falsy values (except 0) become "undefined key"
        value = value !== 0 && !value ? undefined : value

        if(indexes[value]){
            indexes[value].push(item)
        } else {
            indexes[value] = [item]
        }

    })

    return Object.values(indexes)

}

export function voidFunction(){}

export function getPagesSortedByPosition(list)  {

    if(!list) return []


    const sortedPages = [...list]
    sortedPages.sort((a, b) => a.position - b.position)

    return sortedPages

}