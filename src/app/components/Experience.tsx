import {FC, useMemo} from "react"
import styles from "./Experience.module.scss"
import {classNames, isJobInfo, isProjectInfo, prettyDateInfo, prettyTimeFrame} from "../../utilities";
import {Scorable} from "./Scorable";
import {ScoreName, SortByScore} from "../App";

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
    timeFrame?: string
    contract?: string
    keywords?: string[],
    bullets?: string[],
    manager?: string,
    address?: Address,
}
const ManagerText = "Manager";

const ExperienceSection: FC<ExperienceSectionProps> = ({info}) => {
    const {title, subTitle, timeFrame, contract, manager, keywords, address, bullets} = useMemo<ExperienceSectionTemplate>(() => {
        if (isJobInfo(info)) {
            return {
                title: info.role,
                subTitle: info.company,
                timeFrame: prettyTimeFrame(info.timeFrame),
                contract: prettyTimeFrame(info.contract),
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

    const Keywords = keywords?.sort(SortByScore).map((keyword, index) => {
        return <Scorable title={keyword} className={styles.Keyword} key={`kw_${index}`} />
    })

    const isNotEmpty = bullets && keywords;

    return <div className={classNames([styles.XPSegment, !isNotEmpty && styles.Empty])}>
        <div className={styles.TitleBar}>
            <div className={styles.TitleContainer}>
                <div className={styles.Title}>
                    {title}
                    <div className={styles.TimeFrame}>
                        <span>{timeFrame}</span>
                        {contract && <div className={styles.Contract}>{contract}</div>}
                    </div>
                </div>
                <div className={styles.SubTitle}>
                    <div className={styles.Title}>{subTitle}</div>
                    {address && <div className={styles.Address}>
                        <div className={styles.Street}>{address.street},</div>
                        <div className={styles.CityZip}>{address.city} {address.zip}</div>
                    </div>}
                </div>
            </div>
        </div>
        { isNotEmpty &&
            <>
				{
					manager && <div className={styles.CompanyInfo}>
						<div className={styles.Manager}>
							<div className={styles.Label}>{ManagerText}</div>
							<div className={styles.Name}>{manager}</div>
						</div>
					</div>
				}
                <div className={styles.Bullets}>
                    {Bullets}
                </div>
                <div className={styles.SideBar}>
                    <div className={styles.Keywords}>{Keywords}</div>
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
        <div id={styles.Legend}>
            <span style={{ fontStyle: 'italic' }}>{ScoreName}</span><Scorable value={4} />
        </div>
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