export default function getByCompositeKey(obj, key) {
    return obj[key] ?? key.split('.').reduce((prev, cur) => prev[cur], obj)
}

// это не компонент - выносим из этой папки