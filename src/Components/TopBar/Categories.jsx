import "./TopBar.css"

export default function Categories() {
    const categories = ['Home', 'About', 'Services', 'Blog', 'Contact', 'Shop', 'FAQ', 'Support'];
  
    return (
      <div className="categories">
        {categories.map((category, index) => (
          <a key={index} href={`#${category.toLowerCase()}`} className="nav-link">
            {category}
          </a>
        ))}
      </div>
    );
  }