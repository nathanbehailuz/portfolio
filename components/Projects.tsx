'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Wrench, Brain, Car, Gamepad2, Activity, ShoppingCart } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      title: 'AutoVert',
      description: 'A full-featured vehicle management and diagnostic app built using Flutter and Firebase. Features AI-powered diagnostics, maintenance tracking, and garage locator.',
      tech: ['Flutter', 'Firebase', 'AI/ML', 'Google APIs'],
      github: 'https://github.com/nathanbehailuz/swe-final-project',
      demo: null,
      icon: Car,
      category: 'Mobile Development'
    },
    {
      title: 'ML from Scratch',
      description: 'Implemented core machine learning algorithms from the ground up in Python. Includes linear regression, SVM, decision trees, neural networks, and GANs.',
      tech: ['Python', 'NumPy', 'Matplotlib', 'Scikit-learn'],
      github: 'https://github.com/nathanbehailuz/ml-from-scratch',
      demo: null,
      icon: Brain,
      category: 'Machine Learning'
    },
    {
      title: 'AI Plays Flappy Bird',
      description: 'Developed an AI agent that learns to play Flappy Bird using NEAT (NeuroEvolution of Augmenting Topologies) reinforcement learning technique.',
      tech: ['Python', 'Pygame', 'NEAT', 'Reinforcement Learning'],
      github: 'https://github.com/nathanbehailuz/AI-plays-Flappy-Bird',
      demo: null,
      icon: Gamepad2,
      category: 'AI/Reinforcement Learning'
    },
    {
      title: 'Brain Tumor Detection',
      description: 'CNN-based classifier with Flask web app to accurately classify brain tumors from MRI scans using deep learning techniques.',
      tech: ['Python', 'TensorFlow', 'Flask', 'OpenCV', 'PIL'],
      github: 'https://github.com/nathanbehailuz/brain-tumor-detection',
      demo: null,
      icon: Activity,
      category: 'Computer Vision'
    },
    {
      title: 'Churn Prediction',
      description: 'Machine learning model to predict customer churn for telecom companies, aiding in customer retention and revenue optimization.',
      tech: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Seaborn'],
      github: 'https://github.com/nathanbehailuz/churn-prediction',
      demo: null,
      icon: Brain,
      category: 'Data Science'
    },
    {
      title: 'Amazon Replica',
      description: 'Functional e-commerce front-end clone replicating Amazon\'s design and core functionalities using MVC architecture.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Jasmine', 'Date.js'],
      github: 'https://github.com/nathanbehailuz/amazon-replica',
      demo: null,
      icon: ShoppingCart,
      category: 'Web Development'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 group"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <project.icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <span className="text-sm text-gray-500">{project.category}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 