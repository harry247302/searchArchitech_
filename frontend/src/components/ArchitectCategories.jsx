import React from 'react';

const architectCategories = [
  { name: 'Residential Architect', icon: '🏠', link: '/residential' },
  { name: 'Commercial Architect', icon: '🏢', link: '/commercial' },
  { name: 'Landscape Architect', icon: '🌳', link: '/landscape' },
  { name: 'Interior Architect', icon: '🛋️', link: '/interior' },
  { name: 'Urban Planner', icon: '🌆', link: '/urban-planner' },
  { name: 'Industrial Architect', icon: '🏭', link: '/industrial' },
  { name: 'Sustainable Architect', icon: '🌿', link: '/sustainable' },
  { name: 'Restoration Architect', icon: '🏛️', link: '/restoration' },
  { name: 'Healthcare Architect', icon: '🏥', link: '/healthcare' },
  { name: 'Educational Architect', icon: '🎓', link: '/educational' },
  { name: 'Transportation Architect', icon: '🚉', link: '/transportation' },
  { name: 'Naval Architect', icon: '🚢', link: '/naval' },
  { name: 'Computational Architect', icon: '💻', link: '/computational' },
  { name: 'Lighting Architect', icon: '💡', link: '/lighting' },
  { name: 'Event Architect', icon: '🎪', link: '/event' },
  { name: 'More Categories', icon: '➕', link: '/more' },
];

const ArchitectCategories = () => {
  return (
   <div className="w-full flex justify-center bg-white p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-12 max-w-screen-xl">
        {architectCategories.map((category, index) => (
          <a
            key={index}
            href={category.link}
            className="w-[80px] flex flex-col items-center justify-center text-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition"
          >
            <div className="text-2xl mb-1">{category.icon}</div>
            <p className="text-xs text-gray-700 font-medium">{category.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArchitectCategories;
