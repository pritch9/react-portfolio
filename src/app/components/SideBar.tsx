import {FC} from "react"
import styles from "./SideBar.module.scss"
import {isStringArray} from "../../utilities";
import logo from '../../logo.svg'

export type SideBarProps = {
    className: string,
    info: Record<string, Record<string, string|string[]>>
}

const MapSubSection: (subSection: [string, Record<string, string|string[]>], index: number) => JSX.Element = ([key, subSection], index) => {
    const Segments = Object
        .entries(subSection)
        .sort()
        .map(MapSubSegment);

    return <div className={styles.Section} key={`ciss_${index}`}>
        <div className={styles.Label}>{key}</div>
        { Segments }
    </div>
}

const MapSubSegment: (subSection: [string, string|string[]], index: number) => JSX.Element = ([key, value], index) => {
    const values = isStringArray(value)
        ? value.sort().map((value, index) => <div className={styles.Value} key={`sb_ss_val_${index}`}>{value}</div> )
        : value;

    return <div className={styles.Segment} key={`ciss_ss_${key}`}>
        <div className={styles.Label}>{key}</div>
        <div className={styles.Values}>{values}</div>
    </div>
}

const SideBar: FC<SideBarProps> = ({ className, info }) => {
    const InfoSections = Object
        .entries(info)
        .map(MapSubSection)


    return <div id={styles.SideBar} className={className}>
        { InfoSections }
        <div id={styles.DevelopedWithReact}>
            <img className={styles.ReactLogo} src={logo} alt="React Logo" />
            <span>Developed with React</span>
        </div>
    </div>
}
export default SideBar