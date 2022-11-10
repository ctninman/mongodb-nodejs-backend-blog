import express from 'express'

let articlesInfo = [
	{
		name: 'higher-coward',
		upvotes: 0,
		comments: []
	},
	{
		name: 'fall-from-a-high-place',
		upvotes: 0,
		comments: []
	}
]

const app = express()
app.use(express.json())

app.get('/hello', (req, res) => {
	res.send('Hello!');
})

app.listen(8000, () => {
	console.log('Server is listening on Port 8000')
})

app.get('/test1', (req, res) => {
	res.send('test: ' + 'succeeded')
})

app.post('/sayhi', (req, res) => {
	console.log(req.body)
	res.send(`Ciao, ${req.body.name}`)

})

app.get('/hello/:name', (req,res) => {
	// const name = req.params.name
	const { name } = req.params
	res.send(`Helloooooo ${name}`)
})

app.put('/api/articles/:name/upvote', (req, res) => {
	const { name } = req.params;
	const article = articlesInfo.find(a => a.name === name)
	if (article) {
		article.upvotes += 1
		res.send(`The ${name} article now has ${article.upvotes} votes!`)
	} else {
		res.send('That article doesn\'t exist')
	}
})

app.post('/api/articles/:name/comments', (req, res) => {
	const { name } = req.params;
	const { postedBy, text } = req.body;

	const article = articlesInfo.find(a => a.name === name)
	if (article) {
		article.comments.push({postedBy, text})
		res.send(article.comments)
	} else {
		res.send("That article doesn\'t exist.")
	}
})

