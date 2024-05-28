import { db, auth } from "./firebase-config.js";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

async function loadProfileInfo() {
  const user = auth.currentUser;
  if (user) {
    // Fetch user profile info from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      document.getElementById("avatar").src = userData.photoURL;
      document.getElementById("profile-name").textContent =
        userData.displayName;
      document.getElementById("profile-email").textContent = userData.email;

      console.log(userData.photoURL, userData.displayName, userData.email);
    }
  }
}

loadProfileInfo();

//document.addEventListener("DOMContentLoaded", loadProfileInfo);

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("past-applications")
    .addEventListener("click", showPastApplications);
  document.getElementById("apply-new").addEventListener("click", showApplyNew);
  document
    .getElementById("finance-section")
    .addEventListener("click", showFinanceSection);
  document.getElementById("logout").addEventListener("click", logout);

  // Avatar click event
  document
    .getElementById("avatar")
    .addEventListener("click", showProfileDialog);
  document
    .getElementById("close-dialog")
    .addEventListener("click", closeProfileDialog);

  // Load profile information
  loadProfileInfo();
});

async function showPastApplications(event) {
  event.preventDefault();
  const user = auth.currentUser;
  const q = query(
    collection(db, "applications"),
    where("userId", "==", user.uid)
  );
  const querySnapshot = await getDocs(q);
  let content = "<h2>Your Past Applications</h2>";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    content += `<div class="application">
                        <p>Name: ${data.name}</p>
                        <p>School: ${data.school}</p>
                        <p>Grade: ${data.grade}</p>
                        <p>Submitted on: ${data.timestamp
                          .toDate()
                          .toLocaleDateString()}</p>
                    </div>`;
  });
  document.getElementById("content-area").innerHTML = content;
}

function showApplyNew(event) {
  event.preventDefault();
  const content = `
        <h2>Apply for New Scholarship</h2>
        <form id="application-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="school">School:</label>
            <input type="text" id="school" name="school" required>
            <label for="grade">Grade:</label>
            <input type="text" id="grade" name="grade" required>
            <button type="submit">Submit</button>
        </form>
    `;
  document.getElementById("content-area").innerHTML = content;
  document
    .getElementById("application-form")
    .addEventListener("submit", submitApplication);
}

async function submitApplication(event) {
  event.preventDefault();
  const form = event.target;
  const application = {
    userId: auth.currentUser.uid,
    name: form.name.value,
    school: form.school.value,
    grade: form.grade.value,
    timestamp: new Date(),
  };

  try {
    await addDoc(collection(db, "applications"), application);
    alert("Application submitted successfully!");
    form.reset();
  } catch (error) {
    console.error("Error submitting application: ", error);
    alert("Error submitting application.");
  }
}

async function showFinanceSection(event) {
  event.preventDefault();
  const user = auth.currentUser;
  const q = query(collection(db, "finance"), where("userId", "==", user.uid));
  const querySnapshot = await getDocs(q);
  let content = "<h2>Finance Section</h2>";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    content += `<div class="finance">
                        <p>Amount: ₹${data.amount}</p>
                        <p>Status: ${data.status}</p>
                        <p>Received on: ${data.timestamp
                          .toDate()
                          .toLocaleDateString()}</p>
                    </div>`;
  });
  document.getElementById("content-area").innerHTML = content;
}

function logout(event) {
  // event.preventDefault();
  signOut(auth)
    .then(() => {
      alert("Logged out successfully!");
      window.location.href = "/view/landingpage.html";
    })
    .catch((error) => {
      console.error("Error logging out: ", error);
      alert("Error logging out.");
    });
}

// Show profile dialog
function showProfileDialog() {
  document.getElementById("profile-dialog").style.display = "block";
}

// Close profile dialog
function closeProfileDialog() {
  document.getElementById("profile-dialog").style.display = "none";
}

// // Load profile information
// function loadProfileInfo() {
//   const user = auth.currentUser;
//   if (user) {
//     document.getElementById("profile-photo").src = user.photoURL;
//     document.getElementById("profile-name").textContent = user.displayName;
//     document.getElementById("profile-email").textContent = user.email;
//   }
// }
