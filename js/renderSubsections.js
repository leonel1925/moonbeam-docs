// Get the current page the user is on
const pathName = window.location.pathname.split('/');
let currentPage = pathName[pathName.length - 2];

// & symbols turn into %26 in the url or users can type in & directly into address bar
// revert to "and" so we can grab the element using querySelectorAll
if (currentPage.includes("%26")){
  currentPage = currentPage.replace("%26", "and");
}
if (currentPage.includes("&")){
  currentPage = currentPage.replace("&", "and");
}

// Get the nav section for the page
const sections = document.querySelectorAll(`.${currentPage.toLowerCase()}`);

// Get the div to append the subsection cards to
const wrapper = document.querySelector(".subsection-wrapper");

// Append the subsection cards
const appendCards = (section) => {
  for (let subsection of section.children) {
    const subsectionContent = subsection.innerText.trim();
    let subsectionName = subsectionContent.includes("\n") ? subsectionContent.split("\n")[0] : subsectionContent;
    const subsectionLink = subsectionName.includes(' ') ? subsectionName.replaceAll(' ', '-').toLowerCase() : subsectionName.toLowerCase();
  
    wrapper.innerHTML += `
    <div class="card">
      <a href="${window.location.href}${subsectionLink}">
        <h2 class="title">${subsectionName}</h2>
        <img class="icon" src="/images/index-pages/${subsectionLink}.png">
      </a>
    </div>
    `
  }
};

if (wrapper) {
  // If we have multiple sections with the same name, we need to find the correct section
  if (sections.length > 1) {
    for (let section of sections) {
      // To determine the correct section, we have to look at the subsection items
      const subsectionContentList = section.getElementsByClassName("md-nav__link");
      for (let content of subsectionContentList) {
        // If the href starts with "../", then the subsection is being displayed on another
        // page and is not the subsection we are looking for
        if (content.hasAttribute("href") && !content.attributes["href"].value.startsWith("../")){
          appendCards(section);
          break;
        }
      }
    }
  } else {
    appendCards(sections[0]); // Default to the first element
  }
}