function updateTime() {
  // Show loading spinner while fetching the time
  document.getElementById('manila-card-body').classList.add('loading');
  document.getElementById('mountain-card-body').classList.add('loading');
  document.getElementById('eastern-card-body').classList.add('loading');

  const now = new Date();
  const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);

  // Manila Time (PHT) is UTC+8
  const manilaTime = new Date(utcTime + (8 * 3600000));
  document.getElementById('manila-time').textContent = manilaTime.toLocaleTimeString();
  document.getElementById('manila-date').textContent = manilaTime.toLocaleDateString();
  document.getElementById('manila-zone').textContent = '+8 GMT';

  // Mountain Time (MT) is UTC-6 or UTC-7 depending on Daylight Saving Time
  const mountainDateTime = new Date().toLocaleString('en-US', { timeZone: 'America/Denver' });
  const isDSTMountain = new Date(mountainDateTime).getHours() !== new Date().getHours();
  const mountainOffset = isDSTMountain ? -6 : -7;
  const mountainTime = new Date(utcTime + (mountainOffset * 3600000));
  document.getElementById('mountain-time').textContent = mountainTime.toLocaleTimeString();
  document.getElementById('mountain-date').textContent = mountainTime.toLocaleDateString();
  document.getElementById('mountain-zone').textContent = (mountainOffset === -6) ? '-6 GMT' : '-7 GMT';

  // Eastern Time (ET) is UTC-5 or UTC-4 depending on Daylight Saving Time
  const easternDateTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const isDSTEastern = new Date(easternDateTime).getHours() !== new Date().getHours();
  const easternOffset = isDSTEastern ? -4 : -5;
  const easternTime = new Date(utcTime + (easternOffset * 3600000));
  document.getElementById('eastern-time').textContent = easternTime.toLocaleTimeString();
  document.getElementById('eastern-date').textContent = easternTime.toLocaleDateString();
  document.getElementById('eastern-zone').textContent = (easternOffset === -4) ? '-4 GMT' : '-5 GMT';

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
