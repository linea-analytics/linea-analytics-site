// Simple toggle for showing/hiding the dropdown
function toggleLangDropdown() {
    const dropdown = document.getElementById('langDropdown');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
  }
  
  // (Optional) Close the dropdown if user clicks anywhere else
  document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('langDropdown');
    const toggle = document.querySelector('.custom-dropdown-toggle');
  
    // If click is outside the toggle button AND outside dropdown content, close it
    if (!toggle.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });