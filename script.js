// 🔷 Store employees
let employees = [];


// 🔷 Add Employee
function addEmployee() {
    let name = document.getElementById("name").value;
    let dept = document.getElementById("department").value;

    if (name === "" || dept === "") {
        alert("Please fill all fields");
        return;
    }

    // 🔥 Automation Rules
    let role = "";
    let status = "Active";

    if (dept === "IT") role = "Developer";
    else if (dept === "HR") role = "HR Manager";
    else if (dept === "Sales") role = "Sales Executive";

    let emp = { name, dept, role, status };

    employees.push(emp);

    // 💾 Save to localStorage
    localStorage.setItem("employees", JSON.stringify(employees));

    displayEmployees();

    // Clear input
    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
}


// 🔷 Display Employees
function displayEmployees() {
    let table = document.getElementById("employeeTable");
    table.innerHTML = "";

    employees.forEach((emp, index) => {
        let row = table.insertRow();

        row.insertCell(0).innerHTML = emp.name;
        row.insertCell(1).innerHTML = emp.dept;
        row.insertCell(2).innerHTML = emp.role;

        // Status button
        row.insertCell(3).innerHTML =
            `<button onclick="toggleStatus(${index})">${emp.status}</button>`;

        // Action buttons
        row.insertCell(4).innerHTML =
            `<button onclick="editEmployee(${index})">Edit</button>
             <button onclick="removeEmployee(${index})" style="color:red;">Remove</button>`;
    });

    updateStats();
}


// 🔷 Remove Employee
function removeEmployee(index) {
    employees.splice(index, 1);

    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees();
}


// 🔷 Toggle Status
function toggleStatus(index) {
    if (employees[index].status === "Active") {
        employees[index].status = "Inactive";
    } else {
        employees[index].status = "Active";
    }

    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees();
}


// 🔷 Edit Employee
function editEmployee(index) {
    document.getElementById("name").value = employees[index].name;
    document.getElementById("department").value = employees[index].dept;

    employees.splice(index, 1);

    localStorage.setItem("employees", JSON.stringify(employees));
    displayEmployees();
}


// 🔷 Update Statistics
function updateStats() {
    let total = employees.length;
    let active = 0;
    let inactive = 0;

    employees.forEach(emp => {
        if (emp.status === "Active") active++;
        else inactive++;
    });

    document.getElementById("total").innerText = total;
    document.getElementById("active").innerText = active;
    document.getElementById("inactive").innerText = inactive;
}


// 🔷 Load Data When Page Opens
window.onload = function () {
    let data = localStorage.getItem("employees");

    if (data) {
        employees = JSON.parse(data);
        displayEmployees();
    }
};
let chart;

function renderChart() {
    let active = 0;
    let inactive = 0;

    employees.forEach(emp => {
        if (emp.status === "Active") active++;
        else inactive++;
    });

    let ctx = document.getElementById("employeeChart").getContext("2d");

    // Destroy old chart (important)
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Active", "Inactive"],
            datasets: [{
                data: [active, inactive],
                backgroundColor: ["green", "gray"]
            }]
        }
    });
}
function searchEmployee() {
    let input = document.getElementById("search").value.toLowerCase();
    let rows = document.getElementById("employeeTable").rows;

    for (let i = 0; i < rows.length; i++) {
        let name = rows[i].cells[0].innerText.toLowerCase();
        let dept = rows[i].cells[1].innerText.toLowerCase();

        if (name.includes(input) || dept.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}