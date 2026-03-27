export class TaskPage {
  constructor(page) {
    this.page = page;
    this.buttonTask = page.getByRole("button", { name: "+ Add New Task" });
    this.inputTitle = page.locator("#task-form-title");
    this.inputDescription = page.locator("#task-form-description");
    this.selectStatus = page.locator("#task-form-status");
    this.buttonCreate = page.getByRole("button", { name: "Create Task" });
    this.inputSearch = page.getByPlaceholder("Search tasks...");
    this.buttonDelete = page.getByRole("button");
    this.selectAPI = page.locator("#api-version");
    this.buttonLogin = page
      .locator(".modal-actions")
      .getByRole("button", { name: "Login" });
    this.liTaskManagerSPA = page.locator(".nav-links li:nth-of-type(3)");
    this.inputUsername = page.locator("#username");
    this.inputPassword = page.locator("#password");
  }

  async clickAddTask() {
    await this.buttonTask.click();
  }

  async filloutTaskInformation(title, desc, statusName) {
    await this.inputTitle.type(title);
    await this.inputDescription.type(desc);
    await this.selectStatus.click();
    await this.selectStatus.selectOption(statusName);
    await this.buttonCreate.click();
  }

  async searchTaskByName(taskTitle) {
    await this.inputSearch.type(taskTitle);
    await this.inputSearch.press("Enter");
  }

  async clickTaskManagerSPA() {
    await this.liTaskManagerSPA.click();
  }

  async clickAPI(authMethod) {
    await this.selectAPI.click();

    await this.selectAPI.selectOption(authMethod);
  }

  async clickLogin() {
    await this.buttonLogin.click();
  }

  async enterLoginInformation(username, password) {
    await this.page.waitForSelector("#username");
    await this.page.waitForSelector("#password");

    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
  }
}
