let listGroups = document.querySelectorAll(".listGroup");
let aboutLines = document.querySelectorAll(".aboutLine");


listGroups.forEach((click, index) => {
    click.addEventListener("click", () => {
        listGroups.forEach((anotherCheck, anotherIndex) => {
            if (anotherCheck !== click) {
                anotherCheck.classList.remove("activeList");
                aboutLines[anotherIndex].classList.remove("activeAboutLine");
            }
        });

        click.classList.add("activeList");
        aboutLines[index].classList.add("activeAboutLine");
    });


});