
import React, { useState } from 'react';
import { Target, Wrench, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExcelIcon, PowerBIIcon, PythonIcon, SQLIcon, TableauIcon } from './ProjectIcons';

type ExpandedProjectCardProps = {
	project: Project;
	onClose: () => void;
};

type Metric = { label: string; value: string };
type Project = {
	icon: React.ReactNode;
	title: string;
	description: string;
	details: string[];
	metrics: Metric[];
	github: string;
	image: string;
	challenge?: string;
	approach?: string;
	results?: string;
	featured?: boolean;
	duration?: string;
	liveDemo?: string;
};

const projects: Project[] = [
       {
       	   icon: <PowerBIIcon className="mb-2" />,
       	   title: 'Power BI Projects',
       	   description: 'Interactive Power BI dashboards with advanced DAX calculations and Power Query transformations for data visualization and analysis.',
       	   details: [
       	       'Apocalypse Food Prep dashboard tutorial series',
       	       'DAX calculations and formulas',
       	       'Power Query Editor transformations',
       	       'Data relationships and modeling',
       	       'Drill-down functionality and visualizations',
       	   ],
       	   metrics: [
       	       { label: 'PBIX Files', value: '9' },
       	       { label: 'Tutorial Files', value: '8' },
       	       { label: 'Projects', value: '2' },
       	   ],
       	   challenge: 'Learning comprehensive Power BI functionality from data modeling to advanced visualizations',
       	   approach: 'Built step-by-step tutorial projects covering all major Power BI features',
       	   results: 'Developed proficiency in Power BI with hands-on dashboard creation experience',
       	   github: 'https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Power%20BI%20Project',
       	   image: '/assets/powerbi-projects.png',
       },
       {
	       icon: <ExcelIcon className="mb-2" />,
	       title: 'Excel Projects',
	       description: 'Comprehensive Excel tutorials and projects covering data cleaning, advanced formulas, conditional formatting, and chart creation.',
	       details: [
		       'Data cleaning techniques and workflows',
		       'Advanced formulas including XLOOKUP',
		       'Conditional formatting applications',
		       'Excel charts and visualization tutorials',
		       'Real-world project datasets',
	       ],
	       metrics: [
		       { label: 'Tutorial Files', value: '6' },
		       { label: 'Project Files', value: '3' },
		       { label: 'Techniques', value: '5+' },
	       ],
	       challenge: "Mastering Excel's advanced features for effective data analysis and visualization",
	       approach: 'Created hands-on tutorial files covering core Excel data analysis techniques',
	       results: 'Built strong Excel foundation with practical experience in data manipulation',
	       github: 'https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/EXCEL%20Project',
	       image: '/assets/excel-projects.png',
       },
       {
       	   icon: <SQLIcon className="mb-2" />,
       	   title: 'SQL Projects',
       	   description: 'Database querying and data analysis projects demonstrating SQL skills for data exploration and cleaning.',
       	   details: [
       	       'COVID-19 data exploration and analysis',
       	       'Nashville housing data cleaning project',
       	       'Complex SQL queries and joins',
       	       'Data transformation techniques',
       	   ],
       	   metrics: [
       	       { label: 'Projects', value: '2' },
       	       { label: 'SQL Scripts', value: '4+' },
       	       { label: 'Datasets', value: '2' },
       	   ],
       	   challenge: 'Learning SQL for effective data analysis and cleaning of real-world datasets',
       	   approach: 'Practiced with COVID-19 and housing datasets to master SQL fundamentals',
       	   results: 'Developed strong SQL skills for data exploration and cleaning tasks',
       	   github: 'https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/SQL%20Projects',
       	   image: '/assets/sql-projects.png',
       	   featured: true,
       },
       {
       	   icon: <PythonIcon className="mb-2" />,
       	   title: 'Python Projects',
       	   description: 'Python automation and data analysis projects including web scraping, file organization, and pandas data manipulation.',
       	   details: [
       	       'Amazon web scraper with price tracking',
       	       'Automatic file sorter for organization',
       	       'Pandas data cleaning and EDA notebooks',
       	       'Web scraping learning projects',
       	   ],
       	   metrics: [
       	       { label: 'Projects', value: '4' },
       	       { label: 'Notebooks', value: '6' },
       	       { label: 'Scripts', value: '3' },
       	   ],
       	   challenge: 'Learning Python for data manipulation, automation, and web scraping tasks',
       	   approach: 'Built practical projects including web scrapers and data analysis notebooks',
       	   results: 'Gained proficiency in Python for automation and data analysis workflows',
       	   github: 'https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Python%20Project',
       	   image: '/assets/python-projects.png',
       	   featured: true,
       },
       {
	       icon: <TableauIcon className="mb-2" />,
	       title: 'Tableau Projects',
	       description: 'Data visualization projects showcasing Tableau skills for creating interactive dashboards and analytical insights.',
	       details: [
		       'Airbnb Seattle data analysis dashboard',
		       'Video game sales visualization project',
		       'Data joins and relationship modeling',
		       'Interactive filtering and storytelling',
	       ],
	       metrics: [
		       { label: 'Projects', value: '2' },
		       { label: 'Dashboards', value: '4' },
		       { label: 'Datasets', value: '3' },
	       ],
	       challenge: 'Learning Tableau for effective data visualization and dashboard creation',
	       approach: 'Built comprehensive projects with real datasets including Airbnb and gaming data',
	       results: 'Developed strong Tableau skills for interactive data storytelling',
	       github: 'https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Tableau%20Project',
	       image: '/assets/tableau-projects.png',
       },
];

type ProjectCardProps = {
	project: Project;
	onExpand: () => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onExpand }) => {
       return (
	       <motion.div
		       layout
		       initial={{ borderRadius: 16 }}
		       className={`relative bg-white/90 border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer focus-within:ring-2 focus-within:ring-blue-300 ${
			       project.featured 
				       ? 'border-blue-300 bg-gradient-to-br from-blue-50/50 to-white ring-1 ring-blue-200/50' 
				       : 'border-slate-200'
		       }`}
		       tabIndex={0}
		       aria-label={`Expand details for ${project.title}`}
		       role="button"
		       onMouseEnter={onExpand}
		       onMouseLeave={onExpand}
		       onFocus={onExpand}
		       onBlur={onExpand}
		       onClick={onExpand}
		       onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onExpand()}
	       >
		       {/* Featured Badge */}
		       {project.featured && (
			       <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
				       ⭐ Featured
			       </div>
		       )}
		       
		       <div className="flex items-start justify-between mb-3">
			       <div className="flex items-center gap-3">
				       <span className="text-3xl">{project.icon}</span>
				       <div>
					       <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
					       {project.duration && (
						       <span className="text-xs text-slate-500 font-medium">{project.duration}</span>
					       )}
				       </div>
			       </div>
		       </div>
		       
		       <p className="text-slate-600 text-sm leading-relaxed mb-4">{project.description}</p>
		       
		       <ul className="text-xs text-slate-500 space-y-1 mb-4">
			       {project.details.slice(0, 3).map((item: string, i: number) => (
				       <li key={i} className="flex items-center gap-2">
					       <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
					       {item}
				       </li>
			       ))}
		       </ul>
		       
		       <div className="flex flex-wrap gap-2">
			       {project.metrics.slice(0, 2).map((m: Metric, i: number) => (
				       <span key={i} className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-1 text-xs font-medium text-slate-700">
					       <span className="font-semibold text-slate-900">{m.value}</span> {m.label}
				       </span>
			       ))}
		       </div>
	       </motion.div>
       );
};

const ExpandedProjectCard: React.FC<ExpandedProjectCardProps> = ({ project, onClose }) => (
       <motion.div
	       className="fixed inset-0 z-50 flex items-center justify-center"
	       initial={{ opacity: 0 }}
	       animate={{ opacity: 1 }}
	       exit={{ opacity: 0 }}
	       transition={{ duration: 0.3 }}
	       aria-modal="true"
	       role="dialog"
       >
	       {/* Backdrop with smooth blur transition */}
	       <motion.div
		       className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300"
		       style={{ WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)', transition: 'backdrop-filter 0.3s, -webkit-backdrop-filter 0.3s, background 0.3s' }}
		       initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
		       animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
		       exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
		       transition={{ duration: 0.3 }}
		       onClick={onClose}
		       aria-label="Close expanded project card"
	       />
	       {/* Card */}
	       <motion.div
		       layoutId={project.title}
		       className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 p-10 flex flex-col items-center"
		       style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10)' }}
		       initial={{ scale: 0.95, y: 40, opacity: 0 }}
		       animate={{ scale: 1, y: 0, opacity: 1 }}
		       exit={{ scale: 0.95, y: 40, opacity: 0 }}
		       transition={{ type: 'spring', stiffness: 300, damping: 30 }}
	       >
		       <button
			       onClick={onClose}
			       className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/90 shadow hover:bg-slate-800 text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
			       aria-label="Close"
		       >
			       &times;
		       </button>
	       <img 
		       src={project.image} 
		       alt={`${project.title} illustration`} 
		       className="w-full max-w-xs h-36 object-cover mb-6 rounded-xl shadow-lg border border-slate-200 bg-white" 
		       style={{ background: '#fff' }}
	       />
		       <div className="flex items-center gap-4 mb-4">
			       <span className="text-4xl drop-shadow-sm">{project.icon}</span>
			       <div className="text-center">
				       <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{project.title}</h3>
				       {project.duration && (
					       <span className="text-sm text-slate-500 font-medium">Duration: {project.duration}</span>
				       )}
			       </div>
		       </div>
		       
		       <p className="text-slate-700 text-base mb-6 text-center max-w-xl font-medium leading-relaxed">{project.description}</p>
		       
		       {/* Challenge-Approach-Results */}
		       {(project.challenge || project.approach || project.results) && (
			       <div className="w-full max-w-2xl space-y-4 mb-6">
		       {project.challenge && (
			       <div className="bg-red-50/80 border border-red-200 rounded-xl p-4">
				       <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
											   {/* Lucide Target icon for Challenge */}
											   <Target className="w-5 h-5 text-red-500" strokeWidth={2} />
					       Challenge
				       </h4>
				       <p className="text-red-700 text-sm">{project.challenge}</p>
			       </div>
		       )}

		       {project.approach && (
			       <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4">
				       <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
											   {/* Lucide Wrench icon for Approach */}
											   <Wrench className="w-5 h-5 text-blue-500" strokeWidth={2} />
					       Approach
				       </h4>
				       <p className="text-blue-700 text-sm">{project.approach}</p>
			       </div>
		       )}

		       {project.results && (
			       <div className="bg-green-50/80 border border-green-200 rounded-xl p-4">
				       <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
											   {/* Lucide Trophy icon for Results */}
											   <Trophy className="w-5 h-5 text-green-500" strokeWidth={2} />
					       Results
				       </h4>
				       <p className="text-green-700 text-sm">{project.results}</p>
			       </div>
		       )}
			       </div>
		       )}
		       
		       <div className="flex gap-6 mb-6">
			       {project.metrics.map((m: Metric, i: number) => (
				       <div key={i} className="flex flex-col items-center">
					       <span className="text-xl font-extrabold text-blue-600 drop-shadow">{m.value}</span>
					       <span className="text-xs text-slate-500 uppercase tracking-wider mt-1">{m.label}</span>
				       </div>
			       ))}
		       </div>
		       
		       <a
			       href={project.github}
			       target="_blank"
			       rel="noopener noreferrer"
			       className="inline-block mt-2 px-6 py-2 rounded-full bg-blue-700 text-white text-base font-semibold border border-blue-800 shadow hover:bg-blue-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
			       style={{ color: '#fff', background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)' }}
		       >
			       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="inline w-5 h-5 mr-2 -mt-1 align-middle" style={{ color: '#fff' }}><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
			       View on GitHub
		       </a>
	       </motion.div>
       </motion.div>
);



const ProjectsGrid: React.FC = () => {
	const [expanded, setExpanded] = useState<number | null>(null);
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);
	const [hoveredModal, setHoveredModal] = useState(false);
	const hoverTimeout = React.useRef<number | null>(null);

	// Close on ESC
	React.useEffect(() => {
		if (expanded === null) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setExpanded(null);
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [expanded]);

	// Open modal
	const openModal = (index: number) => {
		if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
		setExpanded(index);
		setHoveredCard(index);
	};

	// When mouse leaves card or modal, check if both are not hovered, then close
	// Increased delay for more forgiveness in user movement
	const checkClose = () => {
		if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
		hoverTimeout.current = setTimeout(() => {
			if (!hoveredModal && hoveredCard === null) {
				setExpanded(null);
			}
		}, 200); // slightly longer delay for robustness
	};

	return (
		<section
			id="projects"
			className="min-h-[100svh] min-h-screen md:min-h-dvh px-4 bg-gradient-to-b from-white via-slate-50 to-white flex items-center justify-center scroll-mt-24 snap-start"
		>
			<div className="w-full max-w-6xl mx-auto">
				<h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-slate-900 tracking-tight">Projects</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, index) => (
						<div
							key={index}
							onMouseEnter={() => { openModal(index); setHoveredCard(index); }}
							onMouseLeave={() => { setHoveredCard(null); checkClose(); }}
							onFocus={() => { openModal(index); setHoveredCard(index); }}
							onBlur={() => { setHoveredCard(null); checkClose(); }}
							onClick={() => openModal(index)} // for mobile/touch
						>
							<ProjectCard project={project} onExpand={() => openModal(index)} />
						</div>
					))}
				</div>
				<AnimatePresence>
					{expanded !== null && expanded >= 0 && expanded < projects.length && (
						<div
							onMouseEnter={() => { setHoveredModal(true); if (hoverTimeout.current) clearTimeout(hoverTimeout.current); }}
							onMouseLeave={() => { setHoveredModal(false); checkClose(); }}
							tabIndex={-1}
							style={{ position: 'relative', zIndex: 50 }}
						>
							<ExpandedProjectCard
								project={projects[expanded]}
								onClose={() => setExpanded(null)}
							/>
						</div>
					)}
				</AnimatePresence>
			</div>
		</section>
	);
}

export default ProjectsGrid;
// End of file
 