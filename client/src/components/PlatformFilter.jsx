import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import '../stylesheets/PlatformFilter.scss';

// const PlatformFilter = ({ platforms, activePFilter, onFilterSelect }) => {
//   return (
//     <div className='filter-container'>
//       {platforms.map((platform) => (
//         <button
//           key={platform}
//           onClick={() => onFilterSelect(platform)}
//           className={`filter-button ${activePFilter.includes(platform) ? 'active' : ''}`}
//         >
//           {platform}
//         </button>
//       ))}
//     </div>
//   );
// };

// Need to update THIS after platforms becomes a state
const PlatformFilter = ({ platforms, onFilterSelect }) => {
  return (
    <div className='filter-container'>
      {platforms.map((platform) => (
        <button
          key={platform}
          onClick={() => onFilterSelect(platform)}
          className={`filter-button ${activePFilter.includes(platform) ? 'active' : ''}`}
        >
          {platform}
        </button>
      ))}
    </div>
  );
};

export default PlatformFilter;
