document.addEventListener("DOMContentLoaded", function () {
    const eventForm = document.getElementById("eventForm");
    const carouselContent = document.getElementById("carouselContent");
    const noEventsMessage = document.getElementById("noEventsMessage");
    const deleteEventBtn = document.getElementById("deleteEvent");
    const eventTableBody = document.getElementById("eventTableBody");
    const noEventsTableMessage = document.getElementById("noEventsTableMessage");
    let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
    let editIndex = -1;

    // Cargar eventos del localStorage al iniciar
    actualizarCarousel();
    actualizarTabla();

    eventForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const eventName = document.getElementById("eventName").value;
        const eventDate = document.getElementById("eventDate").value;
        const eventDescription = document.getElementById("eventDescription").value;

        if (eventName.trim() === "" || eventDate.trim() === "" || eventDescription.trim() === "") return;

        if (editIndex === -1) {
            eventos.push({
                name: eventName,
                date: eventDate,
                description: eventDescription,
            });
        } else {
            eventos[editIndex] = {
                name: eventName,
                date: eventDate,
                description: eventDescription,
            };
            editIndex = -1;
        }

        // Guardar eventos en localStorage
        localStorage.setItem("eventos", JSON.stringify(eventos));

        actualizarCarousel();
        actualizarTabla();
        document.getElementById("eventModal").querySelector(".btn-close").click();
        eventForm.reset();
        deleteEventBtn.style.display = "none";
    });

    function actualizarCarousel() {
        carouselContent.innerHTML = "";
        noEventsMessage.style.display = eventos.length > 0 ? "none" : "block";

        eventos.forEach((evento, index) => {
            const item = document.createElement("div");
            item.classList.add("carousel-item");
            if (index === 0) item.classList.add("active");

            item.innerHTML = `
                <div class="d-flex flex-column justify-content-center align-items-center bg-primary text-white p-4" style="height: 200px; cursor: pointer;" onclick="editarEvento(${index})">
                    <h5>${evento.name}</h5>
                    <p><strong>Fecha:</strong> ${evento.date}</p>
                    <p>${evento.description}</p>
                </div>
            `;

            carouselContent.appendChild(item);
        });
    }

    function actualizarTabla() {
        eventTableBody.innerHTML = ""; // Limpiar la tabla
        noEventsTableMessage.style.display = eventos.length > 0 ? "none" : "table-row"; // Mostrar mensaje si no hay eventos

        eventos.forEach((evento, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${evento.name}</td>
                <td>${evento.date}</td>
                <td>${evento.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarEvento(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarEvento(${index})">Eliminar</button>
                </td>
            `;
            eventTableBody.appendChild(row);
        });
    }

    window.editarEvento = function (index) {
        document.getElementById("eventName").value = eventos[index].name;
        document.getElementById("eventDate").value = eventos[index].date;
        document.getElementById("eventDescription").value = eventos[index].description;
        editIndex = index;
        deleteEventBtn.style.display = "block";
        document.getElementById("eventModalLabel").textContent = "Editar Evento";
        new bootstrap.Modal(document.getElementById("eventModal")).show();
    };

    window.eliminarEvento = function (index) {
        eventos.splice(index, 1);
        // Actualizar localStorage después de eliminar
        localStorage.setItem("eventos", JSON.stringify(eventos));
        actualizarCarousel();
        actualizarTabla();
    };

    deleteEventBtn.addEventListener("click", function () {
        if (editIndex !== -1) {
            eventos.splice(editIndex, 1);
            // Actualizar localStorage después de eliminar
            localStorage.setItem("eventos", JSON.stringify(eventos));
            actualizarCarousel();
            actualizarTabla();
            document.getElementById("eventModal").querySelector(".btn-close").click();
            eventForm.reset();
            editIndex = -1;
            deleteEventBtn.style.display = "none";
        }
    });
});
