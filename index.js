console.log("loaded");
let state = {
  orignalEmployees: [], // IS NOT MEANT TO CHANGE
  employees: [], //THIS CAN
  nameSortAsc: false,
  isLoading: false,
};
// Helper
function renderHTML(id, text) {
  document.getElementById(id).innerHTML = text;
}
function renderEmployee(emp) {
  // {id: "1", employee_name: "Tiger Nixon", employee_salary: "320800", employee_age: "61", profile_image: ""}
  return `<div class='emp-card'>
            <h3>${emp.employee_name} <span data-id='${emp.id}' onclick='remove(this)'>remove<span></h3>
            <div class='emp-info'>
              <p>salary: ${emp.employee_salary}</p>
              <p>age: ${emp.employee_age}</p>
            </div>
          </div>`;
}
function remove(element) {
  const idOfUserToRemove = element.dataset.id;
  const { employees } = state;
  state.employees = employees.filter((emp) => emp.id !== idOfUserToRemove);
  render();
}
// Helper/clean up code/ idea keeping my functions doing one thing
function renderEmployees() {
  const { employees, isLoading } = state;
  if (isLoading) {
    return `<div> Loading Emloyees...</div>`;
  }
  if (employees.length === 0) {
    return `<div>No Employees</div>`;
  } else {
    //   empStr = "";
    //   employees.forEach((emp) => {
    //     empStr += `<div>${emp.employee_name}</div>`;
    //   });
    //  return empStr;
    return employees.reduce((empStr, emp) => {
      return empStr + renderEmployee(emp);
    }, "");
  }
}
// function isOverForty(emp) {
//   return emp.employee_age > 40;
// }
function filterOverForty() {
  console.log("clicked");
  const { employees } = state;
  const employeesOverForty = employees.filter((emp) => emp.employee_age > 40);
  state.employees = employeesOverForty;
  render();
}
function reset() {
  const { orignalEmployees } = state;
  state.employees = [...orignalEmployees];
  render();
}
function getEmployees() {
  state.isLoading = true;
  render();
  axios
    .get("http://dummy.restapiexample.com/api/v1/employees")
    .then((response) => {
      state.employees = response.data.data;
      state.orignalEmployees = response.data.data;
      state.isLoading = false;
      console.log(response.data.data);
      render();
    })
    .catch((e) => {
      // reject
      state.isLoading = false;
      console.log(e);
    });
}
function sortByIncome() {
  const { employees } = state;
  employees.sort((emp1, emp2) => {
    return emp2.employee_salary - emp1.employee_salary;
  });
  console.log(employees);
  render();
}
function sortByLastName() {
  const { employees, nameSortAsc } = state;
  if (nameSortAsc) {
    employees.sort((a, b) => {
      if (a.employee_name.split(" ")[1] > b.employee_name.split(" ")[1]) {
        return 1;
      } else if (
        a.employee_name.split(" ")[1] < b.employee_name.split(" ")[1]
      ) {
        return -1;
      } else {
        return 0;
      }
    });
  } else {
    employees.sort((a, b) => {
      if (a.employee_name.split(" ")[1] < b.employee_name.split(" ")[1]) {
        return 1;
      } else if (
        a.employee_name.split(" ")[1] > b.employee_name.split(" ")[1]
      ) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  state.nameSortAsc = !nameSortAsc;
  console.log(state.nameSortAsc);
  render();
}
function render() {
  renderHTML("employees", renderEmployees());
}
render();
axios.get("https://jsonplaceholder.typicode.com/todos").then((r) => {
  console.log(r);
});