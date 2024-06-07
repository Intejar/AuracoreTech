function sendMail() {
  var params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  const serviceID = "service_9qz12fm";
  const templateID = "template_4upbg2i";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      Document.getElementById("message").value = "";
      console.log(res);
      alert("your message sent successfully");
    })
    .catch((err) => console(err));
}
