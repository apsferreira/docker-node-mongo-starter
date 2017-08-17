const express = require('express'),
app = express(),
mongoose = require('mongoose'),
router = express.Router()

const mongoUrl = process.env.NODE_ENV === 'docker-development' ? 'dockerized_mongo' : 'localhost'
mongoose.connect(`mongodb://${mongoUrl}/starter-db`)
mongoose.Promise = global.Promise
const Dog = mongoose.model('Dog', { name: String})

router.get('/', (req, res) => res.send('the api is functionally'))

router.get('/dogs', (req, res) => {
  Dog
    .find()
    .then((allDogs) => res.json(allDogs))
})

router.post('/dog', (req, res) => {
  new Dog({name: `Poodle ${new Date().getMilliseconds()}`})
    .save()
    .then((saved) => res.json(saved))
})

app.listen(3000, () => console.log('starter-app listening on port 3000!'))
