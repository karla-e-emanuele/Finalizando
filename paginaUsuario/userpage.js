
document.addEventListener("DOMContentLoaded", function () {

    const nome = document.querySelector(".profile-name");
    const bio = document.querySelector(".profile-bio");
    const editBtn = document.querySelector(".edit-btn");
    const logoutBtn = document.querySelector(".logout-btn");
  

    editBtn.addEventListener("click", function () {
      let novoNome = prompt("Digite seu nome:");
      let novaBio = prompt("Digite sua bio:");
  
      if (novoNome) {
        nome.textContent = novoNome;
        localStorage.setItem("nome", novoNome);
      }
  
      if (novaBio) {
        bio.textContent = novaBio;
        localStorage.setItem("bio", novaBio);
      }
    });
  

    if (localStorage.getItem("nome")) {
      nome.textContent = localStorage.getItem("nome");
    }
  
    if (localStorage.getItem("bio")) {
      bio.textContent = localStorage.getItem("bio");
    }

    logoutBtn.addEventListener("click", function () {
      let confirmar = confirm("Tem certeza que deseja sair?");
      
      if (confirmar) {
        alert("Você saiu!");
        
    
        window.location.href = "../paginalogin/login.html";
      }
    });
  
  });
  document.addEventListener("DOMContentLoaded", function () {

    const profileImg = document.getElementById("profileImg");
    const fileInput = document.getElementById("fileInput");
  
    
    profileImg.addEventListener("click", () => {
      fileInput.click();
    });
  

    fileInput.addEventListener("change", function () {
      const file = this.files[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          const imageData = e.target.result;
  
 
          profileImg.src = imageData;
  

          localStorage.setItem("profileImage", imageData);
        };
  
        reader.readAsDataURL(file);
      }
    });

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      profileImg.src = savedImage;
    }
  
  });
  