const menuData = [
  {
    id: 1,
    title: "Buttermilk Pancake",
    category: "breakfast",
    price: 15.99,
    img: "./Images/item-1.jpeg",
    desc: `I'm baby woke milkshake wolf bitter live-edge blue bottle freegan copper mug whatever cold-pressed.`,
  },
  {
    id: 2,
    title: "dinner double",
    category: "lunch",
    price: 13.99,
    img: "./Images/item-2.jpeg",
    desc: "`vaporware iPhone mumbkecore selvage raw denim slow-carb leggings gochujang helvetiva man braid jiabing. Mafia thundercats.",
  },
  {
    id: 3,
    title: "Godzilla Milkshake",
    category: "shakes",
    price: 6.99,
    img: "./Images/item-3.jpeg",
    desc: "ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.",
  },
  {
    id: 3,
    title: "Country Delight",
    category: "breakfast",
    price: 20.99,
    img: "./Images/item-4.jpeg",
    desc: `Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut`,
  },
  {
    id: 5,
    title: "Egg Attack",
    category: "lunch",
    price: 22.99,
    img: "./Images/item-5.jpeg",
    desc: `franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up `,
  },
  {
    id: 6,
    title: "Oreo Dream",
    category: "shakes",
    price: 18.99,
    img: "./Images/item-6.jpeg",
    desc: `Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday`,
  },
  {
    id: 7,
    title: "Bacon Overflow",
    category: "breakfast",
    price: "8.99",
    img: "./Images/item-7.jpeg",
    desc: `carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird`,
  },
  {
    id: 8,
    title: "American Classic",
    category: "lunch",
    price: "12.99",
    img: "Images/item-8.jpeg",
    desc: `on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut`,
  },
  {
    id: 9,
    title: "Quarantine Buddy",
    category: "shakes",
    price: 16.99,
    img: "./Images/item-9.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
  {
    id: 10,
    title: "Steak Dinner",
    category: "dinner",
    price: 39.99,
    img: "./Images/item-10.jpeg",
    desc: `skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.`,
  },
];

const addMenu = document.querySelector(".div-container");
const menuFilter = document.querySelector(".menu-filter");

//Function to Display the Menu Item
const displayMenuItems = (menuItems) => {
  let displayMenu = menuItems.map((item) => {
    return ` <div class="inside-divs">
        <img src="${item.img}"  class="img" alt="Buttermilk Pancake">
        <div>
            <p>${item.title}</p>
            <p class="value">$${item.price}</p>
        </div>
        <div class="underline"></div>
        <p>
            ${item.desc}
        </p>
    </div>`;
  });
  displayMenu = displayMenu.join(" ");
  addMenu.innerHTML = displayMenu;
};
//Loading of the Menu Data
window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(menuData);
  displayMenuButtons();
});

//Passing in the Buttons for the Menu Dynamically
const displayMenuButtons = () => {
  const categories = menuData.reduce(
    (values, item) => {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );

  const categoriesBtns = categories
    .map((item) => {
      return `
        <button class="btn-filter lunch-btn" type="button" data-id=${item}>${item}</button>
        `;
    })
    .join(" ");
  menuFilter.innerHTML = categoriesBtns;
  const btns = document.querySelectorAll(".btn-filter");

  //Filtering
  btns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const category = event.currentTarget.dataset.id;
      const menuCategory = menuData.filter((menuItems) => {
        if (menuItems.category === category) {
          return menuItems;
        }
      });
      if (category === "all") {
        displayMenuItems(menuData);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
};
