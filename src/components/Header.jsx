import { FaUtensils } from 'react-icons/fa'

function Header() {
  return (
    <header className="site-header">
      <span className="site-title">
        <FaUtensils className="site-title-icon" />
        Trending Table
      </span>
      <nav>
        <a href="#videos">Videos</a>
        <a href="#about">About</a>
      </nav>
    </header>
  )
}

export default Header
