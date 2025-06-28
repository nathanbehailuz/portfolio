'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Building } from 'lucide-react'

const Experience = () => {
  const experiences = [
    {
      title: 'Research Assistant',
      organization: 'MOMA Lab',
      location: 'New York University',
      period: 'Present',
      description: 'Exploring Federated Learning, Machine Unlearning, and their intersection with Responsible AI. Working on cutting-edge research to develop models that can forget user data responsibly and fairly.',
      highlights: [
        'Researching federated learning and machine unlearning techniques',
        'Developing responsible AI systems',
        'Collaborating with faculty and fellow researchers'
      ]
    },
    {
      title: 'Machine Learning Research Assistant',
      organization: 'Center for Responsible AI',
      location: 'New York University',
      period: '2023 - 2024',
      description: 'Worked with Prof. Julia Stoyanovich on multi-group intersectional fairness in classification tasks. Contributed to developing models that mitigate bias in classification problems.',
      highlights: [
        'Implemented and evaluated fairness-aware algorithms',
        'Designed experiments and refined predictive models',
        'Analyzed fairness thresholds and regions',
        'Contributed to research on algorithmic fairness'
      ]
    },
    {
      title: 'Big Data Research Assistant',
      organization: 'NYU Abu Dhabi & University College London',
      location: 'Collaborative Research',
      period: '2023',
      description: 'Collaborated with Prof. Gabriel-Kohler Derrick (NYU) and Prof. Jeremy Bowles (UCL) on historical data analysis of precolonial Ireland.',
      highlights: [
        'Extracted structured data from 40,000+ historical pages using OCR',
        'Conducted extensive post-processing and data cleaning',
        'Performed socio-economic analysis on the extracted data',
        'Optimized data processing pipelines for large-scale datasets'
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Building size={16} />
                      <span>{experience.organization}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-medium">
                  <Calendar size={16} />
                  <span>{experience.period}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {experience.description}
              </p>
              
              <ul className="space-y-2">
                {experience.highlights.map((highlight, highlightIndex) => (
                  <li key={highlightIndex} className="flex items-start gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience 