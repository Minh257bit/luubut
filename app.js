import {

  db,

  collection,

  addDoc,

  deleteDoc,

  doc,

  serverTimestamp,

  query,

  orderBy,

  onSnapshot

}

from './firebase.js';

/* PASSWORD */

const SECRET_PASSWORD = "thuyduong";

/* HIDE MODAL WHEN LOAD */

window.onload = function(){

  document
    .getElementById('passwordModal')
    .classList
    .add('hidden');

}

/* FLOATING FLOWERS */

const floating =
document.getElementById('floating');

setInterval(()=>{

  const flower =
  document.createElement('div');

  flower.className = 'flower';

  const icons =
  ['🌸','✨','💖','🌷'];

  flower.innerText =
  icons[Math.floor(Math.random()*icons.length)];

  flower.style.left =
  Math.random()*100 + 'vw';

  flower.style.animationDuration =
  (6 + Math.random()*8) + 's';

  flower.style.fontSize =
  (18 + Math.random()*18) + 'px';

  floating.appendChild(flower);

  setTimeout(()=>{
    flower.remove();
  },14000);

},700);

/* SEND */

window.sendMessage = async function(){

  const name =
  document.getElementById('name').value.trim();

  const message =
  document.getElementById('message').value.trim();

  if(!name || !message){

    alert("Nhập đầy đủ nhé 🌸");

    return;
  }

  await addDoc(

    collection(db,'messages'),

    {

      name,

      message,

      createdAt:serverTimestamp()

    }

  );

  document.getElementById('name').value = "";

  document.getElementById('message').value = "";

  alert("💖 Đã gửi vào lưu bút");

}

/* OPEN */

window.openVault = function(){

  document
    .getElementById('passwordModal')
    .classList
    .remove('hidden');

}

/* CLOSE */

window.closeModal = function(){

  document
    .getElementById('passwordModal')
    .classList
    .add('hidden');

}

/* CHECK PASSWORD */

window.checkPassword = function(){

  const password =
  document.getElementById('passwordInput').value;

  if(password !== SECRET_PASSWORD){

    alert("❌ Sai mật khẩu");

    return;
  }

  document
    .getElementById('passwordModal')
    .classList
    .add('hidden');

  document
    .getElementById('vault')
    .classList
    .remove('hidden');

  loadMessages();

}

/* LOAD */

function loadMessages(){

  const list =
  document.getElementById('messages');

  const q = query(

    collection(db,'messages'),

    orderBy('createdAt','desc')

  );

  onSnapshot(q,(snapshot)=>{

    list.innerHTML = "";

    snapshot.forEach((docItem)=>{

      const data = docItem.data();

      const card =
      document.createElement('div');

      card.className =
      "card glass";

      card.innerHTML = `

        <button
          class="delete-btn"
          onclick="deleteMessage('${docItem.id}')"
        >
          ✕
        </button>

        <div class="card-name">
          🌸 ${escapeHTML(data.name)}
        </div>

        <div class="card-message">
          ${escapeHTML(data.message)}
        </div>

        <div class="card-time">
          ✨ ${formatDate(data.createdAt?.toDate())}
        </div>

      `;

      list.appendChild(card);

    });

  });

}

/* DELETE */

window.deleteMessage = async function(id){

  const ok =
  confirm("Xóa lưu bút này?");

  if(!ok) return;

  await deleteDoc(
    doc(db,'messages',id)
  );

}

/* DATE */

function formatDate(date){

  if(!date) return "vừa xong";

  return date.toLocaleString('vi-VN');

}

/* SECURITY */

function escapeHTML(str){

  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/\"/g,'&quot;')
    .replace(/'/g,'&#039;');

}