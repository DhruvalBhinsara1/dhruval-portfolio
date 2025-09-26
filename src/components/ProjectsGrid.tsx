
import React, { useState } from 'react';
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
};

const projects: Project[] = [
       {
	       icon: <ExcelIcon className="mb-2" />,
	       title: 'Excel Projects',
	       description: 'Data cleaning, advanced formulas, and visualization techniques using Excel.',
	       details: [
		       'Conditional formatting',
		       'Data cleaning workflows',
		       'Advanced formulas (XLOOKUP, etc.)',
		       'Excel charting',
	       ],
	       metrics: [
		       { label: 'Files', value: '10+' },
		       { label: 'Techniques', value: '6+' },
		       { label: 'Datasets', value: '3' },
	       ],
	       github: 'https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/EXCEL%20Project',
	       image: '/assets/excel-projects.png',
       },
       {
	       icon: <PowerBIIcon className="mb-2" />,
	       title: 'Power BI Projects',
	       description: 'Interactive dashboards, DAX calculations, and Power Query for business insights.',
	       details: [
		       'Food prep dashboard',
		       'DAX calculations',
		       'Power Query transformations',
		       'Relationship modeling',
	       ],
	       metrics: [
		       { label: 'Dashboards', value: '5' },
		       { label: 'DAX Formulas', value: '20+' },
		       { label: 'Reports', value: '4' },
	       ],
	       github: 'https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Power%20BI%20Project',
	       image: '/assets/powerbi-projects.png',
       },
       {
	       icon: <PythonIcon className="mb-2" />,
	       title: 'Python Projects',
	       description: 'Data manipulation, web scraping, and automation using Python and pandas.',
	       details: [
		       'Amazon web scraper',
		       'Automatic file sorter',
		       'Pandas EDA & cleaning',
		       'Wikipedia scraper',
	       ],
	       metrics: [
		       { label: 'Scripts', value: '8+' },
		       { label: 'Web Scrapers', value: '3' },
		       { label: 'Notebooks', value: '6' },
	       ],
	       github: 'https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Python%20Project',
	       image: '/assets/python-projects.png',
       },
       {
	       icon: <SQLIcon className="mb-2" />,
	       title: 'SQL Projects',
	       description: 'Database querying, data analysis, and cleaning with SQL.',
	       details: [
		       'Covid-19 data analysis',
		       'Nashville housing data cleaning',
		       'Complex SQL queries',
	       ],
	       metrics: [
		       { label: 'Queries', value: '15+' },
		       { label: 'Datasets', value: '2' },
		       { label: 'Cleaning Tasks', value: '5' },
	       ],
	       github: 'https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/SQL%20Projects',
	       image: '/assets/sql-projects.png',
       },
       {
	       icon: <TableauIcon className="mb-2" />,
	       title: 'Tableau Projects',
	       description: 'Advanced visualizations and data storytelling with Tableau.',
	       details: [
		       'Airbnb Seattle analysis',
		       'Game sales dashboard',
		       'Joins & relationships',
		       'Storytelling with data',
	       ],
	       metrics: [
		       { label: 'Dashboards', value: '4' },
		       { label: 'Datasets', value: '3' },
		       { label: 'Stories', value: '2' },
	       ],
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
		       className="relative bg-white/90 border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer focus-within:ring-2 focus-within:ring-blue-300"
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
		       <div className="flex items-center gap-4">
			       <span className="text-4xl md:text-5xl">{project.icon}</span>
			       <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
		       </div>
		       <p className="text-slate-600 mt-2 text-sm">{project.description}</p>
		       <ul className="text-xs text-slate-500 list-disc list-inside space-y-1 mt-3">
			       {project.details.slice(0, 2).map((item: string, i: number) => <li key={i}>{item}</li>)}
		       </ul>
		       <div className="flex gap-2 mt-4">
			       {project.metrics.map((m: Metric, i: number) => (
				       <span key={i} className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-xs font-medium text-slate-700">
					       {m.value} <span className="text-slate-400 font-normal">{m.label}</span>
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
			       className="w-32 h-32 object-contain mb-6 rounded-xl shadow-lg border border-slate-200 bg-white" 
			       style={{ background: '#fff' }}
		       />
		       <div className="flex items-center gap-4 mb-6">
			       <span className="text-4xl drop-shadow-sm">{project.icon}</span>
			       <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{project.title}</h3>
		       </div>
		       <p className="text-slate-700 text-lg mb-8 text-center max-w-xl font-medium">{project.description}</p>
		       <div className="flex gap-8 mb-8">
			       {project.metrics.map((m: Metric, i: number) => (
				       <div key={i} className="flex flex-col items-center">
					       <span className="text-2xl font-extrabold text-blue-600 drop-shadow">{m.value}</span>
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
		<section id="projects" className="py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-white">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl sm:text-4xl font-bold text-center mb-14 text-slate-900 tracking-tight">Projects</h2>
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
 