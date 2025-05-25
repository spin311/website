import React, { useEffect, useState, useMemo, ChangeEvent } from "react";

import { useLanguage } from "../../context/LanguageContext";
import "./Main.css";
import {
  ExperienceType,
  ProjectType,
  RepositoryType,
} from "../../types/ComponentTypes";

import Experience from "./experience/Experience";
import Project from "./project/Project";

import numeral from "numeral";
import { motion, AnimatePresence } from "framer-motion";

type MainProps = {
  classes?: string;
};

interface ExtensionValues {
  userCount?: number;
  ratingValue?: number;
}

function Main({ classes = "" }: MainProps) {
  const { text, formatTextWithLineBreaks } = useLanguage();

  const allProjects: ProjectType[] = useMemo(
    () => [
      {
        id: 1,
        extensionId: "ocmmbfdhomnkljmjkmafegefcgcfkefo",
        name: "Microsoft Automatic Rewards",
        ghName: "MicrosoftRewardsWebsite",
        type: text.PROJECT.t_extension,
        ghUrl: "https://github.com/spin311/MicrosoftRewardsWebsite",
        description: text.PROJECT.p1_description,
        img: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/microsoft.png`,
        website: "/microsoft-automatic-rewards",
        download_link:
          "https://chromewebstore.google.com/detail/microsoft-automatic-rewar/ocmmbfdhomnkljmjkmafegefcgcfkefo",
        stars: 0,
        forks: 0,
        users: 15000,
        rating: 4.6,
        created_at: null,
      },
      {
        id: 2,
        extensionId: "mlicfddkgjkeajfgkihplfbgpmbonbao",
        name: "Prolific Studies Notifier",
        ghName: "ProlificAutomaticStudies",
        type: text.PROJECT.t_extension,
        ghUrl: "https://github.com/spin311/ProlificAutomaticStudies",
        description: text.PROJECT.p2_description,
        img: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/prolific.png`,
        website: "/prolific-studies-notifier",
        download_link:
          "https://chromewebstore.google.com/detail/prolific-studies-notifier/mlicfddkgjkeajfgkihplfbgpmbonbao",
        stars: 0,
        forks: 0,
        users: 3000,
        rating: 4.1,
        created_at: null,
      },
      {
        id: 3,
        name: "Gobar",
        ghName: "Gobar",
        type: text.PROJECT.t_mobile,
        ghUrl: "https://github.com/JuiceVodka/Gobar",
        description: text.PROJECT.p3_description,
        img: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/gobar.png`,
        website: "https://juicevodka.github.io/Gobar/",
        download_link: `${import.meta.env.PUBLIC_URL ?? ""}/assets/files/Gobar.apk`,
        stars: 0,
        forks: 0,
        created_at: null,
      },
      {
        id: 4,
        name: "Zdravko",
        ghName: "kdhero",
        type: text.PROJECT.t_mobile,
        ghUrl: "https://github.com/spin311/kdhero",
        description: text.PROJECT.p7_description,
        img: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/zdravko.png`,
        website: null,
        stars: 0,
        forks: 0,
        created_at: null,
      },
      {
        id: 5,
        name: "Survalien",
        ghName: "Survalien-Unity",
        type: text.PROJECT.t_game,
        ghUrl: "https://github.com/gregorkovac/Survalien-Unity",
        description: text.PROJECT.p5_description,
        img: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/survalien.png`,
        website:
          "https://www.dropbox.com/scl/fi/hdcw6938y4ha3virfb4fo/Survalien%20-%20Predstavitev.mp4?rlkey=xho6lfj4m78doev6sjyvwmda5&e=3&dl=0",
        download_link:
          "https://www.dropbox.com/scl/fo/bo4dqchusf56ah4ipd1oi/h?rlkey=bnqwwi2li1whkc8h3ag53lfpl&e=2&dl=0",
        stars: 0,
        forks: 0,
        created_at: null,
      },
      {
        id: 6,
        name: "KeSi",
        ghName: "KeSi",
        type: text.PROJECT.t_mobile,
        ghUrl: "https://github.com/JuiceVodka/KeSi",
        description: text.PROJECT.p6_description,
        img: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/kesi.png`,
        website: "https://juicevodka.github.io/KeSi/",
        download_link: `${import.meta.env.PUBLIC_URL ?? ""}/assets/files/KeSi.apk`,
        stars: 0,
        forks: 0,
        created_at: null,
      },
      {
        id: 7,
        name: "ChatGPT prompt engineering",
        ghName: "hiter-inzeniring-diploma",
        type: text.GENERAL.website,
        ghUrl: "https://github.com/spin311/hiter-inzeniring-diploma",
        description: text.PROJECT.p4_description,
        img: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/prompt.png`,
        website: "https://spin311.github.io/diploma/",
        stars: 0,
        forks: 0,
        created_at: null,
      },
    ],
    [text],
  );

  const [projects, setProjects] = useState<ProjectType[]>(allProjects);

  const [isLoading, setIsLoading] = useState(true);

  const getProjectStars = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_HOST ?? ""}/starredRepos`,
      );
      const starredRepos: RepositoryType[] =
        (await response.json()) as RepositoryType[];
      const updatedProjects: ProjectType[] = await Promise.all(
        projects.map(async (project) => {
          const matchingRepo = starredRepos.find(
            (repo) => repo.name === project.ghName,
          );
          let updatedProject: ProjectType = { ...project };

          if (matchingRepo) {
            updatedProject = {
              ...updatedProject,
              stars: matchingRepo.stargazers_count || 0,
              forks: matchingRepo.forks_count || 0,
              created_at: matchingRepo.created_at || null,
            };
          }

          if (
            project.type === text.PROJECT.t_extension &&
            project.extensionId
          ) {
            try {
              const extensionResponse = await fetch(
                `${import.meta.env.VITE_API_HOST ?? ""}/extension?id=${project.extensionId}`,
              );
              const extensionValues: ExtensionValues =
                (await extensionResponse.json()) as ExtensionValues;
              updatedProject = {
                ...updatedProject,
                users: extensionValues?.userCount || project.users,
                rating:
                  parseFloat(extensionValues?.ratingValue?.toFixed(1) ?? "0") ||
                  project.rating,
              };
              updatedProject.description = replaceDescription(
                updatedProject,
                updatedProject.users!,
                updatedProject.rating!,
              );
            } catch (e) {
              updatedProject.description = replaceDescription(
                updatedProject,
                updatedProject.users!,
                updatedProject.rating!,
              );
              console.error("Error fetching extension data:", e);
            }
          }
          return updatedProject;
        }),
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.error("Error fetching project stars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProjectStars();
    };
    void fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const updatedProjects: ProjectType[] = projects.map((project) => {
      const matchingProject = allProjects.find((p) => p.id === project.id);
      if (!matchingProject) {
        return project;
      }
      if (
        matchingProject &&
        matchingProject.type === text.PROJECT.t_extension &&
        project.users &&
        project.rating
      ) {
        return {
          ...project,
          type: matchingProject.type,
          description: replaceDescription(
            matchingProject,
            project.users,
            project.rating,
          ),
        };
      }
      return {
        ...project,
        type: matchingProject.type,
        description: matchingProject?.description,
      };
    });
    setProjects(updatedProjects);
    // eslint-disable-next-line
  }, [text]);

  const [sortOption, setSortOption] = useState("");

  const experiences: ExperienceType[] = [
    {
      title: text.EXPERIENCE.xp3_title,
      company: "Digital School",
      desc: [text.EXPERIENCE.xp3_desc1, text.EXPERIENCE.xp3_desc2],
      website: "https://digitalschool.si/",
      years: `2021 - 2024`,
      logo: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/ds.png`,
    },
    {
      title: text.EXPERIENCE.xp1_title,
      company: "Ixtlan Team",
      desc: [
        text.EXPERIENCE.xp1_desc1,
        text.EXPERIENCE.xp1_desc2,
        text.EXPERIENCE.xp1_desc3,
      ],
      website: "https://www.ixtlan-team.si/",
      years: "2023 - 2024",
      logo: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/ix.png`,
    },
    {
      title: text.EXPERIENCE.xp1_title,
      company: "Nightwatch, Formaviva",
      desc: [
        text.EXPERIENCE.xp2_desc1,
        text.EXPERIENCE.xp2_desc2,
        text.EXPERIENCE.xp2_desc3,
      ],
      website: "https://nightwatch.io/",
      years: `2024 - ${text.EXPERIENCE.current}`,
      logo: `${import.meta.env.PUBLIC_URL ?? ""}/assets/images/nightwatch.jpg`,
    },
  ];

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value;
    setSortOption(option);

    const sortFunctions: Record<
      string,
      (a: ProjectType, b: ProjectType) => number
    > = {
      "stars-": (a, b) => b.stars - a.stars,
      "stars+": (a, b) => a.stars - b.stars,
      "name+": (a, b) => a.name.localeCompare(b.name),
      "name-": (a, b) => b.name.localeCompare(a.name),
      "date+": (a, b) =>
        new Date(a.created_at ?? 0).getTime() -
        new Date(b.created_at ?? 0).getTime(),
      "date-": (a, b) =>
        new Date(b.created_at ?? 0).getTime() -
        new Date(a.created_at ?? 0).getTime(),
    };

    setProjects(projects.sort(sortFunctions[option]));
  };

  function formatBigNumbers(number: number) {
    return numeral(number).format("0,0").replace(/,/g, " ");
  }

  function replaceDescription(
    project: ProjectType,
    users: number,
    rating: number,
  ) {
    return project.description
      .replace("{users}", formatBigNumbers(users))
      .replace("{rating}", rating.toString());
  }

  return (
    <div className={`Main ${classes}`}>
      <h2>{text.MAIN.title}</h2>
      <p>{formatTextWithLineBreaks(text.MAIN.description)}</p>
      <hr />
      <div id="experience">
        <h2>{text.EXPERIENCE.title}</h2>
        {experiences.map((xp, index) => (
          <Experience
            key={index}
            title={xp.title}
            company={xp.company}
            desc={xp.desc}
            years={xp.years}
            logo={xp.logo}
            website={xp.website}
          />
        ))}
      </div>
      <hr />
      <div id="projects">
        <h2>{text.PROJECT.title}</h2>
        <label htmlFor="sort">{text.GENERAL.sort_by}: </label>
        <select
          id="sort"
          onChange={handleSortChange}
          value={sortOption}
          className="sort-select"
        >
          <option value="stars-">{text.GENERAL.starsDesc}</option>
          <option value="stars+">{text.GENERAL.starsAsc}</option>
          <option value="name+">{text.GENERAL.nameAsc}</option>
          <option value="name-">{text.GENERAL.nameDesc}</option>
          <option value="date+">{text.GENERAL.dateAsc}</option>
          <option value="date-">{text.GENERAL.dateDesc}</option>
        </select>
        <div className="projects">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Project project={project} isLoading={isLoading} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Main;
