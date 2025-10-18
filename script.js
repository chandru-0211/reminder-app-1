// ---------------- SIGNUP PAGE (form.html) ----------------
if (window.location.pathname.includes("form.html")) {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("CP").value;
    const email = document.getElementById("email").value.trim();

    if (password !== confirm) {
      alert("❌ Passwords do not match!");
      return;
    }

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      alert("⚠️ Username already taken!");
      return;
    }

    // Add new user
    users.push({ username, password, email });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Signup successful! Redirecting to login...");
    window.location.href = "login.html";
  });
}

// ---------------- LOGIN PAGE (login.html) ----------------
if (window.location.pathname.includes("login.html")) {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usernameInput = form.querySelector("#username").value.trim();
    const passwordInput = form.querySelector("#password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === usernameInput && u.password === passwordInput
    );

    if (user) {
      alert("✅ Login successful!");
      window.location.href = "reminder.html";
    } else {
      alert("❌ Invalid username or password!");
    }
  });
}

// ---------------- REMINDER PAGE (reminder.html) ----------------
if (window.location.pathname.includes("reminder.html")) {
  const reminderList = document.getElementById("reminderList");
  const addBtn = document.getElementById("addReminderBtn"); // button
  const reminderText = document.getElementById("reminderText");
  const reminderTime = document.getElementById("reminderTime");
  const reminderLink = document.getElementById("reminderLink");

  // Load reminders from localStorage
  const reminders = JSON.parse(localStorage.getItem("reminders")) || [];

  function renderReminders() {
    reminderList.innerHTML = "";
    reminders.forEach((reminder, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${reminder.text}</strong><br>
        Time: ${new Date(reminder.time).toLocaleString()}
        ${
          reminder.link
            ? `<br><a href="${reminder.link}" target="_blank">${reminder.link}</a>`
            : ""
        }
        <br><button class="delete-btn">🗑️ Delete</button>
      `;
      li.querySelector(".delete-btn").addEventListener("click", () => {
        reminders.splice(index, 1);
        localStorage.setItem("reminders", JSON.stringify(reminders));
        renderReminders();
      });
      reminderList.appendChild(li);
    });
  }

  function addReminder() {
    const text = reminderText.value.trim();
    const time = reminderTime.value;
    const link = reminderLink.value.trim();

    if (!text || !time) {
      alert("⚠️ Please enter both reminder text and time.");
      return;
    }

    const reminderTimeMs = new Date(time).getTime();
    const now = new Date().getTime();
    if (reminderTimeMs <= now) {
      alert("⏰ Please choose a future time!");
      return;
    }

    reminders.push({ text, time: reminderTimeMs, link });
    localStorage.setItem("reminders", JSON.stringify(reminders));
    renderReminders();

    // Clear input fields
    reminderText.value = "";
    reminderTime.value = "";
    reminderLink.value = "";
  }

  addBtn.addEventListener("click", addReminder);

  renderReminders();
}
