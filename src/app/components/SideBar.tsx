import {FC} from "react"
import styles from "./SideBar.module.scss"
import {Scorable} from "./Scorable";
import {SortByScore} from "../App";
import {z} from 'zod';

export type ExperienceSection = Record<string, string|string[]>

export type ExperienceSectionWithDescription = {
    experience: ExperienceSection,
    description: string
};

export type SideBarProps = {
    className: string,
    info: Record<string, ExperienceSectionWithDescription|ExperienceSection>
}

const MapSubSection: (subSection: [string, ExperienceSection | ExperienceSectionWithDescription], index: number) => JSX.Element = ([key, subSection], index) => {
    const [experience, description] = ('description' in subSection && 'experience' in subSection)
        ? [subSection.experience, subSection.description]
        : [subSection, undefined]

    const Segments = Object
        .entries(experience)
        .sort()
        .map(MapSubSegment);

    return <div className={styles.Section} key={`ciss_${index}`}>
        <div className={styles.Label}>{key}</div>
        { description && <div className={styles.Description}>{ description }</div> }
        { Segments }
    </div>
}

const zStringArray = z.string().array();

const MapSubSegment: (subSection: [string, string|string[]], index: number) => JSX.Element = ([key, value], index) => {
    const parsed = zStringArray.safeParse(value);
    const values = parsed.success
        ? parsed.data
            .sort(SortByScore)
            .map((value, index) => <Scorable title={value} className={styles.Value} key={`sb_ss_val_${index}`} /> )
        : value;

    return <div className={styles.Segment} key={`ciss_ss_${key}`}>
        <div className={styles.Label}>{key}</div>
        <div className={styles.Values}>
            {values}
        </div>
    </div>
}

const SideBar: FC<SideBarProps> = ({ className, info }) => {
    const InfoSections = Object
        .entries(info)
        .map(MapSubSection)


    return <div id={styles.SideBar} className={className}>
        { InfoSections }
        <div className={styles.FillGap} />
    </div>
}
export default SideBar
