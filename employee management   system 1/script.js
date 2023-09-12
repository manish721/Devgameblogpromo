// Get the employee list container
const employeeListContainer = document.getElementById('employee-list');

// Get the leave list container
const leaveListContainer = document.getElementById('leave-list');

// Get the add employee form
const addEmployeeForm = document.getElementById('add-employee-form');

// Get the leave application form
const leaveApplicationForm = document.getElementById('leave-application-form');

// Get the search input and search button
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Retrieve employee and leave data from localStorage or initialize an empty array
let employees = JSON.parse(localStorage.getItem('employees')) || [];
let leaves = JSON.parse(localStorage.getItem('leaves')) || [];

// Add event listener for add employee form submit
addEmployeeForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the form input values
  const firstName = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const hireDate = document.getElementById('hire-date').value;
  const lastWorkingDay = document.getElementById('last-working-day').value;
  const experience = document.getElementById('experience').value;
  const age = document.getElementById('age').value;
  const position = document.getElementById('position').value;
  const gender = document.getElementById('gender').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contact').value;
  const salary = document.getElementById('salary').value;
  const password = document.getElementById('password').value;

  // Generate a random schedule for each employee
  const schedule = generateSchedule();

  // Create a new employee object
  const employee = {
    id: generateEmployeeId(),
    firstName,
    lastName,
    hireDate,
    lastWorkingDay,
    experience,
    age,
    position,
    gender,
    email,
    contact,
    salary,
    schedule,
    password
  };

  // Add the employee to the array
  employees.push(employee);

  // Store the updated employee data in localStorage
  localStorage.setItem('employees', JSON.stringify(employees));

  // Clear the form inputs
  addEmployeeForm.reset();

  // Refresh the employee list
  displayEmployees();

  // Show success message
  showMessage('Employee added successfully', 'success-msg');
});

// Add event listener for leave application form submit
leaveApplicationForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the form input values
  const employeeId = document.getElementById('employee-id').value;
  const leaveDate = document.getElementById('leave-date').value;
  const leaveReason = document.getElementById('leave-reason').value;

  // Create a new leave application object
  const leaveApplication = {
    id: generateLeaveId(),
    employeeId,
    leaveDate,
    leaveReason
  };

  // Add the leave application to the array
  leaves.push(leaveApplication);

  // Store the updated leave data in localStorage
  localStorage.setItem('leaves', JSON.stringify(leaves));

  // Clear the form inputs
  leaveApplicationForm.reset();

  // Refresh the leave list
  displayLeaves();

  // Show success message
  showMessage('Leave application submitted successfully', 'success-msg');
});

// Generate a unique employee ID
function generateEmployeeId() {
  return Math.floor(Math.random() * 1000000);
}

// Generate a unique leave ID
function generateLeaveId() {
  return Math.floor(Math.random() * 1000000);
}

// Generate a random schedule for each employee
function generateSchedule() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const schedule = [];

  // Shuffle the days array
  for (let i = days.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [days[i], days[j]] = [days[j], days[i]];
  }

  // Assign days to each employee
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    schedule.push(`${day}: Shift ${i + 1}`);
  }

  return schedule;
}

// Display the employees in the table
function displayEmployees(employeesData = employees) {
  // Clear the employee list container
  employeeListContainer.innerHTML = '';

  // Loop through the employees data and create rows in the table
  employeesData.forEach((employee) => {
    const row = document.createElement('tr');
    row.innerHTML = `
                <td>${employee.id}</td>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.hireDate}</td>
                <td>${employee.lastWorkingDay}</td>
                <td>${employee.experience}</td>
                <td>${employee.age}</td>
                <td>${employee.position}</td>
                <td>${employee.gender}</td>
                <td>${employee.email}</td>
                <td>${employee.contact}</td>
                <td>${employee.salary}</td>
                <td>
                    <button class="edit-btn" onclick="editEmployee(${employee.id})">Edit</button>
                    <button class="delete-btn" onclick="deleteEmployee(${employee.id})">Delete</button>
                    <button class="schedule-btn" onclick="viewSchedule(${employee.id})">Schedule</button>
                    <button class="leave-btn" onclick="applyLeave(${employee.id})">Apply Leave</button>
                </td>
            `;

    employeeListContainer.appendChild(row);
  });
}

// Display the leaves in the table
function displayLeaves() {
  // Clear the leave list container
  leaveListContainer.innerHTML = '';

  // Loop through the leaves data and create rows in the table
  leaves.forEach((leave) => {
    const row = document.createElement('tr');
    row.innerHTML = `
                <td>${leave.id}</td>
                <td>${leave.employeeId}</td>
                <td>${leave.leaveDate}</td>
                <td>${leave.leaveReason}</td>
                <td>
                    <button class="delete-btn" onclick="deleteLeave(${leave.id})">Delete</button>
                </td>
            `;

    leaveListContainer.appendChild(row);
  });
}

// Edit employee details
function editEmployee(employeeId) {
  // Find the employee with the provided ID
  const employee = employees.find((employee) => employee.id === employeeId);

  // Prompt for password
  const password = prompt('Enter your password:');
  if (password === employee.password) {
    // Fill the form inputs with the employee details
    document.getElementById('firstname').value = employee.firstName;
    document.getElementById('lastname').value = employee.lastName;
    document.getElementById('hire-date').value = employee.hireDate;
    document.getElementById('last-working-day').value = employee.lastWorkingDay;
    document.getElementById('experience').value = employee.experience;
    document.getElementById('age').value = employee.age;
    document.getElementById('position').value = employee.position;
    document.getElementById('gender').value = employee.gender;
    document.getElementById('email').value = employee.email;
    document.getElementById('contact').value = employee.contact;
    document.getElementById('salary').value = employee.salary;

    // Remove the employee from the array
    employees = employees.filter((employee) => employee.id !== employeeId);

    // Refresh the employee list
    displayEmployees();

    // Show success message
    showMessage('Employee details updated', 'success-msg');
  } else {
    showMessage('Invalid password', 'warning-msg');
  }
}

// Delete an employee
function deleteEmployee(employeeId) {
  // Find the employee with the provided ID
  const employee = employees.find((employee) => employee.id === employeeId);

  // Prompt for password
  const password = prompt('Enter your password:');
  if (password === employee.password) {
    // Remove the employee from the array
    employees = employees.filter((employee) => employee.id !== employeeId);

    // Store the updated employee data in localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    // Refresh the employee list
    displayEmployees();

    // Show success message
    showMessage('Employee deleted', 'success-msg');
  } else {
    showMessage('Invalid password', 'warning-msg');
  }
}

// Delete a leave application
function deleteLeave(leaveId) {
  // Remove the leave application from the array
  leaves = leaves.filter((leave) => leave.id !== leaveId);

  // Store the updated leave data in localStorage
  localStorage.setItem('leaves', JSON.stringify(leaves));

  // Refresh the leave list
  displayLeaves();

  // Show success message
  showMessage('Leave application deleted', 'success-msg');
}

// View employee schedule
function viewSchedule(employeeId) {
  // Find the employee with the provided ID
  const employee = employees.find((employee) => employee.id === employeeId);

  // Display the schedule for the employee
  const schedule = employee.schedule;
  const scheduleString = schedule.join(', ');
  alert(`Employee Schedule:\n${scheduleString}`);
}

// Apply for leave
function applyLeave(employeeId) {
  // Fill the employee ID input with the selected employee's ID
  document.getElementById('employee-id').value = employeeId;

  // Scroll to the leave application form
  leaveApplicationForm.scrollIntoView({ behavior: 'smooth' });
}

// Display a message on the page
function showMessage(message, className) {
  const messageDiv = document.createElement('div');
  messageDiv.className = className;
  messageDiv.appendChild(document.createTextNode(message));

  // Insert the message before the add employee form
  document.body.insertBefore(messageDiv, addEmployeeForm);

  // Remove the message after 3 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

// Search employees by ID
function searchEmployees() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const filteredEmployees = employees.filter((employee) => employee.id.toString().includes(searchValue));

  displayEmployees(filteredEmployees);
}

// Add event listener for search button click
searchBtn.addEventListener('click', searchEmployees);

// Initial display of employees and leaves
displayEmployees();
displayLeaves();

// Scroll Down Button
const scrollDownBtn = document.getElementById('scroll-down-btn');
scrollDownBtn.addEventListener('click', () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth'
  });
});

// Scroll Up Button
const scrollUpBtn = document.getElementById('scroll-up-btn');
scrollUpBtn.addEventListener('click', () => {
  window.scrollBy({
    top: -window.innerHeight,
    behavior: 'smooth'
  });
});

// Show or hide scroll buttons based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    scrollUpBtn.style.display = 'block';
  } else {
    scrollUpBtn.style.display = 'none';
  }

  if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight) {
    scrollDownBtn.style.display = 'none';
  } else {
    scrollDownBtn.style.display = 'block';
  }
});

// Get the performance reviews container
const performanceReviewsContainer = document.getElementById('performance-reviews');

// Get the add performance review form
const addPerformanceReviewForm = document.getElementById('add-performance-review-form');

// Retrieve performance review data from localStorage or initialize an empty array
let performanceReviews = JSON.parse(localStorage.getItem('performanceReviews')) || [];

// Add event listener for add performance review form submit
addPerformanceReviewForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get the form input values
  const employeeId = document.getElementById('employee-id-pr').value;
  const reviewDate = document.getElementById('review-date').value;
  const reviewDetails = document.getElementById('review-details').value;

  // Create a new performance review object
  const performanceReview = {
    id: generatePerformanceReviewId(),
    employeeId,
    reviewDate,
    reviewDetails
  };

  // Add the performance review to the array
  performanceReviews.push(performanceReview);

  // Store the updated performance review data in localStorage
  localStorage.setItem('performanceReviews', JSON.stringify(performanceReviews));

  // Clear the form inputs
  addPerformanceReviewForm.reset();

  // Refresh the performance reviews list
  displayPerformanceReviews();

  // Show success message
  showMessage('Performance review added successfully', 'success-msg');
});

// Generate a unique performance review ID
function generatePerformanceReviewId() {
  return Math.floor(Math.random() * 1000000);
}

// Display the performance reviews in the section
function displayPerformanceReviews() {
  // Clear the performance reviews container
  performanceReviewsContainer.innerHTML = '';

  // Loop through the performance review data and create entries in the section
  performanceReviews.forEach((performanceReview) => {
    const entry = document.createElement('div');
    entry.innerHTML = `
                <p><strong>Employee ID:</strong> ${performanceReview.employeeId}</p>
                <p><strong>Review Date:</strong> ${performanceReview.reviewDate}</p>
                <p><strong>Review Details:</strong> ${performanceReview.reviewDetails}</p>
                <button class="delete-btn" onclick="deletePerformanceReview(${performanceReview.id})">Delete</button>
            `;

    performanceReviewsContainer.appendChild(entry);
  });
}

// Delete a performance review
function deletePerformanceReview(reviewId) {
  // Remove the performance review from the array
  performanceReviews = performanceReviews.filter((review) => review.id !== reviewId);

  // Store the updated performance review data in localStorage
  localStorage.setItem('performanceReviews', JSON.stringify(performanceReviews));

  // Refresh the performance reviews list
  displayPerformanceReviews();

  // Show success message
  showMessage('Performance review deleted', 'success-msg');
}




// Initial display of performance reviews
displayPerformanceReviews();
// Display initial performance reviews
displayPerformanceReviews();

function submitFeedback() {
  const name = document.getElementById('name').value;
  const feedback = document.getElementById('feedback').value;

  if (name.trim() === '' || feedback.trim() === '') {
    alert('Please fill in both name and feedback fields.');
    return;
  }

  // Display the feedback in real-time
  const feedbackDisplay = document.getElementById('feedbackDisplay');
  const newFeedback = document.createElement('div');
  newFeedback.innerHTML = `<strong>${name}:</strong> ${feedback}`;

  // Add delete button for each feedback entry
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    newFeedback.remove();
  });

  newFeedback.appendChild(deleteButton);
  feedbackDisplay.appendChild(newFeedback);

  // Clear the form fields after submission
  document.getElementById('name').value = '';
  document.getElementById('feedback').value = '';
}



// reloader
//function to reload
function reloadPage() {
  location.reload();
}

// Function to update the countdown timer
function updateCountdown(seconds) {
  document.getElementById("countdown").innerText = seconds;
}

// Function to start the reloader and timer
function startReloader(interval) {
  let secondsRemaining = interval;

  // Update countdown initially
  updateCountdown(secondsRemaining);

  // Timer to update countdown and reload the page
  const countdownTimer = setInterval(() => {
    secondsRemaining--;

    // Update countdown
    updateCountdown(secondsRemaining);

    // If countdown reaches 0, reload the page and reset the countdown
    if (secondsRemaining <= 0) {
      reloadPage();
      secondsRemaining = interval;
    }
  }, 10000); // 1000 milliseconds = 1 second
}

// Start the reloader with a timer of 10 seconds (adjust as needed)
startReloader(10);


function countEmployees() {
  const employeeCount = employees.length;
  const countElement = document.getElementById('employee-count');
  countElement.textContent = `Total Employees: ${employeeCount}`;
}
function countLeaveApplications() {
  const leaveCount = leaves.length;
  const countElement = document.getElementById('leave-count');
  countElement.textContent = `Total Leave Applications: ${leaveCount}`;
}
// After defining the counting functions, call them to display the counts initially
countEmployees();
countLeaveApplications();

// Function to print the employee list
function printEmployeeList() {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');

  // Prepare the HTML content to print
  const printContent = `
    <html>
      <head>
        <title>Employee List</title>
        <style>
          /* Custom styles for printing */
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
          }
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h2>Employee List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Hire Date</th>
              <th>Last Working Day</th>
              <th>Experience</th>
              <th>Age</th>
              <th>Position</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            ${employeeListContainer.innerHTML} <!-- Copy the content of the employee list table -->
          </tbody>
        </table>
      </body>
    </html>
  `;

  // Write the prepared content into the new window
  printWindow.document.write(printContent);

  // Close the document to make sure all the content is rendered
  printWindow.document.close();

  // Print the window
  printWindow.print();

  // Close the window after printing
  printWindow.close();

}
// Function to add a new vehicle to the list
function addTransport() {
  const vehicleName = document.getElementById("vehicle-name").value;
  const capacity = document.getElementById("capacity").value;
  const fuelType = document.getElementById("fuel-type").value;

  if (!vehicleName || !capacity || !fuelType) {
    alert("Please fill in all the fields before adding the transport.");
    return;
  }

  // Create a new object to represent the vehicle
  const vehicle = {
    name: vehicleName,
    capacity: capacity,
    fuelType: fuelType
  };

  // Add the new vehicle to the local storage
  addVehicleToLocalStorage(vehicle);

  // Update the list to show all the vehicles from the local storage
  updateVehicleList();

  // Clear form inputs after adding transport
  document.getElementById("vehicle-name").value = "";
  document.getElementById("capacity").value = "";
  document.getElementById("fuel-type").value = "petrol";
}

// Function to add a vehicle to the local storage
function addVehicleToLocalStorage(vehicle) {
  let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
  vehicles.push(vehicle);
  localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

// Function to remove a vehicle from the list and local storage
function deleteVehicle(index) {
  let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
  vehicles.splice(index, 1);
  localStorage.setItem("vehicles", JSON.stringify(vehicles));
  updateVehicleList();
}

// Function to update the vehicle list displayed on the page
function updateVehicleList() {
  const vehicleList = document.getElementById("vehicle-list");
  vehicleList.innerHTML = "";

  let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
  vehicles.forEach((vehicle, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<b>Vehicle Name:</b> ${vehicle.name}, <b>Capacity:</b> ${vehicle.capacity}, <b>Fuel Type:</b> ${vehicle.fuelType}
    <button onclick="deleteVehicle(${index})">Delete</button>`;
    vehicleList.appendChild(listItem);
  });
}

// Initial load: Update the vehicle list from the local storage
updateVehicleList();