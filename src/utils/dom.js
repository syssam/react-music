export function getData(element, name) {
    const prefix = 'data-'
    return element.getAttribute(prefix + name)
}