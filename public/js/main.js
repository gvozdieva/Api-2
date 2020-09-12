/* const article = {
  create: (title, content) => {

  },
  getList: () => {

  },
  getById: (id) => {

  },
}; */
const showSuperErr = () => {
  const errEl = document.querySelector('.super-err');
  errEl.classList.remove('hide');
};

{
  const updateList = async () => {
    const articleListEl = document.querySelector('.articleList');
    try {
      const { data } = await axios.get('article/list');
      const { list } = data.payload;

      const html = list.map((value) => {
        const { title, content, id } = value;
        const str = `<li data-id="${id}"><h3>${title}</h3><div>${content}</div></li>`;
        return str;
      }).join();

      articleListEl.innerHTML = html;
    } catch (err) {
      showSuperErr();
    }
  };
  updateList();
}

{
  const formEl = document.forms.articleCreate;

  formEl.addEventListener('submit', async function (ev) {
    ev.preventDefault();
    const fields = new FormData(this);
    try {
      const { data } = await axios.post('article/create', fields);
      updateList();
    } catch (err) {
      showSuperErr();
    }
  });
}
