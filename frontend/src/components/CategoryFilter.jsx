
// import React from "react";

// const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
//   return (
//     <div className="flex flex-wrap gap-3 mb-6">
//       <button
//         onClick={() => onSelectCategory(null)}
//         className={`px-4 py-2 rounded font-semibold ${
//           selectedCategory === null
//             ? "bg-blue-600 text-white"
//             : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//         }`}
//       >
//         Tous
//       </button>
//       {categories.map((category) => (
//         <button
//           key={category._id}
//           onClick={() => onSelectCategory(category._id)}
//           className={`px-4 py-2 rounded font-semibold ${
//             selectedCategory === category._id
//               ? "bg-blue-600 text-white"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           {category.name}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default CategoryFilter;




import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded font-semibold ${
          selectedCategory === null
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Tous
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => onSelectCategory(category._id)}
          className={`px-4 py-2 rounded font-semibold ${
            selectedCategory === category._id
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;