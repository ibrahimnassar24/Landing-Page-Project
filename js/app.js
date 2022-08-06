/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const navBarList = document.getElementById('navbar__list'); 
const sections = document.getElementsByTagName('section');
const navBarLinks = [];


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// the activate function differentiates the selected section and link
function activate(clickedLink) {
    for(let i = 0; i < sections.length; i++) {
        if(clickedLink === sections[i]) {
            sections[i].classList.add("your-active-class");
            navBarLinks[i].classList.add("menu__link__active");
        } else {
            sections[i].classList.remove("your-active-class");
            navBarLinks[i].classList.remove("menu__link__active");
            
        }
    }
}

// the goToSection function scrolls to the specified section
function goToSection (targetSection) {
    targetSection.scrollIntoView({behavior: "smooth"});    
    
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function mainFunction () {
    // build the nav
    buildNavBar();

   // add active class to the clickedlink
    // Scroll to anchor ID using scrollIntoView event
    buildEventListeners();

   // specify what happens in case of scrolling
    document.addEventListener("scroll", (event) => {
        event.preventDefault();

        // the section will be active when it is near the top of the viewport
        for(let i = 0; i < sections.length; i++) {
            if(sections[i].getBoundingClientRect().top > 0 && sections[i].getBoundingClientRect().top < screen.availHeight/10) {
                activate(sections[i]);
                                               
            }
            
            
        }
        
    })
}





/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu 
function buildNavBar () {
    // using the document fragment to improve the performance
    const navFrag = document.createDocumentFragment();

    for(let i = 0; i < sections.length; i++) {
        const textValue = sections[i].getAttribute('data-nav');
        const newElement = document.createElement('li');
        newElement.innerHTML = `<a class="menu__link" id="link${i}">${textValue}</a>`;
        navFrag.appendChild(newElement);
        navBarLinks[i] = navFrag.getElementById('link'+i);
    }
    
    navBarList.appendChild(navFrag);
}




// create the click events for the link using event delegation to improve performance
function buildEventListeners () {
    navBarList.addEventListener("click", (event) => {
        
        if(event.target.nodeName === "A") {
            event.preventDefault();
            let section = sections[navBarLinks.indexOf(event.target)];

            // Set sections as active
            activate(section);
            
            // Scroll to section on link click
            goToSection(section);
            
        }
    });
}


// run
mainFunction();