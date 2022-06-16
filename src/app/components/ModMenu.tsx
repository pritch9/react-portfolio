import styles from './ModMenu.module.scss'
import {ChangeEvent, Dispatch, FC, FormEvent, SetStateAction} from 'react';

type ModMenuProps = {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>
}

const ModMenu: FC<ModMenuProps> = ({ title, setTitle }) => {
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    }

    const onPrint = (event: FormEvent) => {
        event.preventDefault()
        window.print()
    }

    return <form id={styles.ModMenu} onSubmit={onPrint} action='#'>
        <input type='text' id={styles.Title} value={title} onChange={onChangeTitle} />
        <button id={styles.PrintButton} type="submit">Print</button>
    </form>
}

export default ModMenu