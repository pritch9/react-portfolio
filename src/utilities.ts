import {z} from 'zod';

export const zAddress = z.object({
    street: z.string(),
    city: z.string(),
    zip: z.string(),
});
export type Address = z.infer<typeof zAddress>;

export const zDateInfo = z.object({
    month: z.string(),
    year: z.number(),
});
export type DateInfo = z.infer<typeof zDateInfo>;

export const zProjectInfo = z.object({
    title: z.string(),
    role: z.string(),
    date: zDateInfo.optional(),
    keywords: z.array(z.string()).optional(),
    bullets: z.array(z.string()).optional(),
});
export type ProjectInfo = z.infer<typeof zProjectInfo>;

export const zTimeFrame = z.object({
    start: zDateInfo,
    end: zDateInfo,
});
export type TimeFrame = z.infer<typeof zTimeFrame>;

export const zCompanyFormerlyKnown = z.object({
    name: z.string(),
    formerly: z.string(),
});
export type FormerlyKnown = z.infer<typeof zCompanyFormerlyKnown>;

export const zJobInfo = z.object({
    role: z.string(),
    company: z.string().or(zCompanyFormerlyKnown),
    contract: zTimeFrame.optional(),
    timeFrame: zTimeFrame,
    manager: z.string().optional(),
    address: zAddress.optional(),
    keywords: z.array(z.string()).optional(),
    bullets: z.array(z.string()).optional(),
})
export type JobInfo = z.infer<typeof zJobInfo>;

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
