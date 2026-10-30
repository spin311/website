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
import { IMAGES_URL, retinaImage } from "../../helpers/images";

import numeral from "numeral";
import useFlipAnimation from "../../hooks/useFlipAnimation";

type MainProps = {
  classes?: string;
};

interface ExtensionValues {
  userCount?: number;
  ratingValue?: number;
}

const API_HOST = import.meta.env.VITE_API_HOST ?? "";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_HOST}${path}`);
  return (await response.json()) as T;
}

function Main({ classes = "" }: MainProps) {
  const { text, formatTextWithLineBreaks } = useLanguage();

  const allProjects: ProjectType[] = useMemo(
    () => [
      {
        id: 8,
        name: "Digitalna Košarica",
        type: text.GENERAL.website,
        description: text.PROJECT.p8_description,
        img: retinaImage("kosarica", 150, 150),
        website: "https://digitalna-kosarica.si/",
        stars: 0,
        forks: 0,
        created_at: "2025-09-03",
      },
      {
        id: 1,
        extensionId: "ocmmbfdhomnkljmjkmafegefcgcfkefo",
        name: "Search Automatic Rewards",
        ghName: "MicrosoftRewardsWebsite",
        type: text.PROJECT.t_extension,
        ghUrl: "https://github.com/spin311/MicrosoftRewardsWebsite",
        description: text.PROJECT.p1_description,
        img: retinaImage("microsoft", 150, 150),
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
        extensionId: "mndghaafpgiinfecbbbcppppiblmjepk",
        name: "Free Game Claimer",
        ghName: "epic-free-games-claim",
        type: text.PROJECT.t_extension,
        ghUrl: "https://github.com/spin311/epic-free-games-claim",
        description: text.PROJECT.p7_description,
        img: { src: `${IMAGES_URL}/claimer.webp`, width: 128, height: 128 },
        website:
            "https://chromewebstore.google.com/detail/free-game-claimer-for-ste/mndghaafpgiinfecbbbcppppiblmjepk",
        download_link:
            "https://chromewebstore.google.com/detail/free-game-claimer-for-ste/mndghaafpgiinfecbbbcppppiblmjepk",
        stars: 0,
        forks: 0,
        users: 1000,
        rating: 4.6,
        created_at: null,
      },
      {
        id: 3,
        extensionId: "mlicfddkgjkeajfgkihplfbgpmbonbao",
        name: "Prolific Studies Notifier",
        ghName: "ProlificAutomaticStudies",
        type: text.PROJECT.t_extension,
        ghUrl: "https://github.com/spin311/ProlificAutomaticStudies",
        description: text.PROJECT.p2_description,
        img: { src: `${IMAGES_URL}/prolific.webp`, width: 128, height: 128 },
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
        id: 4,
        name: "Gobar",
        ghName: "Gobar",
        type: text.PROJECT.t_mobile,
        ghUrl: "https://github.com/JuiceVodka/Gobar",
        description: text.PROJECT.p3_description,
        img: retinaImage("gobar", 150, 150),
        website: "https://juicevodka.github.io/Gobar/",
        download_link: `${import.meta.env.PUBLIC_URL ?? ""}/assets/files/Gobar.apk`,
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
        img: retinaImage("survalien", 150, 120),
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
        img: retinaImage("kesi", 150, 82),
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
        img: retinaImage("prompt", 150, 150),
        website: "https://spin311.github.io/diploma/",
        stars: 0,
        forks: 0,
        created_at: null,
      },
    ],
    [text],
  );

  const [projects, setProjects] = useState<ProjectType[]>(allProjects);
  const { containerRef: projectsRef, captureOrder } =
    useFlipAnimation<HTMLDivElement>(projects);

  const [isLoading, setIsLoading] = useState(true);

  const getProjectStars = async () => {
    setIsLoading(true);
    // Start every request before awaiting any, so the extension lookups run in
    // parallel with starredRepos instead of queueing behind it.
    const starredReposRequest = fetchJson<RepositoryType[]>("/starredRepos");
    const extensionRequests = projects.map((project) =>
      project.type === text.PROJECT.t_extension && project.extensionId
        ? fetchJson<ExtensionValues>(
            `/extension?id=${project.extensionId}`,
          ).catch((e: unknown) => {
            console.error("Error fetching extension data:", e);
            return null;
          })
        : null,
    );
    try {
      const starredRepos = await starredReposRequest;
      const updatedProjects: ProjectType[] = await Promise.all(
        projects.map(async (project, index) => {
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

          const extensionRequest = extensionRequests[index];
          if (extensionRequest) {
            const extensionValues = await extensionRequest;
            const users = extensionValues?.userCount || project.users;
            const rating =
              parseFloat(extensionValues?.ratingValue?.toFixed(1) ?? "0") ||
              project.rating;
            updatedProject = {
              ...updatedProject,
              users,
              rating,
              description: replaceDescription(project, users!, rating!),
            };
          }
          return updatedProject;
        }),
      );
      // Merge into the current list so a sort chosen while the requests were in
      // flight is kept
      const updatedById = new Map(
        updatedProjects.map((project) => [project.id, project]),
      );
      setProjects((current) =>
        current.map((project) => updatedById.get(project.id) ?? project),
      );
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
      logo: `${IMAGES_URL}/ds.webp`,
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
      logo: `${IMAGES_URL}/ix.webp`,
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
      years: `2024 - 2025`,
      logo: `${IMAGES_URL}/nightwatch.webp`,
    },
    {
      title: text.EXPERIENCE.xp4_title,
      company: "Sportradar",
      desc: [
        text.EXPERIENCE.xp4_desc1,
        text.EXPERIENCE.xp4_desc2,
        text.EXPERIENCE.xp4_desc3,
      ],
      website: "https://sportradar.com/",
      years: `2025 - 2026`,
      logo: `${IMAGES_URL}/sportradar.webp`,
    },
    {
      title: text.EXPERIENCE.xp1_title,
      company: "Opti Solutions",
      desc: [
        text.EXPERIENCE.xp5_desc1,
        text.EXPERIENCE.xp5_desc2,
        text.EXPERIENCE.xp5_desc3,
      ],
      website: "https://opti-solutions.si/",
      years: `2026 - ${text.EXPERIENCE.present}`,
      logo: `${IMAGES_URL}/opti.webp`,
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

    captureOrder();
    setProjects([...projects].sort(sortFunctions[option]));
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
    <main className={`Main ${classes}`}>
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
        <div className="projects" ref={projectsRef}>
          {projects.map((project) => (
            <div key={project.id} data-flip-id={project.id}>
              <Project project={project} isLoading={isLoading} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Main;
