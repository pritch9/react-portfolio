import styles from './ModMenu.module.scss'
import {ChangeEvent, Dispatch, FC, FormEvent, SetStateAction, useEffect, useRef, useState} from 'react';

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

const ModMenu: FC<ModMenuProps> = ({title, setTitle}) => {
    const [{ titles: autoTitles, isAutoPrinting, isAutoPrintingHasLock }, setAutoPrinting] = useState({ titles: [] as string[], isAutoPrinting: false, isAutoPrintingHasLock: false });
    const mounted = useRef(true);

    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(`CHanging title to ${event.target.value}`)
        setTitle(event.target.value)
    }

    const onPrint = () => {
        window.print()
    }

    const onPrintAll = () => {
        if (!isAutoPrinting) {
            setAutoPrinting({titles, isAutoPrinting: true, isAutoPrintingHasLock: false});
        }
    }

    useEffect(() => {
        if (autoTitles && autoTitles.length >= 0 && isAutoPrinting && !isAutoPrintingHasLock) {
            setAutoPrinting(prevState => ({ ...prevState, isAutoPrintingHasLock: true }));
            let [first] = autoTitles;
            setTitle(first);

            setTimeout(() => {
                if (!mounted.current) return;

                if (window.confirm(`Print next title: ${autoTitles[0]}?`)) {
                    window.print();
                    setAutoPrinting(prevState => ({ titles: prevState.titles.slice(1), isAutoPrinting: prevState.titles.length > 1, isAutoPrintingHasLock: false }));
                } else {
                    setAutoPrinting({ titles: [], isAutoPrinting: false, isAutoPrintingHasLock: false });
                }
            }, 100);
        }
    }, [autoTitles, isAutoPrinting, isAutoPrintingHasLock, setTitle]);

    return <div id={styles.ModMenu}>
        <input type='text' id={styles.Title} value={title} onChange={onChangeTitle} disabled={isAutoPrinting}/>
        <button id={styles.PrintButton} onClick={onPrint} type="button" disabled={isAutoPrinting}>Print</button>
        <button id={styles.PrintButton} onClick={onPrintAll} type="button" disabled={isAutoPrinting}>Print All</button>
    </div>
}

export default ModMenu