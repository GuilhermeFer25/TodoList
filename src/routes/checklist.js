const express = require('express')

const router = express.Router();


// router.get('/', (req, res) => {
//   console.log('ola')
//   res.send()
// })

// router.get('/:id', (req, res) => {
//   console.log(req.params.id)
//   res.send(`Id: ${req.params.id}`)
// })

// router.post('/', (req, res) => {
//   console.log(req.body)
//   res.status(200).send(req.body)
// })
// router.put('/:id', (req, res) => {
//   console.log(req.params.id)
//   res.send(`PUt Id: ${req.params.id}`)
// })
// router.delete('/:id', (req, res) => {
//   console.log(req.params.id)
//   res.send(`PUt Id: ${req.params.id}`)
// })


const Checklist = require('../models/checklist')
router.get('/', async (req, res) => {
  try {
    let checklist = await Checklist.find({});
    // res.status(200).json(checklist);
    res.status(200).render('checklists/index', { checklist: checklist })
  } catch (error) {
    res.status(200).render('pages/error', { error: 'Erro Ao exibir o erro' })
  }
})
router.get('/new', async (req, res) => {
  try {
    let checklist = new Checklist()
    res.status(200).render('checklists/new', { checklist: checklist })

  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao carregar o formulario' })

  }
})
router.get('/:id/edit', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render('./checklists/edit', { checklist: checklist })
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao Exibir a edicao de tarefas' })

  }
})

router.post('/', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name })

  try {
    await checklist.save()
    res.redirect('/checklists')
  } catch (error) {
    res.status(422).render('checklists/new', { checklists: { ...checklists, error } })
  }
})

router.get('/:id', async (req, res) => {

  try {
    let checklist = await Checklist.findById(req.params.id).populate('tasks')
    res.status(200).render('checklists/show', { checklist: checklist })

  } catch (error) {
    res.status(200).render('pages/error', { error: 'Erro ao exibir as Listas de tarefas' })

  }
})
router.put('/:id', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);
  try {
    await checklist.update({ name })
    res.redirect('/checklists')

  } catch (error) {
    let errors = error.erros;
    res.status(422).render('checklists/edit', { checklist: { ...checklist, erros } })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findByIdAndRemove(req.params.id)
    res.redirect('/checklists');
  } catch (error) {
    res.status(500).render('pages/error', { error: 'Erro ao Deletar a lista de tarefa ' })

  }
})
module.exports = Checklist;
module.exports = router;
