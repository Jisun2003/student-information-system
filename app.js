const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const logoContainer = document.getElementById('logo-container');

function toggleSidebar() {
  sidebar.classList.toggle('close');
  toggleButton.classList.toggle('rotate');
  closeAllSubMenus();
}

function toggleSubMenu(button) {
  const subMenu = button.nextElementSibling;
  if (!subMenu.classList.contains('show')) closeAllSubMenus();
  subMenu.classList.toggle('show');
  button.classList.toggle('rotate');

  if (sidebar.classList.contains('close')) {
    sidebar.classList.toggle('close');
    toggleButton.classList.toggle('rotate');
  }
}

function closeAllSubMenus() {
  const openSubMenus = sidebar.getElementsByClassName('show');
  Array.from(openSubMenus).forEach(ul => {
    ul.classList.remove('show');
    ul.previousElementSibling.classList.remove('rotate');
  });
}

function toggleLogo() {
  const isHidden = logoContainer.style.visibility === 'hidden';
  logoContainer.style.visibility = isHidden ? 'visible' : 'hidden';
  logoContainer.style.opacity = isHidden ? '1' : '0';
}

document.getElementById('toggle-btn').addEventListener('click', toggleLogo);

document.querySelector('input[type="file"]').addEventListener('change', function(event) {
  const formData = new FormData();
  formData.append('profile_pic', event.target.files[0]);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '', true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      document.querySelector('.student-info img').src = '../uploads/profile_pics/' + xhr.responseText;
    }
  };
  xhr.send(formData);
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = function() {
  const backToTopButton = document.getElementById("back-to-top");
  backToTopButton.style.display = (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? 'flex' : 'none';
};

function filterStudents(course) {
  document.querySelectorAll('.student-info').forEach(card => {
    card.style.display = card.querySelector('p:last-of-type').textContent.includes(course) ? 'flex' : 'none';
  });
}

function showAllStudents() {
  document.querySelectorAll('.student-info').forEach(card => {
    card.style.display = 'flex';
  });
}

showAllStudents();
