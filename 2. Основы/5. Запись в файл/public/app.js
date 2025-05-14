document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: 'DELETE',
  });
}

document.addEventListener('click', async (event) => {
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const li = event.target.closest('li');
    const titleElement = li.querySelector('.note-title');
    const currentTitle = titleElement.textContent.trim();

    const newTitle = prompt('Введите новое название', currentTitle);

    if (newTitle && newTitle !== currentTitle) {
      try {
        const response = await fetch(`/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTitle }),
        });

        if (response.ok) {
          titleElement.textContent = newTitle;
        } else {
          alert('Ошибка при обновлении заметки.');
        }
      } catch (e) {
        console.error('Ошибка:', e);
      }
    }
  }
});
