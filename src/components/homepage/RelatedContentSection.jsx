import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { relatedContent } from "@/data/relatedContent";

const RelatedContentSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Related Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our collection of helpful articles and guides to make better financial decisions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedContent.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <Link 
                to={item.link}
                className="text-primary hover:underline inline-flex items-center"
              >
                Read More
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedContentSection;
  