"use strict";

const appointmentForm = document.querySelector("#appointment-form");
const dateInput = document.querySelector("#date");
const timeSelect = document.querySelector("#time");
const serviceSelect = document.querySelector("#service");
const tutorNameInput = document.querySelector("#tutor-name");
const petNameInput = document.querySelector("#pet-name");

const summaryPet = document.querySelector("#summary-pet");
const summaryService = document.querySelector("#summary-service");
const summaryDate = document.querySelector("#summary-date");
const summaryTime = document.querySelector("#summary-time");
const summaryTutor = document.querySelector("#summary-tutor");
const summaryPhone = document.querySelector("#summary-phone");

const appointmentsList = document.querySelector("#appointments-list");
const emptyState = document.querySelector("#empty-state");

const statTotal = document.querySelector("#stat-total");
const statPending = document.querySelector("#stat-pending");
const statConfirmed = document.querySelector("#stat-confirmed");
const statCancelled = document.querySelector("#stat-cancelled");

// Escolha de horário e data

const availableTimes = [
    "09:00",
    "10:30",
    "13:30",
    "15:00",
    "16:30"
];

if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
}

if (dateInput && timeSelect) {
    dateInput.addEventListener("change", () => {
        timeSelect.disabled = false;
        
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

        const unavailableTimes = appointments
            .filter(appointment => appointment.date === dateInput.value && appointment.status !== "Cancelado")
            .map(appointment => appointment.time);

        timeSelect.innerHTML = '<option value="">Selecione</option>';

        availableTimes.forEach(time => {
            if (!unavailableTimes.includes(time)) {
                const option = document.createElement("option");

                option.value = time;
                option.textContent = time;

                timeSelect.appendChild(option);
            }
        });

        if (timeSelect.options.length === 1) {
            timeSelect.innerHTML = '<option value="">Nenhum horário disponível</option>';
            timeSelect.disabled = true;
        } else {
            timeSelect.disabled = false;
        }
    });
}

// Máscara do telefone

const phoneInput = document.querySelector("#phone");

if (phoneInput) {
    phoneInput.addEventListener("input", () => {
        phoneInput.setCustomValidity("");
        
        let phone = phoneInput.value.replace(/\D/g, "");

        phone = phone.slice(0, 11);

        if (phone.length > 10) {
            phone = phone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        } else if (phone.length > 6) {
            phone = phone.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
        } else if (phone.length > 2) {
            phone = phone.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
        } else {
            phone = phone.replace(/^(\d*)$/, "($1");
        }

        phoneInput.value = phone;
    });
}

// Lógica do formulário

if (appointmentForm) {
    appointmentForm.addEventListener("submit", event => {
        event.preventDefault();

        const phoneNumbers = phoneInput.value.replace(/\D/g, "");

        if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
            phoneInput.setCustomValidity("Digite um telefone válido com DDD.");
            phoneInput.reportValidity();
            return;
        }

        phoneInput.setCustomValidity("");

        const appointment = {
            id: Date.now(),
            service: serviceSelect.value,
            date: dateInput.value,
            time: timeSelect.value,
            tutor: tutorNameInput.value.trim(),
            pet: petNameInput.value.trim(),
            phone: phoneInput.value,
            status: "Em análise"
        };

        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

        appointments.push(appointment);

        localStorage.setItem("appointments", JSON.stringify(appointments));

        window.location.href = "./confirmacao.html";
    });
}

// Confirmação

function formatService(service) {
    const services = {
        banho: "Banho",
        tosa: "Tosa",
        "banho-tosa": "Banho e tosa"
    };

    return services[service] || service;
}

function formatDate(date) {
    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
}

function getMonthName(date) {
    const months = [
        "JAN", "FEV", "MAR", "ABR",
        "MAI", "JUN", "JUL", "AGO",
        "SET", "OUT", "NOV", "DEZ"
    ];

    const month = Number(date.split("-")[1]);

    return months[month - 1];
}

if (summaryPet) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const lastAppointment = appointments[appointments.length - 1];

    if (lastAppointment) {
        summaryPet.textContent = lastAppointment.pet;
        summaryService.textContent = formatService(lastAppointment.service);
        summaryDate.textContent = formatDate(lastAppointment.date);
        summaryTime.textContent = lastAppointment.time;
        summaryTutor.textContent = lastAppointment.tutor;
        summaryPhone.textContent = lastAppointment.phone;
    }
}

// Agendamento

function renderAppointments() {
    if (!appointmentsList) return;

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointmentsList.innerHTML = "";

    if (appointments.length === 0) {
        emptyState.style.display = "flex";
        return;
    }

    emptyState.style.display = "none";

    appointments.forEach(appointment => {
        const appointmentItem = document.createElement("article");

        appointmentItem.classList.add("appointment-item");

        appointmentItem.innerHTML = `
            <div class="appointment-date">
                <span>${appointment.date.split("-")[2]}</span>
                <small>${getMonthName(appointment.date)}</small>
                <strong>${appointment.time}</strong>
            </div>

            <div class="appointment-main">
                <span class="appointment-service">${formatService(appointment.service)}</span>
                <h3>${appointment.pet}</h3>
                <p>Tutor: ${appointment.tutor}</p>
            </div>

            <div class="appointment-contact">
                <span>Contato</span>
                <strong>${appointment.phone}</strong>
            </div>

            <div class="appointment-status">
                <span class="status-badge ${getStatusClass(appointment.status)}">${appointment.status}</span>
            </div>

            <div class="appointment-actions">
                ${getAppointmentActions(appointment)}
            </div>
        `;

        appointmentsList.appendChild(appointmentItem);
    });
}

function updateDashboard() {
    renderAppointments();
    updateStats();
}

// Botões da Agenda Geral

function updateAppointmentStatus(id, newStatus) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const appointment = appointments.find(appointment => appointment.id === id);

    if (!appointment) return;

    appointment.status = newStatus;

    localStorage.setItem("appointments", JSON.stringify(appointments));

    updateDashboard();
}

if (appointmentsList) {
    appointmentsList.addEventListener("click", event => {
        const button = event.target;

        if (button.classList.contains("action-confirm")) {
            const id = Number(button.dataset.id);

            updateAppointmentStatus(id, "Confirmado");
        }

        if (button.classList.contains("action-cancel")) {
            const id = Number(button.dataset.id);

            updateAppointmentStatus(id, "Cancelado");
        }

        if (button.classList.contains("action-remove")) {
            const id = Number(button.dataset.id);

            removeAppointment(id);
        }
    });
}

function getStatusClass(status) {
    const statusClasses = {
        "Em análise": "status-pending",
        "Confirmado": "status-confirmed",
        "Cancelado": "status-cancelled"
    };

    return statusClasses[status] || "status-pending";
}

function getAppointmentActions(appointment) {
    if (appointment.status === "Cancelado") {
        return `
            <button type="button" class="action-button action-remove" data-id="${appointment.id}">
                Remover
            </button>
        `;
    }

    if (appointment.status === "Confirmado") {
        return `
            <button type="button" class="action-button action-cancel" data-id="${appointment.id}">
                Cancelar
            </button>
        `;
    }

    return `
        <button type="button" class="action-button action-confirm" data-id="${appointment.id}">
            Confirmar
        </button>
        <button type="button" class="action-button action-cancel" data-id="${appointment.id}">
            Cancelar
        </button>
    `;
}

function removeAppointment(id) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    updateDashboard();
}

// Cards de estatisticas na agenda

function updateStats() {
    if (!statTotal) return;

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const pending = appointments.filter(appointment => appointment.status === "Em análise");
    const confirmed = appointments.filter(appointment => appointment.status === "Confirmado");
    const cancelled = appointments.filter(appointment => appointment.status === "Cancelado");

    statTotal.textContent = appointments.length;
    statPending.textContent = pending.length;
    statConfirmed.textContent = confirmed.length;
    statCancelled.textContent = cancelled.length;
}

updateDashboard();