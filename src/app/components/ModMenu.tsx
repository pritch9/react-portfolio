import styles from './ModMenu.module.scss'
import {ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useEffect, useState} from 'react';

type ModMenuProps = {
    title: string,
    setTitle: Dispatch<SetStateAction<string>>
}

const combinations = [
    ['', 'Senior ', 'Sr. '],
    [['Full', ['-stack', ' Stack']], [['Back', 'Front'], ['-end', 'end', ' End']]],
    ['', ' Software'],
    [' '],
    ['Engineer', 'Developer']
];

type StringCombo = Array<string | string[] | StringCombo>

const flatStringCombos = (vals: StringCombo): string[] => {
    return vals.map((vals) => {
        if (typeof vals === 'string') return vals;
        return calculateCombinations(vals)
    }).flat()
}

const calculateCombinations = (combos: StringCombo): string[] => {
    if (typeof combos === 'string') {
        console.log('Combos is string: ', combos);
        return [combos];
    }
    if (combos.length === 0) return [];

    // is array
    const [firstElement, ...remainingElements] = combos;

    console.log('firstElement: ', firstElement, ', remainingElements: ', remainingElements);

    if (!remainingElements || remainingElements.length === 0) {
        return flatStringCombos([firstElement].flat());
    }

    const tail = calculateCombinations(remainingElements);
    const prefixes = flatStringCombos([firstElement].flat())

    if (tail.length === 0) return prefixes;

    const results = prefixes
        .map((prefix) => {
            return tail.map((postfix: string) => `${prefix}${postfix}`)
        })
        .flat();

    console.log('results: ', results);
    return results;
}

const titles = [
    ...[calculateCombinations(combinations)].flat()
]

const ModMenu: FC<ModMenuProps> = ({ title, setTitle }) => {
    const [autoTitles, setAutoTitles] = useState<string[]|undefined>(undefined);
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(`CHanging title to ${event.target.value}`)
        setTitle(event.target.value)
    }

    const onPrint = () => {
        window.print()
    }

    const onPrintAll = () => {
        setAutoTitles(titles);
        // console.log(titles);
    }


    useEffect(() => {
        if (autoTitles && autoTitles.length >= 0) {
            window.print();
        }
    }, [autoTitles]);

    useEffect(() => {
        if (autoTitles) {
            if (autoTitles.length === 0) {
                setAutoTitles(undefined);
                return;
            }

            let [first] = autoTitles;
            setTitle(first);
            setAutoTitles((prevState) => prevState ? prevState.slice(1) : undefined);
        }
    }, [autoTitles, setTitle]);

    return <div id={styles.ModMenu}>
        <input type='text' id={styles.Title} value={title} onChange={onChangeTitle} />
        <button id={styles.PrintButton} onClick={onPrint} type="button">Print</button>
        <button id={styles.PrintButton} onClick={onPrintAll} type="button">Print All</button>
    </div>
}

export default ModMenu