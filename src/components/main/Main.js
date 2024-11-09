import React, {useEffect, useState, useMemo} from 'react';
import {useLanguage} from "../../context/LanguageContext";
import "./Main.css";
import Experience from "./experience/Experience";
import Project from "./project/Project";

function Main() {
    const { text, formatTextWithLineBreaks } = useLanguage();

    const allProjects = useMemo(() => [
        {
            name: "Microsoft Automatic Rewards",
            ghName: "MicrosoftRewardsWebsite",
            type: text.PROJECT.t_extension,
            rating_default: text.PROJECT.extension_rating1_default,
            users_default: "9000",
            ghUrl: "https://github.com/spin311/MicrosoftRewardsWebsite",
            description: text.PROJECT.p1_description,
            img: `${process.env.PUBLIC_URL}/assets/images/microsoft.png`,
            download_link: "https://chromewebstore.google.com/detail/microsoft-automatic-rewar/ocmmbfdhomnkljmjkmafegefcgcfkefo",
            stars: 0,
            forks: 0,
            created_at: null
        },
        {
            name: "Prolific Studies Notifier",
            ghName: "ProlificAutomaticStudies",
            type: text.PROJECT.t_extension,
            rating_default: text.PROJECT.extension_rating2_default,
            users_default: "2000",
            ghUrl: "https://github.com/spin311/ProlificAutomaticStudies",
            description: text.PROJECT.p2_description,
            img: `${process.env.PUBLIC_URL}/assets/images/prolific.png`,
            download_link: "https://chromewebstore.google.com/detail/prolific-studies-notifier/mlicfddkgjkeajfgkihplfbgpmbonbao",
            stars: 0,
            forks: 0,
            created_at: null
        },
        {
            name: "Gobar",
            ghName: "Gobar",
            type: text.PROJECT.t_mobile,
            ghUrl: "https://github.com/JuiceVodka/Gobar",
            description: text.PROJECT.p3_description,
            img: `${process.env.PUBLIC_URL}/assets/images/gobar.png`,
            website: "https://juicevodka.github.io/Gobar/",
            download_link: `${process.env.PUBLIC_URL}/assets/files/Gobar.apk`,
            stars: 0,
            forks: 0,
            created_at: null
        },
        {
            name: "Zdravko",
            ghName: "kdhero",
            type: text.PROJECT.t_mobile,
            ghUrl: "https://github.com/spin311/kdhero",
            description: text.PROJECT.p7_description,
            img: `${process.env.PUBLIC_URL}/assets/images/zdravko.png`,
            website: null,
            stars: 0,
            forks: 0,
            created_at: null
        },
        {
            name: "Survalien",
            ghName: "Survalien-Unity",
            type: text.PROJECT.t_game,
            ghUrl: "https://github.com/gregorkovac/Survalien-Unity",
            description: text.PROJECT.p5_description,
            img: `${process.env.PUBLIC_URL}/assets/images/survalien.png`,
            website: "https://www.dropbox.com/scl/fi/hdcw6938y4ha3virfb4fo/Survalien%20-%20Predstavitev.mp4?rlkey=xho6lfj4m78doev6sjyvwmda5&e=3&dl=0",
            download_link: "https://www.dropbox.com/scl/fo/bo4dqchusf56ah4ipd1oi/h?rlkey=bnqwwi2li1whkc8h3ag53lfpl&e=2&dl=0",
            stars: 0,
            forks: 0,
            created_at: null
        },
        {
            name: "KeSi",
            ghName: "KeSi",
            type: text.PROJECT.t_mobile,
            ghUrl: "https://github.com/JuiceVodka/KeSi",
            description: text.PROJECT.p6_description,
            img: `${process.env.PUBLIC_URL}/assets/images/kesi.png`,
            website: "https://juicevodka.github.io/KeSi/",
            download_link: `${process.env.PUBLIC_URL}/assets/files/KeSi.apk`,
            stars: 0,
            forks: 0,
            created_at: null
        },
        {
            name: "ChatGPT pair programming",
            ghName: "hiter-inzeniring-diploma",
            type: text.GENERAL.website,
            ghUrl: "https://github.com/spin311/hiter-inzeniring-diploma",
            description: text.PROJECT.p4_description,
            img: `${process.env.PUBLIC_URL}/assets/images/prompt.png`,
            website: "https://spin311.github.io/diploma/",
            stars: 0,
            forks: 0,
            created_at: null
        }
    ], [text]);

    const [projects, setProjects] = useState(allProjects);

    const [isLoading, setIsLoading] = useState(true);

    const getProjectStars = async () => {
        try {
            const response = await fetch("https://website-production-967e.up.railway.app/starredRepos");
            setIsLoading(true);
            const starredRepos = await response.json();

            const updatedProjects = projects.map(project => {
                const matchingRepo = starredRepos.find(repo => repo.name === project.ghName);
                if (matchingRepo) {
                    return { ...project, stars: matchingRepo.stargazers_count || 0, forks: matchingRepo.forks_count || 0, created_at: matchingRepo.created_at || null };
                }
                return project;
            });

            setProjects(updatedProjects);
        } catch (error) {
            console.error('Error fetching project stars:', error);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await getProjectStars();
        };
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const updatedProjects = projects.map(project => {
            const matchingProject = allProjects.find(p => p.ghName === project.ghName);
            return {
                ...project,
                type: matchingProject.type,
                description: matchingProject.description
            };
        });
        setProjects(updatedProjects);
        // eslint-disable-next-line
    }, [text]);

    const [sortOption, setSortOption] = useState('');

    const experiences = [
        {
            title: text.EXPERIENCE.xp3_title,
            company: "Digital School",
            desc: [text.EXPERIENCE.xp3_desc1, text.EXPERIENCE.xp3_desc2],
            website: "https://digitalschool.si/",
            years: `2021 - 2024`,
            logo: `${process.env.PUBLIC_URL}/assets/images/ds.png`
        },
        {
            title: text.EXPERIENCE.xp1_title,
            company: "Ixtlan Team",
            desc: [text.EXPERIENCE.xp1_desc1, text.EXPERIENCE.xp1_desc2, text.EXPERIENCE.xp1_desc3],
            website: "https://www.ixtlan-team.si/",
            years: "2023 - 2024",
            logo: `${process.env.PUBLIC_URL}/assets/images/ix.png`
        },
        {
            title: text.EXPERIENCE.xp2_title,
            company: "Formaviva",
            desc: [text.EXPERIENCE.xp2_desc1, text.EXPERIENCE.xp2_desc2, text.EXPERIENCE.xp2_desc3],
            website: "https://formaviva.com/",
            years: `2024 - ${text.EXPERIENCE.current}`,
            logo: `${process.env.PUBLIC_URL}/assets/images/formaviva.png`
        }
    ];

    const handleSortChange = (event) => {
        const option = event.target.value;
        setSortOption(option);

        const sortFunctions = {
            'stars-': (a, b) => b.stars - a.stars,
            'stars+': (a, b) => a.stars - b.stars,
            'name+': (a, b) => a.name.localeCompare(b.name),
            'name-': (a, b) => b.name.localeCompare(a.name),
            'date+': (a, b) => new Date(a.created_at) - new Date(b.created_at),
            'date-': (a, b) => new Date(b.created_at) - new Date(a.created_at)
        };

        setProjects(projects.sort(sortFunctions[option]));
    };

    return (
        <div className="Main">
            <h2>{text.MAIN.title}</h2>
            <p>
                {formatTextWithLineBreaks(text.MAIN.description)}
            </p>
            <hr/>
            <div id="experience">
                <h2>{text.EXPERIENCE.title}</h2>
                {experiences.map((xp, index) => (
                    <Experience key={index} title={xp.title} company={xp.company} desc={xp.desc} years={xp.years}
                                website={xp.website} logo={xp.logo}/>
                ))}
            </div>
            <hr/>
            <div id="project">
                <h2>{text.PROJECT.title}</h2>
                <label htmlFor="sort">{text.GENERAL.sort_by}: </label>
                <select id="sort" onChange={handleSortChange} value={sortOption} className="sort-select">
                    <option value="stars-">{text.GENERAL.starsDesc}</option>
                    <option value="stars+">{text.GENERAL.starsAsc}</option>
                    <option value="name+">{text.GENERAL.nameAsc}</option>
                    <option value="name-">{text.GENERAL.nameDesc}</option>
                    <option value="date+">{text.GENERAL.dateAsc}</option>
                    <option value="date-">{text.GENERAL.dateDesc}</option>
                </select>
                <div className="projects">
                    {projects.map((project, index) => (
                        <Project key={index} name={project.name} type={project.type} ghUrl={project.ghUrl}
                                 description={project.description} img={project.img} website={project.website}
                                 stars={project.stars} forks={project.forks} created_at={project.created_at} isLoading={isLoading} download_link={project.download_link}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Main;