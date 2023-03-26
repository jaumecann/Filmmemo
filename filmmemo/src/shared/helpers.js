export function transformData(date){
    const intl = new Intl.DateTimeFormat('es-ES')
    const data = new Date(date)
    return intl.format(data)
 }