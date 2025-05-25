import { categories } from '@/lib/firebase';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  // Adicionamos 'Todos' à lista de categorias
  const allCategories = ['Todos', ...categories];
  
  return (
    <div className="mb-6 overflow-x-auto no-scrollbar">
      <div className="flex space-x-2 pb-2">
        {allCategories.map((category) => (
          <button
            key={category}
            className={`category-pill whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category 
                ? 'bg-[#af1a2d] text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
