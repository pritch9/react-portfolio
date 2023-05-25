import {FC, SetStateAction, useEffect, useState} from "react"
import styles from "./App.module.scss"
import TitleBar from "./components/TitleBar";
import SideBar from "./components/SideBar";
import Experience from "./components/Experience";
import {prettyDate} from "../utilities";
import ModMenu from "./components/ModMenu";

export function SortByScore (a: string, b: string): number { return (Scores[b] ?? 0) - (Scores[a] ?? 0); }

export const ScoreName = "Years Experience"
export const Scores: Record<string, number> = {
	"C": 2,
	"ASM": 0.5,
	"C++": 3,
	"PHP": 2,
	"BASH": 4,
	"Rust": 1,
	"REST": 7,
	"GraphQL": 1,
	"AWS": 3,
	"Linux": 8,
	"SQL": 6,
	"TypeScript": 5,
	"ReactJS": 4,
	"NodeJS": 5,
	"PostgreSQL": 4,
	"Python": 2,
	"Terraform": 1,
	"Java": 5,
	"Swift": 1,
	"Distributed Systems": 3,
	"Protobuf": 1,
	"AngularJS": 1,
	"NextJS": 0.5,
	"Sass": 5,
	"Authentication": 5,
	"Security/Cryptography": 4,
	"Networking": 3,
	"Cryptography": 4,
	'Embedded Systems': 1,
	'Internet Applications': 7
}

/*
let scorable = [
    x.miscExperience.Programming,
    x.miscExperience.APIs,
    x.miscExperience.Cloud,
    x.miscExperience.Servers,
    x.experience.jobs.map((o) => o.keywords).flat(),
    x.experience.projects.map((o) => o.keywords).flat(),
].flat();
 */

const {name, title, contactInfo, education, miscExperience, miscExperienceDescription, achievements, experience, professionalSummary} = {
	name: "William Pritchard",
	title: "Software Engineer",
	contactInfo: {
		"Phone Number": "(206) 227-3609",
		"Email Address": "will@pritch.net",
		"LinkedIn": "LinkedIn.com/in/wpritcha",
		"GitHub": ["Github.com/pritch009"],
	},
	professionalSummary: '',
	education: {
		"University at Buffalo, SUNY": "B.S. Computer Science, 2020"
	},
	miscExperienceDescription: "Spending lot of my free time tinkering and building, I try to pick up skills to help support my personal projects.  While not all have been applicable to my professional work, I'm comfortable working with what I've listed here, and very open to learning more skills related to areas of interest if required!",
	miscExperience: {
		'Cloud Development': ["AWS", "Terraform"],
		'Areas of Interest': ['Security/Cryptography', 'Embedded Systems', 'Distributed Systems'],
		'Programming': ["C", "C++", "PHP", "Rust"],
	},
	achievements: {
		"Eagle Scout": "Boy Scouts of America"
},
	experience: {
		jobs: [
			{
				role: "Full-Stack Software Engineer",
				company: "Unum ID",
				manager: "Liam McCarty",
				address: {street: "12 Embarcadero Ctr", city: "San Francisco, CA", zip: "94111"},
				keywords: ["TypeScript", "ReactJS", "NodeJS", "FeathersJS", "PostgreSQL", "Email Services", "WebAuthn"],
				timeFrame: {
					start: {
						month: "August",
						year: 2022,
					},
					end: {
						month: "January",
						year: 2023
					},
				},
				contract: {
					start: {
						month: "July",
						year: 2022
					},
					end: {
						month: "August",
						year: 2022
					}
				},
				bullets: [
					"Plan, design and deliver product features, working with a lean team on a weekly sprint schedule",
					"Implement production-ready web services, with emphasis on accuracy and speed",
					"Develop internal tools to aid team productivity and on-boarding new developers",
					"Contributed primarily in development of Unum ID's Wallet website and Verified Email service",
				]
			},
			{
				role: "Software Engineer",
				company: "Darwin Homes",
				manager: "Kevin Yates",
				address: {street: "1711 E Cesar Chavez St", city: "Austin, TX", zip: "78702"},
				keywords: ["TypeScript", "ReactJS", "Python", "Terraform"],
				timeFrame: {
					start: {
						month: "February",
						year: 2022
					},
					end: {
						month: "June",
						year: 2022
					}
				},
				bullets: [
					"Perform backend and front-end development as a member of the Platform Pod",
					"Participate in architectural discussions and code reviews to improve code quality",
					"Help improve authentication by modularizing JWT based authentication for all front-end sites to use",
					"Map infrastructure as code using Terraform to manage existing resources for Darwin's web platform",
				]
			},
			{
				role: "Software Development Engineer",
				company: "Amazon",
				manager: "Srinivasa Reddy Pamulapati",
				address: {street: "425 106th Ave NE", city: "Bellevue, WA", zip: "98004"},
				keywords: ["Java", "TypeScript", "ReactJS", "Swift"],
				timeFrame: {
					start: {
						month: "June",
						year: 2020
					},
					end: {
						month: "January",
						year: 2022
					}
				},
				bullets: [
					"Design and implement scalable, full-stack solutions from business requirements through launch",
					"Learn and experiment with cutting-edge technologies to invent new products that could positively aﬀect customers around the world",
					"Liaison with other production teams to help provide solutions unique to Amazon's logistics services",
					"Utilize AWS cloud services to create and manage resources for globally deployed applications",
				]
			},
		],
		projects: [
			{
				title: "PritchNet",
				role: "Creator",
				keywords: ["Rust", "Distributed Systems", "Protobuf", "NextJS", "PostgreSQL", "Terraform"],
				bullets: [
					"Peer-to-peer, distributed network operating system",
					"Scalable, fault-tolerant, and highly available network for IoT devices",
					"Personal cloud network, providing opportunity for private services to be provided beyond the Edge",
					"Project website: https://pritch.net/"
				]
			},
			{
				title: "Auth0r",
				role: "Creator",
				date: {
					month: "August",
					year: 2019
				},
				keywords: ["SQL", "TypeScript", "NodeJS"],
				bullets: [
					"Authentication API with permission-based security model",
					"Automatic database creation with customization options for more advanced users",
					"Plug ‘n Play module for securing NodeJS applications",
					"Public repository: https://github.com/pritch9/Auth0r"
				]
			}
		]
	}
};

const App: FC = () => {
	const [activeTitle, setTitleState] = useState(title);

	const setTitle = (action: SetStateAction<string>) => {
		setTitleState(prevState => {
			const title = typeof action === "function" ? action(prevState) : action;
			document.title = `${title} - ${name}'s Resume - ${prettyDate(new Date())}`;
			return title;
		});
	}

	const sidebarInfo = {
		"Education": education,
		"Experience": {
			description: miscExperienceDescription,
			experience: miscExperience
		},
		"Achievements": achievements
	}

	return <div id={styles.App}>
		<ModMenu title={activeTitle} setTitle={setTitle}/>
		<TitleBar name={name} title={activeTitle} contactInfo={contactInfo}/>
		<div id={styles.Content}>
			<SideBar
				className={styles.SideBar}
				info={sidebarInfo}
			/>
			<Experience
				className={styles.Experience}
				jobs={experience.jobs}
				projects={experience.projects}
			/>
		</div>
	</div>
}
export default App;


const RemovedJobExperience = [
	{
		role: "Software Development Intern",
		company: "Enterprise Application Systems",
		manager: "Craig Macvittie",
		address: {street: "The University at Buﬀalo", city: "Buﬀalo, NY", zip: "14260"},
		keywords: ["Java", "Perl"],
		timeFrame: {
			start: {
				month: "June",
				year: 2019
			},
			end: {
				month: "February",
				year: 2020
			}
		},
		bullets: [
			"Develop UB’s ﬂavor of the Selenium WebDriver using testdriven development",
			"Discuss current issues and tasks in a team of 4 through weekly status meetings",
			"Integrate the WebDriver into other programming languages to allow ﬂexibility to other developers",
			"Maintain software quality using Docker for compatibility and Bamboo for automatic testing",
		]
	},
	{
		role: "Software Development Intern",
		company: "The Summit Center",
		timeFrame: {
			start: {
				month: "Oct",
				year: 2018
			},
			end: {
				month: "May",
				year: 2019
			}
		},
		// manager: "Rick Griﬃn",
		// address: { street: "150 Stahl Rd", city: "Getzville, NY", zip: "14068" },
		// keywords: ["C#", "HTML", "JS/JQuery", "MSSQL", ".NET"],
		// bullets: [
		//     "Aid in the management of third-party developer relations, tasks and projects",
		//     "Collaborate with small team of developers using agile development techniques to manage tasks",
		//     "Test and monitor software to correct errors, assure quality, and detect bugs before they aﬀect production",
		//     "Work with member of faculty to develop intuitive, and simple user interfaces to replace old paper systems",
		// ]
	},
	{
		title: "Coursarium",
		role: "Lead",
		date: {
			month: "February",
			year: 2019
		},
		keywords: ["SCSS", "PostgreSQL", "NodeJS", "ExpressJS", "AngularJS"],
		bullets: [
			"Coursework submission for easy grading, feedback, recordkeeping, and student analytics",
			"Custom notiﬁcations to help students plan and keep their school work on a schedule",
			"Platform for university course information, designed for intuitive and easy access by both professors and students",
		]
	}
]
