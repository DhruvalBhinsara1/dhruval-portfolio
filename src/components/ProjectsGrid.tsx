import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Users, BarChart3, Database, Code, FileSpreadsheet, TrendingUp } from "lucide-react";


  const projects = [
    {
      title: "E-commerce Funnel Analysis",
      category: "Python, SQL, Data Analysis",
      description: "In-depth customer journey analysis through e-commerce conversion funnel, identifying drop-off points and calculating conversion rates using SQL Server and Python with pandas for behavior tracking and optimization insights.",
      github: "https://github.com/DhruvalBhinsara1/E-commerce-Funnel-Analysis",
    },
    {
      title: "Influencer & Platform Data Analysis",
      category: "Python, Pandas, Data Analysis",
      description: "Comprehensive analysis of influencer marketing performance across multiple social media platforms, analyzing engagement metrics, revenue trends, and ROI using Python, Pandas, and data visualization libraries.",
      github: "https://github.com/DhruvalBhinsara1/Influencer-and-Platform-Data-Analysis",
    },
    {
      title: "Power BI Dashboards",
      category: "Data Visualization, DAX",
      description: "Interactive Power BI dashboards demonstrating data modeling, DAX measures, and visual storytelling capabilities.",
      github: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Power%20BI%20Project",
    },
    {
      title: "SQL Data Analysis",
      category: "Database, SQL",
      description: "Complex SQL queries for data analysis, including joins, CTEs, window functions, and stored procedures.",
      github: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/SQL%20Projects",
    },
    {
      title: "Python Automation",
      category: "Python, Web Scraping",
      description: "Python scripts for web scraping, data cleaning, and automation using libraries like BeautifulSoup and Pandas.",
      github: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Python%20Project",
    },
    {
      title: "Excel Analytics",
      category: "Excel, Formulas",
      description: "Advanced Excel projects featuring pivot tables, VLOOKUP, complex formulas, and data analysis techniques.",
      github: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/EXCEL%20Project",
    },
    {
      title: "Tableau Visualizations",
      category: "Tableau, Dashboards",
      description: "Interactive Tableau dashboards for business intelligence and data visualization.",
      github: "https://github.com/DhruvalBhinsara1/PortfolioProjects/tree/main/Tableau%20Project",
    },
  ];

const ProjectsGrid: React.FC = () => {
  const projectIcons = [ShoppingCart, Users, BarChart3, Database, Code, FileSpreadsheet, TrendingUp];
  
  return (
    <section id="projects" className="py-16 md:py-24 px-6 md:px-12 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">My Projects</h2>
          <p className="text-lg text-gray-600">
            I'm really proud of a few projects I've worked on! One of my standout achievements is creating an E-commerce user behavior funnel with over 40 million rows of data.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => {
            const Icon = projectIcons[index];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="backdrop-blur-md bg-white/60 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-white/20"
              >
                {/* Glassmorphism Header with Icon */}
                <div className="h-32 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-purple-200/20 to-pink-200/20"></div>
                  <Icon className="w-16 h-16 text-gray-700 relative z-10" strokeWidth={1.5} />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-black group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.category.split(', ').map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-black/90 backdrop-blur-sm text-white rounded-full text-xs font-medium border border-gray-200/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    View Project
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
