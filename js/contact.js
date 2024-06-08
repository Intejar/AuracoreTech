const form = document.querySelector("form");

function sendMail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("number").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  const bodyMessage = `Name:${name}<br> Email:${email}<br> Phone:${phone}<br> Subject:${subject}<br> Message:${message}`;

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "auracore.technologies@gmail.com",
    Password: "F37C5C5BBAC9214A62CAEB561D34F1E2F007",
    To: "auracore.technologies@gmail.com",
    From: "auracore.technologies@gmail.com",
    Subject: subject,
    Body: bodyMessage,
  })
    .then((message) => {
      if (message === "OK") {
        Swal.fire({
          title: "Sent!",
          text: "Email Sent Successfully!",
          icon: "success",
        });
        // Reset form fields after successful submission
        form.reset();
      } else {
        console.error("Failed to send email:", message);
      }
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
}

// Add event listener for form submission
form.addEventListener("submit", (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Call the sendMail function
  sendMail();
});
