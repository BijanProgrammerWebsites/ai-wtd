import express, {Request, Response} from 'express';
import LogisticRegression from './logistic-regression';

const port = 5000;

const model = new LogisticRegression();

const app = express();
app.use(express.json());

app.get('/api/v1/guess', async (req: Request<unknown, unknown, {pixels: number[]}>, res: Response) => {
    const guess = await model.predict([req.body.pixels]);
    res.json({guess});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
