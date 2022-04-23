import { v4 as uuidv4 } from "uuid";
import { colorClasses } from "../data-state";
import { appendChildren, createElement } from "../helpers";

export class Task {
  constructor({desc, board, projectID, order, color, id}) {
    this.desc = desc;
    this.board = board;
    this.projectID = projectID;
    this.order = order || null;
    this.color = color || 'color-1';
    this.taskID = id || uuidv4();
    this.removeStandby = false;
  }

  get getBoard() {
    return this.board;
  }

  set setBoard(newBoard) {
    this.board = newBoard;
  }

  get getDesc() {
    return this.desc;
  }

  set setDesc(newDesc) {
    this.desc = newDesc;
  }

  get getRemoveStandby() {
    return this.removeStandby;
  }
  
  set setRemoveStandby(newState) {
    this.removeStandby = newState;
  }

  get getOrder() {
    return this.order;
  }

  set setOrder(newOrder) {
    this.order = newOrder; 
  }

  get getColor() {
    return this.color;
  }

  set setColor(newColor) {
    this.color = newColor;
  }

  get getTaskID() {
    return this.taskID;
  }

  get getProjectID() {
    return this.projectID;
  }

  renderTask() {
    const task = createElement("li", ["list__item", `${this.board}__item`, `${this.color}`], {
      draggable: "true"
    });
    const taskDesc = createElement(
      "p",
      ["list__item__desc", `${this.board}__item__desc`],
      { placeholder: "enter task" }
    );
    const deleteBtn = createElement("button", [
      "list__item__btn",
      "list__item__delete",
      `${this.board}__delete`,
      "hide"
    ]);
    const editBtn = createElement("button", [
      "list__item__btn",
      "list__item__edit",
      `${this.board}__edit`
    ]);
    const colorButtonContainer = createElement(
      "div",
      ["list__item__color__container",
      "hide"]
    );
    const colorButton1 = createElement("button", [
      "list__item__color__btn",
      "color-btn-1",
      "color-1"
    ]);
    const colorButton2 = createElement("button", [
      "list__item__color__btn",
      "color-btn-2",
      "color-2"
    ]);
    const colorButton3 = createElement("button", [
      "list__item__color__btn",
      "color-btn-3",
      "color-3"
    ]);
    const colorButton4 = createElement("button", [
      "list__item__color__btn",
      "color-btn-4",
      "color-4"
    ]);
    const colorButtons = [
      colorButton1,
      colorButton2,
      colorButton3,
      colorButton4
    ]
    appendChildren(colorButtonContainer, colorButtons);
    appendChildren(task, [taskDesc, editBtn, deleteBtn]);
    task.insertBefore(colorButtonContainer, deleteBtn);
    
    task.dataset.taskID = this.taskID;
    task.dataset.board = this.board;
    taskDesc.innerText = this.desc;
    deleteBtn.innerText = "Done";
    editBtn.innerText = "Edit";

    for(let i=0; i<colorClasses.length; i++) {
      if(task.classList.contains(colorClasses[i]) && colorButtons[i].classList.contains(colorClasses[i])){
        colorButtons[i].classList.add('current__task__color')
      }
    }

    return task;
  }
}
