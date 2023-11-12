let colorCheck = document.querySelectorAll(".colorCheck")

colorCheck.forEach((check) => {
  check.addEventListener("click", () => {
    colorCheck.forEach((anotherCheck) => {
      if (anotherCheck !== check) {
        anotherCheck.classList.remove("select");
      }
    });

    check.classList.toggle("select");
  });
});