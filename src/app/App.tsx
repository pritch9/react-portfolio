import {FC, useEffect} from "react"
import styles from "./App.module.scss"
import TitleBar from "./components/TitleBar";
import SideBar from "./components/SideBar";
import Experience from "./components/Experience";
import {prettyDate} from "../utilities";

const App: FC = () => {
    const { name, title, contactInfo, education, miscExperience, achievements, experience } = {
        name: "William Pritchard",
        title: "Software Engineer",
        contactInfo: {
            "Phone Number": "(206) 227-3609",
            "Email Address": "will@pritch.net",
            "LinkedIn": "LinkedIn.com/in/wpritcha",
            "GitHub": "Github.com/pritch9",
        },
        education: {
            "University at Buffalo, SUNY": "B.S. Computer Science, 2020"
        },
        miscExperience: {
            "Cloud": ["AWS"],
            "Servers": ["Linux", "SQL"],
            "APIs": ["Rest", "GraphQL"],
            "Internet": ["Security", "Networking", "Cryptography"],
            "Programming": ["C", "ASM", "C++", "PHP", "BASH", "OCaml", "Rust"],
        },
        achievements: {
            "Boy Scouts of America": "Eagle Scout"
        },
        experience: {
            jobs: [
                {
                    role: "Software Engineer",
                    company: "Darwin Homes",
                    manager: "Kevin Yates",
                    address: { street: "1711 E Cesar Chavez St", city: "Austin, TX", zip: "78702" },
                    keywords: ["TypeScript", "ReactJS", "Python", "Terraform"],
                    timeFrame: {
                        start: {
                            month: "Feb.",
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
                    address: { street: "425 106th Ave NE", city: "Bellevue, WA", zip: "98004" },
                    keywords: ["Java", "TypeScript", "Swift"],
                    timeFrame: {
                        start: {
                            month: "June",
                            year: 2020
                        },
                        end: {
                            month: "Jan",
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
                {
                    role: "Software Development Intern",
                    company: "Enterprise Application Systems",
                    manager: "Craig Macvittie",
                    address: { street: "The University at Buﬀalo", city: "Buﬀalo, NY", zip: "14260" },
                    keywords: ["Java", "Perl"],
                    timeFrame: {
                        start: {
                            month: "June",
                            year: 2019
                        },
                        end: {
                            month: "Feb",
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
                }
            ],
            projects: [
                {
                    title: "Auth0r",
                    role: "Creator",
                    date: {
                        month: "Aug",
                        year: 2019
                    },
                    keywords: ["SQL", "AngularJS", "Sass", "TypeScript", "NodeJS"],
                    bullets: [
                        "Authentication API with permission-based security model",
                        "Automatic database creation with customization options for more advanced users",
                        "Plug ‘n Play module for securing NodeJS applications",
                    ]
                },
                {
                    title: "Coursarium",
                    role: "Lead",
                    date: {
                        month: "Feb",
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
        }
    };

    const sidebarInfo = {
        "Contact Info": contactInfo,
        "Education": education,
        "Misc. Experience": miscExperience,
        "Achievements": achievements
    }

    useEffect(() => {
        document.title = `${name}'s - ${title} Resume - ${prettyDate(new Date())}`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div id={styles.App}>
        <TitleBar name={name} title={title} />
        <div id={styles.Content}>
            <Experience
                className={styles.Experience}
                jobs={experience.jobs}
                projects={experience.projects}
            />
            <SideBar
                className={styles.SideBar}
                info={sidebarInfo}
            />
        </div>
    </div>
}
export default App