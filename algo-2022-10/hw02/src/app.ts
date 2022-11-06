import { doTest, getInput, getOutput } from './lib';

for (let testId = 0; testId < 9; testId++) {
    const input = getInput(testId);
    const expectedOutput = getOutput(testId);
    doTest(testId, input, expectedOutput);
}
