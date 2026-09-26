/**
 * TECHNOLOGIES
 * ------------
 * Add a technology by adding one line: { name, icon, category, color }.
 * `color` is the brand colour of the icon (optional; defaults to the text colour).
 * Icons come from react-icons (https://react-icons.github.io/react-icons/).
 * A technology can appear in more than one group by listing it twice.
 */
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMongodb,
  SiMongoose,
  SiMysql,
  SiSqlite,
  SiGit,
  SiGithub,
  SiPostman,
  SiSwagger,
} from 'react-icons/si'
import { TbApi, TbTestPipe, TbCloudUpload } from 'react-icons/tb'

export const technologyGroups = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'tools', label: 'Tools' },
  { id: 'expanding', label: 'Currently Expanding', note: 'Technologies I am actively learning and using more.' },
]

const technologies = [
  { name: 'React', icon: SiReact, category: 'frontend', color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript, category: 'frontend', color: '#F7DF1E' },
  { name: 'HTML', icon: SiHtml5, category: 'frontend', color: '#E34F26' },
  { name: 'CSS', icon: SiCss, category: 'frontend', color: '#2D8CE3' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: 'frontend', color: '#38BDF8' },

  { name: 'Node.js', icon: SiNodedotjs, category: 'backend', color: '#5FA04E' },
  { name: 'Express', icon: SiExpress, category: 'backend', color: '#FFFFFF' },
  { name: 'REST APIs', icon: TbApi, category: 'backend', color: '#C084FC' },
  { name: 'JWT', icon: SiJsonwebtokens, category: 'backend', color: '#FB015B' },

  { name: 'MongoDB', icon: SiMongodb, category: 'database', color: '#47A248' },
  { name: 'Mongoose', icon: SiMongoose, category: 'database', color: '#C23A3A' },
  { name: 'MySQL', icon: SiMysql, category: 'database', color: '#6CA0D1' },
  { name: 'SQLite', icon: SiSqlite, category: 'database', color: '#3FA9F5' },

  { name: 'Git', icon: SiGit, category: 'tools', color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, category: 'tools', color: '#FFFFFF' },
  { name: 'Postman', icon: SiPostman, category: 'tools', color: '#FF6C37' },
  { name: 'Testing', icon: TbTestPipe, category: 'tools', color: '#E5E7EB' },
  { name: 'Deployment', icon: TbCloudUpload, category: 'tools', color: '#93C5FD' },

  { name: 'MySQL', icon: SiMysql, category: 'expanding', color: '#6CA0D1' },
  { name: 'SQLite', icon: SiSqlite, category: 'expanding', color: '#3FA9F5' },
  { name: 'Swagger / OpenAPI', icon: SiSwagger, category: 'expanding', color: '#85EA2D' },
]

export default technologies
