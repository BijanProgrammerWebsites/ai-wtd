import * as tf from '@tensorflow/tfjs-node';

import weightsJson from './weights.json';
import meanJson from './mean.json';
import varianceJson from './variance.json';

export default class LogisticRegression {
    private weights: tf.Tensor = tf.tensor(weightsJson);
    private mean: tf.Tensor = tf.tensor(meanJson);
    private variance: tf.Tensor = tf.tensor(varianceJson);

    public async predict(observations: number[][]): Promise<number> {
        const result = this.processFeatures(observations).matMul(this.weights).softmax().argMax(1);
        return result.dataSync()[0];
    }

    private processFeatures(features: number[][]): tf.Tensor {
        let result = tf.tensor(features);

        result = result.sub(this.mean).div(this.variance.pow(0.5));
        result = tf.ones([result.shape[0], 1]).concat(result, 1);

        return result;
    }
}
