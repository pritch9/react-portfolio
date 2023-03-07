import {ComponentProps, FC, useMemo} from "react";
import {Scores} from "../App";
import styles from "./Scorable.module.scss";

export type ScorableProps = {
	title?: string,
	value?: number
} & ComponentProps<any>;

export const Scorable: FC<ScorableProps> = ({ title, value, ...props }) => {
	const score = useMemo(() => {
		if (title in Scores || value) {
			const score = Scores[title] ?? value;

			const chars = '•'.repeat(score);

			return <span style={{
				display: 'inline-block',
				verticalAlign: 'middle',
				padding: '0 0.25em',
				fontSize: '1.5em'
			}}>{chars}</span>
		} else {
			return undefined;
		}
	}, [title, value]);
	return <div {...props}>
		{title && <span style={{ verticalAlign: 'middle' }}>{title}</span> }
		{score}
	</div>
}