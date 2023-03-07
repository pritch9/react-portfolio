export function isAddress(x: any): x is Address {
    const props: PropsList = [
        ["street", isStringObject],
        ["city", isStringObject],
        ["zip", isStringObject],
    ]
    return isProps(x, props)
}

export function isProps(x: any, props: PropsList): boolean {
    for (let [name, validator] of props) {
        if (!validator(x[name] as any)) {
            return false
        }
    }
    return true;
}

export function isStringObject(x: any): x is string {
    return typeof x === "string"
}
export function isNumberObject(x: any): x is number {
    return typeof x === "number"
}

export function isStringArray(x: any): x is Array<string> {
    if (Array.isArray(x)) {
        return x.length > 0 ? isStringObject(x[0]) : true
    }

    return false
}

export function isDateInfo(x: any): x is DateInfo {
    const props: PropsList = [
        ["month", isStringObject],
        ["year", isNumberObject]
    ];
    return isProps(x, props)
}

export function isProjectInfo(x: any): x is ProjectInfo {
    const props: PropsList = [
        ["title", isStringObject],
        ["role", isStringObject],
        ["date", isOptional(isDateInfo)],
        ["keywords", isOptional(isStringArray)],
        ["bullets", isOptional(isStringArray)],
    ];
    return isProps(x, props);
}

export function isTimeFrame(x: any): x is TimeFrame {
    const props: PropsList = [
        ["start", isDateInfo],
        ["end", isDateInfo],
    ];
    return isProps(x, props);
}

export function isJobInfo(x: any): x is JobInfo {
    const props: PropsList = [
        ["role", isStringObject],
        ["company", isStringObject],
        ["timeFrame", isTimeFrame],
        ["manager", isOptional(isStringObject)],
        ["address", isOptional(isAddress)],
        ["keywords", isOptional(isStringArray)],
        ["bullets", isOptional(isStringArray)],
    ]

    return isProps(x, props);
}

export function isOptional(validator: (x: any) => boolean) {
    return (obj: any) => {
        return obj === undefined || validator(obj)
    }
}

export function prettyTimeFrame(x?: TimeFrame): string|undefined {
    if (!x) return undefined;
    const { start, end } = x;
    return `${prettyDateInfo(start)} - ${prettyDateInfo(end)}`
}


export function prettyDateInfo(x?: DateInfo): string {
    if (x) {
        return `${x.month} ${x.year}`
    }
    return "PRESENT"
}


export function prettyDate(x?: Date): string {
    const month = Intl.DateTimeFormat('en', { month: '2-digit' }).format(x)
    const day = Intl.DateTimeFormat('en', { day: '2-digit' }).format(x)
    const year = Intl.DateTimeFormat('en', { year: '2-digit' }).format(x)

    return `${month}-${day}-${year}`
}

export function classNames(names: Array<string|boolean|number|undefined>) {
    return names
        .reduce<string[]>((classes, next) => {
            if (next && typeof next === "string") {
                classes.push(next)
            }
            return classes
        }, [])
        .join(" ")
}
