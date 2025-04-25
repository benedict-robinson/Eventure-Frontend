import "./TopBar.css"
import { Link } from 'react-router-dom';

export default function Categories() {
    const categories = ['Sports', 'Music', 'Arts & Theatre', 'Film', 'Comedy', 'Miscellaneous', 'Group'];
  
    return (
      <div className="categories">
        {categories.map((category, index) => (
          <Link
          key={index}
          to={`/category/${category.toLowerCase().replace(/ & /g, '+').replace(/\s/g, '-')}`}
          className="nav-link"
        >
          {category}
        </Link>
        ))}
      </div>
    );
  }