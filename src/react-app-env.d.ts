/// <reference types="react-scripts" />
type PropsList = [string, (y: object) => boolean][];

type TimeFrame = {
    start: DateInfo,
    end: DateInfo
}

type Address = {
    street: string,
    city: string,
    zip: string
}

type DateInfo = {
    month: string,
    year: number
}

type JobInfo = {
    role: string,
    company: string,
    timeFrame: TimeFrame,
    contract?: TimeFrame,
    manager?: string,
    address?: Address,
    keywords?: string[],
    bullets?: string[]
}

type ProjectInfo = {
    title: string,
    role: string,
    date?: DateInfo,
    keywords: string[],
    bullets: string[]
}