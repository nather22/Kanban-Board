import {
  mainContainerElement,
  ProjectsListElement,
  rootElement,
} from "../dom-state";
import {
  currentProject,
  projectMenuTimer,
  projects,
  setProjectMenuTimer,
} from "../data-state";

import {
  addProject,
  deleteCurrentProject,
  updateCurrentProject,
  updateExistingCurrentProject,
} from "../data-handlers";
import {
  clearProjectAlert,
  createProjectDeleteAlert,
  removeAlert,
  renderAddProjectModal,
  renderNewCurrentProject,
  renderProjectAlert,
  renderProjects,
  renderProjectSettingsModal,
  renderTasks,
  renderTempAlert,
  setInitialState,
  updateTitleText,
} from "../dom-handlers";
import { animateAndDelete, animateElement, getProjectIndex, insertAfter } from "../helpers";

export function showProjectsButtonClick() {
  ProjectsListElement.classList.toggle("hide");
}

export function projectFocusOut() {
  let timeout = setTimeout(() => ProjectsListElement.classList.add("hide"), 0);
  setProjectMenuTimer(timeout);
}

export function projectFocusIn() {
  clearTimeout(projectMenuTimer);
}

export function projectModalTitleInputChange(element) {
  updateTitleText(element);
  console.log("sdfdsfds");
}

export function projectClickEvent(element) {
  const index = getProjectIndex(element.dataset.projectId);
  const newCurrent = projects[index];
  renderNewCurrentProject(newCurrent);
  updateCurrentProject(newCurrent);
  renderTasks();
}

export function toggleProjectModalClickEvent(element) {
  let modal = document.querySelector(".projects__modal");
  if (!modal) {
    if (element.classList.contains("projects__container__add__new__button")) {
      renderAddProjectModal();
      clearProjectAlert();
    } else if (
      element.classList.contains("projects__container__settings__button")
    ) {
      if (currentProject){
      renderProjectSettingsModal();
      clearProjectAlert();
      } else {
        renderTempAlert("Choose or add a project to edit settings");
      }
    }
  } else {
    animateAndDelete(modal, 250);
  }
}

export function updateCurrentProjectClickEvent() {
  const projectTitle = document.querySelector(".projects__modal__title");
  const ProjectModalTitleInput = document.querySelector(
    ".projects__modal__title__input"
  );
  const projName = ProjectModalTitleInput.value;
  if (projName.length && projName != projectTitle) {
    updateExistingCurrentProject(projName);
    renderNewCurrentProject(currentProject);
    renderProjects();
    toggleProjectModalClickEvent();
  }
}

export function deleteCurrentProjectClickEvent() {
  deleteCurrentProject();
  currentProject ? renderNewCurrentProject(currentProject) : setInitialState();
  renderProjects();
  toggleProjectModalClickEvent();
  removeAlert();
}

export function showDeleteProjectAlert() {
  const alert = createProjectDeleteAlert(
    "Are you sure you want to delete the project?"
  );
  rootElement.appendChild(alert);
  animateElement(alert, 'fadein', 250);
}

export function addProjectClickEvent() {
  const ProjectModalTitleInput = document.querySelector(
    ".projects__modal__title__input"
  );
  const projName = ProjectModalTitleInput.value;
  if (projName.length) {
    const newProj = addProject(projName);
    renderNewCurrentProject(newProj);
    updateCurrentProject(newProj);
    renderProjects();
    renderTasks();
    toggleProjectModalClickEvent();
    mainContainerElement.classList.remove("hide");
    return;
  }
  const alert = renderProjectAlert("must enter a project name");
  insertAfter(alert, ProjectModalTitleInput);
}
