document.getElementById('eventForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventDescription = document.getElementById('eventDescription').value;

    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({ name: eventName, date: eventDate, description: eventDescription });
    localStorage.setItem('events', JSON.stringify(events));

    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('d-none');
    successMessage.classList.add('show');

    // es pa ocultar el mensaje
    setTimeout(() => {
        successMessage.classList.add('d-none');
    }, 3000);

    this.reset();
});