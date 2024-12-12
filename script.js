document.addEventListener("DOMContentLoaded", () => {
   const menu = document.querySelector('.header .menu');
   const menuBtn = document.querySelector('#menu-btn');
   const dorms = ["หอพักทันสมัย", "หอพักราคาประหยัด", "หอพักใกล้มหาวิทยาลัย", "หอพักวิวสวย"];

   // ตรวจสอบว่า menuBtn มีอยู่หรือไม่ก่อนที่จะตั้งค่า
   if (menuBtn) {
      menuBtn.onclick = () => {
         menu.classList.toggle('active');
      }
   }

   window.onscroll = () => {
      if (menu) {
         menu.classList.remove('active');
      }
   }

   document.querySelectorAll('input[type="number"]').forEach(inputNumber => {
      inputNumber.oninput = () => {
         if(inputNumber.value.length > inputNumber.maxLength) inputNumber.value = inputNumber.value.slice(0, inputNumber.maxLength);
      };
   });

   document.querySelectorAll('.view-property .details .thumb .small-images img').forEach(images => {
      images.onclick = () => {
         const src = images.getAttribute('src');
         const bigImage = document.querySelector('.view-property .details .thumb .big-image img');
         if (bigImage) {
            bigImage.src = src;
         }
      }
   });

   document.querySelectorAll('.faq .box-container .box h3').forEach(headings => {
      headings.onclick = () => {
         headings.parentElement.classList.toggle('active');
      }
   });

   function setupAutocomplete(inputId, suggestionsId) {
      const input = document.getElementById(inputId);
      const suggestions = document.getElementById(suggestionsId);

      if (input && suggestions) {
         input.addEventListener("input", () => {
            const query = input.value.toLowerCase();
            suggestions.innerHTML = "";

            if (query) {
               const matches = dorms.filter(dorm => dorm.toLowerCase().includes(query));
               matches.forEach(match => {
                  const li = document.createElement("li");
                  li.textContent = match;
                  li.classList.add("table-cell");
                  li.addEventListener("click", () => {
                     input.value = match;
                     suggestions.innerHTML = "";
                  });
                  suggestions.appendChild(li);
               });
            }
         });

         document.addEventListener("click", (e) => {
            if (!suggestions.contains(e.target) && e.target !== input) {
               suggestions.innerHTML = "";
            }
         });
      }
   }

   setupAutocomplete("dorm-a", "suggestions-a");
   setupAutocomplete("dorm-b", "suggestions-b");
});


// js/script.js

document.addEventListener('DOMContentLoaded', () => {
   // ฟังก์ชันดึงข้อมูลหอพักจาก backend
   fetch('http://localhost:3000/dormitories')
       .then(response => response.json())
       .then(data => {
           const container = document.getElementById('dynamic-listings');
           container.innerHTML = ''; // ล้างข้อมูลเก่า

           data.forEach(dormitory => {
               const box = document.createElement('div');
               box.className = 'box';
               box.innerHTML = `
                   <div class="thumb">
                       <p class="total-images"><i class="far fa-image"></i><span>${dormitory.totalImages || 4}</span></p>
                       <p class="type"><span>${dormitory.type || 'หอพักเดี่ยว'}</span><span>${dormitory.status || 'พร้อมเช่า'}</span></p>
                       <img src="${dormitory.image || 'images/house-img-1.webp'}" alt="">
                   </div>
                   <h3 class="name">${dormitory.name || 'หอพักเอ'}</h3>
                   <p class="location"><i class="fas fa-map-marker-alt"></i><span>${dormitory.location || 'ซอยพุทธบูชา 45'}</span></p>
                   <div class="flex">
                       <p><i class="fas fa-dollar-sign"></i><span>${dormitory.price || '5,000'}/เดือน</span></p>
                       <p><i class="fas fa-ruler-combined"></i><span>${dormitory.size || '25'} ตร.ม.</span></p>
                   </div>
                   <div class="admin">
                       <h3>${dormitory.admin || 'A'}</h3>
                       <div>
                           <p>Admin</p>
                           <span>อัปเดตล่าสุด: ${dormitory.updated || '01-12-2024'}</span>
                       </div>
                   </div>
                   <a href="property.html" class="btn">ดูรายละเอียด</a>
               `;
               container.appendChild(box);
           });
       })
       .catch(error => console.error('Error fetching dormitories:', error));
});


