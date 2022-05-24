import { v4 as uuidv4 } from "uuid";
import { colorClasses } from "../data-state";
import { appendChildren, createElement } from "../helpers";

export class Task {
  constructor({
    desc,
    board,
    projectID,
    order,
    color,
    urgency,
    tags,
    details,
    createdBy,
    assignedTo,
    id,
  }) {
    this.desc = desc;
    this.details = details;
    this.board = board;
    this.projectID = projectID;
    this.createdBy = createdBy;
    this.assignedTo = assignedTo || createdBy;
    this.order = order || null;
    this.color = color || "color-1";
    this.urgency = urgency || "low";
    this.tags = tags || [];
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

  get getDetails() {
    return this.details;
  }

  set setDetails(newDetails) {
    this.details = newDetails;
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
    if (this.urgency === "low") {
      this.color = "color-1";
    } else if (this.urgency === "med") {
      this.color = "color-2";
    } else if (this.urgency === "high") {
      this.color = "color-3";
    }
    if (this.board === "completed") {
      this.color = "color-4";
    }
    return this.color;
  }

  set setColor(newColor) {
    this.color = newColor;
  }

  get getUrgency() {
    return this.urgency;
  }

  set setUrgency(newUrgency) {
    this.urgency = newUrgency;
  }

  get getTaskID() {
    return this.taskID;
  }

  get getProjectID() {
    return this.projectID;
  }

  instTaskObject() {
    const task = createElement(
      "li",
      ["list__item", `${this.board}__item`, `${this.getColor}`],
      {
        draggable: "true",
      }
    );
    task.dataset.taskID = this.taskID;
    task.dataset.board = this.board;
    task.dataset.color = this.getColor;

    // const taskBody = `<p class="list__item__desc ${this.board}__item__desc" placeholder="enter task">${this.desc}</p>
    //   <p class="list__item__details hide" contenteditable="false">${this.details}</p>
    //   <button class="list__item__btn list__item__btn__details">Details</button>
    //   <button class="list__item__btn list__item__edit ${this.board}__edit">Edit</button>
    //   <div class="list__item__color__container hide">
    //     <button class="list__item__color__btn color-btn-1 color-1" data-urgency="low">low</button>
    //     <button class="list__item__color__btn color-btn-2 color-2" data-urgency="med">medium</button>
    //     <button class="list__item__color__btn color-btn-3 color-3" data-urgency="high">high</button>
    //    </div>
    //   <button class="list__item__btn list__item__delete ${this.board}__delete hide">Done</button>`;
    // task.innerHTML = taskBody;


    const taskDesc = createElement(
      "p",
      ["list__item__desc", `${this.board}__item__desc`],
      { placeholder: "enter task" }
    );
    const taskDetails = createElement("p", ["list__item__details", "hide"], {
      contenteditable: "false",
    });
    const deleteBtn = createElement("button", [
      "list__item__btn",
      "list__item__delete",
      `${this.board}__delete`,
      "hide",
    ]);
    const editBtn = createElement("button", [
      "list__item__btn",
      "list__item__edit",
      `${this.board}__edit`,
    ]);
    const detailsButton = createElement("button", [
      "list__item__btn",
      "list__item__btn__details",
    ]);
    const colorButtonContainer = createElement("div", [
      "list__item__color__container",
      "hide",
    ]);
    const colorButton1 = createElement("button", [
      "list__item__color__btn",
      "color-btn-1",
      "color-1",
    ]);
    const colorButton2 = createElement("button", [
      "list__item__color__btn",
      "color-btn-2",
      "color-2",
    ]);
    const colorButton3 = createElement("button", [
      "list__item__color__btn",
      "color-btn-3",
      "color-3",
    ]);
    // const colorButton4 = createElement("button", [
    //   "list__item__color__btn",
    //   "color-btn-4",
    //   "color-4",
    // ]);
    const colorButtons = [colorButton1, colorButton2, colorButton3];
    appendChildren(colorButtonContainer, colorButtons);
    appendChildren(task, [
      taskDesc,
      taskDetails,
      detailsButton,
      editBtn,
      deleteBtn,
    ]);
    task.insertBefore(colorButtonContainer, deleteBtn);

    taskDesc.innerText = this.desc;
    taskDetails.innerText = this.details;
    detailsButton.innerText = "Details";
    deleteBtn.innerText = "Done";
    editBtn.innerText = "Edit";
    colorButton1.innerText = "low";
    colorButton2.innerText = "medium";
    colorButton3.innerText = "high";
    colorButton1.dataset.urgency = "low";
    colorButton2.dataset.urgency = "med";
    colorButton3.dataset.urgency = "high";

    for (let i = 0; i < colorButtons.length; i++) {
      if (
        task.classList.contains(colorClasses[i]) &&
        colorButtons[i].classList.contains(colorClasses[i])
      ) {
        colorButtons[i].classList.add("current__task__color");
      }
    }

    return task;
  }
}
