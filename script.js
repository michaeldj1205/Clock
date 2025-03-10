function updateTime() {
  // Show loading spinner while fetching the time
  document.getElementById('manila-card-body').classList.add('loading');
  document.getElementById('mountain-card-body').classList.add('loading');
  document.getElementById('eastern-card-body').classList.add('loading');

  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);

  // Weekday array
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Manila Time (PHT) is UTC+8
  const manilaTime = new Date(utcTime + (8 * 3600000));
  document.getElementById('manila-time').textContent = manilaTime.toLocaleTimeString();
  document.getElementById('manila-date').textContent = manilaTime.toLocaleDateString();
  document.getElementById('manila-zone').textContent = '+8 GMT';
  document.getElementById('manila-weekday').textContent = weekdays[manilaTime.getDay()]; // Weekday for Manila

  // Mountain Time (MT) is UTC-6 or UTC-7 depending on Daylight Saving Time
  const mountainDateTime = new Date().toLocaleString('en-US', { timeZone: 'America/Denver' });
  const isDSTMountain = new Date(mountainDateTime).getHours() !== new Date().getHours();
  const mountainOffset = isDSTMountain ? -6 : -7;
  const mountainTime = new Date(utcTime + (mountainOffset * 3600000));
  document.getElementById('mountain-time').textContent = mountainTime.toLocaleTimeString();
  document.getElementById('mountain-date').textContent = mountainTime.toLocaleDateString();
  document.getElementById('mountain-zone').textContent = (mountainOffset === -6) ? '-6 GMT' : '-7 GMT';
  document.getElementById('mountain-weekday').textContent = weekdays[mountainTime.getDay()]; // Weekday for Mountain

  // Eastern Time (ET) is UTC-5 or UTC-4 depending on Daylight Saving Time
  const easternDateTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const isDSTEastern = new Date(easternDateTime).getHours() !== new Date().getHours();
  const easternOffset = isDSTEastern ? -4 : -5;
  const easternTime = new Date(utcTime + (easternOffset * 3600000));
  document.getElementById('eastern-time').textContent = easternTime.toLocaleTimeString();
  document.getElementById('eastern-date').textContent = easternTime.toLocaleDateString();
  document.getElementById('eastern-zone').textContent = (easternOffset === -4) ? '-4 GMT' : '-5 GMT';
  document.getElementById('eastern-weekday').textContent = weekdays[easternTime.getDay()]; // Weekday for Eastern

  // Update the "Weekday Section" to show the current weekday based on selected timezone (e.g., Manila)
  document.getElementById('weekday').textContent = weekdays[manilaTime.getDay()]; // You can switch to Mountain or Eastern if needed

  // Hide loading spinner after time is fetched
  document.getElementById('manila-card-body').classList.remove('loading');
  document.getElementById('mountain-card-body').classList.remove('loading');
  document.getElementById('eastern-card-body').classList.remove('loading');
}

// Update time every second
setInterval(updateTime, 1000);

// Initial time update
updateTime();

// Dark Mode Toggle
document.getElementById('toggle-dark-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.querySelectorAll('.elegant-card').forEach(card => card.classList.toggle('dark-mode'));
  document.querySelectorAll('.card-title').forEach(title => title.classList.toggle('dark-mode'));
  document.querySelectorAll('.time-text').forEach(text => text.classList.toggle('dark-mode'));
  document.querySelectorAll('.time-zone').forEach(text => text.classList.toggle('dark-mode'));
});

// Refresh Button
document.getElementById('refresh-time').addEventListener('click', updateTime);

// Fullscreen Button
document.getElementById('fullscreen').addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Function to open the calendar
function openCalendar() {
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Open the calendar app on mobile (This works for some mobile browsers)
    window.open("calshow:", "_blank");
  } else {
    // Open Windows system calendar (for Windows users)
    window.location.href = "explorer.exe shell:::{E2E7934B-DCE5-43C4-9576-7FE4F75E7480}";
    
    // Alternative: Open Google Calendar in a new tab for cross-platform support
    setTimeout(() => {
      window.open("https://calendar.google.com", "_blank");
    }, 500);
  }
}

// Add event listener to the calendar button
document.getElementById("open-calendar").addEventListener("click", openCalendar);

