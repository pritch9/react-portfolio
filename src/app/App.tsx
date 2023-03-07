import {FC, useEffect, useState} from "react"
import styles from "./App.module.scss"
import TitleBar from "./components/TitleBar";
import SideBar from "./components/SideBar";
import Experience from "./components/Experience";
import {prettyDate} from "../utilities";
import ModMenu from "./components/ModMenu";

export function SortByScore (a: string, b: string): number { return (Scores[b] ?? 0) - (Scores[a] ?? 0); }

export const Scores: Record<string, number> = {
	"C": 2,
	"ASM": 2,
	"C++": 3,
	"PHP": 3,
	"BASH": 2,
	"OCaml": 1,
	"Rust": 4,
	"REST": 4,
	"GraphQL": 3,
	"AWS": 3,
	"Linux": 4,
	"SQL": 3,
	"TypeScript": 4,
	"ReactJS": 4,
	"NodeJS": 4,
	"FeathersJS": 2,
	"PostgreSQL": 3,
	"Email Services": 2,
	"WebAuthn": 3,
	"Python": 3,
	"Terraform": 2,
	"Java": 4,
	"Swift": 2,
	"Distributed Systems": 3,
	"Protobuf": 2,
	"AngularJS": 2,
	"Sass": 3,
	"Authentication": 4,
	"Security": 3,
	"Networking": 3,
	"Cryptography": 3,
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

const {name, title, contactInfo, education, miscExperience, achievements, experience, professionalSummary} = {
	name: "William Pritchard",
	title: "Software Engineer",
	contactInfo: {
		"Phone Number": "(206) 227-3609",
		"Email Address": "will@pritch.net",
		"LinkedIn": "LinkedIn.com/in/wpritcha",
		"GitHub": "Github.com/pritch9",
	},
	professionalSummary: '',
	education: {
		"University at Buffalo, SUNY": "B.S. Computer Science, 2020"
	},
	miscExperience: {
		"Cloud": ["AWS"],
		"Servers": ["Linux", "SQL"],
		"APIs": ["REST", "GraphQL"],
		"Internet": ["Security", "Authentication", "Networking", "Cryptography"],
		"Programming": ["C", "ASM", "C++", "PHP", "BASH", "OCaml", "Rust"],
	},
	achievements: {
		"Boy Scouts of America": "Eagle Scout"
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
				keywords: ["Rust", "Distributed Systems", "Protobuf"],
				bullets: [
					"Proprietary, distributed, peer-to-peer network operating system",
					"Generic application framework for building secure, reliable, and confidential applications",
					"Cloud computing techniques leveraged to provide a scalable, fault-tolerant, and highly available network",
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
				keywords: ["SQL", "AngularJS", "Sass", "TypeScript", "NodeJS"],
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
	const [activeTitle, setTitle] = useState(title);

	const sidebarInfo = {
		"Education": education,
		"Misc. Experience": miscExperience,
		"Achievements": achievements
	}

	useEffect(() => {
		document.title = `${activeTitle} - ${name}'s Resume - ${prettyDate(new Date())}`
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTitle])

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