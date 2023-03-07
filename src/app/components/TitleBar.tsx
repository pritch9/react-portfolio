import {FC} from "react"
import styles from "./TitleBar.module.scss"

export type TitleBarProps = {
    name: string,
    title: string
    contactInfo: Record<string, string>
}
type ContactInfoProps = {
    item: string,
    value: string
}

const ContactInfoItem: FC<ContactInfoProps> = ({ item, value }) => {
    return <div className={styles.ContactInfoItem}>
        <div className={styles.Key}>{item}</div>
        <div className={styles.Value}>{value}</div>
    </div>
}

const TitleBar: FC<TitleBarProps> = ({ name, title, contactInfo }) => {
    return <div id={styles.TitleBar}>
        <div id={styles.Name}>{ name }</div>
        <div id={styles.Title}>{ title }</div>
        <div id={styles.ContactInfo}>
            {
                Object.entries(contactInfo)
                    .map(([item, value]: [string, string]) => {
                        return <ContactInfoItem key={`contact-info-${item}`} item={item} value={value} />
                    })
            }
        </div>
    </div>
}
export default TitleBar