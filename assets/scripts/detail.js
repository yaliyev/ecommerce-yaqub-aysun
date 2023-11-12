let checkboxes = document.querySelectorAll('.checkBox');
let money = document.querySelectorAll(".money");


checkboxes.forEach((check, index) => {
  check.addEventListener("click", () => {
    checkboxes.forEach((anotherCheck, anotherIndex) => {
      if (anotherCheck !== check) {
        anotherCheck.classList.remove("selected");
        money[anotherIndex].classList.remove("color");
      }
    });

    check.classList.toggle("selected");
    money[index].classList.toggle("color");
  });


});



let sizeCheck = document.querySelectorAll(".sizeCheck")
sizeCheck.forEach((check) => {
  check.addEventListener("click", () => {
    sizeCheck.forEach((anotherCheck) => {
      if (anotherCheck !== check) {
        anotherCheck.classList.remove("active");
      }
    });

    check.classList.toggle("active");
  });
});


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



let description = document.querySelector(".description")
let reviews = document.querySelector(".reviews")
let firstOrangeLine = document.querySelector(".firstOrangeLine")
let secondOrangeLine = document.querySelector(".secondOrangeLine")
let descriptions = document.querySelector(".descriptions")
let reviewsCon = document.querySelector(".reviewsCon")

description.addEventListener("click", () => {
  description.classList.add("activateDes")
  firstOrangeLine.classList.add("activeLine")
  descriptions.classList.add("activedes")

  reviews.classList.remove("activateDes")
  secondOrangeLine.classList.remove("activeLine")
  reviewsCon.classList.remove("activRev")


})


reviews.addEventListener("click", () => {


  reviews.classList.add("activateDes")
  secondOrangeLine.classList.add("activeLine")
  reviewsCon.classList.add("activRev")

  description.classList.remove("activateDes")
  firstOrangeLine.classList.remove("activeLine")
  descriptions.classList.remove("activedes")

})






