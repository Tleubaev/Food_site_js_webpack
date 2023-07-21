function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // Табы
  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  // спрятать весь контент
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }
  hideTabContent();

  // показать определенный контент
  function showTabContent(i = 0) {
    // i по умолчанию 0
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");
    tabs[i].classList.add(activeClass);
  }
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target; // что бы постоянно не писать event.target

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      // contains - "содержит ли в себе"
      tabs.forEach((item, i) => {
        if (item == target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;
