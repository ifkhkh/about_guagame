const log = console.log.bind(console)

const isArray = o => Array.isArray(o)

const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

const ensure = (condition, info) => {
    return condition === true ? undefined : log(`${info} error`)
}

// 递归练习1
const arrayEquals = (a, b) => {
    // 实现 arrayEquals, a 和 b 都是数组, 判断是否相等
    // 直接遍历数组, 判断元素是否相等, 不需要考虑递归
    let r = true
    if (!isArray(a) || !isArray(b)) {
        r = false
    }
    const lenEqual = a.length === b.length
    if (!lenEqual) {
        r = false
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            r = false
            break
        }
    }
    return r
}

const testArrayEquals = () => {
    // log(ensure(arrayEquals([], []), 'test array equals 1'), '-----1 :::  is here-----')
    ensure(arrayEquals([], []), 'test array equals 1')
    ensure(!arrayEquals([1], [1, 2]), 'test array equals 2')
    ensure(arrayEquals([1, 2], [1, 2]), 'test array equals 3')
    ensure(!arrayEquals([1, [2]], [1, [2]]), 'test array equals 4')
}

const arrayDeepEquals = (a, b) => {
    // 实现 arrayEquals, a 和 b 都是数组, 判断是否相等
    // a 和 b 的元素要么是普通类型, 要么是数组类型
    // 实现 arrayEquals, a 和 b 都是数组, 判断是否相等
    // 直接遍历数组, 判断元素是否相等, 不需要考虑递归
    let r = true
    if (!isArray(a) || !isArray(b)) {
        r = false
    }
    const lenEqual = a.length === b.length
    if (!lenEqual) {
        r = false
    }
    for (let i = 0; i < a.length; i++) {
        if (isArray(a[i])) {
            if (!arrayDeepEquals(a[i], b[i])) {
                r = false
                break
            }
        } else {
            if (a[i] !== b[i]) {
                r = false
                break
            }
        }
    }
    return r
}

const testArrayDeepEquals = () => {
    let a1 = []
    let b1 = []

    let a2 = [[1]]
    let b2 = [[1]]

    let a3 = [[[1]], [[1]]]
    let b3 = [[[1]], [[1]]]

    let a4 = [[1, 2]]
    let b4 = [[1, 2]]

    let a5 = [[2]]
    let b5 = [[3]]

    ensure(arrayDeepEquals(a1, b1), 'test array deep equals 1')
    ensure(arrayDeepEquals(a2, b2), 'test array deep equals 2')
    ensure(arrayDeepEquals(a3, b3), 'test array deep equals 3')
    ensure(arrayDeepEquals(a4, b4), 'test array deep equals 4')
    ensure(!arrayDeepEquals(a5, b5), 'test array deep equals 5')
}

const test1 = () => {
    testArrayEquals()
    testArrayDeepEquals()
}

const __main = () => {
    test1()
}

__main()
