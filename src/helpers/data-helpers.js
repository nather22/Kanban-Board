import { projects, tasks } from "../data-state";

export const getProjectIndex = (projID) => {
  for (let proj of projects) {
    console.log(proj)
    if (proj.getID === projID) {
      return projects.indexOf(proj);
    }
  }
  console.error("project not found");
};

export const getTaskObjectIndex = (id) => {
  let taskObject = tasks.filter((task) => task.getTaskID.toString() === id);
  taskObject = taskObject[0];
  return tasks.indexOf(taskObject);
};

export const getTaskObjectFromElement = (element) => {
  return tasks.filter(
    (task) => task.getTaskID.toString() === element.dataset.taskID
  )[0];
};

export const getArrayOfProjNames = (objArr) => {
  const arr = [];
  for (let obj of objArr) {
    arr.push(obj.getName);
  }
  return arr;
};

export const getObjectFromPropertyValue = (array, propVal) => {
  for (let i of array) {
    for (let j in i) {
      if (i[j] === propVal) {
        return i;
      }
    }
  }
};
