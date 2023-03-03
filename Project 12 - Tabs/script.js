"use strict";

//Content to be loaded to the HTML using vanilla javascript
const tabsheader = [
  {
    id: 1,
    title: "History",
    data: "I'm baby wolf pickled schlitz try-hard normcore marfa man bun mumblecore vice pop-up XOXO lomo kombucha glossier bicycle rights. Umami kinfolk salvia jean shorts offal venmo. Knausgaard tilde try-hard, woke fixie banjo man bun. Small batch tumeric mustache tbh wayfarers 8-bit shaman chartreuse tacos. Viral direct trade hoodie ugh chambray, craft beer pork belly flannel tacos single-origin coffee art party migas plaid pop-up.",
  },
  {
    id: 2,
    title: "Vision",
    data: "Man bun PBR&B keytar copper mug prism, hell of helvetica. Synth crucifix offal deep v hella biodiesel. Church-key listicle polaroid put a bird on it chillwave palo santo enamel pin, tattooed meggings franzen la croix cray. Retro yr aesthetic four loko tbh helvetica air plant, neutra palo santo tofu mumblecore. Hoodie bushwick pour-over jean shorts chartreuse shabby chic. Roof party hammock master cleanse pop-up truffaut, bicycle rights skateboard affogato readymade sustainable deep v live-edge schlitz narwhal. List Item List item List Item",
  },
  {
    id: 3,
    title: "Goals",
    data: "Chambray authentic truffaut, kickstarter brunch taxidermy vape heirloom four dollar toast raclette shoreditch church-key. Poutine etsy tote bag, cred fingerstache leggings cornhole everyday carry blog gastropub. Brunch biodiesel sartorial mlkshk swag, mixtape hashtag marfa readymade direct trade man braid cold-pressed roof party. Small batch adaptogen coloring book heirloom. Letterpress food truck hammock literally hell of wolf beard adaptogen everyday carry. Dreamcatcher pitchfork yuccie, banh mi salvia venmo photo booth quinoa chicharrones.",
  },
];

//Button Selection
const allBtns = document.querySelectorAll(".tabs-title");
const tabsHeading = document.querySelector("#tabs-heading");
const tabsData = document.querySelector("#tabs-data");

allBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    let currentBtn = event.target.classList;
    if (currentBtn.contains("history-tab")) {
      tabsHeading.innerHTML = tabsheader[0].title;
      tabsData.innerHTML = tabsheader[0].data;
    }
    if (currentBtn.contains("vision-tab")) {
      tabsHeading.innerHTML = tabsheader[1].title;
      tabsData.innerHTML = tabsheader[1].data;
    }
    if (currentBtn.contains("goals-tab")) {
      tabsHeading.innerHTML = tabsheader[2].title;
      tabsData.innerHTML = tabsheader[2].data;
    }
  });
});
