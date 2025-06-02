import React from 'react';

const ResourcesSection = () => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-gray-700">📌 Pinned Links</h3>
    <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
      <li><a href="https://roadmap.sh/frontend" target="_blank" rel="noopener noreferrer" className="underline">Frontend Roadmap</a></li>
      <li><a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="underline">LeetCode Practice</a></li>
      <li><a href="https://github.com/nidhi" target="_blank" rel="noopener noreferrer" className="underline">GitHub Profile</a></li>
    </ul>
  </div>
);

export default ResourcesSection;
