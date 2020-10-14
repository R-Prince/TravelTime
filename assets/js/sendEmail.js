// Send customer inquiry to travel time team.
function sendMail(contactForm){
    
    emailjs.send("gmail","rosieucd",{
        "customer_enquiry": contactForm.text.value,
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "from_number": contactForm.number.value
    });
    
    $("#successModal").modal();
    
    return false;
};