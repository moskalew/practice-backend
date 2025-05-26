document.addEventListener('click', async (event) => {
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const newTitle = prompt('Введите новое название');

    if (newTitle) {
      try {
        const response = await fetch(`/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: newTitle }),
        });

        if (response.ok) {
          location.reload(); // Обновим страницу
        } else {
          alert('Ошибка при обновлении');
        }
      } catch (err) {
        console.error('Ошибка:', err);
        alert('Ошибка при выполнении запроса');
      }
    }
  }

  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    const confirmed = confirm('Удалить эту заметку?');

    if (confirmed) {
      await fetch(`/${id}`, { method: 'DELETE' });
      event.target.closest('li').remove();
    }
  }
});
