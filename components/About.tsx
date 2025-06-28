'use client'

import { motion } from 'framer-motion'
import { Brain, Code, Database, Globe } from 'lucide-react'

const About = () => {
  const interests = [
    {
      icon: Brain,
      title: 'AI / Machine Learning',
      description: 'Deep learning, neural networks, and ethical AI systems'
    },
    {
      icon: Database,
      title: 'Data Science',
      description: 'Statistical analysis, data processing, and insights extraction'
    },
    {
      icon: Code,
      title: 'Software Engineering',
      description: 'Full-stack development, system design, and best practices'
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Modern web technologies and responsive design'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Passionate about ethical and interpretable AI systems
            </h3>
            
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I'm passionate about ethical and interpretable AI systems. Over the past few years, 
                I've contributed to research in fairness-aware machine learning, large-scale OCR-based 
                data extraction, and responsible AI. I love applying rigorous techniques to messy 
                real-world problems, and I'm always looking for new ways to bridge theory and impact.
              </p>
              
              <p>
                Currently, I'm focused on problems at the intersection of federated learning and 
                machine unlearning, exploring how models can forget user data responsibly and fairly. 
                This work combines my interests in privacy, fairness, and practical machine learning systems.
              </p>
              
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow duration-200"
              >
                <interest.icon className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">{interest.title}</h4>
                <p className="text-sm text-gray-600">{interest.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 