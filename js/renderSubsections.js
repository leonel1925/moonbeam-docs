// Get the current page the user is on
const pathName = window.location.pathname.split('/');
let currentPage = pathName[pathName.length - 2];

// Get the nav element for the page
const currentElements = document.querySelectorAll(`.${currentPage}`);

// Get the div to append the subsection cards to
const wrapper = document.querySelector(".subsection-wrapper");

// Append the subsection cards
if (wrapper) {
  // If we have multiple subsections with the same name, we need to find the correct subsection
  let currentElement = currentElements[0]; // Default to the first element
  if (currentElements.length > 1){
    for (let element of currentElements){
      // For each possible subsection, we have to look at it's children to determine if
      // the children are present on this page or another
      for (let child of element.children){
        const href = child.children[0].attributes["href"].value;
        // If the href starts with "../", then the element is being displayed on another
        // page and is not the element we are looking for
        if (!href.startsWith("../")){
          currentElement = element;
          break;
        }
      }
    }
  }

  for (let child of currentElement.children) {
    let subsectionName = child.innerText.split("\n")[0];
    const subsectionLink = subsectionName.includes(' ') ? subsectionName.replaceAll(' ', '-').toLowerCase() : subsectionName.toLowerCase();
  
    // TODO: eventually add an img below the h2 👇
    // <img src="/images/index-pages/${subsectionLink}.png">
    
    wrapper.innerHTML += `
    <div class="card">
      <a href="${window.location.href}${subsectionLink}">
        <h2 class="title">${subsectionName}</h2>
      </a>
    </div>
    `
  }
}