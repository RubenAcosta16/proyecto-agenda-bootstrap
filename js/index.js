function loadEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const tableBody = document.getElementById("eventTableBody");
    tableBody.innerHTML = "";

    events.forEach((event, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${event.name}</td>
                <td>${event.date}</td>
                <td>${event.description}</td>
                <td>
                    <button class="btn btn-warning" onclick="openEditModal(${index})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteEvent(${index})">Eliminar</button>
                </td>
            `;
      tableBody.appendChild(row);
    });
  }

  function openEditModal(index) {
    const events = JSON.parse(localStorage.getItem("events"));
    const event = events[index];
    document.getElementById("editEventName").value = event.name;
    document.getElementById("editEventDate").value = event.date;
    document.getElementById("editEventDescription").value =
      event.description;
    document.getElementById("editIndex").value = index;

    $("#editModal").modal("show");
  }

  document
    .getElementById("editForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const index = document.getElementById("editIndex").value;
      const eventName = document.getElementById("editEventName").value;
      const eventDate = document.getElementById("editEventDate").value;
      const eventDescription = document.getElementById(
        "editEventDescription"
      ).value;

      const events = JSON.parse(localStorage.getItem("events"));
      events[index] = {
        name: eventName,
        date: eventDate,
        description: eventDescription,
      };
      localStorage.setItem("events", JSON.stringify(events));

      $("#editModal").modal("hide");
      loadEvents();
    });

  function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem("events"));
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
  }

  window.onload = loadEvents;