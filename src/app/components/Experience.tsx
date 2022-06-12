import {FC, useMemo} from "react"
import styles from "./Experience.module.scss"
import {classNames, isJobInfo, isProjectInfo, prettyDateInfo, prettyTimeFrame} from "../../utilities";

export type ExperienceProps = {
    className: string,
    jobs: JobInfo[],
    projects: ProjectInfo[]
}


type ExperienceSectionProps = {
    info: JobInfo | ProjectInfo
}
type ExperienceSectionTemplate = {
    title: string,
    subTitle: string,
    timeFrame: string
    keywords?: string[],
    bullets?: string[],
    manager?: string,
    address?: Address,
}
const ExperienceSection: FC<ExperienceSectionProps> = ({info}) => {
    const {title, subTitle, timeFrame, manager, keywords, address, bullets} = useMemo<ExperienceSectionTemplate>(() => {
        if (isJobInfo(info)) {
            return {
                title: info.role,
                subTitle: info.company,
                timeFrame: prettyTimeFrame(info.timeFrame),
                manager: info.manager,
                keywords: info.keywords,
                address: info.address,
                bullets: info.bullets,
            }
        } else if (isProjectInfo(info)) {
            return {
                title: info.title,
                subTitle: info.role,
                timeFrame: prettyDateInfo(info.date),
                keywords: info.keywords,
                bullets: info.bullets,
            }
        } else {
            throw Error(`Not a Job or Project: ${JSON.stringify(info)}`)
        }
    }, [info]);

    const Bullets = bullets?.map((bullet, index) => {
        return <div className={styles.Bullet} key={`xp_${index}`}>{bullet}</div>
    })

    const Keywords = keywords?.sort().map((keyword, index) => {
        return <div className={styles.Keyword} key={`kw_${index}`}>{keyword}</div>
    })

    const isNotEmpty = bullets && keywords;

    return <div className={classNames([styles.XPSegment, !isNotEmpty && styles.Empty])}>
        <div className={styles.TitleBar}>
            <div className={styles.Title}>{title}</div>
            <div className={styles.SubTitle}>{subTitle}</div>
            <div className={styles.TimeFrame}>{timeFrame}</div>
        </div>
        { isNotEmpty &&
            <>
                <div className={styles.SideBar}>
                    {
                        manager && <div className={styles.Manager}>
                            <div className={styles.Label}>Manager</div>
                            <div className={styles.Name}>{manager}</div>
                        </div>
                    }
                    <div className={styles.Keywords}>{Keywords}</div>
                    {address && <div className={styles.Address}>
                        <div className={styles.Street}>{address.street},</div>
                        <div className={styles.CityZip}>{address.city} {address.zip}</div>
                    </div>}
                </div>
                <div className={styles.Bullets}>
                    {Bullets}
                </div>
            </>
        }
    </div>
}

const Experience: FC<ExperienceProps> = ({className, jobs, projects}) => {
    const Jobs = jobs.map((job, index) => {
        return <ExperienceSection info={job} key={`job_xp_${index}`}/>
    });

    const Projects = projects.map((job, index) => {
        return <ExperienceSection info={job} key={`proj_xp_${index}`}/>
    });

    return <div id={styles.Experience} className={className}>
        <div className={styles.Section}>
            <div className={styles.Title}>Job Experience</div>
            {Jobs}
        </div>
        <div className={styles.Section}>
            <div className={styles.Title}>Personal Projects</div>
            {Projects}
        </div>
    </div>
}
export default Experience