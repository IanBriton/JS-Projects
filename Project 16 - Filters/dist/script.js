// "use strict";

// const imageFurnitures = [
//   {
//     id: 1,
//     title: "Accent-Chair",
//     img: "./Images/Accent-Chair.jpeg",
//     price: 25.99,
//     category: "Caressa",
//   },
//   {
//     id: 2,
//     title: "Albany-chair",
//     img: "./Images/Albany-chair.jpeg",
//     price: 10.99,
//     category: "Ikea",
//   },
//   {
//     id: 3,
//     title: "Albany-sectional",
//     img: "./Images/Albany-sectional.jpeg",
//     price: 79.99,
//     category: "Marcos",
//   },
//   {
//     id: 4,
//     title: "Modern-bookshelf",
//     img: "./Images/Modern-bookshelf.jpg",
//     price: 8.99,
//     category: "Marcos",
//   },
//   {
//     id: 5,
//     title: "Utopia",
//     img: "./Images/Utopia-sofa.jpg",
//     price: 39.95,
//     category: "Marcos",
//   },
//   {
//     id: 6,
//     title: "Wooden-Table",
//     img: "./Images/Wooden-Table.jpg",
//     price: 45.99,
//     category: "Caressa",
//   },
//   {
//     id: 7,
//     title: "Dining-Table",
//     img: "./Images/Dining-table.jpg",
//     price: 6.99,
//     category: "Caressa",
//   },
//   {
//     id: 8,
//     title: "sofaset",
//     img: "./Images/sofaset.jpeg",
//     price: 69.99,
//     category: "Liddy",
//   },
//   {
//     id: 9,
//     title: "High-Back-Bench",
//     img: "./Images/High-Back-Bench.jpeg",
//     price: 9.99,
//     category: "Ikea",
//   },
//   {
//     id: 10,
//     title: "Emperor-bed",
//     img: "./Images/Emperor-bed.jpg",
//     price: 21.99,
//     category: "Liddy",
//   },
//   {
//     id: 11,
//     title: "Entertainment-center",
//     img: "./Images/Entertainment-center.jpg",
//     price: 29.09,
//     category: "Liddy",
//   },
//   {
//     id: 12,
//     title: "Leather-sofa",
//     img: "./Images/Leather-sofa.jpg",
//     price: 9.99,
//     category: "Liddy",
//   },
// ];

// const furnitureContainer = document.querySelector(".main__image-container");
// const btns = document.querySelectorAll(".menu__nav-item");

// const displayImages = (items) => {
//   let displayImage = items
//     .map((item) => {
//       return `<img src="${item.img}" alt="" />
//     <h3 id="title">${item.title}</h3>
//     <p id="price">${item.price}</p>`;
//     })
//     .join("");

//   furnitureContainer.innerHTML = displayImage;
// };

// window.addEventListener("DOMContentLoaded", () => {
//   displayImages(imageFurnitures);
// });

// btns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     console.log("Button clicked");
//   });
// });
