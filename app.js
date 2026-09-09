const animals = [
  {id:"luna",name:"Luna",type:"cachorro",sex:"Fêmea",age:"2 anos",size:"Médio",status:"Disponível",image:"https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=88",tags:["Carinhosa","Tranquila","Brincalhona"],story:"Luna foi encontrada na rua, sozinha e assustada. Hoje está segura e esperando uma família que possa oferecer cuidado, segurança e carinho."},
  {id:"thor",name:"Thor",type:"cachorro",sex:"Macho",age:"1 ano",size:"Grande",status:"Em avaliação",image:"https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=88",tags:["Brincalhão","Dócil"],story:"Thor é cheio de energia e adora companhia. Está passando pelo processo de avaliação para encontrar uma família compatível."},
  {id:"mel",name:"Mel",type:"gato",sex:"Fêmea",age:"8 meses",size:"Pequena",status:"Disponível",image:"https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=88",tags:["Tranquila","Carinhosa"],story:"Mel é uma gatinha jovem e delicada, procurando um lar seguro onde possa crescer cercada de carinho."},
  {id:"simba",name:"Simba",type:"gato",sex:"Macho",age:"3 anos",size:"Médio",status:"Lar temporário",image:"https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=900&q=88",tags:["Dócil","Calmo"],story:"Simba está em um lar temporário e precisa de uma família definitiva para continuar seu recomeço."},
  {id:"nina",name:"Nina",type:"gato",sex:"Fêmea",age:"5 meses",size:"Pequena",status:"Disponível",image:"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=900&q=88",tags:["Filhote","Curiosa"],story:"Nina é uma filhote curiosa e carinhosa. Procura uma família preparada para acompanhar todas as fases do seu crescimento."},
  {id:"bob",name:"Bob",type:"cachorro",sex:"Macho",age:"2 anos",size:"Médio",status:"Adotado",image:"https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=88",tags:["Final feliz"],story:"Bob já encontrou seu lar. Esta história fica aqui para lembrar que a adoção responsável funciona."}
];

const grid = document.querySelector("#animalGrid");
const empty = document.querySelector("#emptyState");
const search = document.querySelector("#animalSearch");
const select = document.querySelector("#animalSelect");
let currentFilter = "todos";

function statusClass(status){
  return status.toLowerCase().replaceAll(" ","-").replace("ã","a");
}
function renderAnimals(){
  const q = search.value.trim().toLowerCase();
  const visible = animals.filter(a =>
    (currentFilter==="todos" || a.type===currentFilter) &&
    (a.name.toLowerCase().includes(q) || a.tags.join(" ").toLowerCase().includes(q))
  );
  grid.innerHTML = visible.map(a => `
    <article class="animal-card">
      <div class="animal-image">
        <img src="${a.image}" alt="${a.name}" loading="lazy">
        <span class="animal-status">${a.status}</span>
      </div>
      <div class="animal-body">
        <div class="animal-top"><h3>${a.name} ${a.sex==="Fêmea"?"♀":"♂"}</h3></div>
        <div class="meta">${a.age} • ${a.sex} • Porte ${a.size}</div>
        <div class="tags">${a.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
        <button class="card-action" data-animal="${a.id}">Conhecer a história →</button>
      </div>
    </article>`).join("");
  empty.hidden = visible.length !== 0;
}
function renderSelect(){
  select.innerHTML = `<option value="">Selecione...</option>` +
    animals.filter(a=>a.status!=="Adotado").map(a=>`<option value="${a.name}">${a.name}</option>`).join("");
}
document.querySelectorAll(".filter").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter=btn.dataset.filter;
    renderAnimals();
  });
});
search.addEventListener("input",renderAnimals);

const modal = document.querySelector("#animalModal");
const modalContent = document.querySelector("#modalContent");
document.addEventListener("click", e=>{
  const btn=e.target.closest("[data-animal]");
  if(!btn)return;
  const a=animals.find(x=>x.id===btn.dataset.animal);
  if(!a)return;
  modalContent.innerHTML=`
    <div class="modal-inner">
      <div class="modal-image"><img src="${a.image}" alt="${a.name}"></div>
      <div class="modal-copy">
        <span class="eyebrow green">${a.status.toUpperCase()}</span>
        <h2>${a.name} ${a.sex==="Fêmea"?"♀":"♂"}</h2>
        <div class="tags">${a.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
        <p>${a.story}</p>
        <p><strong>Idade:</strong> ${a.age}<br><strong>Porte:</strong> ${a.size}<br><strong>Sexo:</strong> ${a.sex}</p>
        ${a.status==="Adotado"
          ? `<span class="pill">Final feliz ♥</span>`
          : `<a class="button button-primary wide" href="#adocao" onclick="closeAnimalModal();setTimeout(()=>document.querySelector('#animalSelect').value='${a.name}',100)">Tenho interesse na ${a.name}</a>`}
      </div>
    </div>`;
  modal.showModal();
});
function closeAnimalModal(){modal.close()}
document.querySelector(".modal-close").addEventListener("click",closeAnimalModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeAnimalModal()});

const toast=document.querySelector("#toast");
function showToast(msg){
  toast.textContent=msg;toast.classList.add("show");
  clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove("show"),3600);
}
document.querySelectorAll("[data-toast]").forEach(el=>el.addEventListener("click",()=>showToast(el.dataset.toast)));

document.querySelector("#shareButton").addEventListener("click",async()=>{
  const data={title:"Um Lar Pra Eles",text:"Conheça os animais esperando um lar.",url:location.href};
  try{
    if(navigator.share) await navigator.share(data);
    else {await navigator.clipboard.writeText(location.href);showToast("Link copiado.");}
  }catch(e){}
});

document.querySelector("#adoptionForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.currentTarget));
  localStorage.setItem("umLarUltimoInteresse",JSON.stringify({...data,createdAt:new Date().toISOString()}));
  showToast("Interesse registrado neste protótipo. No site real, os dados irão para o painel/WhatsApp.");
  e.currentTarget.reset();
});

const menu=document.querySelector(".menu-toggle");
const mobile=document.querySelector(".mobile-nav");
menu.addEventListener("click",()=>{
  const open=menu.getAttribute("aria-expanded")==="true";
  menu.setAttribute("aria-expanded",String(!open));mobile.hidden=open;
});
mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{menu.setAttribute("aria-expanded","false");mobile.hidden=true}));

renderAnimals();renderSelect();
