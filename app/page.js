'use client';

import React, { useState, useEffect } from 'react';
import {
	Mail,
	Linkedin,
	Github,
	ExternalLink,
	Menu,
	X,
	ChevronDown,
	Calendar,
	Award,
} from 'lucide-react';

// --- Data ---
const portfolioData = {
	name: 'Shanmukh Venkata Nutulapati',
	title: 'Data Science Enthusiast',
	bio: 'A Computer Science student at Vellore Institute of Technology (VIT) with a passion for Data Science and building intelligent models from complex data.',
	location: 'Vellore, Tamil Nadu, India',
	contact: {
		email: 'nvshanmukh28@gmail.com',
		github: 'https://github.com/nvshanmukh',
		linkedin:
			'https://www.linkedin.com/in/shanmukh-venkata-nutulapati-84578126a/',
	},
	education: {
		degree: 'Bachelor of Technology in Computer Science',
		institution: 'Vellore Institute of Technology (VIT)',
		year: '2022 - 2026',
	},
	skills: {
		Programming: ['Python', 'JavaScript', 'SQL'],
		'Data Science': ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'],
		Visualization: ['Matplotlib', 'Seaborn', 'Plotly'],
		Tools: ['Streamlit', 'Git', 'Jupyter'],
	},
	achievements: [
		'Built 6+ end-to-end machine learning projects.',
		'Proficient in Exploratory Data Analysis (EDA) for feature engineering.',
	],
	projects: [
		{
			title: 'Movie Box Office Prediction',
			description:
				'A machine learning model that predicts movie box office revenue using metadata sourced from TMDB. The project includes full preprocessing, feature engineering, and deployment using Flask.',
			tags: ['Python', 'Pandas', 'Scikit-learn', 'Flask', 'TMDB API'],
			githubLink: 'https://github.com/nvshanmukh/movie-box-office-predictor',
			liveLink: 'https://box-office-predictor.streamlit.app',
		},
		{
			title: 'Explainable Fake News Detection',
			description:
				"A fake news classifier built with BERT and enhanced using SHAP explainability. It highlights the specific parts of an article influencing the model's decisions, offering transparency and trustworthiness for end users.",
			tags: ['Python', 'BERT', 'SHAP', 'Streamlit'],
			githubLink: 'https://github.com/nvshanmukh/fake-news-explainer',
			liveLink: 'https://fakenews-explainer.streamlit.app',
		},
		{
			title: 'Web Threat Analysis with ML/DL',
			description:
				'A hybrid web threat detection system combining machine learning and deep learning to identify phishing, malware, and other threats. Features include robust preprocessing and a Random Forest classifier.',
			tags: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas'],
			githubLink: 'https://github.com/nvshanmukh/web-threat-ml-dl',
			liveLink: 'https://web-threat-detector.streamlit.app',
		},
		{
			title: 'Cancer Cell Feature Extraction & Analysis',
			description:
				'A pattern recognition pipeline for cancer cell image classification. This project extracts relevant texture and morphological features from histopathological images and trains ML classifiers to detect malignant patterns.',
			tags: ['Python', 'OpenCV', 'Scikit-learn', 'GLCM', 'PCA'],
			githubLink:
				'https://github.com/nvshanmukh/cancer-cell-feature-extraction',
			liveLink: 'https://cancer-cell-demo.streamlit.app',
		},
		{
			title: 'Supermarket Sales Data Analysis',
			description:
				'A full-scale exploratory and predictive analysis on supermarket sales data. The project analyzes customer demographics, purchase behavior, and branch performance using visualizations.',
			tags: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib'],
			githubLink: 'https://github.com/nvshanmukh/supermarket-sales-analysis',
			liveLink: 'https://supermarket-insights.streamlit.app',
		},
		{
			title: 'Understanding OCD Trends with Data Analysis',
			description:
				'A statistical data analysis project aimed at understanding the demographics, symptoms, and treatment trends of OCD. It uses visual analytics to identify key patterns and relationships in a medical dataset.',
			tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
			githubLink: 'https://github.com/nvshanmukh/ocd-data-analysis',
			liveLink: 'https://ocd-trends.streamlit.app',
		},
	],
};

// --- Hooks ---
const useScrollSpy = (sectionIds) => {
	const [activeSection, setActiveSection] = useState('');

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 100;

			for (const sectionId of sectionIds) {
				const element = document.getElementById(sectionId);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (
						scrollPosition >= offsetTop &&
						scrollPosition < offsetTop + offsetHeight
					) {
						setActiveSection(sectionId);
						break;
					}
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	}, [sectionIds]);

	return activeSection;
};

const useIntersectionObserver = (options = {}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [ref, setRef] = useState(null);

	useEffect(() => {
		if (!ref) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.1, ...options }
		);

		observer.observe(ref);
		return () => observer.disconnect();
	}, [ref, options]);

	return [setRef, isVisible];
};

// --- Components ---
const TypeWriter = ({ text, delay = 100 }) => {
	const [displayText, setDisplayText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		if (currentIndex < text.length) {
			const timeout = setTimeout(() => {
				setDisplayText((prev) => prev + text[currentIndex]);
				setCurrentIndex((prev) => prev + 1);
			}, delay);
			return () => clearTimeout(timeout);
		}
	}, [currentIndex, text, delay]);

	return (
		<span>
			{displayText}
			<span className='animate-pulse'>|</span>
		</span>
	);
};

const NavLink = ({ href, children, isActive }) => {
	const handleClick = (e) => {
		e.preventDefault();
		const element = document.getElementById(href.slice(1));
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className={`relative text-gray-400 hover:text-white transition-colors duration-300 ${
				isActive ? 'text-cyan-400' : ''
			}`}>
			{children}
			{isActive && (
				<div className='absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 rounded-full' />
			)}
		</a>
	);
};

const SkillCategory = ({ category, skills, icon, index }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className='relative group'
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{ animationDelay: `${index * 200}ms` }}>
			<div className='absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl'></div>

			<div className='relative bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20 transform hover:-translate-y-2 hover:scale-[1.02]'>
				<div className='flex items-center gap-4 mb-6'>
					<div
						className={`p-3 rounded-xl transition-all duration-500 ${
							isHovered
								? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20 shadow-lg shadow-cyan-400/30'
								: 'bg-slate-700/50'
						}`}>
						<div
							className={`transform transition-transform duration-500 ${
								isHovered ? 'rotate-12 scale-110' : ''
							}`}>
							{icon}
						</div>
					</div>
					<div>
						<h3 className='text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300'>
							{category}
						</h3>
						<div className='h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-500 mt-1'></div>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-3'>
					{skills.map((skill, skillIndex) => (
						<div
							key={skill}
							className='relative group/skill'
							style={{ animationDelay: `${index * 200 + skillIndex * 100}ms` }}>
							<div className='relative overflow-hidden bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:from-cyan-500/30 hover:to-blue-500/30 hover:text-white cursor-default border border-slate-600/30 hover:border-cyan-400/60 hover:shadow-lg hover:shadow-cyan-400/25 transform hover:scale-105'>
								<div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700'></div>
								<span className='relative z-10'>{skill}</span>
								<div className='absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover/skill:w-full transition-all duration-500'></div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const ProjectCard = ({ project, index }) => {
	const [ref, isVisible] = useIntersectionObserver();

	return (
		<div
			ref={ref}
			className={`transform transition-all duration-700 ${
				isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
			} bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-cyan-500/20 border border-gray-700/50 hover:border-cyan-500/50 hover:scale-105 transition-all duration-300 flex flex-col group`}
			style={{ animationDelay: `${index * 150}ms` }}>
			<div className='flex-grow'>
				<div className='flex items-center justify-between mb-2'>
					<h3 className='text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300'>
						{project.title}
					</h3>
					<span className='text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full'>
						{project.category}
					</span>
				</div>
				<p className='text-gray-400 mb-4 text-sm leading-relaxed'>
					{project.description}
				</p>
				<div className='flex flex-wrap gap-2 mb-4'>
					{project.tags.map((tag) => (
						<span
							key={tag}
							className='bg-gray-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full hover:bg-cyan-400/20 transition-colors duration-300'>
							{tag}
						</span>
					))}
				</div>
			</div>
			<div className='flex items-center gap-4 mt-auto pt-4 border-t border-gray-700/50'>
				<a
					href={project.githubLink}
					target='_blank'
					rel='noopener noreferrer'
					className='text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 hover:scale-110'>
					<Github size={18} />
					<span>GitHub</span>
				</a>
				{project.liveLink && (
					<a
						href={project.liveLink}
						target='_blank'
						rel='noopener noreferrer'
						className='text-gray-300 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 hover:scale-110'>
						<ExternalLink size={18} />
						<span>Live Demo</span>
					</a>
				)}
			</div>
		</div>
	);
};

const ContactLink = ({ href, icon, text }) => (
	<a
		href={href}
		target='_blank'
		rel='noopener noreferrer'
		className='flex items-center gap-3 text-lg text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 p-3 rounded-lg hover:bg-gray-800/50'>
		<div className='p-2 bg-gray-800 rounded-full group-hover:bg-cyan-400/20 transition-colors duration-300'>
			{icon}
		</div>
		<span>{text}</span>
	</a>
);

const FloatingElements = () => (
	<>
		<div className='fixed top-1/4 left-4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse' />
		<div
			className='fixed top-1/2 right-8 w-3 h-3 bg-cyan-400/20 rounded-full animate-bounce'
			style={{ animationDelay: '1s' }}
		/>
		<div
			className='fixed bottom-1/4 left-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping'
			style={{ animationDelay: '2s' }}
		/>
	</>
);

// --- Main Component ---
export default function EnhancedPortfolio() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const sectionIds = ['home', 'about', 'projects', 'skills', 'contact'];
	const activeSection = useScrollSpy(sectionIds);

	return (
		<div className='bg-gray-900 min-h-screen text-gray-300 font-sans selection:bg-cyan-500 selection:text-white relative overflow-x-hidden'>
			<FloatingElements />

			<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				<header className='flex justify-between items-center py-6 sticky top-0 bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-800/50'>
					<h1 className='text-2xl font-bold text-white hover:text-cyan-400 transition-colors duration-300 cursor-default'>
						SHANMUKH
					</h1>

					<nav className='hidden md:flex items-center space-x-8'>
						<NavLink href='#home' isActive={activeSection === 'home'}>
							Home
						</NavLink>
						<NavLink href='#about' isActive={activeSection === 'about'}>
							About
						</NavLink>
						<NavLink href='#projects' isActive={activeSection === 'projects'}>
							Projects
						</NavLink>
						<NavLink href='#skills' isActive={activeSection === 'skills'}>
							Skills
						</NavLink>
						<NavLink href='#contact' isActive={activeSection === 'contact'}>
							Contact
						</NavLink>
					</nav>

					<button
						className='md:hidden text-gray-400 hover:text-white transition-colors duration-300'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
						{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</header>

				{mobileMenuOpen && (
					<div className='md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50 z-40'>
						<nav className='flex flex-col space-y-4 p-6'>
							{sectionIds.map((sectionId) => (
								<NavLink
									key={sectionId}
									href={`#${sectionId}`}
									isActive={activeSection === sectionId}>
									{sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
								</NavLink>
							))}
						</nav>
					</div>
				)}

				<main className='pt-8'>
					<section
						id='home'
						className='text-center py-20 md:py-32 flex flex-col items-center'>
						<div className='w-36 h-36 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mb-6 shadow-2xl flex items-center justify-center text-4xl font-bold text-white'>
							SN
						</div>
						<h2 className='text-5xl md:text-6xl font-extrabold text-white'>
							Hello, I&apos;m{' '}
							<span className='text-cyan-400'>
								<TypeWriter text='Shanmukh' delay={150} />
							</span>
						</h2>
						<p className='text-xl md:text-2xl text-cyan-300 mt-2 font-medium'>
							{portfolioData.title}
						</p>
						<p className='text-lg md:text-xl text-gray-400 mt-4 max-w-2xl leading-relaxed'>
							{portfolioData.bio}
						</p>
						<div className='flex items-center gap-2 text-gray-500 mt-4'></div>
						<div className='flex gap-4 mt-8'>
							<a
								href='#projects'
								className='bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:scale-105'>
								View My Work
							</a>
							<a
								href='#contact'
								className='border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105'>
								Get In Touch
							</a>
						</div>
					</section>

					{/* About Section */}
					<section id='about' className='py-20'>
						<h2 className='text-4xl font-bold text-white text-center mb-12'>
							About Me
						</h2>
						<div className='grid md:grid-cols-2 gap-12 max-w-6xl mx-auto'>
							<div className='space-y-6'>
								<div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700/50'>
									<div className='flex items-center gap-3 mb-4'>
										<Calendar className='text-cyan-400' size={24} />
										<h3 className='text-xl font-semibold text-white'>
											Education
										</h3>
									</div>
									<p className='text-gray-300 font-medium'>
										{portfolioData.education.degree}
									</p>
									<p className='text-gray-400'>
										{portfolioData.education.institution}
									</p>
									<p className='text-gray-400'>
										{portfolioData.education.year}
									</p>
								</div>
							</div>
							<div className='space-y-6'>
								<div className='bg-gray-800/50 p-6 rounded-lg border border-gray-700/50'>
									<div className='flex items-center gap-3 mb-4'>
										<Award className='text-cyan-400' size={24} />
										<h3 className='text-xl font-semibold text-white'>
											Key Achievements
										</h3>
									</div>
									<ul className='space-y-2'>
										{portfolioData.achievements.map((achievement, index) => (
											<li
												key={index}
												className='text-gray-400 flex items-start gap-2'>
												<ChevronDown
													className='text-cyan-400 mt-1 rotate-[-90deg]'
													size={16}
												/>
												{achievement}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</section>

					{/* Projects Section */}
					<section id='projects' className='py-20'>
						<h2 className='text-4xl font-bold text-white text-center mb-4'>
							Featured Projects
						</h2>
						<p className='text-gray-400 text-center mb-12 max-w-2xl mx-auto'>
							A collection of data science and machine learning projects
							showcasing end-to-end development skills
						</p>
						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{portfolioData.projects.map((project, index) => (
								<ProjectCard key={index} project={project} index={index} />
							))}
						</div>
					</section>

					{/* Skills Section */}
					<section id='skills' className='py-20'>
						<h2 className='text-4xl font-bold text-white text-center mb-4'>
							Technical Skills
						</h2>
						<p className='text-gray-400 text-center mb-12'>
							Technologies and tools I work with
						</p>
						<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
							{Object.entries(portfolioData.skills).map(
								([category, skills]) => (
									<SkillCategory
										key={category}
										category={category}
										skills={skills}
									/>
								)
							)}
						</div>
					</section>

					{/* Contact Section */}
					<section id='contact' className='py-20 text-center'>
						<h2 className='text-4xl font-bold text-white mb-4'>
							Let&apos;s Connect
						</h2>
						<p className='text-gray-400 mb-12 max-w-2xl mx-auto'>
							I&apos;m always interested in discussing data science projects,
							collaboration opportunities, or just connecting with fellow
							enthusiasts
						</p>
						<div className='flex flex-col sm:flex-row justify-center items-center gap-6 max-w-2xl mx-auto'>
							<ContactLink
								href={`mailto:${portfolioData.contact.email}`}
								icon={<Mail size={24} />}
								text={portfolioData.contact.email}
							/>
							<ContactLink
								href={portfolioData.contact.linkedin}
								icon={<Linkedin size={24} />}
								text='LinkedIn'
							/>
							<ContactLink
								href={portfolioData.contact.github}
								icon={<Github size={24} />}
								text='GitHub'
							/>
						</div>
					</section>
				</main>

				<footer className='text-center py-8 border-t border-gray-800/50'>
					<p className='text-gray-500'>
						&copy; {new Date().getFullYear()} {portfolioData.name}. All rights
						reserved.
					</p>
				</footer>
			</div>
		</div>
	);
}
