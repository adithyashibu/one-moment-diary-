// Select elements
const saveButton = document.getElementById('save-button');
const diaryInput = document.getElementById('diary-input');
const colorPicker = document.getElementById('color-picker');
const timeline = document.getElementById('timeline');

// Load existing entries from local storage
const loadEntries = () => {
  const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  timeline.innerHTML = ''; // Clear timeline

  entries.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'timeline-entry';
    div.style.backgroundColor = entry.color;

    // Add entry content with a delete button
    div.innerHTML = `
      <p>${entry.text}</p>
      <small>${entry.date}</small>
      <button class="delete-button" data-index="${index}">Delete</button>
    `;

    timeline.appendChild(div);
  });

  // Attach delete event listeners to the delete buttons
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) =>
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      deleteEntry(index);
    })
  );
};

// Save a new diary entry
const saveEntry = () => {
  const text = diaryInput.value.trim();
  const color = colorPicker.value;
  if (!text) {
    alert('Please write something!');
    return;
  }

  const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  const newEntry = {
    text,
    color,
    date: new Date().toLocaleString(),
  };
  entries.push(newEntry);
  localStorage.setItem('diaryEntries', JSON.stringify(entries));
  diaryInput.value = ''; // Clear input
  loadEntries(); // Refresh timeline
};

// Delete a diary entry by index
const deleteEntry = (index) => {
  let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  entries.splice(index, 1); // Remove the entry at the given index
  localStorage.setItem('diaryEntries', JSON.stringify(entries));
  loadEntries(); // Refresh timeline
};

// Event listeners
saveButton.addEventListener('click', saveEntry);
window.addEventListener('DOMContentLoaded', loadEntries);
