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


// 递归练习 2
const objectEquals = (a, b) => {
    // a 和 b 都是对象, 如果 a 里面的每一个 key 都能在 b 里面找到
    // 并且每一个 key 对应的 value 也都相等, 就认为 a 和 b 这两个对象相等
    // 不需要考虑递归的情况
    // 实现 arrayEquals, a 和 b 都是数组, 判断是否相等
    // 直接遍历数组, 判断元素是否相等, 不需要考虑递归
    let r = true
    if (!isObject(a) || !isObject(b)) {
        r = false
    }
    const kListA = Object.keys(a)
    const kListB = Object.keys(b)
    const lenEqual = kListA.length === kListB.length
    // log(lenEqual, '-----lenEqual :::  is here-----')
    if (!lenEqual) {
        r = false
    }
    for (let i = 0; i < kListA.length; i++) {
        const k = kListA[i]
        if (a[k] !== b[k]) {
            r = false
            break
        }
    }
    return r
}

const testObjectEquals = () => {
    let a1 = {}
    let b1 = {}

    let a2 = {
        x: 1,
    }
    let b2 = {
        x: 1,
    }

    let a3 = {
        x: 1,
        y: 2,
    }
    let b3 = {
        y: 2,
        x: 1,
    }

    let a4 = {
        x: 1,
        y: {},
    }
    let b4 = {
        x: 1,
        y: {},
    }

    let a5 = {
        x: 1,
        y: 2,
    }

    let b5 = {
        x: 1,
        y: 2,
        z: 3,
    }

    ensure(objectEquals(a1, b1), 'test object equals 1')
    ensure(objectEquals(a2, b2), 'test object equals 2')
    ensure(objectEquals(a3, b3), 'test object equals 3')
    ensure(!objectEquals(a4, b4), 'test object equals 4')
    ensure(!objectEquals(a5, b5), 'test object equals 5')
}

const objectDeepEquals = (a, b) => {
    // a 和 b 都是对象, 判断 a 和 b 是否相等
    // 注意 key 的 value 要么是普通值, 要么是对象, 不会是数组
    let r = true
    if (!isObject(a) || !isObject(b)) {
        r = false
    }
    const kListA = Object.keys(a)
    const kListB = Object.keys(b)
    const lenEqual = kListA.length === kListB.length
    // log(lenEqual, '-----lenEqual :::  is here-----')
    if (!lenEqual) {
        r = false
    }
    for (let i = 0; i < kListA.length; i++) {
        const k = kListA[i]
        if (isObject(a[k]) && isObject(b[k])) {
            if (!objectEquals(a[k], b[k])) {
                r = false
                break
            }
        } else {
            if (a[k] !== b[k]) {
                r = false
                break
            }
        }
    }
    return r
}


const testObjectDeepEquals = () => {
    let a1 = {}
    let b1 = {}

    let a2 = {
        x: {}
    }
    let b2 = {
        x: {}
    }

    let a3 = {
        x: {
            y: 1,
        }
    }
    let b3 = {
        x: {
            y: 1,
        }
    }

    let a4 = {
        x: 1,
        y: {
            z: 2,
        },
    }
    let b4 = {
        x: 1,
        y: {
            z: 2,
        },
    }

    ensure(objectDeepEquals(a1, b1), 'test object deep equals 1')
    ensure(objectDeepEquals(a2, b2), 'test object deep equals 2')
    ensure(objectDeepEquals(a3, b3), 'test object deep equals 3')
    ensure(objectDeepEquals(a4, b4), 'test object deep equals 4')
}

const testObjectDeepEquals2 = () => {
    let a5 = {
        x: 1,
        y: {
            z: 2,
        },
    }
    let b5 = {
        x: 1,
        y: {
            z: 2,
            zz: {},
        },
    }
    ensure(!objectDeepEquals(a5, b5), 'test object deep equals 5')
}


const test2 = () => {
    testObjectEquals()
    testObjectDeepEquals()
    testObjectDeepEquals2()
}

// 递归联系3

// 判断类型套路实现
const isTypeOf = (o) => {
    let key = Object.prototype.toString.call(o)
    return key.split(' ')[1].split(']')[0]
}

const JSType = {
    // 用来跟 isTypeOf 的结果比对
    function: 'Function',
    array: 'Array',
    string: 'String',
    regexp: 'Regexp',
    number: 'Number',
    object: 'Object',
    element: {
        input: 'HTMLInputElement',
        ul: 'HTMLUListElement',
        li: 'HTMLLIElement',
        div: 'HTMLDivElement',
        table: 'HTMLTableSectionElement',
        button: 'HTMLButtonElement',
    },
}

const equals = (a, b) => {
    if (isTypeOf(a) !== isTypeOf(b)) {
        return false
    }
    if (isTypeOf(a) === JSType.object) {
        return objectDeepEquals(a, b)
    }
    if (isTypeOf(a) === JSType.array) {
        return arrayDeepEquals(a, b)
    }
    return a === b
}

const testEquals = () => {
    let a1 = 100
    let b1 = 100
    let a2 = 'gua'
    let b2 = 'gua'
    let a3 = {}
    let b3 = {}
    let a4 = []
    let b4 = []
    let a5 = {
        x: [1],
    }
    let b5 = {
        x: [1],
    }
    let a6 = [
        {
            x: 1,
        }
    ]
    let b6 = [
        {
            x: 1,
        }
    ]
    let a7 = {
        x: [1],
        y: {
            z: [1],
        }
    }
    let b7 = {
        x: [1],
        y: {
            z: [1],
        }
    }
    let a8 = {
        x: [1],
        y: {
            z: [1, {
                x1: 10,
            }],
        }
    }
    let b8 = {
        x: [1],
        y: {
            z: [1, {
                x1: 10,
            }],
        }
    }

    let a9 = {
        x: [1],
        y: {
            z: [[[2]]],
        },
    }
    let b9 = {
        x: [1],
        y: {
            z: [[[3]]],
        },
    }

    let a10 = {
        x: [1],
        y: {
            z: [[[3]]],
            zz: {
                a: [[[2]]],
            }
        },
    }

    let b10 = {
        x: [1],
        y: {
            z: [[[3]]],
            zz: {
                a: [[[2]]],
            }
        },
    }

    ensure(equals(a1, b1), 'test equals 1')
    ensure(equals(a2, b2), 'test equals 2')
    ensure(equals(a3, b3), 'test equals 3')
    ensure(equals(a4, b4), 'test equals 4')
    ensure(equals(a5, b5), 'test equals 5')
    ensure(equals(a6, b6), 'test equals 6')
    ensure(equals(a7, b7), 'test equals 7')
    ensure(equals(a8, b8), 'test equals 8')
    ensure(!equals(a9, b9), 'test equals 9')
    ensure(equals(a10, b10), 'test equals 10')
}


const test3 = () => {
    testEquals()
}

const __main = () => {
    // test1()
    // test2()
    test3()
}


__main()
