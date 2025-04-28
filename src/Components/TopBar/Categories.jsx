import { useEffect, useState } from "react";
import useScreenWidth from "../../Custom Hooks/useScreenWidth.jsx";
import "./TopBar.css"
import { Link } from 'react-router-dom';

const categories = ['Sports', 'Music', 'Arts & Theatre', 'Film', 'Comedy', 'Miscellaneous']

export default function Categories() {
  const [visibleCategories, setVisibleCategories] = useState(categories)
  
  const screenWidth = useScreenWidth()

    useEffect(() => {
      if (screenWidth >= 1000) {
        setVisibleCategories(categories);
      } else if (screenWidth >= 900) {
        setVisibleCategories(categories.slice(0, 5));
      } else if (screenWidth >= 712) {
        setVisibleCategories(categories.slice(0, 4));
      } else {
        setVisibleCategories([]);
      }
    }, [screenWidth]); 

    return (
      <div className="categories">
      {visibleCategories.map((category) => {
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