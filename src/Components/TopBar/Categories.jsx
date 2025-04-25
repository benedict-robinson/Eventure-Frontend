import "./TopBar.css"
import { Link } from 'react-router-dom';

export default function Categories() {
    const categories = ['Sports', 'Music', 'Arts & Theatre', 'Film', 'Comedy', 'Miscellaneous'];
  
    return (
      <div className="categories">
      {categories.map((category) => {
        const slug = encodeURIComponent(category);
        return (
          <Link
            key={category}
            to={`/category/${slug}`}
            className="nav-link"
          >
            {category}
          </Link>
        );
      })}
    </div>
    );
  }