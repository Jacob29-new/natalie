let concertData = []

incrementCount()
getYears()


fetchAll()

function fetchAll() {
    for (let i = 2000; i <= 2030; i++) {
        fetchItems(i)
    }
}

function renderItems(year) {
    concertData.forEach(element => {

        const tab = document.getElementById(`tab-${year}-content`);

        const mainDiv = document.createElement("div");

        const header = document.createElement("div")
        const date = document.createElement("div")
        const location = document.createElement("div")
        const program = document.createElement("div")

        header.innerText = element.name
        date.innerText = element.date
        location.innerText = element.location
        program.innerText = element.program

        mainDiv.appendChild(header)
        mainDiv.appendChild(date)
        mainDiv.appendChild(location)
        mainDiv.appendChild(program)

        mainDiv.style.display = "flex"
        mainDiv.style.flexDirection = "column"
        date.style.fontStyle = 'italic';

        mainDiv.classList.add("concert-item")
        header.classList.add("concert-heading")

        tab.appendChild(mainDiv);
    });
}

function createNewYear(year) {

        const newInput = document.createElement('input');
        newInput.type = 'radio';
        newInput.name = 'concert-tabs';
        newInput.id = `tab-${year}`;

        const newLabel = document.createElement('label');
        newLabel.className = 'biotext';
        newLabel.setAttribute('for', `tab-${year}`);
        newLabel.textContent = year;
        
        const newContent = document.createElement('div');
        newContent.className = 'concert-tab-content';
        newContent.id = `tab-${year}-content`;
        
        const firstInput = document.querySelector('#tab-upcoming');
        const concertTabs = document.querySelector('.concert-tabs');
        
        concertTabs.insertBefore(newContent, firstInput);
        concertTabs.insertBefore(newLabel, firstInput);
        concertTabs.insertBefore(newInput, firstInput);
}

function incrementCount() {
    fetch("http://localhost:3000/increment", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
    }).then(data => data.json())
       .then(resp => {
            console.log(resp.data)
    })
}

function getYears() {
    fetch("http://localhost:3000/getyear", {
        method: "GET",
        headers: { "Content-Type":"application/json" },
    }).then(data => data.json())
       .then(resp => {
            renderYears(resp.years)
            console.log("this are the years youre looking for", resp.years)
    })
}

function renderYears(years = []) {
    console.log("I'm inside renderYears in main.js");
    const concertTabs = document.querySelector('.concert-tabs');

    const sortedYears = years.slice().sort((a, b) => Number(b.year) - Number(a.year));
    
    sortedYears.forEach(yearObj => {
        const year = yearObj.year;

        const newInput = document.createElement('input');
        newInput.type = 'radio';
        newInput.name = 'concert-tabs';
        newInput.id = `tab-${year}`;

        const newLabel = document.createElement('label');
        newLabel.className = 'biotext';
        newLabel.setAttribute('for', `tab-${year}`);
        newLabel.textContent = year;

        const newContent = document.createElement('div');
        newContent.className = 'concert-tab-content';
        newContent.id = `tab-${year}-content`;

        concertTabs.appendChild(newInput); 
        concertTabs.appendChild(newLabel);
        concertTabs.appendChild(newContent); 
    });
}



function fetchItems(year) {
    
    const data = { year }

    fetch("http://localhost:3000/load", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(data),
    }).then(data => data.json())
       .then(resp => {
            concertData = ""
            console.log(resp.data)
            concertData = resp.data;
            console.log(`This is ${year} data: `, concertData)
            renderItems(year)
    })
}

function createElements() {

}

function main() {

    (function () {
       'use strict';
    
    
         $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
          event.preventDefault();
          $(this).ekkoLightbox();
      });
    
    
       /* ==============================================
          Testimonial Slider
          =============================================== */ 
    
          $('a.page-scroll').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top - 40
                }, 900);
                return false;
              }
            }
          });
    
        /*====================================
        Show Menu on Book
        ======================================*/
        $(window).bind('scroll', function() {
            var navHeight = $(window).height() - 100;
            if ($(window).scrollTop() > navHeight) {
                $('.navbar-default').addClass('on');
            } else {
                $('.navbar-default').removeClass('on');
            }
        });
    
        $('body').scrollspy({ 
            target: '.navbar-default',
            offset: 80
        })
    
          $(document).ready(function() {
            $("#albums").owlCarousel({
           
                navigation : true, // Show next and prev buttons
                slideSpeed : 200,
                paginationSpeed : 300,
                autoHeight : true,
                itemsCustom : [
                            [0, 1],
                            [450, 2],
                            [600, 2],
                            [700, 2],
                            [1000, 4],
                            [1200, 4],
                            [1400, 4],
                            [1600, 4]
                          ],
            });
    
            $("#clients").owlCarousel({
           
                navigation : false, // Show next and prev buttons
                slideSpeed : 300,
                paginationSpeed : 400,
                autoHeight : true,
                itemsCustom : [
                            [0, 1],
                            [450, 2],
                            [600, 2],
                            [700, 2],
                            [1000, 4],
                            [1200, 5],
                            [1400, 5],
                            [1600, 5]
                          ],
            });
    
          $("#testimonial").owlCarousel({
            navigation : false, // Show next and prev buttons
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem:true
            });
    
          });
    
      
    
          /*====================================
        Portfolio Isotope Filter
        ======================================*/
        $(window).load(function() {
            var $container = $('#lightbox');
            $container.isotope({
                filter: '*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            $('.cat a').click(function() {
                $('.cat .active').removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });
    
        });
    
    
    
    }());
    
    
    }
    main();