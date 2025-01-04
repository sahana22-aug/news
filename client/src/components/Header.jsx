
  import { React, useState, useEffect } from "react";
  import { Link } from 'react-router-dom';
  import countries from './countries';
  
  function Header() {
    const [active, setActive] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [theme, setTheme] = useState("light-theme");
    const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  
    useEffect(() => {
      document.body.className = theme;
    }, [theme]);
  
    function toggleTheme() {
      if (theme === "light-theme") {
        setTheme("dark-theme");
      } else {
        setTheme("light-theme");
      }
    }
  
    return (
      <header>
        <nav class="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
          <h3 class="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 z-50 mb-5 mt-5">News_Aggregator
            <span className="logo">
              <img src="" alt="News_Aggregator" />
            </span>
          </h3>
          <ul className={`nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis-4/6 md:justify-end ${active ? 'active' : ''}`}>
            <li>
              <Link className="no-underline font-semibold" to="/" onClick={() => { setActive(!active) }}>
                All News
              </Link>
            </li>
            <li className="dropdown-li">
              <Link className="no-underline font-semibold flex items-center gap-2" onClick={() => { setShowCategoryDropdown(!setShowCategoryDropdown); setShowCountryDropdown(false); }}>
                Top-Headlines
              </Link>
            </li>
  
            <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
              {countries.map((element, index) => (
                <li key={index} onClick={() => setShowCategoryDropdown(!showCountryDropdown)}>
                  <Link to={`/country/${element?.iso_2_alpha}`} className="flex gap-3" onClick={() => { setActive(!active) }}>
  
                    <img src={element?.png} srcset={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`} alt="{element?.countryName}" />
                    <span>{element?.countryName}</span>
                  </Link>
                </li>
              ))}
            </ul>
  
  
            <li>
              <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
                <input type="checkbox" className="checkbox" id="checkbox" />
                <label for="checkbox" class="checkbox-label">
                  <i class="fas fa-moon"></i>
                  <i class="fas fa-sun"></i>
                  <span class="ball"></span>
                </label>
  
  
              </Link>
            </li>
          </ul>
          <div className={active ? "ham-burger z-index-100 ham-open" : "ham-burger z-index-100"} onClick={() => { setActive(!active) }}>
            <span className="lines line-1"></span>
            <span className="lines line-2"></span>
            <span className="lines line-3"></span>
          </div>
        </nav>
      </header>
    );
  }
  
  export default Header;