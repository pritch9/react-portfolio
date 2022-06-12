import {FC} from "react"
import styles from "./TitleBar.module.scss"

export type TitleBarProps = {
    name: string,
    title: string
}

const TitleBar: FC<TitleBarProps> = ({ name, title }) => {
    return <div id={styles.TitleBar}>
        <div>
            <div id={styles.Name}>{ name }</div>
            <div id={styles.Title}>{ title }</div>
        </div>
    </div>
}
export default TitleBar