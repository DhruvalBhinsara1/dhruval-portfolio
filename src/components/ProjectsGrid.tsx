import React from "react";
import { motion } from "framer-motion";


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
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-medium mb-2">MY LATEST WORK</h2>
          <p className="text-xs md:text-sm text-black/60 mb-12 md:mb-16">
            from 2024 'til today'
          </p>

          <div className="space-y-8 md:space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-black/10 pb-8 md:pb-12 group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-8">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-medium mb-3 group-hover:opacity-60 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-black/60 mb-3">
                      {project.category}
                    </p>
                    <p className="text-sm md:text-base max-w-2xl text-gray-700">
                      {project.description}
                    </p>
                    {/* Removed note property rendering to fix TS error */}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm font-medium hover:opacity-60 transition-opacity whitespace-nowrap text-blue-600"
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
