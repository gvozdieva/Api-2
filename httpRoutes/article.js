const express = require('express');

const router = express.Router();
const multer = require('multer');

const upload = multer();

const articleController = require('controllers/article');

const Ajv = require('ajv');
const articleSchema = require('schemas/routes/article');

router.post('/create', upload.none(), async (req, res, next) => {
  const { body } = req;

  // Валидация:
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
  const validate = ajv.compile(articleSchema);
  const valid = validate(body);

  if (!valid) {
    const result = {
      status: 'invalid data',
      payload: { errors: validate.errors },
    };

    res.json(result);
    return;
  }

  const { create } = articleController;
  const { title, content } = body;

  const id = await create(title, content);                    // ?

  res.json({
    status: 'ok',
    payload: { id },
  });
});

router.get('/list', async (req, res, next) => {
  const { getList } = articleController;
  const result = await getList();

  const list = result.map((value) => {
    const { title, content, id } = value;
    return { title, content, id };
  });

  res.json({
    status: 'ok',
    payload: { list },
  });
});

router.get('/:id', (req, res, next) => {

});

module.exports = router;
