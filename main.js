let editMode = false;
let editId = null;
let photos = [
  {
    id: 1,
    title: 'Placeholder Image 1',
    url: 'https://via.placeholder.com/600/92c952',
  },
];

function renderPhotos(photos) {
  const photosList = document.getElementById('photos-list');
  photosList.innerHTML = '';

  photos.forEach((photo, index) => {
    const li = document.createElement('li');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    h2.textContent = photo.title;
    img.src = photo.url;
    img.alt = `Photo ${index + 1}`;
    img.className = 'imgstyle';

    editButton.textContent = 'Edit';
    editButton.className = 'btn';
    editButton.onclick = () => handleEdit(index);

    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn';
    deleteButton.onclick = () => deletePhoto(index);

    li.appendChild(h2);
    li.appendChild(img);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    photosList.appendChild(li);
  });
}

async function fetchPhotosFromAPI() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=1');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    photos = data.map((item) => ({ id: item.id, title: item.title, url: item.url }));
    renderPhotos(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
}

fetchPhotosFromAPI()

function addPhoto() {
  const titleInput = document.getElementById('titleInput').value.trim();
  const urlInput = document.getElementById('urlInput').value.trim();

  if (titleInput !== '' && urlInput !== '') {
    const newId = photos.length > 0 ? photos[photos.length - 1].id + 1 : 1;
    const newPhoto = { id: newId, title: titleInput, url: urlInput };

    photos.push(newPhoto);
    renderPhotos(photos); 
    clearInputFields();
  } else {
    console.error('Title or URL cannot be empty.');
  }
}

function deletePhoto(index) {
  if (index >= 0 && index < photos.length) {
    photos.splice(index, 1);
    renderPhotos(photos); 
  }
}

function handleEdit(index) {
  editMode = true;
  const photo = photos[index];
  editId = photo.id;
  document.getElementById('titleInput').value = photo.title;
  document.getElementById('urlInput').value = photo.url;
  document.getElementById('updateBtn').style.display = 'inline-block';
  document.getElementById('cancelBtn').style.display = 'inline-block';
  document.getElementById('addBtn').style.display = 'none'; 
}

function updatePhoto() {
  const title = document.getElementById('titleInput').value;
  const url = document.getElementById('urlInput').value;
  photos.forEach((photo) => {
    if (photo.id === editId) {
      photo.title = title;
      photo.url = url;
    }
  });
  renderPhotos();
  clearInputFields();
  cancelEdit();
  document.getElementById('addBtn').style.display = 'inline-block';
}

function cancelEdit() {
  clearInputFields();
  editMode = false;
  editId = null;
  document.getElementById('updateBtn').style.display = 'none';
  document.getElementById('cancelBtn').style.display = 'none';
  document.getElementById('addBtn').style.display = 'inline-block';
}

function clearInputFields() {
  document.getElementById('titleInput').value = '';
  document.getElementById('urlInput').value = '';
}

document.addEventListener("DOMContentLoaded", function() {
  const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 250,
    reset: true
  });

  sr.reveal('.container', {
    delay: 200,
    origin: 'top'
  });
});

renderPhotos();


