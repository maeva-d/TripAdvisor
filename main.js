document.addEventListener("DOMContentLoaded", () => {
  //   const header = document.querySelector("header");
  const connect = document.querySelector(".connect");
  const modal = document.querySelector(".modal");
  const body = document.querySelector("body");
  const closeForm = document.querySelector(".fa-solid.fa-xmark");
  const form = document.querySelector("#contact");

  // Add bottom border on header when scrolling down
  window.addEventListener("scroll", () => {
    if (window.scrollY !== 0) {
      header.classList.add("bordered");
    } else {
      header.classList.remove("bordered");
    }
  });

  // When the button "connectez-vous" is clicked
  connect.addEventListener("click", () => {
    modal.classList.remove("hidden");
    body.classList.add("disable");
  });

  // When the cross on the modal is clicked
  closeForm.addEventListener("click", () => {
    modal.classList.add("hidden");
    body.classList.remove("disable");
  });
  ////
  // FRONT PART
  const link =
    "https://site--back-end-trip-advisor--rfd99txfpp4t.code.run/contact";
  ////
  form.addEventListener("submit", async (event) => {
    // console.log(event); affiche la cible de l'évenemen (donc ici form) - et pas le BUTTON -
    event.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message,
    };
    try {
      const response = await axios.post(link, data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  });
  //   console.log(form); // affiche le formulaire

  //   const response = await axios.get("http://localhost:3000/");
  //   console.log("response =>", response.data); // response => Bienvenue sur notre back pour form de contact
});

// récupérer les données à la soumission du formulaire
